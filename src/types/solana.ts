export interface Block {
  slot: number;
  blockhash: string;
  parentSlot: number;
  blockTime: number;
  transactions: Transaction[];
  rewards: Reward[];
  leader: string;
  blockHeight?: number;
}

export interface Transaction {
  signature: string;
  slot: number;
  blockTime: number;
  fee: number;
  status: 'success' | 'failed';
  instructions: Instruction[];
  logs: string[];
  computeUnitsConsumed?: number;
  accounts: string[];
}

export interface Instruction {
  programId: string;
  accounts: string[];
  data: string;
  innerInstructions?: Instruction[];
}

export interface Account {
  pubkey: string;
  lamports: number;
  owner: string;
  executable: boolean;
  rentEpoch: number;
  data?: {
    parsed?: any;
    program: string;
    space: number;
  };
}

export interface Token {
  mint: string;
  symbol: string;
  name: string;
  decimals: number;
  supply: number;
  holders: number;
  logoURI?: string;
  coingeckoId?: string;
}

export interface Validator {
  identity: string;
  voteAccount: string;
  nodePubkey: string;
  commission: number;
  lastVote: number;
  rootSlot: number;
  credits: number;
  epochCredits: Array<[number, number, number]>;
  activatedStake: number;
  version?: string;
}

export interface Reward {
  pubkey: string;
  lamports: number;
  postBalance: number;
  rewardType: 'fee' | 'rent' | 'staking' | 'voting';
  commission?: number;
}

export interface ClusterStats {
  slot: number;
  blockHeight: number;
  absoluteSlot: number;
  transactionCount: number;
  epoch: number;
  epochProgress: number;
  slotsInEpoch: number;
  tps: number;
  averageTps: number;
  totalTransactions: number;
  totalAccounts: number;
  circulatingSupply: number;
  totalSupply: number;
  inflation: number;
}

export interface StakePool {
  address: string;
  manager: string;
  staker: string;
  withdrawAuthority: string;
  validatorList: string;
  poolMint: string;
  managerFeeAccount: string;
  tokenProgramId: string;
  totalLamports: number;
  poolTokenSupply: number;
  lastUpdateEpoch: number;
  fee: {
    denominator: number;
    numerator: number;
  };
}

export type NetworkType = 'mainnet-beta' | 'testnet' | 'devnet';

export interface SearchResult {
  type: 'block' | 'transaction' | 'account' | 'token' | 'program';
  data: any;
  title: string;
  subtitle: string;
}