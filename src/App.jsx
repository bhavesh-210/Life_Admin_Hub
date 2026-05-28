// App root: routes and protected layout
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLifeAdmin } from './context/LifeAdminContext';
import Toast from './components/Toast';

import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Bills from './pages/Bills';
import Documents from './pages/Documents';
import Renewals from './pages/Renewals';
import Appointments from './pages/Appointments';
import Profile from './pages/Profile';
import Diary from './pages/Diary';
import CalorieTracker from './pages/CalorieTracker';
import Sidebar from './components/Sidebar';
import GlobalSearch from './components/GlobalSearch';


// ProtectedRoute
function ProtectedRoute({ isLoggedIn, children }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

    if (!isLoggedIn) return <Navigate to="/" />;

    return (
        <div className="flex min-h-screen relative">
            <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
            <GlobalSearch isOpen={isMobileSearchOpen} onClose={() => setIsMobileSearchOpen(false)} />
            
            <div className="flex-1 flex flex-col min-w-0 md:ml-[260px] relative z-10 transition-colors duration-300 text-slate-900 dark:text-slate-100">
                {/* Mobile Top Bar */}
                <div className="md:hidden flex items-center justify-between p-4 border-b-[1.5px] border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-950 sticky top-0 z-20 shadow-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 border-[1.5px] border-slate-900 dark:border-slate-100 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 flex items-center justify-center font-black text-lg rounded">
                            L
                        </div>
                        <span className="sidebar-logo text-lg">Admin Hub</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Mobile Search Button */}
                        <button
                            onClick={() => setIsMobileSearchOpen(true)}
                            className="p-1.5 border-[1.5px] border-slate-900 dark:border-slate-100 rounded bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </button>
                        {/* Mobile Menu Button */}
                        <button 
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="p-1.5 border-[1.5px] border-slate-900 dark:border-slate-100 rounded bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="flex-grow p-4 md:p-8 overflow-x-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { settings } = useLifeAdmin();

    // Toggle dark class and apply custom theme variables on root
    useEffect(() => {
        if (settings?.darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        const root = document.documentElement;
        root.style.setProperty('--theme-accent', settings?.themeAccent || '#6366f1');
        root.style.setProperty('--theme-hover', settings?.themeHover || 'rgba(99, 102, 241, 0.08)');
        root.style.setProperty('--theme-hover-dark', settings?.themeHoverDark || 'rgba(99, 102, 241, 0.22)');
        root.style.setProperty('--blob-1', settings?.blob1Color || '#a5b4fc');
        root.style.setProperty('--blob-2', settings?.blob2Color || '#a5f3fc');
        root.style.setProperty('--blob-3', settings?.blob3Color || '#fbcfe8');
        root.style.setProperty('--bg-page', settings?.lightBgStyle === 'white' ? '#ffffff' : '#f7f5f0');
        root.style.setProperty('--bg-dark-page', settings?.darkBgStyle === 'carbon' ? '#0a0a0a' : '#020617');
    }, [settings]);

    return (
        <div className="relative min-h-screen overflow-x-hidden flex flex-col transition-colors duration-300 text-slate-900 dark:text-slate-100">
            {/* Global Swiss Grid Background Engine */}
            <div className="swiss-grid-background"></div>

            <Routes>
                <Route path="/" element={<Landing setIsLoggedIn={setIsLoggedIn} />} />

                {/* Protected app routes */}
                <Route path="/dashboard" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Dashboard /></ProtectedRoute>} />
                <Route path="/bills" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Bills /></ProtectedRoute>} />
                <Route path="/documents" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Documents /></ProtectedRoute>} />
                <Route path="/renewals" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Renewals /></ProtectedRoute>} />
                <Route path="/appointments" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Appointments /></ProtectedRoute>} />
                <Route path="/diary" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Diary /></ProtectedRoute>} />
                <Route path="/calories" element={<ProtectedRoute isLoggedIn={isLoggedIn}><CalorieTracker /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Profile /></ProtectedRoute>} />


                {/* Default fallback */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>

            {/* Notification Toasts */}
            <Toast />
        </div>
    );
}

