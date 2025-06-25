import React from 'react';

const Footer: React.FC = () => (
  <footer className="bg-surface/80 border-t border-border/50">
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/images/logo.png" alt="Gorbagana" className="w-6 h-6 rounded" />
            <span className="font-semibold text">Gorbagana</span>
          </div>
          <p className="text-muted text-sm leading-relaxed">
            Solana Layer 2 blockchain explorer. Explore blocks, transactions, accounts and more.
          </p>
        </div>
        
        <div>
          <h4 className="text font-medium mb-3">Network</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-muted hover:text-primary transition-colors">Gorbchain L2</a></li>
            <li><a href="#" className="text-muted hover:text-primary transition-colors">RPC Endpoint</a></li>
            <li><a href="#" className="text-muted hover:text-primary transition-colors">Network Status</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text font-medium mb-3">Developers</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-muted hover:text-primary transition-colors">API Docs</a></li>
            <li><a href="#" className="text-muted hover:text-primary transition-colors">GitHub</a></li>
            <li><a href="#" className="text-muted hover:text-primary transition-colors">SDK</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text font-medium mb-3">Community</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-muted hover:text-primary transition-colors">Discord</a></li>
            <li><a href="#" className="text-muted hover:text-primary transition-colors">Twitter</a></li>
            <li><a href="#" className="text-muted hover:text-primary transition-colors">Telegram</a></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-border/50 mt-8 pt-6 text-center">
        <p className="text-sm text-muted">
          © 2025 Gorbchain L2 Explorer. Built for the Solana ecosystem.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer; 