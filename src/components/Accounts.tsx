import React, { useState, useEffect } from 'react';
import { User, Wallet, Key, Database, Search as SearchIcon, AlertCircle, Loader2, Copy, Check, QrCode } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useAccount, useParsedAccountInfo, useTokenAccountBalance } from '../hooks/useSolanaData';
import { QRCodeCanvas } from 'qrcode.react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';

// TODO: Implement useAccountsByOwner for owner-based search
// import { useAccountsByOwner } from '../hooks/useSolanaData';

interface AccountsProps {
  onAccountSelect?: (pubkey: string) => void;
  searchQuery?: string;
}

const Accounts: React.FC<AccountsProps> = ({ onAccountSelect, searchQuery: initialSearchQuery }) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery || '');
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState('transactions');
  const [showSend, setShowSend] = useState(false);
  const [showReceive, setShowReceive] = useState(false);

  // For direct address search
  const { account, loading, error } = useAccount(searchQuery.length >= 32 ? searchQuery : null);
  const parsedInfo = useParsedAccountInfo(selectedAccount);
  const tokenBalance = useTokenAccountBalance(selectedAccount);

  const { publicKey, connected, sendTransaction } = useWallet();
  const { connection } = useConnection();

  // Update search query when prop changes
  useEffect(() => {
    if (initialSearchQuery) setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  // Auto-select account when it loads from search
  useEffect(() => {
    if (account && searchQuery && account.pubkey === searchQuery) {
      setSelectedAccount(account.pubkey);
    }
  }, [account, searchQuery]);

  // Copy to clipboard handler
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  // Helper for formatting
  const formatAddress = (address: string, length = 4) => {
    if (!address) return '';
    if (window.innerWidth < 640) return `${address.slice(0, length)}...${address.slice(-length)}`;
    return address;
  };
  const formatSOL = (lamports: number) => (lamports / 1_000_000_000).toFixed(6);
  const formatNumber = (num: number) => num.toLocaleString();

  const getAccountType = (account: any) => {
    if (account.owner === '11111111111111111111111111111112') return 'System';
    if (account.owner === 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') return 'Token';
    if (account.executable) return 'Program';
    return 'Data';
  };
  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case 'System': return 'bg-primary/10 text-primary border-primary/20';
      case 'Token': return 'bg-success/10 text-success border-success/20';
      case 'Program': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-muted/10 text-muted border-muted/20';
    }
  };

  return (
    <div className="dashboard-layout animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 w-full">
        {/* Left: Tabs for Transactions, Tokens, NFTs */}
        <div className={(!selectedAccount || !account) ? 'col-span-10 w-full flex items-center justify-center min-h-[300px]' : 'col-span-7 w-full'}>
          {(!selectedAccount || !account) ? (
            <div className="w-full flex items-center justify-center h-full text-muted text-lg py-16">
              No data available.
            </div>
          ) : (
            <Tabs value={tab} onValueChange={setTab} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="tokens">Tokens</TabsTrigger>
                <TabsTrigger value="nfts">NFTs</TabsTrigger>
              </TabsList>
              <TabsContent value="transactions">
                {/* TODO: Paginated transaction history for this account */}
                <div className="text-muted text-center py-8">Transaction history coming soon.</div>
              </TabsContent>
              <TabsContent value="tokens">
                {/* TODO: Token balances for this account */}
                <div className="text-muted text-center py-8">Token balances coming soon.</div>
              </TabsContent>
              <TabsContent value="nfts">
                {/* TODO: NFTs for this account */}
                <div className="text-muted text-center py-8">No NFTs found.</div>
              </TabsContent>
            </Tabs>
          )}
      </div>

        {/* Right: Account Details */}
        <div className={selectedAccount && account ? 'col-span-3 w-full max-w-md' : 'col-span-10 w-full'}>
          <Card className="glass-effect border-border lg:sticky lg:top-24">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-primary" />
                  Account Details
              </CardTitle>
                {(selectedAccount && account && connected) && (
                  <div className="flex gap-2">
                    <Button size="sm" className="btn-modern" onClick={() => setShowSend(true)}>
                      Send
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setShowReceive(true)}>
                      <QrCode className="w-4 h-4 mr-1" /> Receive
                    </Button>
                      </div>
                )}
                {(!connected || !publicKey) && (
                  <div className="flex gap-2">
                    <WalletMultiButton className="btn-modern" />
                </div>
              )}
        </div>
            </CardHeader>
            <CardContent>
              {selectedAccount && account && selectedAccount === account.pubkey ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs sm:text-sm break-all">
                      {formatAddress(account.pubkey, 8)}
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="p-1"
                      onClick={() => handleCopy(account.pubkey)}
                      title="Copy address"
                    >
                      {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm text-muted">Balance</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text">{formatSOL(account.lamports)}</span>
                      <span className="text-sm text-muted">SOL</span>
                    </div>
                    <p className="text-xs text-muted">{formatNumber(account.lamports)} lamports</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm text-muted">Owner</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs break-all">{formatAddress(account.owner, 8)}</span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="p-1"
                        onClick={() => handleCopy(account.owner)}
                        title="Copy owner address"
                      >
                        {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-sm text-muted">Executable</span>
                      <div className="flex items-center space-x-2">
                        {account.executable ? (
                          <Key className="w-4 h-4 text-success" />
                        ) : (
                          <Database className="w-4 h-4 text-muted" />
                        )}
                        <p className="font-medium text">
                          {account.executable ? 'Yes' : 'No'}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm text-muted">Rent Epoch</span>
                      <p className="font-medium text">{account.rentEpoch}</p>
                    </div>
                  </div>
                    <div className="space-y-1">
                      <span className="text-sm text-muted">Data Size</span>
                    <p className="font-medium text">{account.data ? account.data.space : 0} bytes</p>
                  </div>
                </div>
              ) : loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin mr-2" />
                  Loading account details...
                    </div>
              ) : error ? (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-warning mx-auto mb-3" />
                  <p className="text-warning">{error}</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <User className="w-12 h-12 text-muted mx-auto mb-3" />
                  <p className="text-muted">No account found for this address</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Send Modal Stub */}
          {showSend && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-surface rounded-lg p-6 w-full max-w-md shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">Send SOL</h2>
                  <Button size="icon" variant="ghost" onClick={() => setShowSend(false)}>
                    <span className="text-xl">×</span>
                  </Button>
                </div>
                <form className="space-y-4" onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const address = (form.elements.namedItem('recipient') as HTMLInputElement).value;
                  const amount = parseFloat((form.elements.namedItem('amount') as HTMLInputElement).value);
                  if (!publicKey || !address || !amount || isNaN(amount)) return;
                  try {
                    const tx = new Transaction().add(
                      SystemProgram.transfer({
                        fromPubkey: publicKey,
                        toPubkey: new PublicKey(address),
                        lamports: amount * LAMPORTS_PER_SOL,
                      })
                    );
                    await sendTransaction(tx, connection);
                    setShowSend(false);
                  } catch (err) {
                    alert('Transaction failed: ' + (err as Error).message);
                  }
                }}>
                  <div>
                    <label className="block text-sm mb-1">Recipient Address</label>
                    <input className="input-modern w-full" name="recipient" placeholder="Enter address..." />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Amount (GOR)</label>
                    <input className="input-modern w-full" name="amount" placeholder="0.0" type="number" min="0" step="any" />
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button type="submit" className="btn-modern flex-1">Send</Button>
                    <Button type="button" variant="outline" onClick={() => setShowSend(false)}>Cancel</Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Receive Modal with QR code */}
          {showReceive && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-surface rounded-lg p-6 w-full max-w-xs shadow-xl flex flex-col items-center">
                <div className="flex justify-between items-center w-full mb-4">
                  <h2 className="text-lg font-bold">Receive SOL</h2>
                  <Button size="icon" variant="ghost" onClick={() => setShowReceive(false)}>
                    <span className="text-xl">×</span>
                  </Button>
                </div>
                <div className="my-4 flex flex-col items-center">
                  <div className="w-40 h-40 bg-muted flex items-center justify-center rounded-lg mb-2 relative">
                    <QRCodeCanvas
                      value={publicKey ? publicKey.toBase58() : ''}
                      size={160}
                      bgColor="#181A20"
                      fgColor="#14F195"
                      includeMargin={false}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs break-all">{publicKey ? publicKey.toBase58() : ''}</span>
                    <Button size="icon" variant="ghost" className="p-1" onClick={() => handleCopy(publicKey ? publicKey.toBase58() : '')} title="Copy address">
                      {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accounts;