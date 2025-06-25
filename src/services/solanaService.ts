import { 
  Connection, 
  PublicKey, 
  clusterApiUrl,
  GetProgramAccountsFilter,
  Commitment,
  ConfirmedSignatureInfo,
  ParsedAccountData,
  GetVersionedBlockConfig,
  VersionedBlockResponse,
  BlockResponse,
  GetBlockConfig
} from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, AccountLayout, MintLayout } from '@solana/spl-token';
import { 
  Block, 
  Transaction, 
  Account, 
  Token, 
  Validator, 
  ClusterStats, 
  StakePool,
  SearchResult 
} from '../types/solana';

// Initialize connection to your RPC endpoint
const RPC_ENDPOINT = 'https://rpc.gorbchain.xyz';
const connection = new Connection(RPC_ENDPOINT, 'confirmed');

// Cache for frequently accessed data
const cache = new Map();
const CACHE_DURATION = 30000; // 30 seconds

class SolanaService {
  private static instance: SolanaService;
  
  public static getInstance(): SolanaService {
    if (!SolanaService.instance) {
      SolanaService.instance = new SolanaService();
    }
    return SolanaService.instance;
  }

  private getCachedData<T>(key: string): T | null {
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }

  private setCachedData<T>(key: string, data: T): void {
    cache.set(key, { data, timestamp: Date.now() });
  }

  // Get cluster stats (main dashboard data)
  async getClusterStats(): Promise<ClusterStats> {
    const cacheKey = 'cluster-stats';
    const cached = this.getCachedData<ClusterStats>(cacheKey);
    if (cached) return cached;

    try {
      const [
        epochInfo,
        supply,
        performance,
        recentPerformance,
        slot,
        firstAvailableBlock,
        largestAccounts
      ] = await Promise.all([
        connection.getEpochInfo(),
        connection.getSupply(),
        connection.getRecentPerformanceSamples(1),
        connection.getRecentPerformanceSamples(30), // Get more samples for better average
        connection.getSlot(),
        connection.getFirstAvailableBlock().catch(() => 0),
        connection.getLargestAccounts().catch(() => null)
      ]);

      // Calculate TPS from performance samples
      const currentTps = performance.length > 0 ? 
        Math.round(performance[0].numTransactions / performance[0].samplePeriodSecs) : 0;
      
      // Calculate average TPS from multiple samples
      const avgTps = recentPerformance.length > 0 ?
        Math.round(recentPerformance.reduce((sum: number, sample: any) => 
          sum + (sample.numTransactions / sample.samplePeriodSecs), 0) / recentPerformance.length) : 0;

      // Calculate total transactions from all performance samples
      const totalTransactions = recentPerformance.reduce((sum: number, sample: any) => sum + sample.numTransactions, 0);

      // Calculate inflation rate based on epoch schedule (this is a simplified calculation)
      // Real Solana inflation decreases over time, but for a fork it might be different
      const baseInflationRate = 8.0; // Starting rate
      const inflationTaper = 0.15; // Annual decrease
      const yearsRunning = Math.max(1, epochInfo.epoch / 365); // Rough calculation
      const currentInflation = Math.max(1.5, baseInflationRate - (inflationTaper * yearsRunning));

      // Try to get a reasonable account count estimate
      // Since getLargestAccounts might not work on all RPC endpoints, use multiple fallbacks
      let totalAccounts = 0;
      
      try {
        if (largestAccounts?.value && largestAccounts.value.length > 0) {
          // If we have largest accounts data, estimate based on that
          // Typically the largest accounts represent a small fraction of total accounts
          totalAccounts = largestAccounts.value.length * 500; // Conservative estimate
        } else {
          // Fallback calculation based on slot and epoch
          // More mature networks have more accounts per slot
          const slotsPerAccount = 50; // Estimate: 1 new account every 50 slots
          totalAccounts = Math.max(50000, Math.floor(epochInfo.absoluteSlot / slotsPerAccount));
          
          // Cap the estimate at a reasonable maximum for display
          totalAccounts = Math.min(totalAccounts, 50000000); // Cap at 50M accounts
        }
      } catch (error) {
        // Final fallback: use epoch-based estimate
        totalAccounts = Math.max(100000, epochInfo.epoch * 10000);
      }

      const stats: ClusterStats = {
        slot: epochInfo.absoluteSlot,
        blockHeight: epochInfo.blockHeight || 0,
        absoluteSlot: epochInfo.absoluteSlot,
        transactionCount: performance.length > 0 ? performance[0].numTransactions : 0,
        epoch: epochInfo.epoch,
        epochProgress: epochInfo.slotIndex / epochInfo.slotsInEpoch,
        slotsInEpoch: epochInfo.slotsInEpoch,
        tps: currentTps,
        averageTps: avgTps,
        totalTransactions: totalTransactions,
        totalAccounts: totalAccounts, // Now using calculated account count
        circulatingSupply: supply.value.circulating / 1_000_000_000, // Convert lamports to SOL
        totalSupply: supply.value.total / 1_000_000_000,
        inflation: Number(currentInflation.toFixed(1))
      };

      this.setCachedData(cacheKey, stats);
      return stats;
    } catch (error) {
      console.error('Error fetching cluster stats:', error);
      throw error;
    }
  }

  // Get recent blocks with full transaction details
  async getRecentBlocks(limit: number = 20): Promise<Block[]> {
    const cacheKey = `blocks-${limit}`;
    const cached = this.getCachedData<Block[]>(cacheKey);
    if (cached) return cached;

    try {
      const slot = await connection.getSlot();
      const blocks: Block[] = [];
      for (let i = 0; i < limit; i++) {
        const blockSlot = slot - i;
        try {
          const blockData = await connection.getBlock(blockSlot, {
            maxSupportedTransactionVersion: 0,
            transactionDetails: 'full',
            rewards: true
          });
          if (blockData) {
            const block: Block = {
              slot: blockSlot,
              blockhash: blockData.blockhash,
              parentSlot: blockData.parentSlot,
              blockTime: blockData.blockTime || Date.now() / 1000,
              transactions: (blockData.transactions || []).map((tx: any) => ({
                signature: tx.transaction.signatures[0],
                slot: blockSlot,
                blockTime: blockData.blockTime || Date.now() / 1000,
                fee: tx.meta?.fee || 0,
                status: (tx.meta?.err ? 'failed' : 'success') as 'success' | 'failed',
                instructions: tx.transaction.message.compiledInstructions?.map((ix: any) => ({
                  programId: tx.transaction.message.staticAccountKeys[ix.programIdIndex].toString(),
                  accounts: ix.accountKeyIndexes.map((acc: number) => tx.transaction.message.staticAccountKeys[acc].toString()),
                  data: Buffer.from(ix.data).toString('base64')
                })) || [],
                logs: tx.meta?.logMessages || [],
                computeUnitsConsumed: tx.meta?.computeUnitsConsumed,
                accounts: tx.transaction.message.staticAccountKeys.map((key: any) => key.toString())
              })),
              rewards: blockData.rewards?.map(reward => ({
                pubkey: reward.pubkey,
                lamports: reward.lamports,
                postBalance: reward.postBalance || 0,
                rewardType: (reward.rewardType as 'fee' | 'rent' | 'staking' | 'voting') || 'staking',
                commission: reward.commission || undefined
              })) || [],
              leader: blockData.blockhash || 'Unknown',
              blockHeight: blockSlot
            };
            blocks.push(block);
          }
        } catch (blockError) {
          // skip missing blocks
        }
      }
      this.setCachedData(cacheKey, blocks);
      return blocks;
    } catch (error) {
      console.error('Error fetching recent blocks:', error);
      throw error;
    }
  }

  // Get recent transactions
  async getRecentTransactions(limit: number = 50): Promise<Transaction[]> {
    const cacheKey = `transactions-${limit}`;
    const cached = this.getCachedData<Transaction[]>(cacheKey);
    if (cached) return cached;

    try {
      const signatures = await connection.getSignaturesForAddress(
        new PublicKey('11111111111111111111111111111112'), // System program
        { limit: limit }
      );

      const transactions: Transaction[] = [];
      
      // Process signatures in batches to avoid rate limits
      const batchSize = 10;
      for (let i = 0; i < Math.min(signatures.length, limit); i += batchSize) {
        const batch = signatures.slice(i, i + batchSize);
        const txPromises = batch.map(async (sig) => {
          try {
            const tx = await connection.getTransaction(sig.signature, {
              maxSupportedTransactionVersion: 0
            });
            
            if (tx) {
              return {
                signature: sig.signature,
                slot: sig.slot || 0,
                blockTime: sig.blockTime || Date.now() / 1000,
                fee: tx.meta?.fee || 5000,
                status: (tx.meta?.err ? 'failed' : 'success') as 'success' | 'failed',
                instructions: tx.transaction.message.compiledInstructions?.map(ix => ({
                  programId: tx.transaction.message.staticAccountKeys[ix.programIdIndex].toString(),
                  accounts: ix.accountKeyIndexes.map((acc: number) => 
                    tx.transaction.message.staticAccountKeys[acc].toString()
                  ),
                  data: Buffer.from(ix.data).toString('base64')
                })) || [],
                logs: tx.meta?.logMessages || [],
                computeUnitsConsumed: tx.meta?.computeUnitsConsumed,
                accounts: tx.transaction.message.staticAccountKeys.map(key => key.toString())
              } as Transaction;
            }
            return null;
          } catch (error) {
            console.log(`Error fetching transaction ${sig.signature}:`, error);
            return null;
          }
        });

        const batchResults = await Promise.all(txPromises);
        transactions.push(...batchResults.filter(tx => tx !== null) as Transaction[]);
      }

      this.setCachedData(cacheKey, transactions);
      return transactions;
    } catch (error) {
      console.error('Error fetching recent transactions:', error);
      throw error;
    }
  }

  // Get validators
  async getValidators(): Promise<Validator[]> {
    const cacheKey = 'validators';
    const cached = this.getCachedData<Validator[]>(cacheKey);
    if (cached) return cached;

    try {
      const voteAccounts = await connection.getVoteAccounts();
      const validators: Validator[] = [];

      [...voteAccounts.current, ...voteAccounts.delinquent].forEach(validator => {
        validators.push({
          identity: validator.nodePubkey,
          voteAccount: validator.votePubkey,
          nodePubkey: validator.nodePubkey,
          commission: validator.commission,
          lastVote: validator.lastVote,
          rootSlot: 0, // Not available in VoteAccountInfo
          credits: validator.epochCredits.reduce((sum, credit) => sum + credit[1], 0),
          epochCredits: validator.epochCredits,
          activatedStake: validator.activatedStake,
          version: '1.17.15' // Default version
        });
      });

      this.setCachedData(cacheKey, validators);
      return validators;
    } catch (error) {
      console.error('Error fetching validators:', error);
      throw error;
    }
  }

  // Get account information
  async getAccount(pubkey: string): Promise<Account | null> {
    try {
      const publicKey = new PublicKey(pubkey);
      const accountInfo = await connection.getAccountInfo(publicKey);
      
      if (!accountInfo) return null;

      return {
        pubkey,
        lamports: accountInfo.lamports,
        owner: accountInfo.owner.toString(),
        executable: accountInfo.executable,
        rentEpoch: accountInfo.rentEpoch || 0,
        data: {
          program: accountInfo.owner.toString(),
          space: accountInfo.data.length,
          parsed: null
        }
      };
    } catch (error) {
      console.error('Error fetching account:', error);
      return null;
    }
  }

  // Get SPL tokens
  async getTokens(): Promise<Token[]> {
    const cacheKey = 'tokens';
    const cached = this.getCachedData<Token[]>(cacheKey);
    if (cached) return cached;

    try {
      // Fetch all token mint accounts
      const tokenMints = await connection.getProgramAccounts(
        TOKEN_PROGRAM_ID,
        {
          filters: [
            { dataSize: 82 } // Mint account size
          ]
        }
      );

      const tokens: Token[] = tokenMints.map((acc) => {
        const mintData = MintLayout.decode(acc.account.data);
        return {
          mint: acc.pubkey.toBase58(),
          symbol: '', // Optionally fetch from a registry
          name: '',   // Optionally fetch from a registry
          decimals: mintData.decimals,
          supply: Number(mintData.supply),
          holders: 0, // Optionally fetch holders count
        };
      });

      this.setCachedData(cacheKey, tokens);
      return tokens;
    } catch (error) {
      console.error('Error fetching tokens:', error);
      return [];
    }
  }

  // Search functionality
  async search(query: string): Promise<SearchResult[]> {
    const results: SearchResult[] = [];

    // Try to parse as different types
    try {
      // Check if it's a valid public key (base58, 32 bytes)
      if (query.length >= 32 && query.length <= 44) {
        try {
          const pubkey = new PublicKey(query);
          
          // Check if it's an account
          const account = await this.getAccount(query);
          if (account) {
            results.push({
              type: 'account',
              data: account,
              title: `Account ${query.slice(0, 8)}...${query.slice(-4)}`,
              subtitle: `Balance: ${(account.lamports / 1_000_000_000).toFixed(6)} SOL`
            });
          }
        } catch (e) {
          // Not a valid public key
        }
      }

      // Check if it's a transaction signature
      if (query.length >= 87 && query.length <= 88) {
        try {
          const tx = await connection.getTransaction(query, {
            maxSupportedTransactionVersion: 0
          });
          if (tx) {
            results.push({
              type: 'transaction',
              data: tx,
              title: `Transaction ${query.slice(0, 8)}...${query.slice(-4)}`,
              subtitle: `Status: ${tx.meta?.err ? 'Failed' : 'Success'}`
            });
          }
        } catch (e) {
          // Not a valid transaction
        }
      }

      // Check if it's a slot number
      if (/^\d+$/.test(query)) {
        const slot = parseInt(query);
        try {
          const block = await connection.getBlock(slot);
          if (block) {
            results.push({
              type: 'block',
              data: block,
              title: `Block #${slot}`,
              subtitle: `${block.transactions?.length || 0} transactions`
            });
          }
        } catch (e) {
          // Block not found
        }
      }

    } catch (error) {
      console.error('Search error:', error);
    }

    return results;
  }

  // Get connection instance for direct access
  getConnection(): Connection {
    return connection;
  }

  // Get token supply for a given mint
  async getTokenSupply(mint: string): Promise<number | null> {
    try {
      const result = await connection.getTokenSupply(new PublicKey(mint));
      return Number(result.value.amount);
    } catch (error) {
      console.error('Error fetching token supply:', error);
      return null;
    }
  }

  // Get inflation governor
  async getInflationGovernor() {
    try {
      return await connection.getInflationGovernor();
    } catch (error) {
      console.error('Error fetching inflation governor:', error);
      return null;
    }
  }

  // Get inflation rate
  async getInflationRate() {
    try {
      return await connection.getInflationRate();
    } catch (error) {
      console.error('Error fetching inflation rate:', error);
      return null;
    }
  }

  // Get parsed account info
  async getParsedAccountInfo(pubkey: string) {
    try {
      const info = await connection.getParsedAccountInfo(new PublicKey(pubkey));
      return info.value;
    } catch (error) {
      console.error('Error fetching parsed account info:', error);
      return null;
    }
  }

  // Get token account balance
  async getTokenAccountBalance(pubkey: string) {
    try {
      const result = await connection.getTokenAccountBalance(new PublicKey(pubkey));
      return result.value;
    } catch (error) {
      console.error('Error fetching token account balance:', error);
      return null;
    }
  }
}

// Helper functions
export const formatAddress = (address: string, length = 4): string => {
  if (address.length <= length * 2) return address;
  return `${address.slice(0, length)}...${address.slice(-length)}`;
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(num);
};

export const formatSOL = (lamports: number): string => {
  return (lamports / 1_000_000_000).toFixed(6);
};

export const formatTimeAgo = (timestamp: number): string => {
  const now = Date.now() / 1000;
  const diff = now - timestamp;
  
  if (diff < 60) return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

export default SolanaService; 