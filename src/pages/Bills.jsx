import { useState } from 'react';
import useAutomation from '../hooks/useAutomation';
import { billsData } from '../data/demoData';
import BillCard from '../components/BillCard';

export default function Bills() {
    const { paidBills } = useAutomation();
    // Merge both for unified state management
    const [bills, setBills] = useState([...paidBills, ...billsData]);
    const [search, setSearch] = useState('');
    
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
    const [syncState, setSyncState] = useState('idle'); // idle, syncing, success

    const filteredBills = bills.filter((bill) =>
        bill.name.toLowerCase().includes(search.toLowerCase()),
    );

    function toggleStatus(id) {
        const updatedBills = bills.map((bill) => {
            if (bill.id === id) {
                return { ...bill, status: bill.status === 'Paid' ? 'Unpaid' : 'Paid' };
            }
            return bill;
        });
        setBills(updatedBills);
    }

    const handleAddManual = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newBill = {
            id: Date.now().toString(),
            name: formData.get('name'),
            category: formData.get('category'),
            amount: parseInt(formData.get('amount')),
            dueDate: formData.get('dueDate'),
            status: 'Unpaid'
        };
        setBills([newBill, ...bills]);
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
            setBills([mockExtractedBill, ...bills]);
            setSyncState('success');
            setTimeout(() => {
                setIsSyncModalOpen(false);
                setSyncState('idle');
            }, 1500);
        }, 2000);
    };

    return (
        <div className="w-full max-w-5xl mx-auto pb-12">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-5xl font-extrabold text-[#0f172a] tracking-tight mb-2">Bills</h1>
                    <p className="text-lg text-[#475569]">{bills.length} bills in total</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={() => setIsSyncModalOpen(true)} className="bg-white border border-slate-200 text-slate-700 font-bold px-6 py-3 rounded-full hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
                        <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        Sync Email
                    </button>
                    <button onClick={() => setIsAddModalOpen(true)} className="bg-[#0f172a] text-white font-bold px-6 py-3 rounded-full hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">
                        Add Bill
                    </button>
                </div>
            </div>

            <div className="glass-pane bg-white/40 backdrop-blur-[20px] border border-white/60 rounded-[32px] p-8 shadow-xl">
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search bills..."
                        className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-slate-700 placeholder-slate-400"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="space-y-4">
                    {filteredBills.map((bill) => (
                        <BillCard key={bill.id} bill={bill} toggleStatus={toggleStatus} />
                    ))}
                </div>
            </div>

            {/* Manual Add Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center" onClick={(e) => { if (e.target === e.currentTarget) setIsAddModalOpen(false)}}>
                    <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-8 rounded-[32px] shadow-2xl w-full max-w-md animate-popIn relative">
                        <button onClick={() => setIsAddModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-700"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                        <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Add Bill Manually</h2>
                        <form onSubmit={handleAddManual} className="space-y-4">
                            <div><label className="block text-sm font-bold text-slate-700 mb-1">Bill Name</label><input name="name" type="text" className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500" required /></div>
                            <div><label className="block text-sm font-bold text-slate-700 mb-1">Category</label><input name="category" type="text" className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500" required /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-sm font-bold text-slate-700 mb-1">Amount (₹)</label><input name="amount" type="number" className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500" required /></div>
                                <div><label className="block text-sm font-bold text-slate-700 mb-1">Due Date</label><input name="dueDate" type="text" placeholder="e.g. 15 Oct" className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500" required /></div>
                            </div>
                            <button type="submit" className="w-full bg-[#0f172a] text-white font-bold rounded-xl px-4 py-3 mt-4 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">Save Bill</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Sync Email Modal */}
            {isSyncModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center" onClick={(e) => { if (e.target === e.currentTarget && syncState !== 'syncing') setIsSyncModalOpen(false)}}>
                    <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-8 rounded-[32px] shadow-2xl w-full max-w-sm animate-popIn text-center">
                        {syncState === 'idle' && (
                            <>
                                <div className="w-16 h-16 mx-auto rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                </div>
                                <h2 className="text-xl font-extrabold text-slate-900 mb-2">Connect Gmail</h2>
                                <p className="text-sm text-slate-500 mb-6">We will securely scan your inbox for the latest invoices and receipts.</p>
                                <button onClick={handleSyncEmail} className="w-full bg-indigo-600 text-white font-bold rounded-xl px-4 py-3 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/30">Start Scan</button>
                            </>
                        )}
                        {syncState === 'syncing' && (
                            <div className="py-8">
                                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                                <h2 className="text-xl font-extrabold text-slate-900">Scanning Inbox...</h2>
                                <p className="text-sm text-slate-500 mt-2">Looking for recent transactions.</p>
                            </div>
                        )}
                        {syncState === 'success' && (
                            <div className="py-6">
                                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <h2 className="text-xl font-extrabold text-slate-900">1 Bill Found!</h2>
                                <p className="text-sm text-slate-500 mt-2">Amazon Prime Yearly added to your bills.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
