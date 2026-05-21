import { documentsData } from '../data/demoData';
import DocumentCard from '../components/DocumentCard';

export default function Documents() {
    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-5xl font-extrabold text-[#0f172a] tracking-tight mb-2">Documents</h1>
                    <p className="text-lg text-[#475569]">Store and organize important files securely.</p>
                </div>
                <button className="bg-[#0f172a] text-white font-bold px-6 py-3 rounded-full hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">
                    Upload
                </button>
            </div>

            <div className="glass-pane bg-white/40 backdrop-blur-[20px] border border-white/60 rounded-[32px] p-8 shadow-xl">
                <div className="space-y-4">
                    {documentsData.map((document) => (
                        <DocumentCard key={document.id} document={document} />
                    ))}
                </div>
            </div>
        </div>
    );
}
