import React, { useState, useEffect } from 'react';
import { Coins, TrendingUp, Users, DollarSign, AlertCircle, Loader2, Database } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useTokens, useTokenSupply, formatNumber, formatAddress } from '../hooks/useSolanaData';

interface TokensProps {
  onTokenSelect?: (mint: string) => void;
  searchQuery?: string;
}

const Tokens: React.FC<TokensProps> = ({ onTokenSelect, searchQuery: initialSearchQuery }) => {
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const { tokens, loading, error } = useTokens();
  const { supply: selectedTokenSupply, loading: supplyLoading } = useTokenSupply(selectedToken);

  // Handle search query prop
  useEffect(() => {
    if (initialSearchQuery) {
      // If it's a token mint address, try to find the token
      if (initialSearchQuery.length === 44 && /^[A-Za-z0-9]+$/.test(initialSearchQuery)) {
        const foundToken = tokens.find(token => token.mint === initialSearchQuery);
        if (foundToken) {
          setSelectedToken(initialSearchQuery);
        }
      }
    }
  }, [initialSearchQuery, tokens]);

  const handleTokenClick = (mint: string) => {
    setSelectedToken(mint);
    if (onTokenSelect) {
      onTokenSelect(mint);
    }
  };

  const selectedTokenData = selectedToken ? tokens.find(token => token.mint === selectedToken) : null;

  const getTokenLogo = (token: typeof tokens[0]) => {
    if (token.logoURI) {
      return (
        <img 
          src={token.logoURI} 
          alt={token.symbol}
          className="w-8 h-8 rounded-full"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      );
    }
    return (
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
        <Coins className="w-4 h-4 text-primary" />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="dashboard-layout animate-fade-in">
        <div className="section-container">
          <div>
            <h1 className="text-3xl font-bold text">
              {initialSearchQuery ? `Token: ${formatAddress(initialSearchQuery, 8)}` : 'Tokens'}
            </h1>
            <p className="text-muted mt-1">
              {initialSearchQuery ? 'Token details and information' : 'Explore SPL tokens on the Solana network'}
            </p>
          </div>
        </div>
        <div className="loading-container">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          Loading tokens...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-layout animate-fade-in">
        <div className="section-container">
          <div>
            <h1 className="text-3xl font-bold text">
              {initialSearchQuery ? `Token: ${formatAddress(initialSearchQuery, 8)}` : 'Tokens'}
            </h1>
            <p className="text-muted mt-1">
              {initialSearchQuery ? 'Token details and information' : 'Explore SPL tokens on the Solana network'}
            </p>
          </div>
        </div>
        <div className="section-container">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Failed to load tokens: {error}</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-layout animate-fade-in">
      {/* Header */}
      <div className="section-container">
        <div>
          <h1 className="text-3xl font-bold text">
            {initialSearchQuery ? `Token: ${formatAddress(initialSearchQuery, 8)}` : 'Tokens'}
          </h1>
          <p className="text-muted mt-1">
            {initialSearchQuery ? 'Token details and information' : 'Explore SPL tokens on the Solana network'}
          </p>
        </div>
      </div>

      {/* Token Statistics */}
      <div className="section-container">
        <div className="grid-container grid-4">
        <Card className="glass-effect border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted">Total Tokens</p>
                <p className="text-2xl font-bold text">{formatNumber(tokens.length)}</p>
              </div>
              <Coins className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-effect border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted">Total Holders</p>
                <p className="text-2xl font-bold text">
                    {formatNumber(tokens.reduce((sum, token) => sum + (token.holders || 0), 0))}
                </p>
              </div>
              <Users className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted">Largest Supply</p>
                <p className="text-2xl font-bold text">
                    {tokens.length > 0 ? formatNumber(Math.max(...tokens.map(t => t.supply || 0))) : '0'}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                  <p className="text-sm text-muted">Registry Status</p>
                  <p className="text-lg font-bold text">Limited</p>
              </div>
                <DollarSign className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        </div>
      </div>

      {tokens.length === 0 ? (
        <div className="section-container">
          <Card className="glass-effect border-border">
            <CardContent className="py-8 text-center">
              <Coins className="w-12 h-12 text-muted mx-auto mb-3" />
              <p className="text-muted">No tokens found. Token registry not yet available on Gorbchain L2.</p>
              <p className="text-sm text-muted mt-2">
                This feature will be expanded as the network grows and more SPL tokens are deployed.
              </p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="explorer-layout">
          {/* Token List */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            <div className="lg:col-span-2">
          <Card className="glass-effect border-border">
            <CardHeader>
              <CardTitle className="text flex items-center">
                <Coins className="w-5 h-5 mr-2 text-primary" />
                    Tokens
              </CardTitle>
                  <CardDescription>All tokens on the network (on-chain only)</CardDescription>
            </CardHeader>
                <CardContent>
                  <div className="scroll-container space-y-sm">
              {tokens.map((token) => (
                <div
                  key={token.mint}
                  onClick={() => handleTokenClick(token.mint)}
                        className={`card-base card-interactive ${
                    selectedToken === token.mint 
                      ? 'border-primary bg-primary/5' 
                            : ''
                  }`}
                >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <div className="flex flex-col">
                            <span className="font-mono text">{formatAddress(token.mint)}</span>
                            <span className="text-xs text-muted">Symbol: {token.symbol}</span>
                          </div>
                          <div className="flex flex-col sm:text-right">
                            <span className="text-sm text-muted">Supply</span>
                            <span className="text-sm font-medium text">{formatNumber(token.supply)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {tokens.length === 0 && (
                      <div className="text-center py-8">
                        <Database className="w-12 h-12 text-muted mx-auto mb-3" />
                        <p className="text-muted">No tokens found</p>
                      </div>
                    )}
                  </div>
            </CardContent>
          </Card>
        </div>

        {/* Token Details */}
        <div className="lg:col-span-1">
              <Card className="glass-effect border-border lg:sticky lg:top-24">
            <CardHeader>
              <CardTitle className="text">Token Details</CardTitle>
              <CardDescription>
                    {selectedToken ? `Details for token ${formatAddress(selectedToken)}` : 'Select a token to view details'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedTokenData ? (
                    <div className="space-y-lg">
                      <div className="flex items-center gap-md">
                        <Coins className="w-8 h-8 text-primary" />
                    <div>
                          <h3 className="text-lg font-semibold text">{formatAddress(selectedTokenData.mint)}</h3>
                          <p className="text-muted">Symbol: {selectedTokenData.symbol}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                        <span className="text-sm text-muted">Name</span>
                        <p className="font-medium text">{selectedTokenData.name}</p>
                  </div>
                    <div className="space-y-1">
                      <span className="text-sm text-muted">Decimals</span>
                      <p className="font-medium text">{selectedTokenData.decimals}</p>
                    </div>
                    <div className="space-y-1">
                        <span className="text-sm text-muted">Supply (Live)</span>
                        <p className="font-medium text">{supplyLoading ? 'Loading...' : (selectedTokenSupply !== null ? formatNumber(selectedTokenSupply) : 'N/A')}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm text-muted">Holders</span>
                        <p className="font-medium text">{formatNumber(selectedTokenData.holders)}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Database className="w-12 h-12 text-muted mx-auto mb-3" />
                      <p className="text-muted">Select a token to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
        </div>
      )}
    </div>
  );
};

export default Tokens;