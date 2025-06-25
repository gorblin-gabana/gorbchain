import React from 'react';
import { Activity } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { useTransactions, formatTimeAgo, formatSOL } from '../hooks/useSolanaData';

const VISIBLE_COUNT = 5;

const TransactionStream: React.FC = () => {
  const { transactions, loading, error } = useTransactions(50);

  return (
    <aside className="hidden xl:block xl:col-span-3 2xl:col-span-2 h-[calc(100vh-80px)] sticky top-[80px] z-10">
      <Card className="glass-effect border-border bg-surface h-full flex flex-col">
        <CardHeader>
          <CardTitle className="text flex items-center">
            <Activity className="w-5 h-5 mr-2 text-primary" />
            Live Transactions
          </CardTitle>
          <CardDescription>Streaming latest network transactions</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-0">
          <div className="divide-y divide-border max-h-full overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-8">Loading...</div>
            ) : error ? (
              <div className="text-warning text-center py-8">{error}</div>
            ) : transactions.length === 0 ? (
              <div className="text-muted text-center py-8">No transactions found</div>
            ) : (
              <div className="flex flex-col">
                {transactions.slice(0, VISIBLE_COUNT).map((tx) => (
                  <div key={tx.signature} className="p-4 hover:bg-primary/5 transition cursor-pointer">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-xs">{tx.signature.slice(0, 8)}...{tx.signature.slice(-4)}</span>
                      <span className="text-xs text-muted">{formatTimeAgo(tx.blockTime)}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted">{formatSOL(tx.fee)} SOL</span>
                    </div>
                  </div>
                ))}
                <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 320px)' }}>
                  {transactions.slice(VISIBLE_COUNT).map((tx) => (
                    <div key={tx.signature} className="p-4 hover:bg-primary/5 transition cursor-pointer opacity-80">
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-xs">{tx.signature.slice(0, 8)}...{tx.signature.slice(-4)}</span>
                        <span className="text-xs text-muted">{formatTimeAgo(tx.blockTime)}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted">{formatSOL(tx.fee)} SOL</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
};

export default TransactionStream; 