export default function Appointments() {
    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-5xl font-extrabold text-[#0f172a] tracking-tight mb-2">Appointments</h1>
                    <p className="text-lg text-[#475569]">Manage doctor, business and service appointments.</p>
                </div>
                <button className="bg-[#0f172a] text-white font-bold px-6 py-3 rounded-full hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">
                    Add Appointment
                </button>
            </div>

            <div className="glass-pane bg-white/40 backdrop-blur-[20px] border border-white/60 rounded-[32px] p-8 shadow-xl">
                <div className="space-y-4">
                    <div className="flex items-center justify-between bg-white/50 border border-white/60 p-4 rounded-2xl hover:bg-white/70 transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center text-xl shadow-inner">
                                🩺
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800">Doctor Checkup</h3>
                                <p className="text-sm text-slate-500">8 June • 10:00 AM</p>
                            </div>
                        </div>
                        <span className="bg-sky-100 text-sky-700 text-xs font-bold border border-sky-200/50 px-4 py-2 rounded-full">Medical</span>
                    </div>

                    <div className="flex items-center justify-between bg-white/50 border border-white/60 p-4 rounded-2xl hover:bg-white/70 transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-fuchsia-100 text-fuchsia-600 flex items-center justify-center text-xl shadow-inner">
                                💼
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800">Business Meeting</h3>
                                <p className="text-sm text-slate-500">12 June • 1:30 PM</p>
                            </div>
                        </div>
                        <span className="bg-fuchsia-100 text-fuchsia-700 text-xs font-bold border border-fuchsia-200/50 px-4 py-2 rounded-full">Business</span>
                    </div>

                    <div className="flex items-center justify-between bg-white/50 border border-white/60 p-4 rounded-2xl hover:bg-white/70 transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-xl shadow-inner">
                                🔧
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800">Vehicle Service</h3>
                                <p className="text-sm text-slate-500">16 June • 9:00 AM</p>
                            </div>
                        </div>
                        <span className="bg-orange-100 text-orange-700 text-xs font-bold border border-orange-200/50 px-4 py-2 rounded-full">Vehicle</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
