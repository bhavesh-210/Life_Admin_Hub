export default function DocumentCard({ document }) {
    return (
        <div className="flex items-center justify-between bg-white/50 border border-white/60 p-4 rounded-2xl hover:bg-white/70 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl shadow-inner">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                </div>
                <div>
                    <h3 className="font-bold text-slate-800">{document.title}</h3>
                    <p className="text-sm text-slate-500">
                        {document.type} • Renewal {document.renewalDate}
                    </p>
                </div>
            </div>
            <span className="bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200/50 px-4 py-2 rounded-full">
                Stored
            </span>
        </div>
    );
}
