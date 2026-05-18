import { useState } from 'react';

import useAutomation from '../hooks/useAutomation';

import { billsData } from '../data/demoData';

import BillCard from '../components/BillCard';

export default function Bills() {
    const { paidBills } = useAutomation();
    const [bills, setBills] = useState(billsData); // Initialize bills state with billsData

    const allBills = [...paidBills, ...bills];

    const [search, setSearch] = useState('');

    const filteredBills = bills.filter((bill) =>
        bill.name.toLowerCase().includes(search.toLowerCase()),
    );

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

        setBills(updatedBills);
    }

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Bills</h1>

                    <p className="page-subtitle">
                        {allBills.length} bills in total
                    </p>
                </div>

                <button className="btn btn-dark">Add Bill</button>
            </div>

            <div className="card">
                <input
                    type="text"
                    placeholder="Search bills..."
                    className="input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

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
