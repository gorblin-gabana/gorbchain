import React, { useState, useEffect } from 'react';
import { FileText, Hash, Database, AlertCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTransactions, formatNumber, formatAddress } from '../hooks/useSolanaData';

interface TransactionsProps {
  onTransactionSelect?: (signature: string) => void;
  searchQuery?: string;
}

const Transactions: React.FC<TransactionsProps> = ({ onTransactionSelect, searchQuery: initialSearchQuery }) => {
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);
  const { transactions, loading, error, refetch } = useTransactions();

  // Handle search query prop
  useEffect(() => {
    if (initialSearchQuery) {
      // If it's a transaction signature, try to find the transaction
      if (initialSearchQuery.length === 88 && /^[A-Za-z0-9]+$/.test(initialSearchQuery)) {
        const foundTransaction = transactions.find(tx => tx.signature === initialSearchQuery);
        if (foundTransaction) {
          setSelectedTransaction(initialSearchQuery);
        }
      }
    }
  }, [initialSearchQuery, transactions]);

  const handleTransactionClick = (signature: string) => {
    setSelectedTransaction(signature);
    if (onTransactionSelect) {
      onTransactionSelect(signature);
    }
  };

  const selectedTx = selectedTransaction ? transactions.find(tx => tx.signature === selectedTransaction) : null;

  return (
    <div className="dashboard-layout animate-fade-in">
      {/* Header */}
      <div className="section-container">
        <div>
          <h1 className="text-3xl font-bold text">
            {initialSearchQuery ? `Transaction: ${formatAddress(initialSearchQuery, 8)}` : 'Transactions'}
          </h1>
          <p className="text-muted mt-1">
            {initialSearchQuery ? 'Transaction details and information' : 'Browse recent transactions on the Solana network (on-chain only)'}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          Loading transactions...
        </div>
      ) : error ? (
        <div className="section-container">
          <Card className="glass-effect border-border">
            <CardContent className="py-8 text-center">
              <AlertCircle className="w-12 h-12 text-warning mx-auto mb-3" />
              <p className="text-warning">Failed to load transactions: {error}</p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="explorer-layout">
          {/* Transaction List */}
          <div>
          <Card className="glass-effect border-border">
            <CardHeader>
              <CardTitle className="text flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-primary" />
                Recent Transactions
              </CardTitle>
                <CardDescription>Latest transactions on the network</CardDescription>
            </CardHeader>
              <CardContent>
                <div className="scroll-container space-y-sm">
              {transactions.map((tx) => (
                <div
                  key={tx.signature}
                      onClick={() => handleTransactionClick(tx.signature)}
                      className={`card-base card-interactive ${
                        selectedTransaction === tx.signature 
                      ? 'border-primary bg-primary/5' 
                          : ''
                  }`}
                >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                        <div className="flex flex-col">
                          <span className="font-mono text">Signature: {formatAddress(tx.signature)}</span>
                          <span className="text-xs text-muted">Slot: {tx.slot}</span>
                        </div>
                        <div className="flex flex-col sm:text-right">
                          <span className="text-sm text-muted">Status</span>
                          <span className="text-sm font-medium text">{tx.status === 'failed' ? 'Failed' : 'Success'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {transactions.length === 0 && (
                    <div className="text-center py-8">
                      <Database className="w-12 h-12 text-muted mx-auto mb-3" />
                      <p className="text-muted">No transactions found</p>
                    </div>
                  )}
                </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction Details */}
          <div>
            <Card className="glass-effect border-border lg:sticky lg:top-24">
            <CardHeader>
              <CardTitle className="text">Transaction Details</CardTitle>
              <CardDescription>
                  {selectedTransaction ? `Details for signature ${formatAddress(selectedTransaction)}` : 'Select a transaction to view details'}
              </CardDescription>
            </CardHeader>
            <CardContent>
                {selectedTx ? (
                  <div className="space-y-lg">
                    <div className="flex items-center gap-md">
                      <Hash className="w-8 h-8 text-primary" />
                      <div>
                        <h3 className="text-lg font-semibold text">Signature: {formatAddress(selectedTx.signature)}</h3>
                        <p className="text-muted">Slot: {selectedTx.slot}</p>
                      </div>
                  </div>
                  <div className="space-y-1">
                      <span className="text-sm text-muted">Status</span>
                      <p className="font-medium text">{selectedTx.status === 'failed' ? 'Failed' : 'Success'}</p>
                  </div>
                    <div className="space-y-1">
                      <span className="text-sm text-muted">Block Time</span>
                      <p className="font-medium text">{selectedTx.blockTime ? new Date(selectedTx.blockTime * 1000).toLocaleString() : 'N/A'}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm text-muted">Fee</span>
                      <p className="font-medium text">{selectedTx.fee ?? 'N/A'}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm text-muted">Accounts</span>
                      <p className="font-mono text-xs text break-all">{selectedTx.accounts.join(', ')}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Database className="w-12 h-12 text-muted mx-auto mb-3" />
                    <p className="text-muted">Select a transaction to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      )}
    </div>
  );
};

export default Transactions;