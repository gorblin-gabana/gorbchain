# Gorbchain L2 Explorer

A comprehensive blockchain explorer for Gorbchain, a Solana Layer 2 solution. This explorer provides real-time access to blockchain data including blocks, transactions, accounts, validators, and more.

## 🚀 Features

### ✅ Real-Time Blockchain Data
- **Live Network Statistics**: Current slot, TPS, epoch progress, total accounts
- **Block Explorer**: Recent blocks with transaction counts, timestamps, and leaders
- **Transaction Monitoring**: Real-time transaction feed with status, fees, and details
- **Validator Information**: Active validators with stake amounts and commission rates
- **Account Lookup**: Search and view account balances, owners, and metadata
- **Token Registry**: SPL token information including supply and holder counts
- **Supply Metrics**: Total supply, circulating supply, and inflation data

### 🔍 Advanced Search
- **Multi-Type Search**: Search for blocks (by slot), transactions (by signature), accounts (by address)
- **Real-Time Results**: Instant search with debounced queries
- **Smart Detection**: Automatically detects input type (slot number, signature, address)
- **Detailed Results**: Click on search results to view full details

### 📊 Data Visualization
- **Interactive Charts**: Network performance metrics and trends
- **Progress Indicators**: Epoch progress and validation metrics  
- **Statistical Cards**: Key network statistics with trend indicators
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### 🌐 Network Integration
- **RPC Endpoint**: Connected to `rpc.gorbchain.xyz`
- **Auto-Refresh**: Real-time data updates every 10-60 seconds
- **Error Handling**: Graceful error handling with user-friendly messages
- **Caching**: Efficient data caching to reduce RPC calls

## 🛠 Technical Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Lucide React** for icons

### Blockchain Integration
- **@solana/web3.js** for Solana RPC interactions
- **@solana/spl-token** for token program integration
- **Custom caching layer** for performance optimization
- **Real-time hooks** for data management

### Key Components
- **SolanaService**: Main service for RPC interactions
- **Custom Hooks**: React hooks for data fetching and state management
- **Component Library**: Reusable UI components with loading states
- **Search Engine**: Advanced search functionality across all data types

## 🏗 Architecture

```
src/
├── components/           # React components
│   ├── Dashboard.tsx    # Main dashboard with network overview
│   ├── Blocks.tsx       # Block explorer interface
│   ├── Transactions.tsx # Transaction viewer
│   ├── Validators.tsx   # Validator information
│   ├── Accounts.tsx     # Account lookup and details
│   ├── Tokens.tsx       # SPL token registry
│   ├── Supply.tsx       # Supply and inflation metrics
│   ├── Search.tsx       # Advanced search interface
│   └── common/          # Reusable UI components
├── services/
│   └── solanaService.ts # Main RPC service with caching
├── hooks/
│   └── useSolanaData.ts # Custom React hooks for data
├── types/
│   └── solana.ts       # TypeScript type definitions
└── styles/
    └── theme.css       # Custom CSS variables and themes
```

## 🚦 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Access to Gorbchain RPC endpoint

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gorbchain-explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure RPC endpoint** (if needed)
   
   The explorer is pre-configured to use `rpc.gorbchain.xyz`. To change this:
   ```typescript
   // In src/services/solanaService.ts
   const RPC_ENDPOINT = 'https://rpc.gorbchain.xyz';
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## 📱 Usage Guide

### Dashboard
- View real-time network statistics
- Monitor recent blocks and transactions
- Check network health and performance
- See epoch progress and validation metrics

### Block Explorer
- Browse recent blocks chronologically
- Click on blocks to view detailed information
- See transaction counts, timestamps, and block leaders
- View block rewards and metadata

### Transaction Monitor
- Monitor live transaction feed
- Filter by transaction status (success/failed)
- View transaction fees, compute units, and logs
- Search for specific transactions by signature

### Validator Directory
- View all active validators
- Sort by stake amount, commission, or performance
- See validator vote accounts and node information
- Monitor validator credits and epoch performance

### Account Lookup
- Search for any account by address
- View account balances in SOL and lamports
- See account ownership and executable status
- Check rent-exempt status and epoch information

### Token Registry
- Browse SPL tokens on the network
- View token supplies and holder counts
- See token metadata and mint information
- Filter tokens by type and category

### Advanced Search
- Multi-type search across all data types
- Automatic input detection and validation
- Real-time search with instant results
- Detailed search tips and examples

## 🔧 Configuration

### RPC Endpoint
Update the RPC endpoint in `src/services/solanaService.ts`:
```typescript
const RPC_ENDPOINT = 'https://rpc.gorbchain.xyz';
```

### Cache Settings
Adjust cache duration for different data types:
```typescript
const CACHE_DURATION = 30000; // 30 seconds
```

### Refresh Intervals
Modify auto-refresh intervals in the hooks:
```typescript
// Dashboard stats: 30 seconds
// Blocks: 10 seconds  
// Transactions: 15 seconds
// Validators: 60 seconds
```

## 🐛 Troubleshooting

### Common Issues

**RPC Connection Failed**
- Verify `rpc.gorbchain.xyz` is accessible
- Check network connectivity
- Ensure CORS is properly configured

**Slow Loading**
- Check RPC endpoint performance
- Verify cache is working properly
- Monitor browser network tab for errors

**Search Not Working**
- Ensure search input format is correct
- Check that the searched item exists on the blockchain
- Verify RPC endpoint supports the required methods

### Debug Mode
Enable debug logging by adding to console:
```javascript
localStorage.setItem('debug', 'solana:*');
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Solana Foundation** for the Web3.js library
- **Radix UI** for accessible component primitives
- **Tailwind CSS** for utility-first styling
- **Vite** for fast development tooling

## 📞 Support

For questions or support:
- Create an issue in the repository
- Check the troubleshooting section
- Review the Solana Web3.js documentation

---

**Built for the Gorbagana ecosystem** 🟪 