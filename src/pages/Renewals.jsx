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
                        🚗
                    </div>
                    <h2 className="font-extrabold text-xl text-slate-800">Vehicle Insurance</h2>
                    <p className="mt-2 text-slate-500 font-medium">Renew before 20 June</p>
                    <span className="mt-4 bg-amber-100 text-amber-700 text-xs font-bold border border-amber-200/50 px-3 py-1 rounded-full">Due soon</span>
                </div>

                <div className="glass-pane bg-white/40 backdrop-blur-[20px] border border-white/60 rounded-[32px] p-6 shadow-xl flex flex-col items-start">
                    <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-xl mb-4 shadow-inner">
                        🎬
                    </div>
                    <h2 className="font-extrabold text-xl text-slate-800">Netflix Premium</h2>
                    <p className="mt-2 text-slate-500 font-medium">Renew before 5 July</p>
                    <span className="mt-4 bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200/50 px-3 py-1 rounded-full">Scheduled</span>
                </div>

                <div className="glass-pane bg-white/40 backdrop-blur-[20px] border border-white/60 rounded-[32px] p-6 shadow-xl flex flex-col items-start">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl mb-4 shadow-inner">
                        🪪
                    </div>
                    <h2 className="font-extrabold text-xl text-slate-800">Driving License</h2>
                    <p className="mt-2 text-slate-500 font-medium">Renew before 12 Aug</p>
                    <span className="mt-4 bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200/50 px-3 py-1 rounded-full">Scheduled</span>
                </div>
            </div>
        </div>
    );
}
