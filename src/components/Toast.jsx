import { useLifeAdmin } from '../context/LifeAdminContext';

export default function Toast() {
    const { toasts } = useLifeAdmin();

    if (!toasts || toasts.length === 0) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className="flex items-center gap-3 bg-slate-900/90 dark:bg-slate-100/90 text-white dark:text-slate-900 px-6 py-3.5 rounded-2xl shadow-2xl backdrop-blur-md border border-white/10 dark:border-slate-800/10 pointer-events-auto animate-popIn max-w-sm transition-all duration-300"
                >
                    <div className="flex-shrink-0">
                        {toast.type === 'error' ? (
                            <svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )}
                    </div>
                    <p className="font-semibold text-sm leading-snug">{toast.message}</p>
                </div>
            ))}
        </div>
    );
}
