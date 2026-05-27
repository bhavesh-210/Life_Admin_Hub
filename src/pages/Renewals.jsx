import { useState } from 'react';
import { useLifeAdmin } from '../context/LifeAdminContext';

export default function Renewals() {
    const { renewals = [], addRenewal, deleteRenewal } = useLifeAdmin();
    const [search, setSearch] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const filteredRenewals = renewals.filter((r) => 
        r.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleAdd = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        addRenewal({
            id: Date.now().toString(),
            name: formData.get('name'),
            category: formData.get('category'),
            date: formData.get('date'),
            status: 'Scheduled'
        });
        setIsAddModalOpen(false);
    };

    const getIcon = (category) => {
        if (category === 'Insurance') {
            return (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            );
        }
        if (category === 'Subscription') {
            return (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            );
        }
        return (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1"></path></svg>
        );
    };

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Renewals</h1>
                    <p className="page-subtitle">// TRACK SYSTEM CONTRACT DEADLINES & AUTOPAY SCHEDULE NODES</p>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={() => setIsAddModalOpen(true)} 
                        className="btn btn-dark flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
                        Add Renewal
                    </button>
                </div>
            </div>

            {/* Metrics Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="card shadow-[3px_3px_0_0_rgba(15,23,42,0.05)]">
                    <h3 className="text-xs font-mono font-bold uppercase opacity-60 mb-2">// Total Renewals</h3>
                    <p className="text-3xl font-black font-mono text-slate-800 dark:text-slate-100">{renewals.length}</p>
                </div>
                <div className="card shadow-[3px_3px_0_0_rgba(15,23,42,0.05)]">
                    <h3 className="text-xs font-mono font-bold uppercase opacity-60 mb-2">// Due Soon</h3>
                    <p className="text-3xl font-black font-mono text-rose-600 dark:text-rose-450">{renewals.filter(r => r.status === 'Due Soon').length}</p>
                </div>
            </div>

            <div className="card shadow-[4px_4px_0_0_rgba(15,23,42,0.05)]">
                <div className="mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
                    <div className="w-full sm:w-72">
                        <input
                            type="text"
                            placeholder="Search renewals..."
                            className="input"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filteredRenewals.map((renewal) => (
                        <div key={renewal.id} className="editorial-card p-6 flex flex-col items-start shadow-[3px_3px_0_0_rgba(15,23,42,0.05)] relative group transition-all hover:-translate-y-1">
                            <button 
                                onClick={() => deleteRenewal(renewal.id)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                            <div className={`w-10 h-10 border-[1.5px] border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-800 flex items-center justify-center rounded mb-4 ${renewal.category === 'Insurance' ? 'text-emerald-500' : renewal.category === 'Subscription' ? 'text-rose-500' : 'text-blue-500'}`}>
                                {getIcon(renewal.category)}
                            </div>
                            <h2 className="font-extrabold text-lg uppercase tracking-wide pr-8">{renewal.name}</h2>
                            <p className="mt-2 text-xs font-mono opacity-65 uppercase">Renew before: {renewal.date}</p>
                            <span className={`badge mt-4 font-mono ${renewal.status === 'Due Soon' ? 'badge-red' : 'badge-blue'}`}>
                                {renewal.status}
                            </span>
                        </div>
                    ))}
                    {filteredRenewals.length === 0 && (
                        <div className="col-span-1 md:col-span-3 text-center py-12 text-slate-400 dark:text-slate-500">
                            <svg className="w-10 h-10 mx-auto mb-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            <p className="font-extrabold uppercase tracking-tight text-sm">No match</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Manual Add Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) setIsAddModalOpen(false)}}>
                    <div className="auth-card relative animate-popIn">
                        <button onClick={() => setIsAddModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                        <h2 className="text-2xl font-extrabold uppercase tracking-tight mb-2">// Add Renewal</h2>
                        <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-6">Schedule a new renewal tracker.</p>
                        <form onSubmit={handleAdd} className="space-y-4">
                            <div>
                                <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1">Name</label>
                                <input name="name" type="text" className="input" placeholder="e.g. Disney+" required />
                            </div>
                            <div>
                                <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1">Category</label>
                                <select name="category" className="input font-bold uppercase tracking-wide">
                                    <option value="Subscription">Subscription</option>
                                    <option value="Insurance">Insurance</option>
                                    <option value="Document">Document</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1">Renewal Date</label>
                                <input name="date" type="text" placeholder="e.g. 15 Aug 2026" className="input" required />
                            </div>
                            <button type="submit" className="w-full btn btn-dark mt-2">Create Tracker</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
