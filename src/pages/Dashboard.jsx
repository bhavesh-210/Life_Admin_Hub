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
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Dashboard</h1>
                    <p className="page-subtitle">
                        Auto scanned emails and updated your life admin.
                    </p>
                </div>
            </div>

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
