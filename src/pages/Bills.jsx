import { useState } from 'react';
import { useLifeAdmin } from '../context/LifeAdminContext';
import BillCard from '../components/BillCard';

export default function Bills() {
    const { bills, addBill, toggleBillStatus } = useLifeAdmin();
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All'); // All, Utility, Subscription, Vehicle, Phone, Other
    const [statusFilter, setStatusFilter] = useState('All'); // All, Paid, Unpaid
    
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
    const [syncState, setSyncState] = useState('idle'); // idle, syncing, success

    const categories = ['All', 'Utility', 'Subscription', 'Vehicle', 'Phone', 'Other'];

    // Calculate metrics
    const totalUnpaid = bills.filter(b => b.status === 'Unpaid').reduce((sum, b) => sum + b.amount, 0);
    const totalPaid = bills.filter(b => b.status === 'Paid').reduce((sum, b) => sum + b.amount, 0);
    const overallTotal = bills.reduce((sum, b) => sum + b.amount, 0);

    // Helper to count items per category
    const getCount = (cat) => {
        if (cat === 'All') return bills.length;
        return bills.filter(b => {
            const billCat = b.category?.toLowerCase();
            const filterCat = cat.toLowerCase();
            if (filterCat === 'subscription') {
                return billCat === 'subscription' || billCat === 'ott';
            }
            return billCat === filterCat;
        }).length;
    };

    const filteredBills = bills.filter((bill) => {
        const matchesSearch = bill.name.toLowerCase().includes(search.toLowerCase());
        
        // Category filter
        let matchesCategory;
        if (selectedCategory === 'All') {
            matchesCategory = true;
        } else {
            const billCat = bill.category?.toLowerCase();
            const selectedCatLower = selectedCategory.toLowerCase();
            if (selectedCatLower === 'subscription') {
                matchesCategory = billCat === 'subscription' || billCat === 'ott';
            } else {
                matchesCategory = billCat === selectedCatLower;
            }
        }

        // Status filter
        const matchesStatus = statusFilter === 'All' || bill.status === statusFilter;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    const handleAddManual = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newBill = {
            id: Date.now().toString(),
            name: formData.get('name'),
            category: formData.get('category'),
            amount: parseInt(formData.get('amount')) || 0,
            dueDate: formData.get('dueDate'),
            status: 'Unpaid'
        };
        addBill(newBill);
        setIsAddModalOpen(false);
    };

    const handleSyncEmail = () => {
        setSyncState('syncing');
        setTimeout(() => {
            const mockExtractedBill = {
                id: Date.now().toString(),
                name: 'Amazon Prime Yearly',
                category: 'Subscription',
                amount: 1499,
                dueDate: '15 Oct',
                status: 'Paid'
            };
            addBill(mockExtractedBill);
            setSyncState('success');
            setTimeout(() => {
                setIsSyncModalOpen(false);
                setSyncState('idle');
            }, 1500);
        }, 2000);
    };

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Bills & Outflows</h1>
                    <p className="page-subtitle">// TRACK AND PAY TRANSACTION NODES, SUBSCRIPTIONS, AND INVOICES</p>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={() => setIsSyncModalOpen(true)} 
                        className="btn flex items-center gap-2"
                    >
                        <svg className="w-4 h-4 text-customAccent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Sync Email
                    </button>
                    <button 
                        onClick={() => setIsAddModalOpen(true)} 
                        className="btn btn-dark"
                    >
                        Add Bill
                    </button>
                </div>
            </div>

            {/* Metrics Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="card shadow-[3px_3px_0_0_rgba(15,23,42,0.05)]">
                    <h3 className="text-xs font-mono font-bold uppercase opacity-60 mb-2">// Unpaid Balance</h3>
                    <p className="text-3xl font-black font-mono text-rose-600 dark:text-rose-450">₹{totalUnpaid.toLocaleString()}</p>
                </div>
                <div className="card shadow-[3px_3px_0_0_rgba(15,23,42,0.05)]">
                    <h3 className="text-xs font-mono font-bold uppercase opacity-60 mb-2">// Paid This Month</h3>
                    <p className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-450">₹{totalPaid.toLocaleString()}</p>
                </div>
                <div className="card shadow-[3px_3px_0_0_rgba(15,23,42,0.05)]">
                    <h3 className="text-xs font-mono font-bold uppercase opacity-60 mb-2">// Total Managed</h3>
                    <p className="text-3xl font-black font-mono text-slate-800 dark:text-slate-100">₹{overallTotal.toLocaleString()}</p>
                </div>
            </div>

            {/* Category selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {categories.map((cat) => {
                    const count = getCount(cat);
                    const isActive = selectedCategory === cat;
                    return (
                        <div 
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`border-[1.5px] p-3 rounded flex flex-col justify-between cursor-pointer transition-all duration-200 select-none ${
                                isActive 
                                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900 dark:border-slate-100 translate-y-[-2px] shadow-[3px_3px_0_0_var(--theme-accent)]' 
                                    : 'bg-white dark:bg-slate-900 border-slate-900/10 dark:border-slate-100/10 text-slate-800 dark:text-slate-200 hover:border-slate-900 dark:hover:border-slate-100'
                            }`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-7 h-7 rounded flex items-center justify-center ${isActive ? 'bg-white/20 text-white dark:bg-slate-900/10 dark:text-slate-900' : 'bg-slate-50 dark:bg-slate-800 border-[1.5px] border-slate-900/10 dark:border-slate-100/10'}`}>
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                                    </svg>
                                </div>
                                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${isActive ? 'bg-white/30 text-white dark:bg-slate-900/20' : 'bg-slate-50 dark:bg-slate-800 border border-slate-900/10 dark:border-slate-100/10 text-slate-500'}`}>
                                    {count}
                                </span>
                            </div>
                            <span className="font-extrabold text-xs uppercase tracking-wide">{cat === 'All' ? 'All' : cat}</span>
                        </div>
                    );
                })}
            </div>

            {/* Main Bills List Container */}
            <div className="card shadow-[4px_4px_0_0_rgba(15,23,42,0.05)]">
                {/* Search & Tabs bar */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
                    <div className="w-full sm:w-72">
                        <input
                            type="text"
                            placeholder="Search invoices..."
                            className="input"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    
                    <div className="swiss-tab w-full sm:w-auto">
                        {['All', 'Paid', 'Unpaid'].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setStatusFilter(filter)}
                                className={`swiss-tab-item flex-1 sm:flex-initial ${
                                    statusFilter === filter ? 'active' : ''
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid list of bills */}
                {bills.length === 0 ? (
                    <div className="text-center py-16 px-4 bg-slate-50 dark:bg-slate-900/50 border-[1.5px] border-dashed border-slate-300 dark:border-slate-700 rounded mb-8">
                        <svg className="w-16 h-16 mx-auto mb-4 text-slate-400 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                        <h3 className="font-extrabold uppercase tracking-tight text-lg mb-2">No Bills Found</h3>
                        <p className="text-xs font-mono text-slate-500 mb-6 max-w-sm mx-auto">Your billing registry is empty. Initialize by adding a new bill to track upcoming payments and history.</p>
                        <button onClick={() => setIsAddModalOpen(true)} className="btn btn-dark">Initialize Bill</button>
                    </div>
                ) : filteredBills.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredBills.map((bill) => (
                            <BillCard key={bill.id} bill={bill} toggleStatus={toggleBillStatus} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-slate-400 dark:text-slate-500">
                        <svg className="w-10 h-10 mx-auto mb-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <p className="font-extrabold uppercase tracking-tight text-sm">No node match</p>
                        <p className="text-xs font-mono opacity-60 mt-1">Try modifying filter scopes or query key.</p>
                    </div>
                )}
            </div>

            {/* Manual Add Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) setIsAddModalOpen(false)}}>
                    <div className="auth-card relative animate-popIn">
                        <button onClick={() => setIsAddModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                        <h2 className="text-2xl font-extrabold uppercase tracking-tight mb-2">// Add Bill</h2>
                        <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-6">Append new invoice node to register.</p>
                        <form onSubmit={handleAddManual} className="space-y-4">
                            <div>
                                <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1">Bill Name</label>
                                <input name="name" type="text" className="input" placeholder="e.g. Electric Corp" required />
                            </div>
                            <div>
                                <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1">Category</label>
                                <select name="category" className="input font-bold uppercase tracking-wide">
                                    <option value="Utility">Utility</option>
                                    <option value="Subscription">Subscription</option>
                                    <option value="Vehicle">Vehicle</option>
                                    <option value="Phone">Phone</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1">Amount (₹)</label>
                                    <input name="amount" type="number" className="input" placeholder="1200" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1">Due Date</label>
                                    <input name="dueDate" type="text" placeholder="e.g. 15 Jun" className="input" required />
                                </div>
                            </div>
                            <button type="submit" className="w-full btn btn-dark mt-2">Write Node Entry</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Sync Email Modal */}
            {isSyncModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget && syncState !== 'syncing') setIsSyncModalOpen(false)}}>
                    <div className="auth-card text-center relative animate-popIn">
                        {syncState === 'idle' && (
                            <>
                                <div className="w-12 h-12 mx-auto border-[1.5px] border-slate-900 dark:border-slate-100 flex items-center justify-center text-customAccent bg-slate-50 dark:bg-slate-800 rounded mb-4">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                </div>
                                <h2 className="text-xl font-extrabold uppercase tracking-tight mb-2">// Sync Inbox</h2>
                                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-6">Scans linked email registry for invoice node receipts.</p>
                                <button onClick={handleSyncEmail} className="w-full btn btn-dark">Initialize Sync Scanner</button>
                            </>
                        )}
                        {syncState === 'syncing' && (
                            <div className="py-6">
                                <div className="w-10 h-10 border-2 border-customAccent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <h2 className="text-xl font-extrabold uppercase tracking-tight">// Processing Node...</h2>
                                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-2">Analyzing email metadata logs.</p>
                            </div>
                        )}
                        {syncState === 'success' && (
                            <div className="py-4">
                                <div className="w-12 h-12 mx-auto border-[1.5px] border-emerald-600 flex items-center justify-center text-emerald-600 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400 rounded mb-4">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <h2 className="text-xl font-extrabold uppercase tracking-tight">// Sync Success</h2>
                                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-2">Amazon Prime Yearly added successfully.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
