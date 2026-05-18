// Reusable stat card component for showing small metrics
import StatCard from '../components/StatCard';
// Custom hook jo automation-related data provide karta hai (emails se parsed data)
import useAutomation from '../hooks/useAutomation';

export default function Dashboard() {
    // Hook se automation se parsed jo arrays milte hain use destructure kar rahe hain
    const {
        paidBills,
        autoDocuments,
        autoRenewals,
        autoAppointments,
        totalSpending,
    } = useAutomation();

    // UI render
    return (
        <div>
            <div className="page-header">
                <div>
                    {/* Page title */}
                    <h1 className="page-title">Dashboard</h1>
                    {/* Chhota sa subtitle */}
                    <p className="page-subtitle">
                        Auto scanned emails and updated your life admin.
                    </p>
                </div>
            </div>

            {/* Top stats row */}
            <div className="grid grid-4">
                <StatCard
                    title="Auto Spending"
                    value={`₹${totalSpending}`}
                    icon="💳"
                />
                <StatCard
                    title="Paid Bills"
                    value={paidBills.length}
                    icon="✅"
                />
                <StatCard
                    title="Documents Found"
                    value={autoDocuments.length}
                    icon="📄"
                />
                <StatCard
                    title="Appointments"
                    value={autoAppointments.length}
                    icon="📅"
                />
            </div>

            {/* Auto-detected paid bills list */}
            <div className="card">
                <h2 className="section-title">Auto Detected Paid Bills</h2>

                {paidBills.map((bill) => (
                    <div key={bill.id} className="list-item">
                        <div>
                            <h3>{bill.name}</h3>
                            <p>
                                {bill.category} • ₹{bill.amount} •{' '}
                                {bill.dueDate}
                            </p>
                        </div>

                        <span className="badge badge-green">Paid</span>
                    </div>
                ))}
            </div>

            {/* Auto-detected renewals list */}
            <div className="card">
                <h2 className="section-title">Auto Detected Renewals</h2>

                {autoRenewals.map((renewal) => (
                    <div key={renewal.id} className="list-item">
                        <div>
                            <h3>{renewal.title}</h3>
                            <p>Renewal Date: {renewal.renewalDate}</p>
                        </div>

                        <span className="badge badge-blue">Reminder Added</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
