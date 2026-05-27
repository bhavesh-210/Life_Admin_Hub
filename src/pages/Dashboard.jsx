import StatCard from '../components/StatCard';
import { useLifeAdmin } from '../context/LifeAdminContext';

export default function Dashboard() {
    const { bills, documents, appointments } = useLifeAdmin();

    // Calculate dynamic stats
    const paidBills = bills.filter((b) => b.status === 'Paid');
    const totalSpending = paidBills.reduce((total, b) => total + b.amount, 0);

    // Get upcoming renewals (documents with renewal dates)
    const upcomingRenewals = documents.filter((doc) => doc.renewalDate);

    // Get upcoming appointments
    const upcomingAppointmentsCount = appointments.length;

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Operational Hub</h1>
                    <p className="page-subtitle">// EMAIL NODES SCANNED & SYSTEM VALUES SYNCHRONIZED</p>
                </div>
            </div>

            {/* Top stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <StatCard 
                    title="Auto Outflow" 
                    value={`₹${totalSpending}`} 
                    icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>} 
                />
                <StatCard 
                    title="Paid Nodes" 
                    value={paidBills.length} 
                    icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>} 
                />
                <StatCard 
                    title="Document Vault" 
                    value={documents.length} 
                    icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>} 
                />
                <StatCard 
                    title="Schedule Nodes" 
                    value={upcomingAppointmentsCount} 
                    icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>} 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Dynamic recent bills list */}
                <div className="card shadow-[4px_4px_0_0_rgba(15,23,42,0.05)]">
                    <h2 className="section-title">// RECENT BILLS</h2>
                    <div className="space-y-3">
                        {bills.slice(0, 4).map((bill) => (
                            <div key={bill.id} className="flex items-center justify-between p-3.5 border-[1.5px] border-slate-900/10 dark:border-slate-100/10 hover:border-slate-900 dark:hover:border-slate-100 transition-all rounded">
                                <div>
                                    <h3 className="font-extrabold text-sm uppercase tracking-wide">{bill.name}</h3>
                                    <p className="text-xs font-mono opacity-65 mt-0.5">
                                        {bill.category} • <span className="font-bold text-slate-800 dark:text-slate-200">₹{bill.amount}</span> • Due {bill.dueDate}
                                    </p>
                                </div>
                                <span className={`badge ${bill.status === 'Paid' ? 'badge-green' : 'badge-red'}`}>
                                    {bill.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dynamic upcoming renewals list */}
                <div className="card shadow-[4px_4px_0_0_rgba(15,23,42,0.05)]">
                    <h2 className="section-title">// UPCOMING RENEWALS</h2>
                    <div className="space-y-3">
                        {upcomingRenewals.slice(0, 4).map((renewal) => (
                            <div key={renewal.id} className="flex items-center justify-between p-3.5 border-[1.5px] border-slate-900/10 dark:border-slate-100/10 hover:border-slate-900 dark:hover:border-slate-100 transition-all rounded">
                                <div>
                                    <h3 className="font-extrabold text-sm uppercase tracking-wide">{renewal.title}</h3>
                                    <p className="text-xs font-mono opacity-65 mt-0.5">
                                        Type: {renewal.type} • Expires: {renewal.renewalDate}
                                    </p>
                                </div>
                                <span className="badge badge-blue">
                                    Scanned
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
