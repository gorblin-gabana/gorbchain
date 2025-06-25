import React from 'react';
import { Hash, Clock, FileText, Database, Activity, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import TransactionCard from './TransactionCard';
import { formatNumber, formatTimeAgo } from '../hooks/useSolanaData';
import { Block } from '../types/solana';

interface BlockDetailProps {
  block: Block;
  onBack?: () => void;
}

const BlockDetail: React.FC<BlockDetailProps> = ({ block, onBack }) => {
  return (
    <div className="dashboard-layout animate-fade-in">
      {/* Header with Back Button */}
      <div className="section-container">
        <div className="flex items-center gap-4 mb-6">
          {onBack && (
            <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-bold text flex items-center gap-3">
              <Hash className="w-8 h-8 text-primary" />
              Block #{formatNumber(block.slot)}
            </h1>
            <p className="text-muted mt-1">
              Block details and all transactions
            </p>
          </div>
        </div>
      </div>

      {/* Block Details */}
      <div className="section-container">
        <Card className="glass-effect border-border bg-surface">
          <CardHeader>
            <CardTitle className="text flex items-center">
              <Database className="w-5 h-5 mr-2 text-primary" />
              Block Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-1">
                <span className="text-sm text-muted">Slot</span>
                <p className="font-mono font-bold text-primary text-lg">#{formatNumber(block.slot)}</p>
              </div>
              
              <div className="space-y-1">
                <span className="text-sm text-muted">Block Height</span>
                <p className="font-medium text">{formatNumber(block.blockHeight || 0)}</p>
              </div>
              
              <div className="space-y-1">
                <span className="text-sm text-muted">Parent Slot</span>
                <p className="font-mono text">#{formatNumber(block.parentSlot)}</p>
              </div>
              
              <div className="space-y-1">
                <span className="text-sm text-muted">Block Time</span>
                <p className="font-medium text">{formatTimeAgo(block.blockTime)}</p>
                <p className="text-xs text-muted">{new Date(block.blockTime * 1000).toLocaleString()}</p>
              </div>
              
              <div className="space-y-1">
                <span className="text-sm text-muted">Transaction Count</span>
                <p className="font-bold text-success text-lg">{formatNumber(block.transactions.length)}</p>
              </div>
              
              <div className="space-y-1">
                <span className="text-sm text-muted">Block Leader</span>
                <p className="font-mono text-xs">{block.leader}</p>
              </div>
            </div>
            
            <div className="mt-6 space-y-1">
              <span className="text-sm text-muted">Blockhash</span>
              <p className="font-mono text-xs break-all bg-surface/50 p-3 rounded border">
                {block.blockhash}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions in Block */}
      <div className="section-container">
        <Card className="glass-effect border-border bg-surface">
          <CardHeader>
            <CardTitle className="text flex items-center justify-between">
              <div className="flex items-center">
                <Activity className="w-5 h-5 mr-2 text-success" />
                Transactions in Block
              </div>
              <Badge variant="outline" className="text-xs">
                {formatNumber(block.transactions.length)} transactions
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {block.transactions.length === 0 ? (
              <div className="text-center py-8 text-muted">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No transactions in this block</p>
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto divide-y divide-border">
                {block.transactions.map((transaction) => (
                  <TransactionCard 
                    key={transaction.signature} 
                    transaction={transaction}
                    onClick={(tx) => console.log('Transaction clicked:', tx.signature)}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlockDetail; 