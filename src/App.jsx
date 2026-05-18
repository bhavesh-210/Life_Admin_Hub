import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Bills from './pages/Bills';
import Documents from './pages/Documents';
import Renewals from './pages/Renewals';
import Appointments from './pages/Appointments';
import Sidebar from './components/Sidebar';

function ProtectedRoute({ isLoggedIn, children }) {
    if (!isLoggedIn) return <Navigate to="/login" />;

    return (
        <div className="layout">
            <Sidebar />
            <div className="main-content">{children}</div>
        </div>
    );
}

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route
                path="/login"
                element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
                path="/signup"
                element={<Signup setIsLoggedIn={setIsLoggedIn} />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/bills"
                element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Bills />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/documents"
                element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Documents />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/renewals"
                element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Renewals />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/appointments"
                element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Appointments />
                    </ProtectedRoute>
                }
            />

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}
