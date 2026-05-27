import { useLifeAdmin } from '../context/LifeAdminContext';

export default function DocumentCard({ document, onView }) {
    const { deleteDocument, addToast } = useLifeAdmin();

    const handleDownload = (e) => {
        e.stopPropagation();
        addToast(`Downloading "${document.title}..."`);
    };

    const getCategoryStyles = (category) => {
        switch (category) {
            case 'Identity': return 'bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 border-purple-200/50 dark:border-purple-900/30';
            case 'Vehicle': return 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200/50 dark:border-amber-900/30';
            case 'Medical': return 'bg-sky-100 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 border-sky-200/50 dark:border-sky-900/30';
            case 'Financial': return 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-900/30';
            default: return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200/50 dark:border-slate-700/50';
        }
    };

    return (
        <div 
            onClick={() => onView(document)}
            className="editorial-card editorial-card-interactive p-5 flex flex-col justify-between cursor-pointer"
        >
            <div className="flex items-start gap-3 mb-4">
                {/* Styled doc thumbnail */}
                <div className="w-9 h-9 border-[1.5px] border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-800 text-customAccent flex items-center justify-center flex-shrink-0 rounded">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                
                <div className="min-w-0 flex-1">
                    <h3 className="font-extrabold text-slate-800 dark:text-slate-200 truncate uppercase tracking-wide group-hover:text-customAccent transition-colors" title={document.title}>
                        {document.title}
                    </h3>
                    <p className="text-[10px] font-mono opacity-60 mt-1 uppercase">
                        Size: {document.fileSize || '120 KB'} • Date: {document.uploadDate || 'Recently'}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <span className={`badge ${getCategoryStyles(document.type)}`}>
                    {document.type}
                </span>

                <div className="flex items-center gap-1">
                    <button 
                        onClick={(e) => { e.stopPropagation(); onView(document); }}
                        className="btn p-1.5"
                        title="View Document"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </button>
                    <button 
                        onClick={handleDownload}
                        className="btn p-1.5"
                        title="Download Document"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </button>
                    <button 
                        onClick={(e) => { e.stopPropagation(); deleteDocument(document.id); }}
                        className="btn p-1.5 border-rose-500 hover:bg-rose-500 hover:text-white"
                        title="Delete Document"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
