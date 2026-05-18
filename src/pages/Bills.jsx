// React se `useState` hook import kar rahe hain — component ke state ke liye
import { useState } from 'react';

// Custom hook jo automation-related data provide karta hai
import useAutomation from '../hooks/useAutomation';

// Demo bills ka static data — initial state ke liye use karenge
import { billsData } from '../data/demoData';

// Bill ko display karne wala presentational component
import BillCard from '../components/BillCard';

export default function Bills() {
    // `useAutomation` se paid bills ka kuch data mil raha hai
    const { paidBills } = useAutomation();

    // Local state: bills list aur usko update karne wala setter
    const [bills, setBills] = useState(billsData);

    // paidBills aur local bills ko combine karke total list bana rahe hain
    const allBills = [...paidBills, ...bills];

    // Search input ka state
    const [search, setSearch] = useState('');

    // Search ke hisaab se bills filter kar rahe hain
    const filteredBills = bills.filter((bill) =>
        bill.name.toLowerCase().includes(search.toLowerCase()),
    );

    // Kisi bill ka status toggle karne ka function (Paid <-> Unpaid)
    function toggleStatus(id) {
        const updatedBills = bills.map((bill) => {
            if (bill.id === id) {
                return {
                    ...bill,
                    status: bill.status === 'Paid' ? 'Unpaid' : 'Paid',
                };
            }

            return bill;
        });

        // State ko update kar do
        setBills(updatedBills);
    }

    // JSX return: UI render karne wala part
    return (
        <div>
            <div className="page-header">
                <div>
                    {/* Page title */}
                    <h1 className="page-title">Bills</h1>

                    {/* Subtitle: total bills dikhayega */}
                    <p className="page-subtitle">
                        {allBills.length} bills in total
                    </p>
                </div>

                {/* Add bill button (abhi sirf UI) */}
                <button className="btn btn-dark">Add Bill</button>
            </div>

            <div className="card">
                {/* Search input */}
                <input
                    type="text"
                    placeholder="Search bills..."
                    className="input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* Filtered bills ki list */}
                <div className="list">
                    {filteredBills.map((bill) => (
                        <BillCard
                            key={bill.id}
                            bill={bill}
                            toggleStatus={toggleStatus}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
