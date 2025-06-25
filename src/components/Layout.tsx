import React, { useState, useEffect } from 'react';
import { Search, Sun, Moon, Home, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Ticker from './Ticker';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string, props?: any) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onPageChange }) => {
  const [isDark, setIsDark] = useState(() => {
    // Initialize theme based on localStorage or system preference
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Set initial theme on mount
  useEffect(() => {
    const theme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', theme);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    const theme = newTheme ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', theme);
  };

  // Smart search function to determine input type and route accordingly
  const handleSearch = (query: string) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    // Close search modal
    setIsSearchOpen(false);
    setSearchQuery('');

    // Determine input type and route accordingly
    if (trimmedQuery.length === 44 && /^[A-Za-z0-9]+$/.test(trimmedQuery)) {
      // Likely a Solana public key (44 characters, alphanumeric)
      onPageChange('accounts', { searchQuery: trimmedQuery });
    } else if (trimmedQuery.length === 88 && /^[A-Za-z0-9]+$/.test(trimmedQuery)) {
      // Likely a transaction signature (88 characters, alphanumeric)
      onPageChange('transactions', { searchQuery: trimmedQuery });
    } else if (/^\d+$/.test(trimmedQuery)) {
      // Numeric - likely a block number/slot
      onPageChange('blocks', { searchQuery: trimmedQuery });
    } else if (trimmedQuery.length === 64 && /^[A-Za-z0-9]+$/.test(trimmedQuery)) {
      // Likely a blockhash (64 characters, alphanumeric)
      onPageChange('blocks', { searchQuery: trimmedQuery });
    } else {
      // Default to accounts search for any other input
      onPageChange('accounts', { searchQuery: trimmedQuery });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  // Simplified nav items - only essential pages
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'tokens', label: 'Tokens', icon: Coins },
  ];

  return (
    <div className="app-container">
      {/* Live Ticker */}
      <Ticker />

      {/* Header */}
      <header className="header-container glass-effect">
        <div className="header-content">
          {/* First Row - Logo and Navigation */}
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <img 
                src="/images/logo.png" 
                alt="Gorbagana" 
                className="w-8 h-8 rounded-lg shadow-md"
              />
              <span className="text-lg font-bold text hidden sm:block">Gorbagana Explorer</span>
              <span className="text-base font-bold text sm:hidden">Gorbagana</span>
            </div>

            {/* Desktop Search - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-xs flex-1 mx-8 max-w-md">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="w-full justify-start text-muted bg-surface/50 border-border hover:bg-surface hover:border-primary/30 h-10"
              >
                <Search className="w-4 h-4 mr-2" />
                Search blocks, transactions, accounts...
              </Button>
            </div>

            {/* Right Side - Navigation and Controls */}
            <div className="flex items-center gap-2">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-2">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onPageChange(item.id)}
                    className={currentPage === item.id ? 
                      "bg-primary text-surface hover:bg-primary-hover" : 
                      "text-muted hover:text-text hover:bg-surface"
                    }
                  >
                    <item.icon className="w-4 h-4 md:mr-2" />
                    <span className="hidden lg:inline">{item.label}</span>
                  </Button>
                ))}
              </nav>

              {/* Mobile Navigation - Icon Only */}
              <nav className="md:hidden flex items-center gap-1">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onPageChange(item.id)}
                    className={`p-2 ${currentPage === item.id ? 
                      "bg-primary text-surface hover:bg-primary-hover" : 
                      "text-muted hover:text-text hover:bg-surface"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                  </Button>
                ))}
              </nav>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="text-muted hover:text hover:bg-surface/50 p-2"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              
              {/* Mobile Search Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden text-muted hover:text hover:bg-surface/50 p-2"
              >
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Second Row - Mobile Search (Full Width) */}
          <div className="md:hidden mt-3 w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSearchOpen(true)}
              className="w-full justify-start text-muted bg-surface/50 border-border hover:bg-surface hover:border-primary/30 h-10"
            >
              <Search className="w-4 h-4 mr-2" />
              Search blocks, transactions, accounts...
            </Button>
          </div>
        </div>

        {/* Mobile Menu Overlay - Removed since we now show navigation inline */}
      </header>

      {/* Search Modal */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search Gorbchain
            </DialogTitle>
            <DialogDescription>
              Search for blocks, transactions, accounts, and tokens on the Gorbchain network.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="Enter block number, transaction hash, or account address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-modern"
                autoFocus
              />
              <p className="text-xs text-muted">
                Supports: Block numbers, transaction signatures, account addresses, block hashes
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                type="submit" 
                className="btn-modern flex-1"
                disabled={!searchQuery.trim()}
              >
                Search
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsSearchOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <main className="main-container">
        <div className="content-wrapper">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Layout;