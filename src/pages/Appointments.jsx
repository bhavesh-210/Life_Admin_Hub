import { useState } from 'react';

export default function Appointments() {
    const [isCalendarConnected, setIsCalendarConnected] = useState(false);
    const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
    const [connectState, setConnectState] = useState('idle'); // idle, connecting, success

    const handleConnect = () => {
        setConnectState('connecting');
        setTimeout(() => {
            setConnectState('success');
            setTimeout(() => {
                setIsCalendarConnected(true);
                setIsConnectModalOpen(false);
            }, 1500);
        }, 2500);
    };

    return (
        <div className="w-full max-w-5xl mx-auto pb-12">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-5xl font-extrabold text-[#0f172a] tracking-tight mb-2">Appointments</h1>
                    <p className="text-lg text-[#475569]">Manage doctor, business and service appointments.</p>
                </div>
                {!isCalendarConnected ? (
                    <button onClick={() => { setIsConnectModalOpen(true); setConnectState('idle'); }} className="bg-white border border-slate-200 text-slate-700 font-bold px-6 py-3 rounded-full hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"></path></svg>
                        Sync Google Calendar
                    </button>
                ) : (
                    <button className="bg-emerald-100 text-emerald-700 font-bold px-6 py-3 rounded-full shadow-sm flex items-center gap-2 cursor-default">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        Calendar Synced
                    </button>
                )}
            </div>

            <div className="glass-pane bg-white/40 backdrop-blur-[20px] border border-white/60 rounded-[32px] p-8 shadow-xl">
                <div className="space-y-4">
                    <div className="flex items-center justify-between bg-white/50 border border-white/60 p-4 rounded-2xl hover:bg-white/70 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center text-xl shadow-inner">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800">Doctor Checkup</h3>
                                <p className="text-sm text-slate-500">8 June • 10:00 AM</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            {isCalendarConnected && <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-indigo-600 flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg> Reminders On</span>}
                            <span className="bg-sky-100 text-sky-700 text-xs font-bold border border-sky-200/50 px-4 py-2 rounded-full">Medical</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between bg-white/50 border border-white/60 p-4 rounded-2xl hover:bg-white/70 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-fuchsia-100 text-fuchsia-600 flex items-center justify-center text-xl shadow-inner">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800">Business Meeting</h3>
                                <p className="text-sm text-slate-500">12 June • 1:30 PM</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            {isCalendarConnected && <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-indigo-600 flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg> Reminders On</span>}
                            <span className="bg-fuchsia-100 text-fuchsia-700 text-xs font-bold border border-fuchsia-200/50 px-4 py-2 rounded-full">Business</span>
                        </div>
                    </div>

                    {isCalendarConnected && (
                        <div className="flex items-center justify-between bg-white/50 border border-white/60 p-4 rounded-2xl hover:bg-white/70 transition-colors cursor-pointer group animate-popIn">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl shadow-inner">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">Dinner with Family</h3>
                                    <p className="text-sm text-slate-500">20 June • 7:00 PM</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-indigo-600 flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg> Reminders On</span>
                                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200/50 px-4 py-2 rounded-full">Synced Event</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Google Calendar Connect Modal */}
            {isConnectModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center" onClick={(e) => { if (e.target === e.currentTarget && connectState !== 'connecting') setIsConnectModalOpen(false)}}>
                    <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-8 rounded-[32px] shadow-2xl w-full max-w-sm animate-popIn text-center relative">
                        {connectState !== 'connecting' && <button onClick={() => setIsConnectModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-700"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>}
                        
                        {connectState === 'idle' && (
                            <>
                                <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-700 mb-4 shadow-sm border border-slate-200">
                                    <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"></path></svg>
                                </div>
                                <h2 className="text-xl font-extrabold text-slate-900 mb-2">Google Calendar</h2>
                                <p className="text-sm text-slate-500 mb-6">Authorize Life Admin Hub to view your calendar and sync your upcoming events automatically.</p>
                                <button onClick={handleConnect} className="w-full bg-[#0f172a] text-white font-bold rounded-xl px-4 py-3 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">Authorize Access</button>
                            </>
                        )}
                        
                        {connectState === 'connecting' && (
                            <div className="py-8">
                                <div className="w-12 h-12 border-4 border-slate-200 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
                                <h2 className="text-xl font-extrabold text-slate-900">Connecting...</h2>
                                <p className="text-sm text-slate-500 mt-2">Waiting for OAuth callback.</p>
                            </div>
                        )}

                        {connectState === 'success' && (
                            <div className="py-6">
                                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <h2 className="text-xl font-extrabold text-slate-900">Sync Enabled!</h2>
                                <p className="text-sm text-slate-500 mt-2">Your Google Calendar events are now syncing with your dashboard.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
