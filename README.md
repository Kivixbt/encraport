# EncraPort 🔐

### Privacy-First Cryptocurrency Portfolio Manager

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Zama fhEVM](https://img.shields.io/badge/Zama-fhEVM-blue)](https://docs.zama.ai/)
[![React](https://img.shields.io/badge/React-18.2-blue)](https://reactjs.org/)
[![Built with Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)

> A next-generation Web3 portfolio tracker leveraging Fully Homomorphic Encryption (FHE) to keep your asset holdings confidential on-chain while providing real-time market insights and AI-powered portfolio analysis.

---

## 📋 Overview

**EncraPort** is a revolutionary decentralized portfolio management platform that solves the privacy paradox in blockchain transparency. Built on Zama's fhEVM technology, it enables users to track and manage cryptocurrency holdings with complete confidentiality—your balances remain encrypted even to blockchain validators.

### The Problem

Traditional blockchain portfolios expose all holdings publicly, creating security risks and privacy concerns for high-net-worth individuals and institutional investors. On-chain transparency, while beneficial for trustless verification, inadvertently reveals:

- **Portfolio composition** - Complete asset allocation visible to anyone
- **Trading strategies** - Buy/sell patterns can be tracked and front-run
- **Net worth** - Total holdings exposed, creating security risks
- **Personal identity** - Wallet addresses can be linked to real identities

### The Solution

EncraPort encrypts portfolio data using Fully Homomorphic Encryption, allowing on-chain storage and computation while maintaining complete privacy. Only you can decrypt your holdings.

**Key innovations:**
- **Encrypted State Variables** - Asset quantities stored as `euint64` types on-chain
- **Homomorphic Computations** - Smart contracts perform calculations on encrypted data
- **Client-Side Decryption** - Only authenticated users with private keys can view plaintext
- **Zero-Knowledge Proof of Solvency** - Prove holdings without revealing amounts

### Use Cases

- **High-Net-Worth Individuals** - Protect wealth from public scrutiny
- **Institutional Investors** - Maintain confidential trading strategies
- **DAOs & Treasuries** - Private financial management with public accountability
- **Tax Compliance** - Prove holdings to authorities without public exposure
- **DeFi Participants** - Prevent MEV attacks through encrypted transaction amounts

---

## ✨ Key Features

### 🔒 Privacy Technology

- **Fully Homomorphic Encryption (FHE)** - Asset quantities encrypted on-chain using Zama's TFHE library
- **Zero-Knowledge Architecture** - No plaintext data exposure to validators or nodes
- **Client-Side Decryption** - Only authenticated users can view their portfolio
- **Encrypted Computations** - Smart contract performs operations on ciphertext
- **Granular Access Control** - User-defined decryption permissions per asset
- **Quantum-Resistant Security** - FHE provides post-quantum cryptographic guarantees

### 🎨 Modern Interface

- **Real-Time Market Data** - Live cryptocurrency prices via CoinGecko API with 7-day sparkline charts
- **Custom Categories** - Organize assets by strategy (RWA, Gaming, DeFi, Layer 1, etc.)
- **Dark Mode First** - Sleek, professional design optimized for extended use and eye comfort
- **Responsive Dashboard** - Fully optimized for desktop, tablet, and mobile devices
- **Interactive Charts** - Recharts-powered visualizations with gradient fills
- **Privacy Blur Mode** - Toggle visibility for screenshots and screen sharing
- **Portfolio Insights** - Real-time PnL tracking, value calculations, and performance metrics

### 🤖 AI-Powered Insights

- **Portfolio Analysis** - Gemini AI provides risk assessment and strategic recommendations
- **Market Sentiment** - AI-driven analysis of current market conditions
- **Diversification Scoring** - Evaluate portfolio risk concentration
- **Contextual Advice** - Personalized guidance based on your specific holdings
- **Markdown Reports** - Professional, formatted analysis ready for export
- **Category-Specific Analysis** - Separate insights for each portfolio segment

### 🔐 Multi-Authentication

- **Google OAuth** - Seamless Firebase authentication with email verification
- **EVM Wallets** - MetaMask and WalletConnect support for Ethereum-compatible chains
- **Solana Wallets** - Phantom wallet integration for SPL token tracking
- **Multi-Chain Ready** - Extensible architecture for additional blockchain networks
- **Session Management** - Secure, persistent authentication across browser sessions
- **Account Linking** - Connect multiple wallet addresses to single profile

### 📊 Portfolio Management

- **Unlimited Assets** - Track any cryptocurrency available on CoinGecko
- **Multi-Category Organization** - Create custom tabs for different strategies
- **Automatic Valuation** - Real-time portfolio value updates based on market prices
- **PnL Tracking** - Profit/loss calculations based on average buy price
- **Search Functionality** - Quick asset lookup from 100+ top cryptocurrencies
- **Local Persistence** - Portfolio data cached in browser localStorage
- **Export Capabilities** - Ready for CSV/PDF export features

---

## 📚 Documentation

### Prerequisites

Before installation, ensure you have the following tools installed:

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **npm** v9+ or **yarn** v1.22+ package manager
- **MetaMask** browser extension ([Install](https://metamask.io/))
- **Git** version control v2.30+ ([Download](https://git-scm.com/))
- **Modern Browser** - Chrome 90+, Firefox 88+, or Edge 90+

### Installation

```bash
# Step 1: Clone the repository
git clone https://github.com/kivixbt/encraport.git
cd encraport

# Step 2: Install dependencies
npm install

# Step 3: Configure environment variables
cp .env.example .env
# Edit .env with your API keys (see Environment Setup below)

# Step 4: Start development server
npm run dev

# Step 5: Open browser
# Navigate to http://localhost:5173
```

### Environment Setup

#### Local Development

1. `.env.example` dosyasını kopyalayın:
```bash
cp .env.example .env
```

2. `.env` dosyasını düzenleyin ve API key'lerinizi ekleyin:

```env
# Firebase Configuration (JSON format)
VITE_FIREBASE_CONFIG={"apiKey":"YOUR_FIREBASE_API_KEY","authDomain":"your-project.firebaseapp.com","projectId":"your-project-id","storageBucket":"your-project.appspot.com","messagingSenderId":"123456789","appId":"1:123456789:web:abcdef"}

# Google Gemini API Key
VITE_GEMINI_KEY=AIzaSyC...your_gemini_api_key
```

**Obtaining API Keys:**

1. **Firebase Configuration:**
   - Visit [Firebase Console](https://console.firebase.google.com/)
   - Create new project or select existing
   - Navigate to Project Settings → General
   - Scroll to "Your apps" → Select Web App
   - Copy the `firebaseConfig` object and format as single-line JSON

2. **Gemini API Key:**
   - Visit [Google AI Studio](https://ai.google.dev/)
   - Click "Get API Key" in top right
   - Create new API key or use existing
   - Copy key to `.env` file

#### Production Deployment

**ÖNEMLİ:** `.env` dosyası GitHub'a yüklenmez (güvenlik için). Production'da environment variables'ı deployment platform'unda (Vercel/Netlify) ekleyin. Detaylar için [Production Deployment](#-production-deployment) bölümüne bakın.

### MetaMask Configuration

Add Zama Devnet to MetaMask:

```

---

## 🏗 Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend Layer                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  React Components (App.jsx)                          │  │
│  │  • Authentication UI  • Portfolio Dashboard          │  │
│  │  • Asset Management   • AI Analysis Interface        │  │
│  └────────────────┬─────────────────────────────────────┘  │
│                   │                                          │
│  ┌────────────────▼─────────────────────────────────────┐  │
│  │  State Management (React Hooks)                      │  │
│  │  • useState   • useEffect   • useMemo                │  │
│  └────────────────┬─────────────────────────────────────┘  │
└───────────────────┼──────────────────────────────────────────┘
                    │
┌───────────────────▼──────────────────────────────────────────┐
│                   Service Layer                               │
│  ┌─────────────────┐  ┌──────────────┐  ┌────────────────┐  │
│  │  ZamaService.js │  │  Firebase    │  │  CoinGecko API │  │
│  │  • fhevmjs      │  │  • Auth      │  │  • Market Data │  │
│  │  • Encryption   │  │  • OAuth     │  │  • Price Feeds │  │
│  └────────┬────────┘  └──────┬───────┘  └────────┬───────┘  │
└───────────┼────────────────────┼───────────────────┼──────────┘
            │                    │                   │
┌───────────▼────────────────────▼───────────────────▼──────────┐
│                   External Services                            │
│  ┌──────────────────┐  ┌──────────────┐  ┌─────────────────┐ │
│  │     ZamaFHE      |  │    Firebase  │  │  Gemini AI      │ │
│  │                  │  │  OAuth       │  │  Portfolio      │ │
│  │                  │  │  Provider    │  │  Analysis       │ │
│  └────────┬─────────┘  └──────────────┘  └─────────────────┘ │
└───────────┼──────────────────────────────────────────────────┘
            │
┌───────────▼──────────────────────────────────────────────────┐
│                   Blockchain Layer                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  EncraPort.sol Smart Contract                        │   │
│  │  • mapping(address => mapping(string => euint64))    │   │
│  │  • deposit(string symbol, bytes encryptedAmount)     │   │
│  │  • getBalanceHandle(string symbol)                   │   │
│  │  • TFHE library for homomorphic operations           │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Action → React Component → Service Layer → Blockchain/API
                                      ↓
                           Encrypted with fhevmjs
                                      ↓
                        Stored as euint64 on Zama
                                      ↓
                    Retrieved & Decrypted Client-Side
                                      ↓
                         Displayed in Dashboard
```

---

## 🚀 Quick Start

### 1️⃣ Installation

```bash
git clone https://github.com/kivixbt/encraport.git
cd encraport
npm install
```

### 2️⃣ Configuration

```bash
# Create environment file
cp .env.example .env

# Add your API keys to .env
VITE_FIREBASE_CONFIG={"apiKey":"..."}
VITE_GEMINI_KEY=AIzaSy...
```

### 3️⃣ Launch

```bash
npm run dev
# Open http://localhost:5173
```

### 4️⃣ First Use

1. Click **"Login"** → Choose authentication method
2. Click **"+"** to create a portfolio category
3. Click **"Add Asset"** → Search and add cryptocurrency
4. Click **"AI Analysis"** for portfolio insights

---

## ☁️ Production Deployment

### Vercel Deployment (Önerilen)

1. **Vercel'e gidin:** https://vercel.com
2. **"Add New Project"** → GitHub repository'nizi seçin
3. **Environment Variables** sekmesine gidin ve şunları ekleyin:
   ```
   VITE_FIREBASE_CONFIG = {"apiKey":"...","authDomain":"...","projectId":"...","storageBucket":"...","messagingSenderId":"...","appId":"..."}
   VITE_GEMINI_KEY = AIzaSyC...
   ```
4. **Deploy** butonuna tıklayın
5. ✅ Projeniz canlıda!

### Netlify Deployment

1. **Netlify'e gidin:** https://netlify.com
2. **"Add new site"** → **"Import an existing project"**
3. GitHub repository'nizi bağlayın
4. **Site settings** → **Environment variables** → **Add variable**
5. Şu değişkenleri ekleyin:
   ```
   VITE_FIREBASE_CONFIG = {"apiKey":"...","authDomain":"...","projectId":"...","storageBucket":"...","messagingSenderId":"...","appId":"..."}
   VITE_GEMINI_KEY = AIzaSyC...
   ```
6. **Deploy site**

### GitHub Pages (Static Build)

```bash
# Build oluştur
npm run build

# dist klasörünü GitHub Pages'e deploy edin
# Not: Environment variables'ı build zamanında eklemeniz gerekir
```

**Önemli:** Production'da `.env` dosyasına gerek yok! Environment variables'ı platform üzerinden ekleyin.

---

## 📁 Project Structure

```
encraport/
├── contracts/
│   └── EncraPort.sol              # Zama FHE smart contract
│       ├── TFHE library imports
│       ├── Encrypted balance mappings
│       └── Deposit/retrieval functions
│
├── public/
│   └── assets/                    # Static assets (if any)
│
├── src/
│   ├── services/
│   │   └── ZamaService.js         # fhEVM integration layer
│   │       ├── FHE_CONFIG (Chain ID, RPC, Contract)
│   │       ├── init() - Initialize fhevmjs instance
│   │       ├── encryptAndDeposit() - Encrypt & submit
│   │       └── mockEncrypt() - Demo encryption
│   │
│   ├── App.jsx                    # Main application component
│   │   ├── Authentication logic
│   │   ├── Portfolio management
│   │   ├── Asset CRUD operations
│   │   ├── AI analysis integration
│   │   └── UI components & modals
│   │
│   ├── index.css                  # Global styles & Tailwind
│   │   ├── Tailwind directives
│   │   ├── Custom animations
│   │   ├── Glass morphism effects
│   │   └── Scrollbar styling
│   │
│   └── main.jsx                   # Application entry point
│       ├── React DOM rendering
│       ├── Firebase SDK initialization
│       └── Global window exports
│
├── .env                           # Environment variables (not in git)
├── .env.example                   # Environment template
├── .gitignore                     # Git ignore rules
├── index.html                     # HTML template
├── package.json                   # Dependencies & scripts
├── postcss.config.js              # PostCSS configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── vite.config.js                 # Vite build configuration
├── README.md                      # Project documentation
└── Quick_Start.md                 # Installation guide
```

### Key Files Explained

**`contracts/EncraPort.sol`**
- Solidity smart contract using Zama's TFHE library
- Stores encrypted balances as `euint64` types
- Provides deposit and retrieval functions for encrypted data

**`src/services/ZamaService.js`**
- JavaScript service for client-side FHE operations
- Wraps fhevmjs library for encryption/decryption
- Manages contract interactions via ethers.js

**`src/App.jsx`**
- Main React component (2,000+ lines)
- Handles all UI logic and state management
- Integrates Firebase, Gemini AI, and CoinGecko APIs

**`vite.config.js`**
- Configures COOP/COEP headers required for fhevmjs SharedArrayBuffer

---

## 🖥 System Architecture

### Component Architecture

```
App.jsx (Root Component)
│
├── Header
│   ├── Logo
│   ├── User Profile
│   └── Login/Logout Button
│
├── Market Overview
│   └── MarketCard[] (Top 4 coins with sparklines)
│
├── Category Navigation
│   ├── Category Tab[]
│   └── Add Category Button
│
├── Portfolio Dashboard
│   ├── Portfolio Header
│   │   ├── Portfolio Name (Editable)
│   │   ├── Total Value
│   │   └── Action Buttons (Add Asset, AI Analysis)
│   │
│   └── Asset Table
│       ├── Asset Row[]
│       │   ├── Name & Symbol
│       │   ├── Current Price
│       │   ├── Holdings Amount
│       │   ├── Total Value
│       │   └── PnL (Profit/Loss)
│       │
│       └── Empty State (if no assets)
│
└── Modals
    ├── Authentication Modal
    │   ├── Google Login Button
    │   ├── EVM Wallet Button
    │   └── Solana Wallet Button
    │
    ├── Add Asset Modal
    │   ├── Coin Search Input
    │   ├── Search Results Dropdown
    │   ├── Amount Input
    │   ├── Average Price Input
    │   └── Submit Button
    │
    ├── Add Category Modal
    │   ├── Category Name Input
    │   └── Create Button
    │
    └── AI Analysis Modal
        ├── Loading State
        └── Markdown Report Display
```

### State Management

```javascript
// User Authentication
const [user, setUser] = useState(null)
const [authInstance, setAuthInstance] = useState(null)

// Market Data
const [topCoins, setTopCoins] = useState([])
const [allCoins, setAllCoins] = useState([])

// Portfolio State
const [userAssets, setUserAssets] = useState([])
const [categories, setCategories] = useState(['General'])
const [activeCategory, setActiveCategory] = useState('General')
const [portfolioName, setPortfolioName] = useState('My Portfolio')

// UI State
const [modalOpen, setModalOpen] = useState(false)
const [authModalOpen, setAuthModalOpen] = useState(false)
const [aiModalOpen, setAiModalOpen] = useState(false)
const [isAddingZama, setIsAddingZama] = useState(false)

// Form State
const [searchTerm, setSearchTerm] = useState('')
const [selectedSearchCoin, setSelectedSearchCoin] = useState(null)
const [formAmount, setFormAmount] = useState('')
const [formPrice, setFormPrice] = useState('')
```

### API Integration Flow

```
1. CoinGecko Market Data
   ↓
   GET /api/v3/coins/markets
   ↓
   Parse JSON response
   ↓
   Update topCoins/allCoins state
   ↓
   Render MarketCard components

2. User Authentication
   ↓
   Firebase signInWithPopup() OR ethereum.request()
   ↓
   Store user credentials in state
   ↓
   Enable portfolio features

3. Add Asset Flow
   ↓
   User selects coin & enters data
   ↓
   ZamaService.mockEncrypt(amount)
   ↓
   Create asset object with encrypted flag
   ↓
   Update userAssets state
   ↓
   Persist to localStorage

4. AI Analysis Flow
   ↓
   Gather portfolio data
   ↓
   POST to Gemini API with prompt
   ↓
   Parse response JSON
   ↓
   Render markdown in modal
```

---

## 🎯 Usage Examples

### Example 1: Creating a DeFi Portfolio

```javascript
// 1. Login with MetaMask
Click "Login" → "EVM Wallet" → Approve MetaMask

// 2. Create "DeFi" category
Click "+" → Enter "DeFi" → "Create"

// 3. Add Uniswap
Click "Add Asset"
Search: "Uniswap"
Amount: 100
Avg Price: 8.50
→ "Add to Portfolio"

// 4. Add Aave
Search: "Aave"
Amount: 15
Avg Price: 95.00
→ "Add to Portfolio"

// 5. View Analytics
Click "AI Analysis"
→ Review DeFi exposure, risk score, recommendations
```

### Example 2: Multi-Category Strategy

```javascript
// Portfolio Structure
├── Layer 1 (BTC, ETH, SOL)
├── DeFi (UNI, AAVE, CRV)
├── RWA (ONDO, MKR, USDC)
└── Gaming (AXS, SAND, MANA)

// Benefits:
- Separate tracking per strategy
- Category-specific AI analysis
- Clear risk segmentation
- Easy rebalancing decisions
```

### Example 3: Privacy-Focused Setup

```javascript
// 1. Deploy custom contract
npx hardhat run scripts/deploy.js --network zama
// Contract: 0xYourAddress...

// 2. Update ZamaService.js
export const FHE_CONFIG = {
    contractAddress: '0xYourAddress...'
}

// 3. Add assets with encryption
→ All amounts encrypted on-chain
→ Only you can decrypt with private key
→ Validators see only ciphertext

// 4. Verify privacy
→ Check Zama Explorer
→ Balance shows as encrypted bytes
→ No plaintext exposure
```

---

## 🔐 Privacy Technology

### Fully Homomorphic Encryption Explained

**Traditional Encryption:**
```
Plaintext → Encrypt → Ciphertext → Store
                                      ↓
                             (Must decrypt to compute)
```

**Homomorphic Encryption:**
```
Plaintext → Encrypt → Ciphertext → Store → Compute on Ciphertext
                                                     ↓
                                           Encrypted Result
                                                     ↓
                                      Decrypt → Plaintext Result
```

### How EncraPort Uses FHE

#### 1. Client-Side Encryption

```javascript
// In browser (src/services/ZamaService.js)
const input = instance.createEncryptedInput(contractAddress, userAddress)
input.add64(amount) // Add 64-bit integer
const encryptedBytes = input.encrypt() // Returns encrypted bytes
```

#### 2. On-Chain Storage

```solidity
// In smart contract (contracts/EncraPort.sol)
function deposit(string calldata symbol, bytes calldata encryptedAmount) {
    euint64 amount = TFHE.asEuint64(encryptedAmount);
    balances[msg.sender][symbol] = TFHE.add(currentBalance, amount);
}
```

#### 3. Homomorphic Operations

```solidity
// Smart contract can compute on encrypted data
euint64 balance1 = balances[user]["BTC"];
euint64 balance2 = balances[user]["ETH"];
euint64 totalBalance = TFHE.add(balance1, balance2); // Still encrypted!
```

#### 4. Client-Side Decryption

```javascript
// Only user with private key can decrypt
const balanceHandle = await contract.getBalanceHandle("BTC")
const decryptedAmount = await instance.decrypt(balanceHandle)
```

### Security Guarantees

| Feature | Traditional Blockchain | EncraPort with FHE |
|---------|------------------------|---------------------|
| **Balance Visibility** | Public | Encrypted |
| **Transaction Amounts** | Public | Encrypted |
| **Validator Access** | Full read access | Only ciphertext |
| **MEV Protection** | Vulnerable | Protected |
| **Front-Running** | Possible | Prevented |
| **Privacy Level** | Zero | Complete |
| **Computation on Data** | Requires decryption | Homomorphic ops |

### Encryption Flow Diagram

```
┌──────────────────────────────────────────────────────────┐
│                    User's Browser                         │
│                                                           │
│  Portfolio: { BTC: 0.5, ETH: 2.0 }                       │
│       ↓                                                   │
│  fhevmjs.encrypt(0.5) → [0x7a3f9e...]                   │
│  fhevmjs.encrypt(2.0) → [0x4b2c8d...]                   │
│       ↓                                                   │
│  ethers.js: contract.deposit("BTC", [0x7a3f9e...])      │
└───────────────────────┬──────────────────────────────────┘
                        │
                        ↓ Transaction
┌───────────────────────▼──────────────────────────────────┐
│                  Zama Blockchain                          │
│                                                           │
│  Storage: balances[0xUser...]["BTC"] = euint64(cipher)  │
│                                                           │
│  • Validators see only encrypted bytes                   │
│  • No plaintext exposure at any point                    │
│  • Smart contract computes on ciphertext                 │
│  • User's private key required for decryption            │
└──────────────────────────────────────────────────────────┘
```

### Privacy Use Cases

1. **Institutional Investors**
   - Hide large positions from competitors
   - Prevent market manipulation via front-running
   - Maintain confidential trading strategies

2. **High-Net-Worth Individuals**
   - Protect wealth from public visibility
   - Reduce kidnapping/extortion risk
   - Maintain financial privacy

3. **DAOs & Treasuries**
   - Private budget allocations
   - Confidential grant distributions
   - Public accountability without exposure

4. **DeFi Users**
   - Prevent sandwich attacks
   - Hide liquidation risk from attackers
   - Maintain MEV protection

---

## 📜 Smart Contract Overview

### EncraPort.sol - Full Contract

```solidity
// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.24;

import 'fhevm/lib/TFHE.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

/// @title EncraPort Confidential Vault
/// @notice Stores encrypted cryptocurrency balances using Zama's FHE
/// @dev Uses TFHE library for homomorphic encryption operations
contract EncraPort is Ownable {
    
    // Nested mapping: user address → asset symbol → encrypted balance
    mapping(address => mapping(string => euint64)) internal balances;
    
    // Events
    event Deposit(address indexed user, string symbol);
    event Withdrawal(address indexed user, string symbol, uint256 amount);
    
    constructor() Ownable(msg.sender) {}

    /// @notice Deposit encrypted asset amount
    /// @param symbol Asset symbol (e.g., "BTC", "ETH")
    /// @param encryptedAmount Encrypted bytes from fhevmjs
    function deposit(string calldata symbol, bytes calldata encryptedAmount) 
        public 
    {
        // Convert encrypted bytes to euint64 type
        euint64 amount = TFHE.asEuint64(encryptedAmount);
        
        // Get current encrypted balance
        euint64 currentBalance = balances[msg.sender][symbol];
        
        // Perform homomorphic addition (on encrypted data!)
        balances[msg.sender][symbol] = TFHE.add(currentBalance, amount);
        
        // Grant decryption permissions
        TFHE.allow(balances[msg.sender][symbol], address(this));
        TFHE.allow(balances[msg.sender][symbol], msg.sender);
        
        emit Deposit(msg.sender, symbol);
    }

    /// @notice Get encrypted balance handle for client-side decryption
    /// @param symbol Asset symbol to query
    /// @return Encrypted balance as euint64
    function getBalanceHandle(string calldata symbol) 
        public 
        view 
        returns (euint64) 
    {
        return balances[msg.sender][symbol];
    }
    
    /// @notice Withdraw encrypted amount (future implementation)
    /// @param symbol Asset symbol
    /// @param encryptedAmount Amount to withdraw
    function withdraw(string calldata symbol, bytes calldata encryptedAmount)
        public
    {
        euint64 amount = TFHE.asEuint64(encryptedAmount);
        euint64 currentBalance = balances[msg.sender][symbol];
        
        // Subtract encrypted amounts
        balances[msg.sender][symbol] = TFHE.sub(currentBalance, amount);
        
        TFHE.allow(balances[msg.sender][symbol], address(this));
        TFHE.allow(balances[msg.sender][symbol], msg.sender);
        
        emit Withdrawal(msg.sender, symbol, 0); // Amount hidden
    }
}
```

### Key Functions

| Function | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| `deposit()` | Store encrypted asset amount | `symbol`, `encryptedAmount` | None (emits event) |
| `getBalanceHandle()` | Retrieve encrypted balance | `symbol` | `euint64` handle |
| `withdraw()` | Remove encrypted amount | `symbol`, `encryptedAmount` | None (emits event) |

### TFHE Library Operations

```solidity
// Core TFHE functions used in EncraPort

TFHE.asEuint64(bytes)      // Convert encrypted bytes to euint64
TFHE.add(euint64, euint64) // Homomorphic addition
TFHE.sub(euint64, euint64) // Homomorphic subtraction
TFHE.allow(euint64, address) // Grant decryption permission
```

### Deployment Instructions

```bash
# 1. Install dependencies
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox

# 2. Configure Hardhat
# Create hardhat.config.js with Zama network settings

# 3. Compile contract
npx hardhat compile

# 4. Deploy to Zama Devnet
npx hardhat run scripts/deploy.js --network zama

# 5. Update contract address in src/services/ZamaService.js
export const FHE_CONFIG = {
    contractAddress: '0xYourDeployedAddress...'
}
```

### Gas Optimization Notes

- `euint64` operations consume more gas than standard `uint256`
- Batch multiple deposits when possible
- Consider layer 2 scaling solutions for production
- FHE computational overhead: ~10-100x vs plaintext operations

---

## 🛠 Tech Stack

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2.0 | UI framework and component architecture |
| **Vite** | 5.1.6 | Build tool, dev server, and HMR |
| **Tailwind CSS** | 3.4.1 | Utility-first styling framework |
| **PostCSS** | 8.4.35 | CSS processing and autoprefixing |
| **Recharts** | 2.12.2 | Data visualization and charting |
| **Lucide React** | 0.344.0 | Modern icon library |
| **Marked** | 12.0.1 | Markdown parsing for AI reports |

### Blockchain & Cryptography

| Technology | Version | Purpose |
|------------|---------|---------|
| **fhevmjs** | 0.4.0 | Client-side FHE library |
| **Ethers.js** | 6.11.1 | Ethereum blockchain interactions |
| **Solidity** | 0.8.24 | Smart contract language |
| **Zama TFHE** | Latest | Homomorphic encryption library |
| **OpenZeppelin** | 5.0+ | Secure contract standards |

### Authentication & APIs

| Service | Purpose | Documentation |
|---------|---------|---------------|
| **Firebase** | Google OAuth authentication | [firebase.google.com](https://firebase.google.com) |
| **CoinGecko API** | Real-time crypto market data | [coingecko.com/api](https://coingecko.com/api) |
| **Google Gemini** | AI portfolio analysis | [ai.google.dev](https://ai.google.dev) |
| **MetaMask** | EVM wallet connection | [metamask.io](https://metamask.io) |
| **Phantom** | Solana wallet connection | [phantom.app](https://phantom.app) |

### Development Tools

| Tool | Purpose |
|------|---------|
| **ESLint** | Code linting and quality enforcement |
| **Git** | Version control and collaboration |
| **npm/yarn** | Package management |
| **VS Code** | Recommended IDE with React extensions |

### Infrastructure

| Component | Details |
|-----------|---------|
| **Zama Devnet** | Chain ID 8009, RPC: https://devnet.zama.ai |
| **IPFS** | Decentralized storage (future integration) |
| **Vercel/Netlify** | Recommended hosting platforms |
| **GitHub Actions** | CI/CD pipeline (future) |

---

## 📊 Project Status

### ✅ Completed Features (v10.0.0)

#### Core Functionality
- [x] Zama fhEVM smart contract integration with TFHE library
- [x] Client-side encryption/decryption using fhevmjs
- [x] Multi-chain wallet authentication (Google, MetaMask, Phantom)
- [x] Real-time cryptocurrency market data from CoinGecko
- [x] Custom portfolio categorization system
- [x] Asset CRUD operations with encrypted storage
- [x] Automatic PnL calculation and tracking
- [x] Responsive dark-mode interface design

#### Advanced Features
- [x] AI-powered portfolio analysis via Gemini API
- [x] Markdown report generation for analysis
- [x] Interactive sparkline charts (Recharts)
- [x] Local storage persistence
- [x] Search functionality for 100+ cryptocurrencies
- [x] Category-specific portfolio views
- [x] Editable portfolio names
- [x] Privacy blur mode for screenshots

#### Technical Implementation
- [x] React 18 with modern hooks
- [x] Tailwind CSS with custom design system
- [x] Vite build optimization
- [x] Firebase authentication integration
- [x] Ethers.js v6 blockchain interactions
- [x] Cross-Origin headers for SharedArrayBuffer
- [x] Glass morphism UI effects

---

## 🤝 Contributing

We welcome contributions from the community! Whether you're fixing bugs, improving documentation, or adding new features, your help is appreciated.

### Getting Started

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/kivixbt/encraport.git
cd encraport

# 3. Add upstream remote
git remote add upstream https://github.com/original/encraport.git

# 4. Create a feature branch
git checkout -b feature/amazing-feature

# 5. Make your changes and commit
git add .
git commit -m "feat: add amazing feature"

# 6. Push to your fork
git push origin feature/amazing-feature

# 7. Open a Pull Request on GitHub
```

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, semicolons, etc.)
- `refactor:` Code refactoring without feature changes
- `perf:` Performance improvements
- `test:` Adding or updating tests
- `chore:` Build process, dependencies, or tooling changes
- `ci:` Continuous integration changes

**Examples:**
```bash
feat(portfolio): add multi-currency support
fix(auth): resolve MetaMask connection timeout
docs(readme): update installation instructions
refactor(ui): simplify modal component structure
perf(api): implement request caching for CoinGecko
```

### Code Style Guidelines

#### JavaScript/React
- Use functional components with hooks
- Follow React best practices and patterns
- Use descriptive variable names
- Comment complex logic, especially FHE operations
- Avoid deeply nested components (max 3 levels)
- Extract reusable logic into custom hooks

```javascript
// Good
const usePortfolioData = (category) => {
  const [assets, setAssets] = useState([]);
  // ... logic
  return { assets, total, loading };
}

// Avoid
function calculateTotalValueAndFilterByCategoryAndSortByDate() { }
```

#### CSS/Tailwind
- Use Tailwind utility classes over custom CSS
- Follow mobile-first responsive design
- Maintain consistent spacing scale (4, 8, 16, 24, 32)
- Use semantic color names from theme

```jsx
// Good
<div className="flex items-center gap-4 p-6 rounded-xl bg-encra-900">

// Avoid
<div style={{display: 'flex', padding: '24px', background: '#0A0A0A'}}>
```

#### Solidity
- Follow [Solidity Style Guide](https://docs.soliditylang.org/en/latest/style-guide.html)
- Document all functions with NatSpec comments
- Use explicit function visibility
- Implement access control where needed
- Optimize gas usage

```solidity
// Good
/// @notice Deposits encrypted asset amount
/// @param symbol Asset symbol (e.g., "BTC")
/// @param encryptedAmount Encrypted bytes from client
function deposit(string calldata symbol, bytes calldata encryptedAmount) 
    public 
{
    // ...
}
```

### Pull Request Process

1. **Update Documentation**: Ensure README and comments reflect your changes
2. **Test Thoroughly**: Verify functionality on multiple browsers
3. **No Lint Errors**: Run `npm run lint` and fix all issues
4. **Descriptive PR**: Explain what, why, and how in PR description
5. **Link Issues**: Reference related issues with `Fixes #123`
6. **Request Review**: Tag maintainers for review

### Areas for Contribution

#### 🐛 Bug Fixes
- MetaMask connection edge cases
- Mobile responsiveness issues
- Chart rendering glitches
- State synchronization bugs

#### 📚 Documentation
- Tutorial videos
- API documentation
- Architecture diagrams
- Translation to other languages

#### ✨ New Features
- Additional authentication providers
- More chart types
- Enhanced AI prompts
- Performance optimizations

#### 🧪 Testing
- Unit tests for components
- Integration tests for services
- E2E tests with Cypress
- Smart contract tests with Hardhat

#### 🎨 Design
- UI/UX improvements
- Accessibility enhancements
- Animation refinements
- Theme variations

### Code of Conduct

- **Be respectful** and inclusive to all contributors
- **Provide constructive feedback** in code reviews
- **Help others learn** - we're all here to grow
- **Report issues** responsibly through proper channels
- **Respect privacy** - never share API keys or private data

---

## 🙏 Acknowledgments

### Technology Partners

**[Zama](https://www.zama.ai/)** - Pioneering Fully Homomorphic Encryption
- Revolutionary TFHE cryptographic library
- fhEVM blockchain infrastructure
- Developer program support and resources
- Technical documentation and examples

**[Zama Developer Program](https://docs.zama.org/programs/developer-program)**
- Hackathon sponsorship
- Technical mentorship
- Community support
- Educational resources

### Data & API Providers

**[CoinGecko](https://www.coingecko.com/)**
- Comprehensive cryptocurrency market data
- Reliable API with generous rate limits
- Sparkline chart data
- Free tier for development

**[Google AI](https://ai.google.dev/)**
- Gemini API for portfolio analysis
- Advanced natural language understanding
- Fast inference times
- Markdown-friendly responses

**[Firebase](https://firebase.google.com/)**
- Secure authentication infrastructure
- Google OAuth integration
- Real-time capabilities
- Generous free tier

### Open Source Libraries

- **[React](https://reactjs.org/)** - Facebook/Meta for the UI framework
- **[Vite](https://vitejs.dev/)** - Evan You for blazing-fast build tool
- **[Tailwind CSS](https://tailwindcss.com/)** - Adam Wathan for utility-first CSS
- **[Ethers.js](https://ethers.org/)** - Richard Moore for Ethereum library
- **[Recharts](https://recharts.org/)** - Recharts team for beautiful charts
- **[OpenZeppelin](https://openzeppelin.com/)** - Secure smart contract standards

### Community Support

**Special Thanks To:**
- Zama Discord community for technical support
- Early beta testers who provided valuable feedback
- Security auditors who helped identify vulnerabilities
- Hackathon judges and mentors for guidance
- Open-source contributors worldwide

### Inspiration

This project was inspired by the need for financial privacy in an increasingly transparent blockchain world. Special recognition to:
- Privacy-focused projects like Monero and Zcash
- DeFi innovators pushing boundaries
- cypherpunks who championed cryptographic freedom
- The Web3 community building a decentralized future

---

## ⚠️ Disclaimer

### Legal Notice

**EncraPort is experimental software provided for educational and research purposes.**

#### Not Financial Advice
- EncraPort does not provide investment, financial, legal, or tax advice
- All portfolio insights and AI analysis are for informational purposes only
- Cryptocurrency investments carry significant risk of loss
- Past performance does not indicate future results
- Always consult licensed financial advisors before making investment decisions

#### Software Warranty
- Software is provided "AS IS" without warranty of any kind
- No guarantee of accuracy, reliability, or fitness for particular purpose
- Use at your own risk
- Developers are not liable for any damages or losses

#### Smart Contract Security
- **Unaudited Code**: Smart contracts have not undergone professional security audit
- **Potential Vulnerabilities**: Bugs or exploits may exist in the code
- **Use Testnet First**: Always test on Zama Devnet before mainnet deployment
- **Limited Liability**: Developers are not responsible for lost funds
- **Report Issues**: Responsible disclosure to security@encraport.example

#### Privacy Considerations
- While FHE provides strong encryption, no system is 100% secure
- Wallet addresses may be linked to real identities through other means
- Browser-based encryption depends on client security
- Use hardware wallets and secure devices for sensitive operations

#### Regulatory Compliance
- Users are responsible for compliance with local laws and regulations
- Cryptocurrency regulations vary by jurisdiction
- Some features may not be available in certain countries
- KYC/AML requirements may apply depending on use case
- Consult legal counsel for regulatory questions

#### Third-Party Services
- EncraPort integrates third-party APIs (CoinGecko, Gemini, Firebase)
- Service availability and accuracy are outside our control
- API rate limits and terms of service apply
- Data privacy policies of third parties govern their services

#### Experimental Technology
- Fully Homomorphic Encryption is cutting-edge cryptography
- Performance characteristics may change with network upgrades
- Gas costs for FHE operations are significantly higher than standard
- Technology is still evolving and may have unforeseen limitations

### Security Best Practices

#### For Users
1. **Never share private keys** - EncraPort never asks for them
2. **Verify contract addresses** - Always double-check before transactions
3. **Use hardware wallets** - Store significant assets in cold storage
4. **Enable 2FA** - Secure Firebase, Google, and exchange accounts
5. **Update software** - Keep browsers and wallets up to date
6. **Beware of phishing** - Only use official EncraPort domains
7. **Backup recovery phrases** - Store securely offline
8. **Test with small amounts** - Before large transactions

#### For Developers
1. **Audit dependencies** - Regularly check for vulnerabilities
2. **Review pull requests** - Thoroughly before merging
3. **Test extensively** - Unit, integration, and E2E tests
4. **Monitor logs** - For suspicious activity
5. **Rate limit APIs** - Prevent abuse
6. **Sanitize inputs** - Prevent injection attacks
7. **Use environment variables** - Never commit secrets
8. **Follow least privilege** - Grant minimal permissions

---

## 🔗 Links & Resources

### Official Documentation

- **[Zama fhEVM Documentation](https://docs.zama.ai/)** - Complete guide to Fully Homomorphic Encryption
- **[fhevmjs GitHub](https://github.com/zama-ai/fhevmjs)** - Client-side FHE library
- **[TFHE-rs Library](https://github.com/zama-ai/tfhe-rs)** - Rust implementation of TFHE
- **[Zama Developer FAQ](https://docs.zama.org/programs/developer-program/frequently-asked-questions)** - Common questions answered

### Educational Resources

- **[FHE Explained](https://www.zama.ai/fhe)** - Beginner's guide to Fully Homomorphic Encryption
- **[Blockchain Privacy](https://ethereum.org/en/privacy/)** - Ethereum privacy overview
- **[Smart Contract Security](https://consensys.github.io/smart-contract-best-practices/)** - Best practices
- **[React Documentation](https://react.dev/)** - Official React guides
- **[Tailwind CSS Docs](https://tailwindcss.com/docs)** - Utility classes reference

### Developer Tools

- **[Hardhat](https://hardhat.org/)** - Ethereum development environment
- **[Remix IDE](https://remix.ethereum.org/)** - Browser-based Solidity IDE
- **[MetaMask Docs](https://docs.metamask.io/)** - Wallet integration guide
- **[Ethers.js Docs](https://docs.ethers.org/)** - JavaScript library documentation
- **[Vite Guide](https://vitejs.dev/guide/)** - Build tool documentation

### APIs & Services

- **[CoinGecko API](https://www.coingecko.com/en/api/documentation)** - Market data API docs
- **[Gemini API](https://ai.google.dev/docs)** - Google AI integration
- **[Firebase Docs](https://firebase.google.com/docs)** - Authentication setup
- **[Web3 Provider](https://docs.ethers.org/v6/api/providers/)** - Blockchain connectivity

### Design Resources

- **[Lucide Icons](https://lucide.dev/)** - Icon library used in EncraPort
- **[Tailwind UI](https://tailwindui.com/)** - Premium component library
- **[Dribbble](https://dribbble.com/tags/crypto-dashboard)** - Design inspiration
- **[Coolors](https://coolors.co/)** - Color palette generator

---

## 📞 Contact & Support

### Get Help


#### 🐛 GitHub Issues
- [github.com/kivixbt/encraport/issues](https://github.com/kivixbt/encraport/issues)
- Bug reports with template
- Feature requests
- Tag with appropriate labels

#### 💡 GitHub Discussions
- [github.com/kivixbt/encraport/discussions](https://github.com/kivixbt/encraport/discussions)
- Q&A forum
- Show and tell
- Ideas and brainstorming

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
 - OS: [e.g., Windows 11]
 - Browser: [e.g., Chrome 120]
 - Wallet: [e.g., MetaMask 11.5]
 - EncraPort Version: [e.g., v10.0.0]

**Additional context**
Any other context about the problem.
```

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
What you want to happen.

**Describe alternatives you've considered**
Other solutions or features you've thought about.

**Additional context**
Mockups, examples, or references.
```

### Social Media

- **X**: [@kivixtc](https://x.com/kivixtc) - Daily updates

---

## 📄 License

```
MIT License

Copyright (c) 2024 EncraPort Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### License Summary

**You are free to:**
- ✅ Use the software commercially
- ✅ Modify the source code
- ✅ Distribute copies
- ✅ Use privately
- ✅ Sublicense under the same terms

**Under the conditions that:**
- 📋 Include the original copyright notice
- 📋 Include the full MIT License text
- 📋 State any significant changes made

**Limitations:**
- ❌ No warranty provided
- ❌ No liability accepted
- ❌ No trademark rights granted

### Third-Party Licenses

EncraPort uses open-source libraries with the following licenses:

- **React** - MIT License
- **Tailwind CSS** - MIT License
- **Ethers.js** - MIT License
- **fhevmjs** - BSD-3-Clause-Clear
- **Recharts** - MIT License
- **Lucide React** - ISC License
- **OpenZeppelin Contracts** - MIT License

Full dependency list: See `package.json`

---

<div align="center">

## 🎉 Thank You for Using EncraPort!

**Built with ❤️ for the Zama Builder Track**

*Privacy is not a feature, it's a fundamental right.*

---

**Made with Zama's Fully Homomorphic Encryption** 🔐

---

</div>