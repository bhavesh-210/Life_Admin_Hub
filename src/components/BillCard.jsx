import { useLifeAdmin } from '../context/LifeAdminContext';

export default function BillCard({ bill, toggleStatus }) {
    const { deleteBill } = useLifeAdmin();
    const isPaid = bill.status === 'Paid';

    // Helper to get category icons
    const getCategoryIcon = (category) => {
        const cat = category?.toLowerCase();
        if (cat === 'utility') {
            return (
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                </svg>
            );
        }
        if (cat === 'subscription' || cat === 'ott') {
            return (
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                    />
                </svg>
            );
        }
        if (cat === 'vehicle') {
            return (
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1"
                    />
                </svg>
            );
        }
        if (cat === 'phone') {
            return (
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                </svg>
            );
        }
        return (
            <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
            </svg>
        );
    };

    return (
        <div
            onClick={() => toggleStatus(bill.id)}
            className="editorial-card editorial-card-interactive   text-slate-900 dark:text-slate-100 p-5 flex flex-col justify-between cursor-pointer">
            <div>
                {/* Header Row */}
                <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="w-8 h-8 border-[1.5px] border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-800 flex items-center justify-center rounded text-slate-900 dark:text-slate-100">
                        {getCategoryIcon(bill.category)}
                    </div>

                    <span
                        className={`badge ${isPaid ? 'badge-green' : 'badge-red'}`}>
                        {bill.status}
                    </span>
                </div>

                {/* Content details */}
                <div className="mb-5">
                    <h3
                        className="font-extrabold !text-slate-900 dark:!text-slate-100 uppercase tracking-wide truncate"
                        title={bill.name}>
                        {bill.name}
                    </h3>
                    <p className="text-[10px] font-mono !text-slate-700 dark:!text-slate-300 opacity-100 mt-1 uppercase">
                        Due: {bill.dueDate} • Category: {bill.category}
                    </p>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="flex items-end justify-between pt-3.5 border-t border-slate-200 dark:border-slate-800">
                <div>
                    <span className="text-[9px] uppercase tracking-wider font-bold !text-slate-700 dark:!text-slate-300 opacity-100">
                        Amount
                    </span>
                    <p className="text-xl font-black font-mono !text-slate-900 dark:!text-slate-100 leading-none mt-1">
                        ₹{bill.amount.toLocaleString()}
                    </p>
                </div>

                <div className="flex items-center gap-1">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleStatus(bill.id);
                        }}
                        className="btn p-1.5"
                        title={isPaid ? 'Mark as Unpaid' : 'Mark as Paid'}>
                        {isPaid ? (
                            <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.5"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.5"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        )}
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteBill(bill.id);
                        }}
                        className="btn p-1.5 border-rose-500 hover:bg-rose-500 hover:text-white"
                        title="Delete Bill">
                        <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
