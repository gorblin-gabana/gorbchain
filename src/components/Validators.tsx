import React, { useState } from 'react';
import { ShieldCheck, Database, AlertCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useValidators, formatNumber, formatAddress } from '../hooks/useSolanaData';

interface ValidatorsProps {
  onValidatorSelect?: (identity: string) => void;
}

const Validators: React.FC<ValidatorsProps> = ({ onValidatorSelect }) => {
  const [selectedIdentity, setSelectedIdentity] = useState<string | null>(null);
  const { validators, loading, error, refetch } = useValidators();

  const handleValidatorClick = (identity: string) => {
    setSelectedIdentity(identity);
    if (onValidatorSelect) {
      onValidatorSelect(identity);
    }
  };

  const selectedValidator = selectedIdentity ? validators.find(v => v.identity === selectedIdentity) : null;

  return (
    <div className="dashboard-layout animate-fade-in">
      {/* Header */}
      <div className="section-container">
        <div>
          <h1 className="text-3xl font-bold text">Validators</h1>
          <p className="text-muted mt-1">Browse all validators on the Solana network (on-chain only)</p>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          Loading validators...
              </div>
      ) : error ? (
        <div className="section-container">
        <Card className="glass-effect border-border">
            <CardContent className="py-8 text-center">
              <AlertCircle className="w-12 h-12 text-warning mx-auto mb-3" />
              <p className="text-warning">Failed to load validators: {error}</p>
          </CardContent>
        </Card>
      </div>
      ) : (
        <div className="explorer-layout">
          {/* Validator List */}
          <div>
          <Card className="glass-effect border-border">
            <CardHeader>
              <CardTitle className="text flex items-center">
                  <ShieldCheck className="w-5 h-5 mr-2 text-primary" />
                  Validators
              </CardTitle>
                <CardDescription>All active validators on the network</CardDescription>
            </CardHeader>
              <CardContent>
                <div className="scroll-container space-y-sm">
                  {validators.map((v) => (
                <div
                      key={v.identity}
                      onClick={() => handleValidatorClick(v.identity)}
                      className={`card-base card-interactive ${
                        selectedIdentity === v.identity 
                      ? 'border-primary bg-primary/5' 
                          : ''
                  }`}
                >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                        <div className="flex flex-col">
                          <span className="font-mono text">{formatAddress(v.identity)}</span>
                          <span className="text-xs text-muted">Vote: {formatAddress(v.voteAccount)}</span>
                      </div>
                        <div className="flex flex-col sm:text-right">
                          <span className="text-sm text-muted">Commission</span>
                          <span className="text-sm font-medium text">{v.commission}%</span>
                      </div>
                      </div>
                    </div>
                  ))}
                  {validators.length === 0 && (
                    <div className="text-center py-8">
                      <Database className="w-12 h-12 text-muted mx-auto mb-3" />
                      <p className="text-muted">No validators found</p>
                    </div>
                  )}
                </div>
            </CardContent>
          </Card>
        </div>

        {/* Validator Details */}
          <div>
            <Card className="glass-effect border-border lg:sticky lg:top-24">
            <CardHeader>
              <CardTitle className="text">Validator Details</CardTitle>
              <CardDescription>
                  {selectedIdentity ? `Details for validator ${formatAddress(selectedIdentity)}` : 'Select a validator to view details'}
              </CardDescription>
            </CardHeader>
            <CardContent>
                {selectedValidator ? (
                  <div className="space-y-lg">
                    <div className="flex items-center gap-md">
                      <ShieldCheck className="w-8 h-8 text-primary" />
                      <div>
                        <h3 className="text-lg font-semibold text">{formatAddress(selectedValidator.identity)}</h3>
                        <p className="text-muted">Vote: {formatAddress(selectedValidator.voteAccount)}</p>
                  </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm text-muted">Commission</span>
                      <p className="font-medium text">{selectedValidator.commission}%</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm text-muted">Activated Stake</span>
                      <p className="font-medium text">{formatNumber(selectedValidator.activatedStake)}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm text-muted">Last Vote</span>
                      <p className="font-medium text">{selectedValidator.lastVote}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm text-muted">Root Slot</span>
                      <p className="font-medium text">{selectedValidator.rootSlot}</p>
                    </div>
                  <div className="space-y-1">
                    <span className="text-sm text-muted">Credits</span>
                      <p className="font-medium text">{selectedValidator.credits}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm text-muted">Epoch Credits</span>
                      <p className="font-medium text">{selectedValidator.epochCredits.length}</p>
                    </div>
                    {selectedValidator.version && (
                      <div className="space-y-1">
                        <span className="text-sm text-muted">Version</span>
                        <p className="font-medium text">{selectedValidator.version}</p>
                      </div>
                    )}
                </div>
              ) : (
                <div className="text-center py-8">
                    <Database className="w-12 h-12 text-muted mx-auto mb-3" />
                    <p className="text-muted">Select a validator to view details</p>
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

export default Validators;