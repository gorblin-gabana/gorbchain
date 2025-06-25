import React from 'react';
import { Activity, Clock, DollarSign } from 'lucide-react';
import { Badge } from './ui/badge';
import { formatTimeAgo, formatSOL } from '../hooks/useSolanaData';
import { Transaction } from '../types/solana';

interface TransactionCardProps {
  transaction: Transaction;
  onClick?: (transaction: Transaction) => void;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction, onClick }) => {
  return (
    <div 
      className="card-base card-interactive p-4 cursor-pointer hover:bg-primary/5 transition-all border-l-4 border-l-success/30"
      onClick={() => onClick?.(transaction)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-success" />
          <span className="font-mono text-xs text">
            {transaction.signature.slice(0, 8)}...{transaction.signature.slice(-4)}
          </span>
        </div>
        <span className="text-xs text-muted flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {formatTimeAgo(transaction.blockTime)}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Badge 
            variant={transaction.status === 'success' ? 'default' : 'destructive'} 
            className="text-xs"
          >
            {transaction.status}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted">
            <DollarSign className="w-3 h-3" />
            {formatSOL(transaction.fee)} SOL
          </div>
        </div>
        <div className="text-xs text-muted">
          Slot: {transaction.slot}
        </div>
      </div>
    </div>
  );
};

export default TransactionCard; 