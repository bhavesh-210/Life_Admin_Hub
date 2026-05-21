import { useState } from 'react';
import useAutomation from '../hooks/useAutomation';
import { billsData } from '../data/demoData';
import BillCard from '../components/BillCard';

export default function Bills() {
    const { paidBills } = useAutomation();
    const [bills, setBills] = useState(billsData);
    const allBills = [...paidBills, ...bills];
    const [search, setSearch] = useState('');

    const filteredBills = bills.filter((bill) =>
        bill.name.toLowerCase().includes(search.toLowerCase()),
    );

    function toggleStatus(id) {
        const updatedBills = bills.map((bill) => {
            if (bill.id === id) {
                return { ...bill, status: bill.status === 'Paid' ? 'Unpaid' : 'Paid' };
            }
            return bill;
        });
        setBills(updatedBills);
    }

    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-5xl font-extrabold text-[#0f172a] tracking-tight mb-2">Bills</h1>
                    <p className="text-lg text-[#475569]">{allBills.length} bills in total</p>
                </div>
                <button className="bg-[#0f172a] text-white font-bold px-6 py-3 rounded-full hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">
                    Add Bill
                </button>
            </div>

            <div className="glass-pane bg-white/40 backdrop-blur-[20px] border border-white/60 rounded-[32px] p-8 shadow-xl">
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search bills..."
                        className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-slate-700 placeholder-slate-400"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="space-y-4">
                    {filteredBills.map((bill) => (
                        <BillCard key={bill.id} bill={bill} toggleStatus={toggleStatus} />
                    ))}
                </div>
            </div>
        </div>
    );
}
