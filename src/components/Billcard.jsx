// Component to render a single bill item
export default function BillCard({ bill, toggleStatus }) {
    // Badge color depend karta hai status pe
    const badgeClass = bill.status === 'Paid' ? 'badge-green' : 'badge-red';

    return (
        <div className="list-item">
            <div>
                {/* Bill name and metadata */}
                <h3>{bill.name}</h3>
                <p>
                    {bill.category} • ₹{bill.amount} • Due {bill.dueDate}
                </p>
            </div>

            {/* Status button — click se toggle function call hota hai */}
            <button
                onClick={() => toggleStatus(bill.id)}
                className={`badge ${badgeClass}`}>
                {bill.status}
            </button>
        </div>
    );
}
