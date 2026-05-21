import StatCard from '../components/StatCard';
import useAutomation from '../hooks/useAutomation';

export default function Dashboard() {
    const {
        paidBills,
        autoDocuments,
        autoRenewals,
        autoAppointments,
        totalSpending,
    } = useAutomation();

    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-5xl font-extrabold text-[#0f172a] tracking-tight mb-2">Dashboard</h1>
                    <p className="text-lg text-[#475569]">Auto scanned emails and updated your life admin.</p>
                </div>
            </div>

            {/* Top stats row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard title="Auto Spending" value={`₹${totalSpending}`} icon="💳" />
                <StatCard title="Paid Bills" value={paidBills.length} icon="✅" />
                <StatCard title="Documents" value={autoDocuments.length} icon="📄" />
                <StatCard title="Appointments" value={autoAppointments.length} icon="📅" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Auto-detected paid bills list */}
                <div className="glass-pane bg-white/40 backdrop-blur-[20px] border border-white/60 rounded-[32px] p-8 shadow-xl">
                    <h2 className="text-2xl font-extrabold text-slate-800 mb-6">Recent Bills</h2>
                    <div className="space-y-4">
                        {paidBills.map((bill) => (
                            <div key={bill.id} className="flex items-center justify-between bg-white/50 border border-white/60 p-4 rounded-2xl hover:bg-white/70 transition-colors cursor-pointer">
                                <div>
                                    <h3 className="font-bold text-slate-800">{bill.name}</h3>
                                    <p className="text-sm text-slate-500">{bill.category} • ₹{bill.amount} • {bill.dueDate}</p>
                                </div>
                                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200/50 px-3 py-1.5 rounded-full">Paid</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Auto-detected renewals list */}
                <div className="glass-pane bg-white/40 backdrop-blur-[20px] border border-white/60 rounded-[32px] p-8 shadow-xl">
                    <h2 className="text-2xl font-extrabold text-slate-800 mb-6">Upcoming Renewals</h2>
                    <div className="space-y-4">
                        {autoRenewals.map((renewal) => (
                            <div key={renewal.id} className="flex items-center justify-between bg-white/50 border border-white/60 p-4 rounded-2xl hover:bg-white/70 transition-colors cursor-pointer">
                                <div>
                                    <h3 className="font-bold text-slate-800">{renewal.title}</h3>
                                    <p className="text-sm text-slate-500">Date: {renewal.renewalDate}</p>
                                </div>
                                <span className="bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200/50 px-3 py-1.5 rounded-full">Reminder Added</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
