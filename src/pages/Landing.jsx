import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLifeAdmin } from '../context/LifeAdminContext';

export default function Landing({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const chartRef = useRef(null);
    const { settings, updateSetting, updateProfile } = useLifeAdmin();
    const [chartInstance, setChartInstance] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState('current');
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
    const [spendingAmount, setSpendingAmount] = useState('₹7,397');
    const [amountOpacity, setAmountOpacity] = useState(1);

    const mockData = {
        current: { total: '₹7,397', data: [4200, 3800, 5100, 4800, 6200, 7397] },
        last: { total: '₹6,150', data: [3500, 4100, 4500, 5200, 4900, 6150] },
        prev: { total: '₹5,820', data: [3900, 3600, 4200, 4800, 5100, 5820] }
    };

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonthIdx = new Date().getMonth();
    const monthOptions = [
        { value: 'current', label: monthNames[currentMonthIdx] },
        { value: 'last', label: monthNames[(currentMonthIdx - 1 + 12) % 12] },
        { value: 'prev', label: monthNames[(currentMonthIdx - 2 + 12) % 12] }
    ];

    useEffect(() => {
        if (!chartRef.current || !window.Chart) return;
        
        const ctx = chartRef.current.getContext('2d');
        const accentColor = settings?.themeAccent || '#6366f1';
        
        if (chartInstance) chartInstance.destroy();

        const newChart = new window.Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
                datasets: [{
                    data: mockData.current.data,
                    borderColor: accentColor,
                    borderWidth: 2.5,
                    backgroundColor: 'transparent',
                    fill: false,
                    tension: 0.1, // Less curvy, more industrial
                    pointRadius: 3,
                    pointBackgroundColor: accentColor,
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 1.5,
                    pointHoverRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { enabled: false } },
                scales: { 
                    x: { display: false }, 
                    y: { display: false, min: 3000 } 
                },
                layout: { padding: { top: 10, bottom: 10 } }
            }
        });
        setChartInstance(newChart);

        return () => { if (newChart) newChart.destroy(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [settings?.themeAccent]);

    const handleMonthChange = (e) => {
        const val = e.target.value;
        setSelectedMonth(val);
        setAmountOpacity(0);
        setTimeout(() => {
            setSpendingAmount(mockData[val].total);
            setAmountOpacity(1);
        }, 150);

        if (chartInstance) {
            // eslint-disable-next-line react-hooks/immutability
            chartInstance.data.datasets[0].data = mockData[val].data;
            chartInstance.update();
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        if (email) {
            updateProfile({ email });
        }
        setIsLoggedIn(true);
        navigate('/dashboard');
    };

    const handleSignup = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        if (name || email) {
            updateProfile({ 
                name: name || 'Admin User', 
                email: email || 'admin@example.com' 
            });
        }
        setIsLoggedIn(true);
        navigate('/dashboard');
    };

    return (
        <div className="landing-page">
            {/* Top Navigation */}
            <nav className="top-nav">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="w-9 h-9 border-[1.5px] border-slate-900 dark:border-slate-100 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 flex items-center justify-center font-black text-xl rounded">
                        L
                    </div>
                    <span className="font-extrabold text-xl uppercase tracking-tight">Admin Hub</span>
                </div>
                <div className="hidden md:flex gap-8 text-xs font-mono font-bold uppercase tracking-wider">
                    <a href="#about" className="opacity-60 hover:opacity-100 transition-opacity">/ Features</a>
                    <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">/ Workflow</a>
                    <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">/ Pricing</a>
                </div>
                <div className="flex gap-3 items-center">
                    <button 
                        onClick={() => updateSetting('darkMode', !settings?.darkMode)}
                        className="btn p-2 text-xs"
                        title={settings?.darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {settings?.darkMode ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-3.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                        )}
                    </button>
                    <button onClick={() => setIsLoginModalOpen(true)} className="btn text-xs font-bold uppercase tracking-wider px-4">Log in</button>
                    <button onClick={() => setIsSignupModalOpen(true)} className="btn btn-dark text-xs font-bold uppercase tracking-wider px-4">Sign up</button>
                </div>
            </nav>

            <main className="flex-grow w-full max-w-7xl mx-auto flex flex-col justify-center">
                {/* Hero Section */}
                <div className="hero-section">
                    <div className="space-y-6">
                        <div className="inline-block border-[1.5px] border-slate-900 dark:border-slate-100 px-3 py-1 font-mono text-[10px] uppercase font-bold tracking-widest bg-white dark:bg-slate-800 rounded">
                            // Swiss Precision Life Planner
                        </div>
                        <h1>
                            Your entire life admin. <span className="opacity-45 block">Decidedly minimal.</span>
                        </h1>
                        <p className="hero-text max-w-xl">
                            Consolidate bills, renewals, records, schedules, and daily journals into a highly structured, outline-based productivity environment. Built for those who appreciate design grid clarity.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-2">
                            <button onClick={() => setIsSignupModalOpen(true)} className="primary-btn">
                                Start Free Trial
                            </button>
                            <button onClick={() => setIsLoginModalOpen(true)} className="secondary-btn">
                                Access Vault
                            </button>
                        </div>
                    </div>

                    <div>
                        {/* Spending & Alert Showcase Card */}
                        <div className="card shadow-[6px_6px_0_0_rgba(15,23,42,0.1)] dark:shadow-[6px_6px_0_0_rgba(241,245,249,0.05)]">
                            <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                                <div>
                                    <h3 className="text-xs uppercase tracking-wider font-mono opacity-60 font-bold">// MONTHLY METRICS</h3>
                                    <div style={{ opacity: amountOpacity }} className="text-4xl font-black font-mono tracking-tight mt-1 transition-opacity duration-150">{spendingAmount}</div>
                                </div>
                                <select 
                                    value={selectedMonth} 
                                    onChange={handleMonthChange} 
                                    className="bg-white dark:bg-slate-800 border-[1.5px] border-slate-900 dark:border-slate-100 text-slate-800 dark:text-slate-100 text-[11px] font-mono font-bold rounded p-1.5 cursor-pointer outline-none hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                >
                                    {monthOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                </select>
                            </div>
                            <div className="w-full mb-6 h-[120px]">
                                <canvas ref={chartRef}></canvas>
                            </div>
                            
                            <div className="border-t border-slate-200 dark:border-slate-800 pt-5 space-y-3">
                                <div className="flex items-center justify-between p-2.5 border border-slate-200 dark:border-slate-800 rounded bg-slate-50 dark:bg-slate-900/50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded border-[1.5px] border-slate-900 dark:border-slate-100 flex items-center justify-center text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 flex-shrink-0">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                                        </div>
                                        <div>
                                            <div className="font-extrabold text-sm uppercase tracking-wide">Car Insurance</div>
                                            <div className="text-[10px] font-mono opacity-50">20 June Renewal</div>
                                        </div>
                                    </div>
                                    <span className="badge badge-red font-mono">Due in 3 days</span>
                                </div>

                                <div className="flex items-center justify-between p-2.5 border border-slate-200 dark:border-slate-800 rounded bg-slate-50 dark:bg-slate-900/50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded border-[1.5px] border-slate-900 dark:border-slate-100 flex items-center justify-center text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 flex-shrink-0">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                        </div>
                                        <div>
                                            <div className="font-extrabold text-sm uppercase tracking-wide">Doctor Checkup</div>
                                            <div className="text-[10px] font-mono opacity-50">8 June Appointment</div>
                                        </div>
                                    </div>
                                    <span className="badge badge-blue font-mono">Scheduled</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <section id="about" className="w-full px-6 py-16 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20">
                    <div className="text-center mb-12">
                        <div className="inline-block border-[1.5px] border-slate-900 dark:border-slate-100 px-2 py-0.5 font-mono text-[9px] uppercase font-bold tracking-widest bg-white dark:bg-slate-800 rounded mb-3">
                            // STACK OVERVIEW
                        </div>
                        <h2 className="text-3xl font-extrabold uppercase tracking-tight">Structured Life Stack.</h2>
                        <p className="text-slate-500 dark:text-slate-400 font-mono text-xs mt-1">A unified repository for your operational data nodes.</p>
                    </div>
                    
                    <div className="features-section !p-0 max-w-7xl mx-auto">
                        <div className="feature-card">
                            <div className="w-10 h-10 border-[1.5px] border-slate-900 dark:border-slate-100 flex items-center justify-center mb-5 bg-white dark:bg-slate-800 rounded">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            </div>
                            <h3 className="text-base font-extrabold uppercase tracking-wide mb-2">// 01. Secure Document Vault</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                                Store passports, driving licenses, and insurance policies with OCR search indexing and metadata extraction.
                            </p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="w-10 h-10 border-[1.5px] border-slate-900 dark:border-slate-100 flex items-center justify-center mb-5 bg-white dark:bg-slate-800 rounded">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h3 className="text-base font-extrabold uppercase tracking-wide mb-2">// 02. Bills & Outflow Tracker</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                                Keep track of subscriptions, recurring utility bills, pay schedules, and email synchronization tasks.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="w-10 h-10 border-[1.5px] border-slate-900 dark:border-slate-100 flex items-center justify-center mb-5 bg-white dark:bg-slate-800 rounded">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                            </div>
                            <h3 className="text-base font-extrabold uppercase tracking-wide mb-2">// 03. Renewal Countdown</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                                Never miss auto-renew deadlines with dynamic countdown timelines and structural calendar alerts.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="w-10 h-10 border-[1.5px] border-slate-900 dark:border-slate-100 flex items-center justify-center mb-5 bg-white dark:bg-slate-800 rounded">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.754 18 18.168 18.477 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                            </div>
                            <h3 className="text-base font-extrabold uppercase tracking-wide mb-2">// 04. Personal Journal</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                                Log your daily reflections, work sessions, thoughts, and ideas in a dedicated private and search-indexed diary.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="w-full py-8 border-t border-slate-200 dark:border-slate-800 max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono">
                <div className="text-slate-500">&copy; 2026 Admin Hub. Built for precision.</div>
                <div className="flex gap-6 text-slate-500">
                    <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms</a>
                    <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Support Node</a>
                </div>
            </footer>

            {/* Login Modal */}
            {isLoginModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) setIsLoginModalOpen(false); }}>
                    <div className="auth-card relative animate-popIn">
                        <button onClick={() => setIsLoginModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                        <h2 className="text-2xl font-extrabold uppercase tracking-tight mb-2">// Log In</h2>
                        <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-6">Enter access credentials for authorization.</p>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1">Email Node</label>
                                <input type="email" name="email" className="input" placeholder="node@domain.com" required defaultValue="admin@example.com" />
                            </div>
                            <div>
                                <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1">Passkey</label>
                                <input type="password" name="password" className="input" placeholder="••••••••" required />
                            </div>
                            <button type="submit" className="w-full btn btn-dark mt-2">Authorize Connection</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Signup Modal */}
            {isSignupModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) setIsSignupModalOpen(false); }}>
                    <div className="auth-card relative animate-popIn">
                        <button onClick={() => setIsSignupModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                        <h2 className="text-2xl font-extrabold uppercase tracking-tight mb-2">// Sign Up</h2>
                        <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-6">Instantiate new user cluster on registry.</p>
                        <form onSubmit={handleSignup} className="space-y-4">
                            <div>
                                <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1">Full Name</label>
                                <input type="text" name="name" className="input" placeholder="Jane Doe" required defaultValue="Admin User" />
                            </div>
                            <div>
                                <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1">Email Node</label>
                                <input type="email" name="email" className="input" placeholder="node@domain.com" required defaultValue="admin@example.com" />
                            </div>
                            <div>
                                <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1">Passkey</label>
                                <input type="password" name="password" className="input" placeholder="••••••••" required />
                            </div>
                            <button type="submit" className="w-full btn btn-dark mt-2">Initialize Account</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
