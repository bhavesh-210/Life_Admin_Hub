import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLifeAdmin } from '../context/LifeAdminContext';
import GlobalSearch from './GlobalSearch';

export default function Sidebar({ isMobileMenuOpen, setIsMobileMenuOpen }) {
    const navigate = useNavigate();
    const { profile, settings, updateSetting } = useLifeAdmin();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Compute avatar initials live from the name — never stale
    const liveAvatar = profile.name
        ? profile.name.trim().split(/\s+/).map(w => w[0]).join('').toUpperCase().slice(0, 2)
        : '?';

    // Cmd+K / Ctrl+K global shortcut
    useEffect(() => {
        const handler = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(open => !open);
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    const linkClasses = ({ isActive }) =>
        `sidebar-link ${isActive ? 'active' : ''}`;

    const handleLinkClick = () => {
        if (setIsMobileMenuOpen) setIsMobileMenuOpen(false);
    };

    return (
        <>
            <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

            {/* Mobile Backdrop Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}

            <aside className={`sidebar z-50 fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
                <div className="flex flex-col h-full">
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3 cursor-pointer" onClick={() => { navigate('/dashboard'); handleLinkClick(); }}>
                                <div className="w-9 h-9 border-[1.5px] border-slate-900 dark:border-slate-100 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 flex items-center justify-center font-black text-xl rounded">
                                    L
                                </div>
                                <span className="sidebar-logo">Admin Hub</span>
                            </div>
                            <button
                                className="md:hidden p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>

                        <div className="flex flex-col gap-2">
                            {/* Search Button */}
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="flex items-center gap-3 w-full px-3 py-2.5 rounded border-[1.5px] border-slate-900/10 dark:border-slate-100/10 hover:border-slate-900 dark:hover:border-slate-100 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all text-xs font-mono mb-1 group"
                            >
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                                <span className="flex-1 text-left">Search...</span>
                                <kbd className="hidden md:flex items-center gap-0.5 border border-slate-300 dark:border-slate-600 rounded px-1 py-0.5 text-[9px] bg-slate-50 dark:bg-slate-900 group-hover:border-slate-900 dark:group-hover:border-slate-100 transition-colors">⌘K</kbd>
                            </button>

                            <NavLink className={linkClasses} to="/dashboard" onClick={handleLinkClick}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                Dashboard
                            </NavLink>

                            <NavLink className={linkClasses} to="/bills" onClick={handleLinkClick}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                                Bills
                            </NavLink>

                            <NavLink className={linkClasses} to="/documents" onClick={handleLinkClick}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                Documents
                            </NavLink>

                            <NavLink className={linkClasses} to="/renewals" onClick={handleLinkClick}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                                Renewals
                            </NavLink>

                            <NavLink className={linkClasses} to="/appointments" onClick={handleLinkClick}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                Appointments
                            </NavLink>

                            <NavLink className={linkClasses} to="/diary" onClick={handleLinkClick}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.754 18 18.168 18.477 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                                Diary
                            </NavLink>

                            <NavLink className={linkClasses} to="/profile" onClick={handleLinkClick}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                Profile
                            </NavLink>
                        </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-4 gap-2">
                            <div className="flex items-center gap-2 truncate">
                                <div className="w-8 h-8 border-[1.5px] border-slate-900 dark:border-slate-100 flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 bg-white dark:bg-slate-800 rounded">
                                    {liveAvatar}
                                </div>
                                <div className="truncate">
                                    <div className="font-extrabold text-xs text-slate-900 dark:text-slate-100 truncate">{profile.name}</div>
                                    <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate">{profile.email}</div>
                                </div>
                            </div>
                            <button
                                onClick={() => updateSetting('darkMode', !settings.darkMode)}
                                className="btn p-1.5 text-xs flex-shrink-0"
                                title={settings.darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                            >
                                {settings.darkMode ? (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-3.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                ) : (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                                )}
                            </button>
                        </div>
                        <button
                            className="flex items-center gap-2 px-3 py-2 rounded font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:bg-rose-500/10 dark:hover:bg-rose-500/20 hover:text-rose-500 transition-all w-full text-left"
                            onClick={() => window.location.href = '/'}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
