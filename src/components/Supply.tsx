import React from 'react';
import { Database, AlertCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useClusterStats, useInflationGovernor, useInflationRate, useTokenSupply, formatNumber } from '../hooks/useSolanaData';

const Supply: React.FC = () => {
  const { stats, loading, error, refetch } = useClusterStats();
  const { governor } = useInflationGovernor();
  const { rate } = useInflationRate();

  return (
    <div className="dashboard-layout animate-fade-in">
      <div className="section-container">
        <div>
          <h1 className="text-3xl font-bold text">Supply</h1>
          <p className="text-muted mt-1">Current circulating and total supply (on-chain only)</p>
        </div>
      </div>
      {loading ? (
        <div className="loading-container">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          Loading supply data...
        </div>
      ) : error ? (
        <div className="section-container">
          <Card className="glass-effect border-border">
            <CardContent className="py-8 text-center">
              <AlertCircle className="w-12 h-12 text-warning mx-auto mb-3" />
              <p className="text-warning">Failed to load supply: {error}</p>
            </CardContent>
          </Card>
        </div>
      ) : stats ? (
        <div className="section-container">
          <Card className="glass-effect border-border">
          <CardHeader>
              <CardTitle className="text">Supply Overview</CardTitle>
              <CardDescription>Live on-chain supply stats</CardDescription>
          </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <span className="text-muted">Circulating Supply</span>
                  <h2 className="text-2xl font-bold text">{formatNumber(stats.circulatingSupply)}</h2>
                </div>
                <div>
                  <span className="text-muted">Total Supply</span>
                  <h2 className="text-2xl font-bold text">{formatNumber(stats.totalSupply)}</h2>
                </div>
                <div>
                  <span className="text-muted">Inflation Rate</span>
                  <h2 className="text-2xl font-bold text">{rate && rate.total ? `${rate.total.toFixed(2)}%` : 'N/A'}</h2>
                </div>
                <div>
                  <span className="text-muted">Foundation Share</span>
                  <h2 className="text-2xl font-bold text">{governor && governor.foundation ? `${governor.foundation.toFixed(2)}%` : 'N/A'}</h2>
                </div>
              </div>
          </CardContent>
        </Card>
      </div>
      ) : (
        <div className="text-center py-8">
          <Database className="w-12 h-12 text-muted mx-auto mb-3" />
          <p className="text-muted">No supply data found</p>
            </div>
      )}
    </div>
  );
};

export default Supply;