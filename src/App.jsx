import React, { useState, useEffect, useMemo } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Plus, Sparkles, LogIn, LogOut, Search, Lock, Activity, Edit2 } from 'lucide-react';
import { marked } from 'marked';
import { ZamaService } from './services/ZamaService';

// CONFIG
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${import.meta.env.VITE_GEMINI_KEY}`;

// ICONS WRAPPER
const Icon = ({ name, size = 18, className = '' }) => {
    if(name==='plus') return <Plus size={size} className={className}/>;
    if(name==='sparkles') return <Sparkles size={size} className={className}/>;
    if(name==='log-in') return <LogIn size={size} className={className}/>;
    if(name==='log-out') return <LogOut size={size} className={className}/>;
    if(name==='search') return <Search size={size} className={className}/>;
    if(name==='lock') return <Lock size={size} className={className}/>;
    if(name==='activity') return <Activity size={size} className={className}/>;
    if(name==='edit') return <Edit2 size={size} className={className}/>;
    return null;
};

const MarketCard = ({ coin }) => {
    if (!coin) return <div className='h-32 bg-encra-900 rounded-xl animate-pulse border border-encra-800'></div>;

    const chartData = coin.sparkline_in_7d?.price.map((p, i) => ({ i, price: p })) || [];
    const isPositive = coin.price_change_percentage_24h >= 0;
    const color = isPositive ? '#10B981' : '#EF4444';

    return (
        <div className='glass-panel p-5 rounded-xl border border-encra-800 chart-card flex flex-col justify-between h-40'>
            <div className='flex justify-between items-start'>
                <div className='flex items-center gap-3'>
                    <img src={coin.image} className='w-8 h-8 rounded-full' alt={coin.name} />
                    <div>
                        <div className='font-bold text-white leading-tight'>{coin.name}</div>
                        <div className='text-xs text-gray-500'>{coin.symbol.toUpperCase()}</div>
                    </div>
                </div>
                <div className='text-right'>
                    <div className='font-mono text-white font-bold'>${coin.current_price.toLocaleString()}</div>
                    <div className={`text-xs font-bold ${isPositive ? 'text-encra-success' : 'text-encra-danger'}`}>
                        {isPositive ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
                    </div>
                </div>
            </div>
            <div className='h-16 w-full mt-2'>
                <ResponsiveContainer width='100%' height='100%'>
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id={`grad-${coin.id}`} x1='0' y1='0' x2='0' y2='1'>
                                <stop offset='5%' stopColor={color} stopOpacity={0.3}/>
                                <stop offset='95%' stopColor={color} stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Area type='monotone' dataKey='price' stroke={color} strokeWidth={2} fill={`url(#grad-${coin.id})`} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default function App() {
    // STATE
    const [user, setUser] = useState(null);
    
    const [topCoins, setTopCoins] = useState([]);
    const [allCoins, setAllCoins] = useState([]);
    const [userAssets, setUserAssets] = useState(() => JSON.parse(localStorage.getItem('encra_assets')) || []);
    const [categories, setCategories] = useState(() => JSON.parse(localStorage.getItem('encra_cats')) || ['General']);
    const [activeCategory, setActiveCategory] = useState('General');
    const [portfolioName, setPortfolioName] = useState(() => localStorage.getItem('encra_name') || 'My Portfolio');
    
    const [isEditingName, setIsEditingName] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [newTabModalOpen, setNewTabModalOpen] = useState(false);
    const [aiModalOpen, setAiModalOpen] = useState(false);
    
    const [aiAnalysis, setAiAnalysis] = useState('');
    const [aiLoading, setAiLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSearchCoin, setSelectedSearchCoin] = useState(null);
    const [formAmount, setFormAmount] = useState('');
    const [formPrice, setFormPrice] = useState('');
    const [newCategoryName, setNewCategoryName] = useState('');
    const [isAddingZama, setIsAddingZama] = useState(false);

    // PERSISTENCE
    useEffect(() => { localStorage.setItem('encra_assets', JSON.stringify(userAssets)); }, [userAssets]);
    useEffect(() => { localStorage.setItem('encra_cats', JSON.stringify(categories)); }, [categories]);
    useEffect(() => { localStorage.setItem('encra_name', portfolioName); }, [portfolioName]);

    // INIT
    useEffect(() => {
        const fetchData = async () => {
            try {
                const topRes = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,avalanche-2&sparkline=true');
                setTopCoins(await topRes.json());
                const allRes = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
                setAllCoins(await allRes.json());
            } catch (e) { console.error('API Error', e); }
        };
        fetchData();
    }, []);

    // HANDLERS
    const handleWalletConnect = async (chain) => {
        try {
            let address = '';
            if (chain === 'EVM') {
                if (!window.ethereum) return alert('MetaMask not found');
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                address = accounts[0];
                await ZamaService.init();
            } else {
                if (!window.solana) return alert('Phantom not found');
                const resp = await window.solana.connect();
                address = resp.publicKey.toString();
            }
            setUser({ type: chain + ' Wallet', name: `${address.slice(0,6)}...${address.slice(-4)}`, chain });
            setAuthModalOpen(false);
        } catch (e) { console.error(e); }
    };

    const handleLogout = () => {
        setUser(null);
        setUserAssets([]);
        setCategories(['General']);
        setActiveCategory('General');
    };

    const handleAddCategory = (e) => {
        e.preventDefault();
        if(newCategoryName && !categories.includes(newCategoryName)) {
            setCategories([...categories, newCategoryName]);
            setActiveCategory(newCategoryName);
            setNewTabModalOpen(false); setNewCategoryName('');
        }
    };

    const handleAddAsset = async (e) => {
        e.preventDefault();
        if (!selectedSearchCoin) return;
        setIsAddingZama(true);
        try {
            await ZamaService.mockEncrypt(formAmount); 
            const newAsset = {
                ...selectedSearchCoin,
                amount: parseFloat(formAmount),
                avgBuyPrice: parseFloat(formPrice),
                currentValue: parseFloat(formAmount) * selectedSearchCoin.current_price,
                pnl: (parseFloat(formAmount) * selectedSearchCoin.current_price) - (parseFloat(formAmount) * parseFloat(formPrice)),
                category: activeCategory,
                id: selectedSearchCoin.id + Date.now()
            };
            setUserAssets([...userAssets, newAsset]);
            setModalOpen(false);
            setSearchTerm(''); setFormAmount(''); setFormPrice(''); setSelectedSearchCoin(null);
        } catch (err) { console.error(err); } finally { setIsAddingZama(false); }
    };

    const runGeminiAnalysis = async () => {
        if (!user) { setAuthModalOpen(true); return; }
        setAiModalOpen(true); setAiLoading(true); setAiAnalysis('');
        const assetsToAnalyze = activeCategory === 'General' && categories.length === 1 ? userAssets : userAssets.filter(a => a.category === activeCategory);
        const holdings = assetsToAnalyze.map(a => `${a.name}: $${a.currentValue.toFixed(2)}`).join(', ');
        const prompt = `Act as a crypto wealth manager. Analyze this ${activeCategory} portfolio: ${holdings}. Total: $${assetsToAnalyze.reduce((a,b)=>a+b.currentValue,0).toFixed(2)}. Provide risk assessment and strategy in Markdown.`;

        try {
            const response = await fetch(GEMINI_API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) });
            const data = await response.json();
            setAiAnalysis(data.candidates?.[0]?.content?.parts?.[0]?.text || 'AI Service Unavailable.');
        } catch (e) { setAiAnalysis('Connection Error.'); } finally { setAiLoading(false); }
    };

    const filteredCoins = useMemo(() => {
        if (!searchTerm) return [];
        return allCoins.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.symbol.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 5);
    }, [searchTerm, allCoins]);

    const displayedAssets = userAssets.filter(asset => asset.category === activeCategory);
    const categoryTotal = displayedAssets.reduce((acc, curr) => acc + curr.currentValue, 0);

    return (
        <div className='min-h-screen bg-encra-950 text-gray-200 font-sans relative flex flex-col selection:bg-encra-gold selection:text-black'>
            <div className='fixed inset-0 bg-grid-pattern pointer-events-none z-0 opacity-20'></div>
            <header className='h-20 border-b border-encra-800 bg-encra-950/90 backdrop-blur-md flex items-center justify-between px-6 lg:px-10 sticky top-0 z-50'>
                <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 bg-gradient-to-br from-encra-gold to-yellow-700 rounded-lg flex items-center justify-center text-black font-black text-xl shadow-lg shadow-yellow-500/20'>E</div>
                    <div className='font-bold text-white tracking-widest text-lg'>ENCRAPORT</div>
                </div>
                <div className='flex items-center gap-6'>
                    {user ? (
                        <div className='flex items-center gap-4'>
                            <div className='text-right hidden md:block'><div className='text-sm font-bold text-white'>{user.name}</div><div className='text-[10px] text-gray-500 uppercase'>{user.type}</div></div>
                            <div className='w-10 h-10 rounded-full bg-encra-800 border border-encra-gold flex items-center justify-center text-encra-gold font-bold'>{user.name[0]}</div>
                            <button onClick={handleLogout} className='p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20'><Icon name='log-out' size={18}/></button>
                        </div>
                    ) : (
                        <button onClick={() => setAuthModalOpen(true)} className='bg-white text-black px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-200 shadow-lg flex items-center gap-2'><Icon name='log-in' size={16} /> Login</button>
                    )}
                </div>
            </header>
            <main className='max-w-7xl mx-auto p-6 lg:p-10 relative z-10 pb-20 w-full'>
                <div className='mb-10'>
                    <h2 className='text-gray-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2'><Icon name='activity' size={14} className='text-encra-gold'/> Live Market</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                        {topCoins.length === 0 ? Array(4).fill(0).map((_,i) => <div key={i} className='h-40 bg-encra-900 rounded-xl animate-pulse border border-encra-800'></div>) : topCoins.map(coin => <MarketCard key={coin.id} coin={coin} />)}
                    </div>
                </div>
                <div className='flex items-center gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar'>
                    {categories.map(cat => (
                        <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${activeCategory === cat ? 'bg-encra-gold text-black shadow-lg' : 'bg-encra-900 text-gray-500 border border-encra-800 hover:text-white'}`}>{cat}</button>
                    ))}
                    {user && <button onClick={() => setNewTabModalOpen(true)} className='px-4 py-2.5 rounded-xl bg-encra-900 text-gray-500 border border-dashed border-gray-700 hover:border-encra-gold hover:text-encra-gold'><Icon name='plus' size={16}/></button>}
                </div>
                <div>
                    <div className='flex items-end justify-between border-b border-encra-800 pb-4 mb-6'>
                        <div>
                            <div className='flex items-center gap-3 mb-1'>
                                {isEditingName && user ? (
                                    <input type='text' value={portfolioName} onChange={(e) => setPortfolioName(e.target.value)} onBlur={() => setIsEditingName(false)} autoFocus className='bg-transparent border-b border-encra-gold text-3xl font-bold text-white outline-none w-full'/>
                                ) : (
                                    <h1 className='text-3xl font-bold text-white flex items-center gap-3'>
                                        {portfolioName} <span className='text-gray-600 font-normal text-xl'>/ {activeCategory}</span>
                                        {user && <button onClick={() => setIsEditingName(true)} className='text-gray-600 hover:text-encra-gold'><Icon name='edit' size={18} /></button>}
                                    </h1>
                                )}
                            </div>
                            <div className='text-gray-500 text-sm'>Total Value: <span className='text-white font-mono font-bold text-lg'>${categoryTotal.toLocaleString()}</span></div>
                        </div>
                        <div className='flex gap-3'>
                            <button onClick={runGeminiAnalysis} className='hidden md:flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm font-bold bg-purple-500/10 px-4 py-3 rounded-xl border border-purple-500/20'><Icon name='sparkles' size={16}/> AI Analysis</button>
                            <button onClick={() => user ? setModalOpen(true) : setAuthModalOpen(true)} className='bg-encra-gold hover:bg-white hover:text-black text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg'><Icon name='plus' size={18} /> Add Asset</button>
                        </div>
                    </div>
                    <div className='glass-panel rounded-2xl overflow-hidden min-h-[300px]'>
                        {!user ? (
                            <div className='flex flex-col items-center justify-center h-80 text-center p-8'>
                                <Icon name='lock' size={48} className='text-gray-600 mb-4'/>
                                <h3 className='text-xl font-bold text-white mb-2'>Secure Portfolio Locked</h3>
                                <p className='text-gray-500 max-w-md mb-6'>Login to create custom tabs, add assets and track your wealth securely.</p>
                                <button onClick={() => setAuthModalOpen(true)} className='text-encra-gold hover:underline font-bold'>Authenticate Access &rarr;</button>
                            </div>
                        ) : displayedAssets.length === 0 ? (
                            <div className='flex flex-col items-center justify-center h-64 text-center text-gray-500'>
                                <div className='mb-4 opacity-20 text-6xl'>👻</div>
                                <p>No assets found in <b>{activeCategory}</b>.</p>
                            </div>
                        ) : (
                            <table className='w-full text-left'>
                                <thead className='bg-encra-900 text-xs text-gray-500 uppercase font-bold border-b border-encra-800'>
                                    <tr><th className='p-5'>Asset</th><th className='p-5 text-right'>Price</th><th className='p-5 text-right'>Holdings</th><th className='p-5 text-right'>Value</th><th className='p-5 text-right'>PnL</th></tr>
                                </thead>
                                <tbody className='divide-y divide-encra-800'>
                                    {displayedAssets.map((asset, i) => (
                                        <tr key={i} className='hover:bg-encra-800/50 transition-colors'>
                                            <td className='p-5'><div className='flex items-center gap-4'><img src={asset.image} className='w-10 h-10 rounded-full'/><div><div className='font-bold text-white'>{asset.name}</div><div className='text-xs text-gray-500'>{asset.symbol.toUpperCase()}</div></div></div></td>
                                            <td className='p-5 text-right font-mono text-gray-400'>${asset.current_price.toLocaleString()}</td>
                                            <td className='p-5 text-right font-mono text-white'>{asset.amount}</td>
                                            <td className='p-5 text-right font-mono font-bold text-white'>${asset.currentValue.toLocaleString()}</td>
                                            <td className={`p-5 text-right font-mono font-bold ${asset.pnl >= 0 ? 'text-encra-success' : 'text-encra-danger'}`}>{asset.pnl >= 0 ? '+' : ''}{asset.pnl.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </main>
            {newTabModalOpen && (
                <div className='fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4'>
                    <div className='bg-encra-900 w-full max-w-sm rounded-2xl border border-encra-800 shadow-2xl p-6'>
                        <h3 className='text-lg font-bold text-white mb-4'>Create New Tab</h3>
                        <input type='text' value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} placeholder='e.g. RWA, Gaming...' className='w-full bg-black border border-encra-800 rounded-xl p-3 text-white mb-4 focus:border-encra-gold outline-none' autoFocus />
                        <div className='flex gap-2'><button onClick={() => setNewTabModalOpen(false)} className='flex-1 bg-encra-800 text-white py-3 rounded-xl font-bold'>Cancel</button><button onClick={handleAddCategory} className='flex-1 bg-encra-gold text-black py-3 rounded-xl font-bold'>Create</button></div>
                    </div>
                </div>
            )}
            {modalOpen && (
                <div className='fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4'>
                    <div className='bg-encra-900 w-full max-w-lg rounded-2xl border border-encra-800 shadow-2xl relative overflow-visible'>
                        <button onClick={() => setModalOpen(false)} className='absolute right-4 top-4 text-gray-500 hover:text-white z-50'><Icon name='search' className='rotate-45'/></button>
                        <div className='p-6'>
                            <h2 className='text-xl font-bold text-white mb-6'>Add Asset to <span className='text-encra-gold'>{activeCategory}</span></h2>
                            <form onSubmit={handleAddAsset} className='space-y-4'>
                                <div className='relative z-50'><label className='text-xs text-gray-500 font-bold uppercase block mb-2'>Search Coin</label><input type='text' value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setSelectedSearchCoin(null); }} placeholder='e.g. Pepe, Render...' className='w-full bg-black border border-encra-800 rounded-xl p-4 text-white outline-none focus:border-encra-gold' />{searchTerm && filteredCoins.length > 0 && !selectedSearchCoin && (<div className='absolute left-0 right-0 mt-2 bg-encra-800 border border-encra-800 rounded-xl z-50 max-h-48 overflow-y-auto shadow-xl'>{filteredCoins.map(c => (<div key={c.id} onClick={() => { setSelectedSearchCoin(c); setSearchTerm(c.name); }} className='p-3 hover:bg-black cursor-pointer flex items-center gap-3 border-b border-encra-900 last:border-0'><img src={c.image} className='w-6 h-6 rounded-full'/> <div><div className='text-white font-bold text-sm'>{c.name}</div></div></div>))}</div>)}</div>
                                {selectedSearchCoin && <div className='text-encra-gold text-sm font-bold'>Selected: {selectedSearchCoin.name}</div>}
                                <div className='grid grid-cols-2 gap-4'><div><label className='text-xs text-gray-500 font-bold uppercase block mb-2'>Amount</label><input type='number' required value={formAmount} onChange={e => setFormAmount(e.target.value)} className='w-full bg-black border border-encra-800 rounded-xl p-4 text-white font-mono' placeholder='0.00' /></div><div><label className='text-xs text-gray-500 font-bold uppercase block mb-2'>Avg Price</label><input type='number' required value={formPrice} onChange={e => setFormPrice(e.target.value)} className='w-full bg-black border border-encra-800 rounded-xl p-4 text-white font-mono' placeholder='0.00' /></div></div>
                                <button disabled={!selectedSearchCoin || isAddingZama} type='submit' className='w-full bg-encra-gold hover:bg-white hover:text-black text-black font-bold py-4 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2'>
                                    {isAddingZama ? 'Encrypting & Signing...' : 'Add to Portfolio'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {aiModalOpen && (
                <div className='fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4'>
                    <div className='bg-encra-900 w-full max-w-2xl rounded-2xl border border-purple-500/30 shadow-2xl flex flex-col max-h-[80vh]'>
                        <div className='p-6 border-b border-encra-800 flex justify-between items-center bg-purple-900/10'>
                            <div className='flex items-center gap-3'><div className='w-8 h-8 bg-purple-600 rounded flex items-center justify-center text-white'><Icon name='sparkles' size={18}/></div><h3 className='font-bold text-white'>Gemini AI Analysis</h3></div>
                            <button onClick={() => setAiModalOpen(false)} className='text-gray-500 hover:text-white'><Icon name='search' className='rotate-45'/></button>
                        </div>
                        <div className='p-8 overflow-y-auto flex-1 bg-black text-gray-300 font-mono text-sm leading-relaxed'>
                            {aiLoading ? <div className='flex flex-col items-center justify-center h-64 gap-4 text-purple-500 animate-pulse'>Analyzing encrypted data...</div> : <div dangerouslySetInnerHTML={{ __html: marked.parse(aiAnalysis) }} />}
                        </div>
                    </div>
                </div>
            )}
            {authModalOpen && (
                <div className='fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4'>
                    <div className='bg-encra-900 w-full max-w-md rounded-2xl border border-encra-800 shadow-2xl'>
                        <button onClick={() => setAuthModalOpen(false)} className='absolute right-4 top-4 text-gray-500 hover:text-white'><Icon name='search' className='rotate-45'/></button>
                        <div className='p-8 text-center'>
                            <h2 className='text-2xl font-bold text-white mb-8'>Connect Wallet</h2>
                            <div className='space-y-3'>
                                <button onClick={() => handleWalletConnect('EVM')} className='w-full p-4 bg-encra-800 hover:bg-encra-700 rounded-xl flex items-center justify-center gap-3 border border-transparent hover:border-orange-500/30 transition-all'><div className='text-orange-500'><Icon name='plus' size={18}/></div><div className='text-white font-bold'>EVM Wallet (MetaMask)</div></button>
                                <button onClick={() => handleWalletConnect('SOL')} className='w-full p-4 bg-encra-800 hover:bg-encra-700 rounded-xl flex items-center justify-center gap-3 border border-transparent hover:border-purple-500/30 transition-all'><div className='text-purple-500'><Icon name='plus' size={18}/></div><div className='text-white font-bold'>Solana Wallet (Phantom)</div></button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

