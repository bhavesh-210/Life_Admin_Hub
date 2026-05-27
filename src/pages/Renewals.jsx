export default function Renewals() {
    return (
        <div className="w-full max-w-5xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Renewals</h1>
                    <p className="page-subtitle">// TRACK SYSTEM CONTRACT DEADLINES & AUTOPAY SCHEDULE NODES</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className="editorial-card p-6 flex flex-col items-start shadow-[3px_3px_0_0_rgba(15,23,42,0.05)]">
                    <div className="w-10 h-10 border-[1.5px] border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-800 flex items-center justify-center rounded mb-4 text-amber-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1"></path></svg>
                    </div>
                    <h2 className="font-extrabold text-lg uppercase tracking-wide">Vehicle Insurance</h2>
                    <p className="mt-2 text-xs font-mono opacity-65 uppercase">Renew before: 20 June</p>
                    <span className="badge badge-red mt-4 font-mono">DUE SOON</span>
                </div>

                {/* Card 2 */}
                <div className="editorial-card p-6 flex flex-col items-start shadow-[3px_3px_0_0_rgba(15,23,42,0.05)]">
                    <div className="w-10 h-10 border-[1.5px] border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-800 flex items-center justify-center rounded mb-4 text-rose-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                    </div>
                    <h2 className="font-extrabold text-lg uppercase tracking-wide">Netflix Premium</h2>
                    <p className="mt-2 text-xs font-mono opacity-65 uppercase">Renew before: 05 July</p>
                    <span className="badge badge-blue mt-4 font-mono">SCHEDULED</span>
                </div>

                {/* Card 3 */}
                <div className="editorial-card p-6 flex flex-col items-start shadow-[3px_3px_0_0_rgba(15,23,42,0.05)]">
                    <div className="w-10 h-10 border-[1.5px] border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-800 flex items-center justify-center rounded mb-4 text-blue-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path></svg>
                    </div>
                    <h2 className="font-extrabold text-lg uppercase tracking-wide">Driving License</h2>
                    <p className="mt-2 text-xs font-mono opacity-65 uppercase">Renew before: 12 Aug</p>
                    <span className="badge badge-blue mt-4 font-mono">SCHEDULED</span>
                </div>
            </div>
        </div>
    );
}
