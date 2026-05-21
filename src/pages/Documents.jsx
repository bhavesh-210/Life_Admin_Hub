import { useState } from 'react';
import { documentsData } from '../data/demoData';
import DocumentCard from '../components/DocumentCard';

export default function Documents() {
    const [documents, setDocuments] = useState(documentsData);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [uploadState, setUploadState] = useState('idle'); // idle, scanning, success
    const [progress, setProgress] = useState(0);

    const handleUploadClick = () => {
        setIsUploadModalOpen(true);
        setUploadState('idle');
        setProgress(0);
    };

    const simulateUpload = () => {
        setUploadState('scanning');
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += 10;
            setProgress(currentProgress);
            if (currentProgress >= 100) {
                clearInterval(interval);
                setUploadState('success');
                setTimeout(() => {
                    const newDoc = {
                        id: Date.now().toString(),
                        title: 'Tax Return 2026',
                        type: 'Scanned OCR',
                        renewalDate: '15 Apr'
                    };
                    setDocuments([newDoc, ...documents]);
                    setTimeout(() => setIsUploadModalOpen(false), 1500);
                }, 500);
            }
        }, 200);
    };

    return (
        <div className="w-full max-w-5xl mx-auto pb-12">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-5xl font-extrabold text-[#0f172a] tracking-tight mb-2">Documents</h1>
                    <p className="text-lg text-[#475569]">Store and organize important files securely.</p>
                </div>
                <button onClick={handleUploadClick} className="bg-[#0f172a] text-white font-bold px-6 py-3 rounded-full hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                    Upload Document
                </button>
            </div>

            <div className="glass-pane bg-white/40 backdrop-blur-[20px] border border-white/60 rounded-[32px] p-8 shadow-xl">
                <div className="space-y-4">
                    {documents.map((document) => (
                        <DocumentCard key={document.id} document={document} />
                    ))}
                </div>
            </div>

            {/* OCR Upload Modal */}
            {isUploadModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center" onClick={(e) => { if (e.target === e.currentTarget && uploadState !== 'scanning') setIsUploadModalOpen(false)}}>
                    <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-8 rounded-[32px] shadow-2xl w-full max-w-md animate-popIn relative text-center">
                        {uploadState !== 'scanning' && <button onClick={() => setIsUploadModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-700"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>}
                        
                        {uploadState === 'idle' && (
                            <>
                                <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Upload & Scan</h2>
                                <p className="text-sm text-slate-500 mb-6">We will securely scan your document using OCR to extract key details.</p>
                                
                                <div onClick={simulateUpload} className="border-2 border-dashed border-indigo-300 rounded-2xl p-10 bg-indigo-50/50 hover:bg-indigo-50 cursor-pointer transition-colors group">
                                    <div className="w-16 h-16 mx-auto rounded-full bg-white flex items-center justify-center text-indigo-500 mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                    </div>
                                    <h3 className="font-bold text-indigo-700">Click or drag file to upload</h3>
                                    <p className="text-xs text-indigo-500/70 mt-1">PDF, JPG, PNG up to 10MB</p>
                                </div>
                            </>
                        )}

                        {uploadState === 'scanning' && (
                            <div className="py-8">
                                <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Analyzing Document...</h2>
                                <p className="text-sm text-slate-500 mb-8">Running OCR extraction model.</p>
                                
                                <div className="w-full bg-slate-200 rounded-full h-4 mb-4 overflow-hidden">
                                    <div className="bg-indigo-600 h-4 rounded-full transition-all duration-200 ease-out" style={{ width: `${progress}%` }}></div>
                                </div>
                                <p className="font-bold text-indigo-600">{progress}%</p>
                            </div>
                        )}

                        {uploadState === 'success' && (
                            <div className="py-6">
                                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <h2 className="text-xl font-extrabold text-slate-900">Scan Complete!</h2>
                                <p className="text-sm text-slate-500 mt-2">Extracted: Tax Return 2026</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
