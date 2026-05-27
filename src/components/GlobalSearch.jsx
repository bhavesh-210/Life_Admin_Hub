import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLifeAdmin } from '../context/LifeAdminContext';

export default function GlobalSearch({ isOpen, onClose }) {
    const navigate = useNavigate();
    const { bills, documents, renewals, appointments, diaries } = useLifeAdmin();
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef(null);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                setQuery('');
                setActiveIndex(0);
                inputRef.current?.focus();
            }, 10);
        }
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    // Build search results
    const results = useMemo(() => {
        const res = [];
        if (query.trim().length > 0) {
            const q = query.toLowerCase();

            bills.forEach(b => {
                if (b.name?.toLowerCase().includes(q) || b.category?.toLowerCase().includes(q)) {
                    res.push({ type: 'Bill', label: b.name, sub: `${b.category} • ₹${b.amount}`, badge: b.status, badgeType: b.status === 'Paid' ? 'green' : 'red', route: '/bills', icon: 'bill' });
                }
            });

            documents.forEach(d => {
                if (d.title?.toLowerCase().includes(q) || d.type?.toLowerCase().includes(q) || d.notes?.toLowerCase().includes(q)) {
                    res.push({ type: 'Document', label: d.title, sub: `${d.type} • Expires ${d.renewalDate}`, badge: 'Vault', badgeType: 'blue', route: '/documents', icon: 'doc' });
                }
            });

            renewals.forEach(r => {
                if (r.name?.toLowerCase().includes(q) || r.category?.toLowerCase().includes(q)) {
                    res.push({ type: 'Renewal', label: r.name, sub: `${r.category} • ${r.date}`, badge: r.status, badgeType: r.status === 'Due Soon' ? 'red' : 'blue', route: '/renewals', icon: 'renewal' });
                }
            });

            appointments.forEach(a => {
                if (a.title?.toLowerCase().includes(q) || a.category?.toLowerCase().includes(q) || a.notes?.toLowerCase().includes(q)) {
                    res.push({ type: 'Appointment', label: a.title, sub: `${a.category} • ${a.date} at ${a.time}`, badge: 'Scheduled', badgeType: 'blue', route: '/appointments', icon: 'appt' });
                }
            });

            (diaries || []).forEach(d => {
                if (d.title?.toLowerCase().includes(q) || d.content?.toLowerCase().includes(q) || (d.tags || []).some(t => t.toLowerCase().includes(q))) {
                    res.push({ type: 'Diary', label: d.title, sub: d.content?.slice(0, 60) + '...', badge: d.mood || 'Entry', badgeType: 'blue', route: '/diary', icon: 'diary' });
                }
            });
        }
        return res;
    }, [query, bills, documents, renewals, appointments, diaries]);

    // Keyboard navigation
    useEffect(() => {
        const handler = (e) => {
            if (!isOpen) return;
            if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex(i => Math.min(i + 1, results.length - 1)); }
            if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex(i => Math.max(i - 1, 0)); }
            if (e.key === 'Enter' && results[activeIndex]) {
                navigate(results[activeIndex].route);
                onClose();
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [isOpen, results, activeIndex, navigate, onClose]);

    const handleSelect = (route) => {
        navigate(route);
        onClose();
    };

    const getIcon = (type) => {
        switch (type) {
            case 'bill': return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>;
            case 'doc': return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>;
            case 'renewal': return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>;
            case 'appt': return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>;
            case 'diary': return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.754 18 18.168 18.477 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>;
            default: return null;
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-[10vh] px-4"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="w-full max-w-xl bg-white dark:bg-slate-950 border-[1.5px] border-slate-900 dark:border-slate-100 rounded shadow-[6px_6px_0_0_rgba(15,23,42,0.15)] dark:shadow-[6px_6px_0_0_rgba(241,245,249,0.05)] overflow-hidden animate-popIn">
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 py-3.5 border-b-[1.5px] border-slate-900 dark:border-slate-100">
                    <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
                        placeholder="Search bills, documents, renewals, diary..."
                        className="flex-1 bg-transparent outline-none text-sm font-mono text-slate-900 dark:text-slate-100 placeholder-slate-400"
                    />
                    {query && (
                        <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    )}
                    <kbd className="hidden sm:flex items-center gap-1 border border-slate-300 dark:border-slate-700 rounded px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-50 dark:bg-slate-900">ESC</kbd>
                </div>

                {/* Results */}
                <div className="max-h-[55vh] overflow-y-auto">
                    {query.trim() === '' && (
                        <div className="px-4 py-8 text-center">
                            <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">// Type to search across all modules</p>
                            <div className="flex justify-center gap-4 mt-4 flex-wrap">
                                {['Bills', 'Documents', 'Renewals', 'Appointments', 'Diary'].map(cat => (
                                    <span key={cat} className="badge badge-blue font-mono text-[10px]">{cat}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {query.trim() !== '' && results.length === 0 && (
                        <div className="px-4 py-8 text-center">
                            <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">// No results found for "{query}"</p>
                        </div>
                    )}

                    {results.length > 0 && (
                        <ul className="py-2">
                            {results.map((result, idx) => (
                                <li key={idx}>
                                    <button
                                        onClick={() => handleSelect(result.route)}
                                        onMouseEnter={() => setActiveIndex(idx)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                                            idx === activeIndex
                                                ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                                                : 'hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-900 dark:text-slate-100'
                                        }`}
                                    >
                                        {/* Icon */}
                                        <div className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded border-[1.5px] ${
                                            idx === activeIndex
                                                ? 'border-white/30 dark:border-slate-900/30 bg-white/10 dark:bg-slate-900/10'
                                                : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900'
                                        }`}>
                                            {getIcon(result.icon)}
                                        </div>

                                        {/* Text */}
                                        <div className="flex-1 min-w-0">
                                            <div className="font-extrabold text-xs uppercase tracking-wide truncate">{result.label}</div>
                                            <div className={`text-[10px] font-mono truncate mt-0.5 ${idx === activeIndex ? 'opacity-70' : 'opacity-50'}`}>{result.sub}</div>
                                        </div>

                                        {/* Type tag + badge */}
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                                                idx === activeIndex
                                                    ? 'border-white/30 dark:border-slate-900/30 bg-white/10 dark:bg-slate-900/10'
                                                    : 'border-slate-200 dark:border-slate-700'
                                            }`}>{result.type}</span>
                                            <span className={`badge badge-${result.badgeType}`}>{result.badge}</span>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Footer hint */}
                {results.length > 0 && (
                    <div className="px-4 py-2 border-t-[1.5px] border-slate-900/10 dark:border-slate-100/10 flex items-center gap-4 text-[10px] font-mono text-slate-400">
                        <span><kbd className="border border-slate-300 dark:border-slate-600 rounded px-1 bg-slate-50 dark:bg-slate-900">↑↓</kbd> navigate</span>
                        <span><kbd className="border border-slate-300 dark:border-slate-600 rounded px-1 bg-slate-50 dark:bg-slate-900">↵</kbd> select</span>
                        <span><kbd className="border border-slate-300 dark:border-slate-600 rounded px-1 bg-slate-50 dark:bg-slate-900">ESC</kbd> close</span>
                    </div>
                )}
            </div>
        </div>
    );
}
