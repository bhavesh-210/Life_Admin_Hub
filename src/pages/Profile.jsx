import { useState } from 'react';

export default function Profile() {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [twoFactor, setTwoFactor] = useState(false);

    const faqs = [
        { q: "How do I sync my emails?", a: "Go to the Bills section and click 'Sync Email' to automatically fetch transactions." },
        { q: "Is my data secure?", a: "Yes, all documents and parsed emails are stored with military-grade encryption in your local vault." },
        { q: "Can I connect multiple Google Calendars?", a: "Currently, we support syncing with a single primary Google Calendar account." }
    ];

    return (
        <div className="w-full max-w-5xl mx-auto pb-12">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-5xl font-extrabold text-[#0f172a] tracking-tight mb-2">Profile</h1>
                    <p className="text-lg text-[#475569]">Manage your account settings and preferences.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: User Card & Settings */}
                <div className="lg:col-span-1 space-y-8">
                    {/* User Card */}
                    <div className="glass-pane bg-white/40 backdrop-blur-[20px] border border-white/60 rounded-[32px] p-8 shadow-xl flex flex-col items-center text-center">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-orange-500 flex items-center justify-center text-white text-4xl font-black shadow-[0_0_20px_rgba(217,70,239,0.4)] mb-4">
                            BS
                        </div>
                        <h2 className="text-2xl font-extrabold text-slate-800">Bhavesh Sharma</h2>
                        <p className="text-slate-500 mb-4">bhavesh@example.com</p>
                        <span className="bg-slate-900 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">Pro Plan</span>
                    </div>

                    {/* Settings */}
                    <div className="glass-pane bg-white/40 backdrop-blur-[20px] border border-white/60 rounded-[32px] p-8 shadow-xl">
                        <h3 className="text-xl font-extrabold text-slate-800 mb-6">Preferences</h3>
                        
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-bold text-slate-800">Push Notifications</h4>
                                    <p className="text-xs text-slate-500">Alerts for bills and renewals.</p>
                                </div>
                                <button onClick={() => setNotifications(!notifications)} className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${notifications ? 'left-7' : 'left-1'}`}></div>
                                </button>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-bold text-slate-800">Dark Mode</h4>
                                    <p className="text-xs text-slate-500">Toggle dark theme.</p>
                                </div>
                                <button onClick={() => setDarkMode(!darkMode)} className={`w-12 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${darkMode ? 'left-7' : 'left-1'}`}></div>
                                </button>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-bold text-slate-800">Two-Factor Auth</h4>
                                    <p className="text-xs text-slate-500">Extra layer of security.</p>
                                </div>
                                <button onClick={() => setTwoFactor(!twoFactor)} className={`w-12 h-6 rounded-full transition-colors relative ${twoFactor ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${twoFactor ? 'left-7' : 'left-1'}`}></div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: FAQ & Support */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Support Banner */}
                    <div className="glass-pane bg-gradient-to-r from-indigo-500/10 to-fuchsia-500/10 backdrop-blur-[20px] border border-white/60 rounded-[32px] p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-2xl font-extrabold text-slate-800 mb-2">Need Help?</h3>
                            <p className="text-slate-600">Our support team is available 24/7 to assist you with any issues.</p>
                        </div>
                        <button className="whitespace-nowrap bg-[#0f172a] text-white font-bold px-8 py-3 rounded-full hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">
                            Contact Support
                        </button>
                    </div>

                    {/* FAQ */}
                    <div className="glass-pane bg-white/40 backdrop-blur-[20px] border border-white/60 rounded-[32px] p-8 shadow-xl">
                        <h3 className="text-2xl font-extrabold text-slate-800 mb-6">Frequently Asked Questions</h3>
                        <div className="space-y-4">
                            {faqs.map((faq, idx) => (
                                <div key={idx} className="bg-white/50 border border-white/60 p-5 rounded-2xl">
                                    <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        {faq.q}
                                    </h4>
                                    <p className="text-slate-600 text-sm ml-7 leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
