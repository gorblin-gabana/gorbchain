import React from 'react';
import { Users, Zap, DollarSign, TrendingUp, Clock, Network, AlertCircle, Loader2, Database, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { StatCard, LoadingSpinner } from './common';
import BlockCard from './BlockCard';
import TransactionCard from './TransactionCard';
import { useClusterStats, useValidators, useInflationGovernor, useInflationRate, useBlocks, useTransactions, formatNumber } from '../hooks/useSolanaData';

const Dashboard: React.FC = () => {
  const { stats, loading: statsLoading, error: statsError } = useClusterStats();
  const { blocks, loading: blocksLoading, error: blocksError } = useBlocks(10);
  const { transactions, loading: transactionsLoading, error: transactionsError } = useTransactions(10);
  const { validators, loading: validatorsLoading, error: validatorsError } = useValidators();
  const { governor } = useInflationGovernor();
  const { rate } = useInflationRate();

  // Show loading spinner if any critical data is loading
  if (statsLoading) {
    return (
      <div className="loading-container">
        <LoadingSpinner />
      </div>
    );
  }

  // Show error if stats failed to load
  if (statsError || !stats) {
    return (
      <div className="dashboard-layout">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to connect to Gorbchain RPC: {statsError}. Please check if rpc.gorbchain.xyz is accessible.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="dashboard-layout animate-fade-in">
      {/* Statistics Grid */}
      <div className="section-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <StatCard
            title="Current Slot"
            value={formatNumber(stats.slot)}
            description="Latest confirmed slot"
            icon={Clock}
            color="primary"
          />
          <StatCard
            title="Network TPS"
            value={formatNumber(stats.tps)}
            description={`Avg: ${formatNumber(stats.averageTps)} TPS`}
            icon={Zap}
            color="success"
          />
          <StatCard
            title="Total Accounts"
            value={formatNumber(stats.totalAccounts)}
            description="On-chain accounts"
            icon={Users}
            color="warning"
          />
          <StatCard
            title="Circulating Supply"
            value={`${formatNumber(Math.floor(stats.circulatingSupply / 1000000))}M`}
            description="SOL tokens"
            icon={DollarSign}
            color="success"
          />
        </div>
        {/* Additional Stats */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
          <StatCard
            title="Validator Fork"
            value={validators.length > 0 ? validators[0].identity.slice(0, 8) + '...' : 'Loading...'}
            description="Our featured validator"
            icon={Users}
            color="primary"
            className="border-2 border-primary/30 bg-primary/5 shadow-lg"
          />
          <StatCard
            title="Total Validators"
            value={formatNumber(validators.length)}
            description="Active network validators"
            icon={Database}
            color="success"
          />
          <StatCard
            title="Epoch Progress"
            value={`${Math.round(stats.epochProgress * 100)}%`}
            description={`Epoch ${stats.epoch}`}
            icon={Clock}
            color="primary"
          />
          <StatCard
            title="Network Health"
            value={statsError ? 'Disconnected' : 'Healthy'}
            description={statsError ? 'RPC connection failed' : 'All systems operational'}
            icon={Network}
            color={statsError ? 'error' : 'success'}
          />
        </div>
      </div>

      {/* Latest Blocks and Transactions - 50/50 Split */}
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Latest Blocks */}
          <Card className="glass-effect border-border bg-surface">
            <CardHeader>
              <CardTitle className="text flex items-center">
                <Database className="w-5 h-5 mr-2 text-primary" />
                Latest Blocks
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {blocksLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Loading blocks...
                  </div>
                ) : blocksError ? (
                  <div className="p-4">
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>Failed to load blocks: {blocksError}</AlertDescription>
                    </Alert>
                  </div>
                ) : blocks.length === 0 ? (
                  <div className="text-center py-8 text-muted">No blocks found</div>
                ) : (
                  <div className="divide-y divide-border">
                    {blocks.map((block) => (
                      <BlockCard 
                        key={block.slot} 
                        block={block}
                        onClick={(block) => console.log('Block clicked:', block.slot)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Latest Transactions */}
          <Card className="glass-effect border-border bg-surface">
            <CardHeader>
              <CardTitle className="text flex items-center">
                <Activity className="w-5 h-5 mr-2 text-success" />
                Latest Transactions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {transactionsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Loading transactions...
                  </div>
                ) : transactionsError ? (
                  <div className="p-4">
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>Failed to load transactions: {transactionsError}</AlertDescription>
                    </Alert>
                  </div>
                ) : transactions.length === 0 ? (
                  <div className="text-center py-8 text-muted">No transactions found</div>
                ) : (
                  <div className="divide-y divide-border">
                    {transactions.map((transaction) => (
                      <TransactionCard 
                        key={transaction.signature} 
                        transaction={transaction}
                        onClick={(tx) => console.log('Transaction clicked:', tx.signature)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;