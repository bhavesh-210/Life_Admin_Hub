// App root: routes and protected layout
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Bills from './pages/Bills';
import Documents from './pages/Documents';
import Renewals from './pages/Renewals';
import Appointments from './pages/Appointments';
import Profile from './pages/Profile';
import Sidebar from './components/Sidebar';

// ProtectedRoute
function ProtectedRoute({ isLoggedIn, children }) {
    if (!isLoggedIn) return <Navigate to="/" />;

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-grow ml-64 p-8 relative z-10">{children}</div>
        </div>
    );
}

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className="relative min-h-screen overflow-x-hidden flex flex-col">
            {/* Global Ambient Background Engine */}
            <div className="ambient-engine fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="color-blob indigo-blob"></div>
                <div className="color-blob cyan-blob"></div>
                <div className="color-blob pink-blob"></div>
            </div>

            <Routes>
                <Route path="/" element={<Landing setIsLoggedIn={setIsLoggedIn} />} />

                {/* Protected app routes */}
                <Route path="/dashboard" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Dashboard /></ProtectedRoute>} />
                <Route path="/bills" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Bills /></ProtectedRoute>} />
                <Route path="/documents" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Documents /></ProtectedRoute>} />
                <Route path="/renewals" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Renewals /></ProtectedRoute>} />
                <Route path="/appointments" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Appointments /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Profile /></ProtectedRoute>} />

                {/* Default fallback */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}
