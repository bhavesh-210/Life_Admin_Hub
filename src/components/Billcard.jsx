export default function BillCard({ bill, toggleStatus }) {
    const badgeClass = bill.status === 'Paid' ? 'badge-green' : 'badge-red';

    return (
        <div className="list-item">
            <div>
                <h3>{bill.name}</h3>
                <p>
                    {bill.category} • ₹{bill.amount} • Due {bill.dueDate}
                </p>
            </div>

            <button
                onClick={() => toggleStatus(bill.id)}
                className={`badge ${badgeClass}`}>
                {bill.status}
            </button>
        </div>
    );
}
