export default function BillCard({ bill, toggleStatus }) {
    const isPaid = bill.status === 'Paid';

    return (
        <div className="flex items-center justify-between bg-white/50 border border-white/60 p-4 rounded-2xl hover:bg-white/70 transition-colors cursor-pointer" onClick={() => toggleStatus(bill.id)}>
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner ${isPaid ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                    {isPaid ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
                </div>
                <div>
                    <h3 className="font-bold text-slate-800">{bill.name}</h3>
                    <p className="text-sm text-slate-500">
                        {bill.category} • ₹{bill.amount} • Due {bill.dueDate}
                    </p>
                </div>
            </div>

            <button
                onClick={(e) => { e.stopPropagation(); toggleStatus(bill.id); }}
                className={`text-xs font-bold border px-4 py-2 rounded-full transition-all ${isPaid ? 'bg-emerald-100 text-emerald-700 border-emerald-200/50 hover:bg-emerald-200' : 'bg-rose-100 text-rose-700 border-rose-200/50 hover:bg-rose-200'}`}>
                {bill.status}
            </button>
        </div>
    );
}
