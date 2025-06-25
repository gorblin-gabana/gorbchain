import React from 'react';
import { ArrowRight, Network, Zap, Shield, Code, Rocket, Users, Lock, ChevronRight, Github, Twitter, Globe, Star, Target, TrendingUp, Activity, Clock, DollarSign, Cpu, Database, Vote, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useClusterStats, formatNumber } from '../hooks/useSolanaData';
import Footer from './Footer';

interface LandingProps {
  onExploreClick: () => void;
}

const Landing: React.FC<LandingProps> = ({ onExploreClick }) => {
  const { stats } = useClusterStats();

  return (
    <div className="min-h-screen bg-surface text overflow-hidden">
      {/* Hero Section */}
      <div className="main-container">
        <div className="content-wrapper py-8 md:py-10">
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
              {/* Left Section */}
              <div className="space-y-4 md:space-y-6 text-center md:text-left">
                  <div className="flex items-center md:items-start sm:justify-center md:justify-start gap-3">
                    <img 
                      src="/images/logo.png" 
                      alt="Gorbagana" 
                      className="w-10 h-10 md:w-12 md:h-12 rounded-lg shadow-lg"
                    />
                    <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30 text-xs md:text-sm font-medium px-2 md:px-3 py-1">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></div>
                      Gorbagana L2 • Mainnet Live
                    </Badge>
                  </div>
                
                <div className="space-y-3 md:space-y-4">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text leading-tight">
                    <span className="block">Build Your Meme</span>
                    <span className="block text-transparent bg-gradient-to-r from-primary to-success bg-clip-text">
                      Empire
                    </span>
                    <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-primary">
                      Away From The Chaos
                    </span>
                  </h1>
                  
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    No more MEV bots stealing your gains. No more frontrunning destroying your community. 
                    <span className="text-primary font-semibold"> Gorbagana protects your empire</span> while you focus on what matters - 
                    pure community growth and viral success.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start max-w-lg mx-auto lg:max-w-none">
                  <Button 
                    onClick={onExploreClick}
                    className="bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-surface font-bold px-6 md:px-8 py-3 md:py-4 h-12 md:h-14 text-base md:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Rocket className="mr-2 md:mr-3 w-4 md:w-5 h-4 md:h-5" />
                    Launch Community
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-2 border-primary/50 hover:border-primary bg-primary/10 hover:bg-primary/20 text-primary font-semibold px-6 md:px-8 py-3 md:py-4 h-12 md:h-14 text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Network className="mr-2 md:mr-3 w-4 md:w-5 h-4 md:h-5" />
                    Bridge Assets
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-3 md:gap-4 lg:gap-8 pt-3 md:pt-4 max-w-md mx-auto lg:max-w-none">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-primary mb-1">
                      {stats ? formatNumber(stats.slot) : '569'}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground font-medium">Current Slot</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-success mb-1">
                      {stats ? formatNumber(stats.tps) : '2'}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground font-medium">Network TPS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-warning mb-1">
                      10K+
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground font-medium">Communities</div>
                  </div>
                </div>
              </div>

              {/* Right Section - Enhanced Animation */}
              <div className="relative flex justify-center mt-6 lg:mt-0">
                <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl">
                  <div className="relative h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[450px]">
                    {/* Solana Mainnet - Top */}
                    <div className="absolute top-2 md:top-4 left-1/2 transform -translate-x-1/2 text-center">
                      <div className="flex gap-4 md:gap-6 lg:gap-8 justify-center">
                        <div className="bg-purple-500/20 backdrop-blur-sm px-3 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4 rounded-lg md:rounded-xl text-xs md:text-sm lg:text-base border border-purple-400/30 font-semibold flex items-center gap-2 md:gap-3 lg:gap-4 shadow-lg">
                          <img src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png" alt="SOL" className="w-4 md:w-6 lg:w-8 h-4 md:h-6 lg:h-8" />
                          SOL
                        </div>
                        <div className="bg-blue-500/20 backdrop-blur-sm px-3 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4 rounded-lg md:rounded-xl text-xs md:text-sm lg:text-base border border-blue-400/30 font-semibold flex items-center gap-2 md:gap-3 lg:gap-4 shadow-lg">
                          <img src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png" alt="USDC" className="w-4 md:w-6 lg:w-8 h-4 md:h-6 lg:h-8" />
                          USDC
                        </div>
                      </div>
                    </div>

                    {/* Gorbagana L2 - Center */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20">
                      <div className="bg-gradient-to-br from-surface via-surface/95 to-surface/90 backdrop-blur-lg rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-6 border-2 border-primary/60 shadow-2xl">
                        <div className="flex items-center justify-center gap-2 md:gap-3 lg:gap-4 mb-2 md:mb-3 lg:mb-4">
                          <div className="w-8 md:w-12 lg:w-16 h-8 md:h-12 lg:h-16 rounded-lg bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center shadow-xl">
                            <img src="/images/logo.png" alt="Gorbagana" className="w-6 md:w-8 lg:w-12 h-6 md:h-8 lg:h-12 rounded" />
                          </div>
                        </div>
                        <div className="flex gap-3 md:gap-4 lg:gap-6 justify-center">
                          <div className="bg-primary/20 backdrop-blur-sm px-3 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4 rounded-lg md:rounded-xl text-xs md:text-sm lg:text-base font-bold border border-primary/40 text-primary shadow-lg">$GOR</div>
                          <div className="bg-success/20 backdrop-blur-sm px-3 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4 rounded-lg md:rounded-xl text-xs md:text-sm lg:text-base font-bold border border-success/40 text-success shadow-lg">Memes</div>
                        </div>
                      </div>
                    </div>

                    {/* DEXs - Bottom */}
                    <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 text-center">
                      <div className="flex gap-4 md:gap-6 lg:gap-8 justify-center">
                        <div className="bg-orange-500/20 backdrop-blur-sm px-3 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4 rounded-lg md:rounded-xl text-xs md:text-sm lg:text-base border border-orange-400/30 font-semibold flex items-center gap-2 md:gap-3 lg:gap-4 shadow-lg">
                          <img src="https://raydium.io/logo.png" alt="Raydium" className="w-4 md:w-6 lg:w-8 h-4 md:h-6 lg:h-8 rounded" />
                          Raydium
                        </div>
                        <div className="bg-cyan-500/20 backdrop-blur-sm px-3 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4 rounded-lg md:rounded-xl text-xs md:text-sm lg:text-base border border-cyan-400/30 font-semibold flex items-center gap-2 md:gap-3 lg:gap-4 shadow-lg">
                          <img src="https://jup.ag/svg/jupiter-logo.svg" alt="Jupiter" className="w-4 md:w-6 lg:w-8 h-4 md:h-6 lg:h-8" />
                          Jupiter
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Flow Animation */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500" style={{ zIndex: 10 }}>
                      {/* Glow effects */}
                      <defs>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                          <feMerge> 
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                        
                        {/* Flow gradients */}
                        <linearGradient id="solFlow" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8"/>
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4"/>
                        </linearGradient>
                        
                        <linearGradient id="usdcFlow" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
                          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4"/>
                        </linearGradient>
                      </defs>
                      
                      {/* Enhanced connection paths */}
                      <path d="M 200 80 Q 140 160 200 240 Q 240 290 250 240" stroke="url(#solFlow)" strokeWidth="6" fill="none" strokeDasharray="12,6" opacity="0.9" filter="url(#glow)" />
                      <path d="M 300 80 Q 360 160 300 240 Q 260 290 250 240" stroke="url(#usdcFlow)" strokeWidth="6" fill="none" strokeDasharray="12,6" opacity="0.9" filter="url(#glow)" />
                      <path d="M 250 240 Q 190 340 190 400" stroke="#06d6a0" strokeWidth="6" fill="none" strokeDasharray="12,6" opacity="0.9" filter="url(#glow)" />
                      <path d="M 250 240 Q 310 340 310 400" stroke="#f59e0b" strokeWidth="6" fill="none" strokeDasharray="12,6" opacity="0.9" filter="url(#glow)" />
                      
                      {/* Animated flow particles */}
                      <circle r="10" fill="#8b5cf6" opacity="1" filter="url(#glow)">
                        <animateMotion dur="6s" repeatCount="indefinite">
                          <path d="M 200 80 Q 140 160 200 240 Q 240 290 250 240"/>
                        </animateMotion>
                        <animate attributeName="opacity" values="0;1;1;0" dur="6s" repeatCount="indefinite"/>
                      </circle>
                      
                      <circle r="10" fill="#3b82f6" opacity="1" filter="url(#glow)">
                        <animateMotion dur="6s" repeatCount="indefinite" begin="2s">
                          <path d="M 300 80 Q 360 160 300 240 Q 260 290 250 240"/>
                        </animateMotion>
                        <animate attributeName="opacity" values="0;1;1;0" dur="6s" repeatCount="indefinite" begin="2s"/>
                      </circle>
                      
                      <circle r="8" fill="#06d6a0" opacity="1" filter="url(#glow)">
                        <animateMotion dur="5s" repeatCount="indefinite" begin="4s">
                          <path d="M 250 240 Q 190 340 190 400"/>
                        </animateMotion>
                        <animate attributeName="opacity" values="0;1;1;0" dur="5s" repeatCount="indefinite" begin="4s"/>
                      </circle>
                      
                      <circle r="8" fill="#f59e0b" opacity="1" filter="url(#glow)">
                        <animateMotion dur="5s" repeatCount="indefinite" begin="5s">
                          <path d="M 250 240 Q 310 340 310 400"/>
                        </animateMotion>
                        <animate attributeName="opacity" values="0;1;1;0" dur="5s" repeatCount="indefinite" begin="5s"/>
                      </circle>
                      
                      {/* Reverse flow particles */}
                      <circle r="6" fill="#22c55e" opacity="0.9" filter="url(#glow)">
                        <animateMotion dur="7s" repeatCount="indefinite" begin="1s">
                          <path d="M 190 400 Q 190 340 250 240 Q 260 160 300 80"/>
                        </animateMotion>
                        <animate attributeName="opacity" values="0;1;1;0" dur="7s" repeatCount="indefinite" begin="1s"/>
                      </circle>
                      
                      <circle r="6" fill="#ef4444" opacity="0.9" filter="url(#glow)">
                        <animateMotion dur="7s" repeatCount="indefinite" begin="3.5s">
                          <path d="M 310 400 Q 310 340 250 240 Q 240 160 200 80"/>
                        </animateMotion>
                        <animate attributeName="opacity" values="0;1;1;0" dur="7s" repeatCount="indefinite" begin="3.5s"/>
                      </circle>
                      
                      {/* Enhanced center pulse */}
                      <circle cx="250" cy="240" r="12" fill="none" stroke="#22c55e" strokeWidth="4" opacity="0.6" filter="url(#glow)">
                        <animate attributeName="r" values="12;20;12" dur="3s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite"/>
                      </circle>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Gorbagana Section - Cleaner Design */}
      <div className="bg-surface/20 py-4 md:py-6">
        <div className="main-container">
          <div className="content-wrapper">
            <div className="section-container">
              <div className="text-center mb-4 md:mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text mb-2">Why Meme Communities Choose Gorbagana</h2>
                <p className="text-sm sm:text-base md:text-lg text-muted max-w-2xl mx-auto px-4">
                  Escape the predators and build in peace. Your community deserves better than being someone's exit liquidity.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-surface/50 border-border">
                  <CardContent className="p-4 text-center">
                    <Shield className="w-10 h-10 text-success mx-auto mb-2" />
                    <h3 className="text-base font-semibold text mb-1">MEV Protection</h3>
                    <p className="text-sm text-muted leading-relaxed mb-2">
                      No more bots frontrunning your trades. Clean, fair transactions for everyone in your community.
                    </p>
                    <div className="text-xs text-success space-y-1">
                      <div>• Zero frontrunning attacks</div>
                      <div>• Fair transaction ordering</div>
                      <div>• Anti-sandwich protection</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-surface/50 border-border">
                  <CardContent className="p-4 text-center">
                    <Users className="w-10 h-10 text-primary mx-auto mb-2" />
                    <h3 className="text-base font-semibold text mb-1">Community Focus</h3>
                    <p className="text-sm text-muted leading-relaxed mb-2">
                      Build without distractions. Focus on viral growth with tools designed for genuine community building.
                    </p>
                    <div className="text-xs text-primary space-y-1">
                      <div>• Community-first design</div>
                      <div>• Built-in governance tools</div>
                      <div>• Viral growth mechanics</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-surface/50 border-border">
                  <CardContent className="p-4 text-center">
                    <Zap className="w-10 h-10 text-warning mx-auto mb-2" />
                    <h3 className="text-base font-semibold text mb-1">Lightning Speed</h3>
                    <p className="text-sm text-muted leading-relaxed mb-2">
                      Faster than mainnet, cheaper than mainnet, with sub-second finality and ultra-low fees.
                    </p>
                    <div className="text-xs text-warning space-y-1">
                      <div>• Sub-second finality</div>
                      <div>• Ultra-low transaction fees</div>
                      <div>• High throughput capacity</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Three Steps - Enhanced Design */}
      <div className="bg-surface/10 py-8 md:py-12">
        <div className="main-container">
          <div className="content-wrapper">
            <div className="section-container">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text mb-4">
                  Three Steps to <span className="text-primary">Meme Empire</span>
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
                  Launch, grow, graduate. With Gorbagana protecting every step of your journey to meme greatness.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                {/* Step 1 - Deploy & Launch */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-primary/20 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                  <Card className="relative bg-surface/90 border-primary/20 hover:border-primary/40 transition-all duration-300 h-full">
                    <CardContent className="p-6 md:p-8 text-center h-full flex flex-col">
                      <div className="relative mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-hover rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                          <Rocket className="w-10 h-10 text-surface" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-sm font-black text-surface">1</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold text mb-4">Deploy & Launch</h3>
                      <p className="text-sm md:text-base text-muted leading-relaxed mb-6 flex-grow">
                        Launch your token with zero MEV interference and minimal fees. Professional-grade deployment tools make it simple.
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-center gap-3 p-3 bg-primary/10 rounded-lg">
                          <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-sm font-medium text">5-minute deployment</span>
                        </div>
                        <div className="flex items-center justify-center gap-3 p-3 bg-success/10 rounded-lg">
                          <DollarSign className="w-5 h-5 text-success flex-shrink-0" />
                          <span className="text-sm font-medium text">Ultra-low costs</span>
                        </div>
                        <div className="flex items-center justify-center gap-3 p-3 bg-warning/10 rounded-lg">
                          <Shield className="w-5 h-5 text-warning flex-shrink-0" />
                          <span className="text-sm font-medium text">Built-in security</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Step 2 - Build Community */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-success/50 to-success/20 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                  <Card className="relative bg-surface/90 border-success/20 hover:border-success/40 transition-all duration-300 h-full">
                    <CardContent className="p-6 md:p-8 text-center h-full flex flex-col">
                      <div className="relative mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-success to-success/80 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                          <Users className="w-10 h-10 text-surface" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-sm font-black text-surface">2</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold text mb-4">Build Community</h3>
                      <p className="text-sm md:text-base text-muted leading-relaxed mb-6 flex-grow">
                        Grow your following with fair trading and governance tools designed for sustainable, organic growth.
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-center gap-3 p-3 bg-primary/10 rounded-lg">
                          <Vote className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-sm font-medium text">Governance integration</span>
                        </div>
                        <div className="flex items-center justify-center gap-3 p-3 bg-success/10 rounded-lg">
                          <TrendingUp className="w-5 h-5 text-success flex-shrink-0" />
                          <span className="text-sm font-medium text">Growth analytics</span>
                        </div>
                        <div className="flex items-center justify-center gap-3 p-3 bg-warning/10 rounded-lg">
                          <Target className="w-5 h-5 text-warning flex-shrink-0" />
                          <span className="text-sm font-medium text">Engagement rewards</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Step 3 - Graduate to Mainnet */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-warning/50 to-warning/20 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                  <Card className="relative bg-surface/90 border-warning/20 hover:border-warning/40 transition-all duration-300 h-full">
                    <CardContent className="p-6 md:p-8 text-center h-full flex flex-col">
                      <div className="relative mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-warning to-warning/80 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                          <Star className="w-10 h-10 text-surface" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-warning rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-sm font-black text-surface">3</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold text mb-4">Graduate to Mainnet</h3>
                      <p className="text-sm md:text-base text-muted leading-relaxed mb-6 flex-grow">
                        Bridge to Solana mainnet when ready. Seamless migration maintains all holder positions and community trust.
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-center gap-3 p-3 bg-primary/10 rounded-lg">
                          <Network className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-sm font-medium text">Seamless bridging</span>
                        </div>
                        <div className="flex items-center justify-center gap-3 p-3 bg-success/10 rounded-lg">
                          <Lock className="w-5 h-5 text-success flex-shrink-0" />
                          <span className="text-sm font-medium text">Secure migration</span>
                        </div>
                        <div className="flex items-center justify-center gap-3 p-3 bg-warning/10 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-warning flex-shrink-0" />
                          <span className="text-sm font-medium text">Mainnet readiness</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Connection Lines for Desktop */}
              <div className="hidden lg:block relative -mt-8">
                <div className="absolute top-4 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-primary/50 to-success/50"></div>
                <div className="absolute top-4 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-success/50 to-warning/50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Developer Section - Enhanced Design */}
      <div className="bg-gradient-to-br from-surface/30 via-surface/20 to-surface/10 py-8 md:py-12 lg:py-16">
        <div className="main-container">
          <div className="content-wrapper">
            <div className="section-container">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
                {/* Left Section - Content */}
                <div className="text-center xl:text-left space-y-6 lg:space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-center xl:justify-start gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center shadow-lg">
                        <Code className="w-6 h-6 text-surface" />
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text">
                        Build on <span className="text-primary">Gorbagana</span>
                      </h2>
                    </div>
                    
                    <p className="text-base sm:text-lg lg:text-xl text-muted leading-relaxed max-w-2xl mx-auto xl:mx-0">
                      <span className="text font-semibold text-primary">Build for Solana, deploy on Gorbagana.</span> Test your mainnet apps 
                      at a fraction of the cost with complete L1 compatibility and lightning-fast performance.
                    </p>
                  </div>

                  {/* Feature List */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-4 max-w-2xl mx-auto xl:max-w-none">
                    <div className="flex items-center justify-center xl:justify-start gap-4 p-4 bg-success/10 border border-success/20 rounded-xl">
                      <CheckCircle className="w-6 h-6 text-success flex-shrink-0" />
                      <span className="font-medium text text-sm lg:text-base">Full Solana compatibility</span>
                    </div>
                    <div className="flex items-center justify-center xl:justify-start gap-4 p-4 bg-warning/10 border border-warning/20 rounded-xl">
                      <DollarSign className="w-6 h-6 text-warning flex-shrink-0" />
                      <span className="font-medium text text-sm lg:text-base">Ultra-low cost testing</span>
                    </div>
                    <div className="flex items-center justify-center xl:justify-start gap-4 p-4 bg-primary/10 border border-primary/20 rounded-xl">
                      <Zap className="w-6 h-6 text-primary flex-shrink-0" />
                      <span className="font-medium text text-sm lg:text-base">Faster block times</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="flex justify-center xl:justify-start">
                    <Button className="bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-surface font-bold px-8 lg:px-10 py-4 lg:py-5 h-14 lg:h-16 text-lg lg:text-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                      <Code className="mr-3 w-5 h-5" />
                      Start Building
                      <ChevronRight className="ml-3 w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Right Section - Benefits Card */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-success/30 rounded-3xl blur opacity-30"></div>
                  <Card className="relative bg-surface/90 border-primary/20 shadow-2xl">
                    <CardContent className="p-6 lg:p-8">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-success rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                          <Cpu className="w-8 h-8 text-surface" />
                        </div>
                        <h3 className="text-xl lg:text-2xl font-bold text mb-2">Developer Benefits</h3>
                        <p className="text-muted text-sm lg:text-base">Everything you need to build and scale</p>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="group">
                          <div className="flex items-start gap-4 p-4 bg-primary/5 hover:bg-primary/10 rounded-xl transition-all duration-300">
                            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                              <Target className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold text text-base lg:text-lg mb-1">Mainnet-Ready Testing</h4>
                              <p className="text-muted text-sm lg:text-base leading-relaxed">Test complex dApps before expensive deployment. Full environment simulation.</p>
                            </div>
                          </div>
                        </div>

                        <div className="group">
                          <div className="flex items-start gap-4 p-4 bg-warning/5 hover:bg-warning/10 rounded-xl transition-all duration-300">
                            <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                              <Rocket className="w-5 h-5 text-warning" />
                            </div>
                            <div>
                              <h4 className="font-semibold text text-base lg:text-lg mb-1">Instant Deployment</h4>
                              <p className="text-muted text-sm lg:text-base leading-relaxed">Deploy with sub-second confirmations. No waiting, just building.</p>
                            </div>
                          </div>
                        </div>

                        <div className="group">
                          <div className="flex items-start gap-4 p-4 bg-success/5 hover:bg-success/10 rounded-xl transition-all duration-300">
                            <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                              <Activity className="w-5 h-5 text-success" />
                            </div>
                            <div>
                              <h4 className="font-semibold text text-base lg:text-lg mb-1">Performance Metrics</h4>
                              <p className="text-muted text-sm lg:text-base leading-relaxed">Built-in analytics and monitoring. Track everything that matters.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border">
                        <div className="text-center">
                          <div className="text-2xl font-black text-primary">99%</div>
                          <div className="text-xs text-muted">Compatibility</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-black text-success">~400ms</div>
                          <div className="text-xs text-muted">Block Time</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-black text-warning">$0.001</div>
                          <div className="text-xs text-muted">Avg Cost</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bridge Section - Simplified */}
      <div className="py-6">
        <div className="main-container">
          <div className="content-wrapper">
            <div className="section-container">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Lock className="w-6 h-6 text-primary" />
                  <h2 className="text-3xl md:text-4xl font-bold text">Lightning Bridge</h2>
                </div>
                <p className="text-lg text-muted max-w-2xl mx-auto">
                  Native $GOR-powered bridge with open-source security. Process 10,000+ transactions daily with 99.9% uptime.
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <Card className="bg-surface/50 border-border text-center">
                  <CardContent className="p-3">
                    <Network className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h4 className="text-sm font-medium text mb-1">Native $GOR</h4>
                    <p className="text-xs text-muted mb-1">Ultra-fast bridging</p>
                    <div className="text-xs text-primary font-medium">~2 second transfers</div>
                  </CardContent>
                </Card>

                <Card className="bg-surface/50 border-border text-center">
                  <CardContent className="p-3">
                    <Lock className="w-8 h-8 text-success mx-auto mb-2" />
                    <h4 className="text-sm font-medium text mb-1">Open Source</h4>
                    <p className="text-xs text-muted mb-1">Transparent mechanism</p>
                    <div className="text-xs text-success font-medium">Audited & verified</div>
                  </CardContent>
                </Card>

                <Card className="bg-surface/50 border-border text-center">
                  <CardContent className="p-3">
                    <Users className="w-8 h-8 text-warning mx-auto mb-2" />
                    <h4 className="text-sm font-medium text mb-1">Community Run</h4>
                    <p className="text-xs text-muted mb-1">Decentralized operators</p>
                    <div className="text-xs text-warning font-medium">50+ validators</div>
                  </CardContent>
                </Card>

                <Card className="bg-surface/50 border-border text-center">
                  <CardContent className="p-3">
                    <Zap className="w-8 h-8 text-purple mx-auto mb-2" />
                    <h4 className="text-sm font-medium text mb-1">Instant Transfer</h4>
                    <p className="text-xs text-muted mb-1">Seconds, not minutes</p>
                    <div className="text-xs text-purple font-medium">99.9% uptime</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-surface/20 py-6">
        <div className="main-container">
          <div className="content-wrapper">
            <div className="section-container">
              <Card className="glass-effect border-border bg-surface/50">
                <CardContent className="p-5 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text mb-3">Ready to Build Your Empire?</h2>
                  <p className="text-lg text-muted mb-4 max-w-xl mx-auto leading-relaxed">
                    Join the revolution. Build with Gorbagana's protection. Escape the MEV chaos and focus on what matters.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                    <Button 
                      onClick={onExploreClick}
                      className="bg-primary hover:bg-primary-hover text-surface font-semibold px-6 py-3 h-12 shadow-lg hover:shadow-xl transition-all duration-300 flex-1"
                    >
                      <Rocket className="mr-2 w-4 h-4" />
                      Launch Your Community
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-2 border-border hover:border-primary/30 font-semibold px-6 py-3 h-12 flex-1"
                    >
                      <Code className="mr-2 w-4 h-4" />
                      Developer Docs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Massive Gorbagana Text (only on landing) */}
      <div className="text-center py-4 md:py-6 overflow-hidden">
        <div className="relative">
          <h1 
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[10rem] font-black leading-none tracking-tighter px-2"
            style={{
              background: 'linear-gradient(135deg, #22c55e 0%, #3b82f6 25%, #8b5cf6 50%, #f59e0b 75%, #ef4444 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: `
                0 0 20px rgba(34, 197, 94, 0.3),
                0 0 40px rgba(34, 197, 94, 0.2),
                0 0 60px rgba(34, 197, 94, 0.1),
                0 2px 10px rgba(0, 0, 0, 0.3),
                0 4px 20px rgba(0, 0, 0, 0.2)
              `,
              filter: 'drop-shadow(0 5px 15px rgba(0, 0, 0, 0.5))'
            }}
          >
            GORBAGANA
          </h1>
          <div 
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold mt-2 opacity-90"
            style={{
              background: 'linear-gradient(90deg, #6b7280 0%, #9ca3af 50%, #6b7280 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
            }}
          >
            MAINNET
          </div>
          <div 
            className="absolute inset-0 opacity-20 animate-pulse"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(34, 197, 94, 0.4) 0%, transparent 70%)',
              filter: 'blur(20px)'
            }}
          ></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Landing;