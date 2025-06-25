import React from 'react';
import { Hash, Clock, FileText } from 'lucide-react';
import { formatNumber, formatTimeAgo } from '../hooks/useSolanaData';
import { Block } from '../types/solana';

interface BlockCardProps {
  block: Block;
  onClick?: (block: Block) => void;
}

const BlockCard: React.FC<BlockCardProps> = ({ block, onClick }) => {
  return (
    <div 
      className="card-base card-interactive p-4 cursor-pointer hover:bg-primary/5 transition-all border-l-4 border-l-primary/30"
      onClick={() => onClick?.(block)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Hash className="w-4 h-4 text-primary" />
          <span className="font-mono font-bold text-primary">#{formatNumber(block.slot)}</span>
        </div>
        <span className="text-xs text-muted flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {formatTimeAgo(block.blockTime)}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <FileText className="w-3 h-3 text-muted" />
            <span className="text-sm text">{block.transactions.length} txns</span>
          </div>
          <div className="text-xs text-muted">
            Height: {block.blockHeight}
          </div>
        </div>
        <div className="text-xs text-muted font-mono">
          {block.blockhash.slice(0, 8)}...
        </div>
      </div>
    </div>
  );
};

export default BlockCard; 