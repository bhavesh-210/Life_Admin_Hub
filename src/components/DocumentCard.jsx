export default function DocumentCard({ document }) {
    return (
        <div className="flex items-center justify-between bg-white/50 border border-white/60 p-4 rounded-2xl hover:bg-white/70 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl shadow-inner">
                    📄
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
