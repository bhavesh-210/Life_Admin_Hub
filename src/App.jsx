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
import Sidebar from './components/Sidebar';


// ProtectedRoute
function ProtectedRoute({ isLoggedIn, children }) {
    if (!isLoggedIn) return <Navigate to="/" />;

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-grow ml-64 p-8 relative z-10 transition-colors duration-300 text-slate-900 dark:text-slate-100">{children}</div>
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
                <Route path="/profile" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Profile /></ProtectedRoute>} />


                {/* Default fallback */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>

            {/* Notification Toasts */}
            <Toast />
        </div>
    );
}

