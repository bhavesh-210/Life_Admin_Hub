export default function StatCard({ title, value, icon, trend }) {
    return (
        <div className="glass-pane bg-white/40 backdrop-blur-[20px] border border-white/60 rounded-[32px] p-6 shadow-[0_4px_30px_rgba(0,0,0,0.01),0_20px_50px_rgba(0,0,0,0.03)] flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">{title}</h3>
                <div className="w-12 h-12 rounded-2xl bg-white/60 flex items-center justify-center text-2xl shadow-sm border border-white/80">
                    {icon}
                </div>
            </div>
            <div>
                <h1 className="text-4xl font-black text-slate-800">{value}</h1>
                {trend && <p className="text-emerald-500 text-sm font-bold mt-2">{trend}</p>}
            </div>
        </div>
    );
}
