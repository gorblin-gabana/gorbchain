import React from 'react';
import { TrendingUp, Users, Activity, Zap, Clock, Database } from 'lucide-react';
import { useClusterStats, formatNumber } from '../hooks/useSolanaData';

const Ticker: React.FC = () => {
  const { stats } = useClusterStats();

  const tickerItems = [
    {
      icon: Clock,
      label: 'Current Slot',
      value: stats ? formatNumber(stats.slot) : '22,531',
      color: 'text-primary'
    },
    {
      icon: Database,
      label: 'Total Accounts',
      value: stats ? formatNumber(stats.totalAccounts) : 'Loading...',
      color: 'text-success'
    },
    {
      icon: Zap,
      label: 'Current TPS',
      value: stats ? formatNumber(stats.tps) : '0',
      color: 'text-warning'
    },
    {
      icon: Activity,
      label: 'Epoch',
      value: stats ? formatNumber(stats.epoch) : '0',
      color: 'text-error'
    },
    {
      icon: TrendingUp,
      label: 'Epoch Progress',
      value: stats ? `${Math.round(stats.epochProgress * 100)}%` : '5%',
      color: 'text-primary'
    },
    {
      icon: Users,
      label: 'Circulating Supply',
      value: stats ? `${formatNumber(Math.floor(stats.circulatingSupply / 1000000))}M SOL` : '184M SOL',
      color: 'text-success'
    }
  ];

  return (
    <div className="bg-surface/80 border-b border-border overflow-hidden">
      <div className="animate-marquee flex items-center space-x-8 py-2">
        {/* Repeat items to create seamless scroll */}
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
          <div key={index} className="flex items-center space-x-2 text-sm whitespace-nowrap">
              <item.icon className={`w-4 h-4 ${item.color}`} />
            <span className="text-muted">{item.label}:</span>
            <span className={`font-semibold ${item.color}`}>{item.value}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Ticker;