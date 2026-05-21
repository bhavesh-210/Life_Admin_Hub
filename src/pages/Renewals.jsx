export default function Renewals() {
    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-5xl font-extrabold text-[#0f172a] tracking-tight mb-2">Renewals</h1>
                    <p className="text-lg text-[#475569]">Upcoming renewals and alerts.</p>
                </div>
                <button className="bg-[#0f172a] text-white font-bold px-6 py-3 rounded-full hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">
                    Add Renewal
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-pane bg-white/40 backdrop-blur-[20px] border border-white/60 rounded-[32px] p-6 shadow-xl flex flex-col items-start">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl mb-4 shadow-inner">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path></svg>
                    </div>
                    <h2 className="font-extrabold text-xl text-slate-800">Vehicle Insurance</h2>
                    <p className="mt-2 text-slate-500 font-medium">Renew before 20 June</p>
                    <span className="mt-4 bg-amber-100 text-amber-700 text-xs font-bold border border-amber-200/50 px-3 py-1 rounded-full">Due soon</span>
                </div>

                <div className="glass-pane bg-white/40 backdrop-blur-[20px] border border-white/60 rounded-[32px] p-6 shadow-xl flex flex-col items-start">
                    <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-xl mb-4 shadow-inner">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                    </div>
                    <h2 className="font-extrabold text-xl text-slate-800">Netflix Premium</h2>
                    <p className="mt-2 text-slate-500 font-medium">Renew before 5 July</p>
                    <span className="mt-4 bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200/50 px-3 py-1 rounded-full">Scheduled</span>
                </div>

                <div className="glass-pane bg-white/40 backdrop-blur-[20px] border border-white/60 rounded-[32px] p-6 shadow-xl flex flex-col items-start">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl mb-4 shadow-inner">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path></svg>
                    </div>
                    <h2 className="font-extrabold text-xl text-slate-800">Driving License</h2>
                    <p className="mt-2 text-slate-500 font-medium">Renew before 12 Aug</p>
                    <span className="mt-4 bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200/50 px-3 py-1 rounded-full">Scheduled</span>
                </div>
            </div>
        </div>
    );
}
