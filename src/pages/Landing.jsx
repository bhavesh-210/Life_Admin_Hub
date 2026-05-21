import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const chartRef = useRef(null);
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
        const gradient = ctx.createLinearGradient(0, 0, 0, 140);
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.22)');
        gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');

        if (chartInstance) chartInstance.destroy();

        const newChart = new window.Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
                datasets: [{
                    data: mockData.current.data,
                    borderColor: '#6366f1',
                    borderWidth: 3,
                    backgroundColor: gradient,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: { x: { duration: 1500, easing: 'easeOutElastic' }, y: { duration: 1500, easing: 'easeOutElastic' } },
                plugins: { legend: { display: false }, tooltip: { enabled: false } },
                scales: { x: { display: false }, y: { display: false, min: 3000 } },
                layout: { padding: { top: 10 } }
            }
        });
        setChartInstance(newChart);

        return () => { if (newChart) newChart.destroy(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleMonthChange = (e) => {
        const val = e.target.value;
        setSelectedMonth(val);
        setAmountOpacity(0);
        setTimeout(() => {
            setSpendingAmount(mockData[val].total);
            setAmountOpacity(1);
        }, 150);

        if (chartInstance) {
            chartInstance.data.datasets[0].data = mockData[val].data;
            chartInstance.update();
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoggedIn(true);
        navigate('/dashboard');
    };

    const handleSignup = (e) => {
        e.preventDefault();
        setIsLoggedIn(true);
        navigate('/dashboard');
    };

    return (
        <div className="w-full flex flex-col items-center">
            {/* Navbar */}
            <nav className="w-full px-6 py-5 relative z-20 flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-orange-500 text-white flex items-center justify-center font-black text-2xl shadow-[0_0_20px_rgba(217,70,239,0.5)]">L</div>
                    <span className="font-extrabold text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">Life Admin Hub</span>
                </div>
                <div className="hidden md:flex gap-8 text-sm font-medium text-slate-500">
                    <a href="#about" className="hover:text-slate-900 transition-colors">Features</a>
                    <a href="#" className="hover:text-slate-900 transition-colors">How it works</a>
                    <a href="#" className="hover:text-slate-900 transition-colors">Pricing</a>
                </div>
                <div className="flex gap-4 items-center">
                    <button onClick={() => setIsLoginModalOpen(true)} className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">Log in</button>
                    <button onClick={() => setIsSignupModalOpen(true)} className="text-sm font-bold bg-[#0f172a] text-white px-5 py-2 rounded-full hover:bg-slate-800 transition-colors">Sign up</button>
                </div>
            </nav>

            <main className="flex-grow w-full relative z-10 flex flex-col items-center">
                
                {/* Hero Section */}
                <div className="w-full max-w-7xl mx-auto px-6 py-12 lg:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h1 className="text-5xl lg:text-[3.5rem] font-extrabold text-[#0f172a] leading-[1.15] tracking-[-0.03em] mb-6">
                                Your entire life admin system in one place.
                            </h1>
                            <p className="text-lg text-[#475569] leading-relaxed mb-10 max-w-xl">
                                Manage bills, renewals, documents, subscriptions, appointments and monthly spending with a beautiful productivity dashboard.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button onClick={() => setIsSignupModalOpen(true)} className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-medium transition-all bg-[#0f172a] text-white hover:bg-slate-800 shadow-lg shadow-slate-900/10">
                                    Start Free
                                </button>
                                <button onClick={() => setIsLoginModalOpen(true)} className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-medium transition-all border border-slate-200 bg-white/40 text-slate-700 hover:bg-white hover:border-slate-300">
                                    Login
                                </button>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="glass-pane bg-white/45 backdrop-blur-[20px] border border-white/60 rounded-[32px] p-8 shadow-[0_4px_30px_rgba(0,0,0,0.01),0_20px_50px_rgba(0,0,0,0.03)] transition-transform duration-500">
                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Monthly Spending</h3>
                                        <select value={selectedMonth} onChange={handleMonthChange} className="bg-white/50 border border-slate-200 text-slate-700 text-xs rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-1.5 font-bold cursor-pointer outline-none hover:bg-white transition-colors shadow-sm">
                                            {monthOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                        </select>
                                    </div>
                                    <div style={{ opacity: amountOpacity }} className="text-4xl font-black text-slate-800 transition-opacity duration-150">{spendingAmount}</div>
                                </div>
                                <div className="w-full mb-8 relative h-[140px]">
                                    <canvas ref={chartRef}></canvas>
                                </div>
                                <div className="border-t border-slate-900/5 pt-6 space-y-4">
                                    {/* Action Rows */}
                                    <div className="flex items-center justify-between group cursor-pointer hover:bg-white/40 p-2 -mx-2 rounded-xl transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-800">Car Insurance</div>
                                                <div className="text-sm text-slate-500">20 June</div>
                                            </div>
                                        </div>
                                        <span className="bg-[#fef3c7] text-[#b45309] text-[11px] font-bold border border-amber-200/50 px-3 py-1.5 rounded-full whitespace-nowrap">Due in 3 days</span>
                                    </div>
                                    <div className="flex items-center justify-between group cursor-pointer hover:bg-white/40 p-2 -mx-2 rounded-xl transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-800">Doctor Checkup</div>
                                                <div className="text-sm text-slate-500">8 June</div>
                                            </div>
                                        </div>
                                        <span className="bg-[#e0f2fe] text-[#0369a1] text-[11px] font-bold border border-sky-200/50 px-3 py-1.5 rounded-full whitespace-nowrap">Scheduled</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3D About Section */}
                <section id="about" className="w-full max-w-7xl mx-auto px-6 py-24 perspective-container mt-12 mb-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-slate-900 mb-4">Your life, visualized.</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-lg">See all moving parts of your life in one beautifully structured dashboard.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 scene-3d">
                        {/* 3D Cards */}
                        <div className="card-3d bg-white/60 backdrop-blur-xl border border-white/80 p-8 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.05)] flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-50 text-indigo-500 flex items-center justify-center mb-6 shadow-inner">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Secure Documents</h3>
                            <p className="text-slate-500 text-sm">Store passports, deeds, and contracts safely in your vault.</p>
                        </div>
                        
                        <div className="card-3d bg-white/60 backdrop-blur-xl border border-white/80 p-8 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.05)] flex flex-col items-center text-center mt-0 md:mt-12 relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-500 flex items-center justify-center mb-6 shadow-inner">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Bills & Spending</h3>
                            <p className="text-slate-500 text-sm">Track monthly spending and never miss a utility bill payment.</p>
                        </div>

                        <div className="card-3d bg-white/60 backdrop-blur-xl border border-white/80 p-8 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.05)] flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-100 to-rose-50 text-rose-500 flex items-center justify-center mb-6 shadow-inner">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Renewal Alerts</h3>
                            <p className="text-slate-500 text-sm">Get notified before your insurance, MOT, or subscriptions auto-renew.</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="w-full mt-auto py-8 border-t border-slate-200/50 bg-white/20 backdrop-blur-sm relative z-20">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-slate-500">&copy; 2026 Life Admin Hub. All rights reserved.</div>
                    <div className="flex gap-6 text-sm text-slate-500">
                        <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">Support</a>
                    </div>
                </div>
            </footer>

            {/* Auth Modals */}
            {(isLoginModalOpen || isSignupModalOpen) && (
                <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300" onClick={(e) => { if (e.target === e.currentTarget) { setIsLoginModalOpen(false); setIsSignupModalOpen(false); }}}>
                    {isLoginModalOpen && (
                        <div className="bg-white/70 backdrop-blur-xl border border-white/60 p-8 rounded-[32px] shadow-2xl w-full max-w-md animate-popIn relative">
                            <button onClick={() => setIsLoginModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome back</h2>
                            <p className="text-slate-500 mb-8">Enter your details to access your dashboard.</p>
                            <form onSubmit={handleLogin} className="space-y-5">
                                <div><label className="block text-sm font-bold text-slate-700 mb-1">Email</label><input type="email" className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="you@example.com" required /></div>
                                <div><label className="block text-sm font-bold text-slate-700 mb-1">Password</label><input type="password" className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="••••••••" required /></div>
                                <button type="submit" className="w-full bg-[#0f172a] text-white font-bold rounded-xl px-4 py-3 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">Log In</button>
                            </form>
                        </div>
                    )}
                    {isSignupModalOpen && (
                        <div className="bg-white/70 backdrop-blur-xl border border-white/60 p-8 rounded-[32px] shadow-2xl w-full max-w-md animate-popIn relative">
                            <button onClick={() => setIsSignupModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Create Account</h2>
                            <p className="text-slate-500 mb-8">Start taking control of your life admin today.</p>
                            <form onSubmit={handleSignup} className="space-y-5">
                                <div><label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label><input type="text" className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="Jane Doe" required /></div>
                                <div><label className="block text-sm font-bold text-slate-700 mb-1">Email</label><input type="email" className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="you@example.com" required /></div>
                                <div><label className="block text-sm font-bold text-slate-700 mb-1">Password</label><input type="password" className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="••••••••" required /></div>
                                <button type="submit" className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-bold rounded-xl px-4 py-3 hover:opacity-90 transition-opacity shadow-lg shadow-fuchsia-500/25">Start Free Trial</button>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
