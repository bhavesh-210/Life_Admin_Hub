import { useState } from 'react';
import { useLifeAdmin } from '../context/LifeAdminContext';
import DocumentCard from '../components/DocumentCard';

export default function Documents() {
    const { documents, addDocument } = useLifeAdmin();
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All'); // All, Identity, Vehicle, Medical, Financial, Other
    
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [uploadState, setUploadState] = useState('idle'); // idle, scanning, success
    const [progress, setProgress] = useState(0);
    const [scanText, setScanText] = useState('Reading document...');
    const [newDocData, setNewDocData] = useState({ title: '', category: 'Other' });

    const [selectedDoc, setSelectedDoc] = useState(null); // Document selected for preview modal

    // Folder counts
    const getCount = (cat) => {
        if (cat === 'All') return documents.length;
        return documents.filter(d => d.type === cat).length;
    };

    const categories = ['All', 'Identity', 'Vehicle', 'Medical', 'Financial', 'Other'];

    const filteredDocs = documents.filter((doc) => {
        const matchesSearch = doc.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || doc.type === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleUploadClick = () => {
        setIsUploadModalOpen(true);
        setUploadState('idle');
        setProgress(0);
        setNewDocData({ title: '', category: 'Other' });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setUploadState('scanning');
        
        let currentProgress = 0;
        const scanSteps = [
            'Reading document layout...',
            'Performing OCR text extraction...',
            'Checking signatures and stamps...',
            'Extracting key metadata...',
            'Saving encrypted file to secure vault...'
        ];

        const interval = setInterval(() => {
            currentProgress += 5;
            setProgress(currentProgress);
            
            const stepIndex = Math.min(Math.floor(currentProgress / 20), scanSteps.length - 1);
            setScanText(scanSteps[stepIndex]);

            if (currentProgress >= 100) {
                clearInterval(interval);
                setUploadState('success');
                setTimeout(() => {
                    const newDoc = {
                        id: Date.now().toString(),
                        title: newDocData.title || 'Uploaded Document',
                        type: newDocData.category,
                        uploadDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                        fileSize: '1.4 MB',
                        renewalDate: newDocData.category === 'Vehicle' ? '20 June 2027' : newDocData.category === 'Identity' ? '15 Apr 2036' : null,
                        notes: 'Manually uploaded document scanned via OCR.'
                    };
                    addDocument(newDoc);
                    setTimeout(() => setIsUploadModalOpen(false), 1200);
                }, 400);
            }
        }, 120);
    };

    // Render visual mockup inside previewer
    const renderVisualMockup = (doc) => {
        if (!doc) return null;
        const lowercaseTitle = doc.title.toLowerCase();

        if (doc.type === 'Identity' || lowercaseTitle.includes('license') || lowercaseTitle.includes('passport')) {
            const isPassport = lowercaseTitle.includes('passport');
            if (isPassport) {
                return (
                    <div className="w-full max-w-sm aspect-[1.58] border-2 border-slate-900 bg-amber-50 text-slate-950 p-6 flex flex-col justify-between relative overflow-hidden font-mono shadow-[4px_4px_0_0_#d97706] rounded">
                        <div className="flex justify-between items-start border-b border-slate-950 pb-2">
                            <div>
                                <p className="text-[8px] uppercase tracking-widest font-sans font-bold">REPUBLIC OF INDIA</p>
                                <h4 className="text-xs font-black tracking-widest uppercase">Passport / Passeport</h4>
                            </div>
                            <div className="text-right">
                                <p className="text-[7px] font-sans font-semibold">Type/Code</p>
                                <p className="text-[9px] font-bold">P / IND</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center my-2">
                            <div className="w-14 h-16 border-[1.5px] border-slate-900 bg-white flex items-center justify-center text-[9px] font-sans font-bold rounded">
                                PHOTO
                            </div>
                            <div className="text-[8px] space-y-1">
                                <div><span className="opacity-50 uppercase font-sans">Surname:</span> SHARMA</div>
                                <div><span className="opacity-50 uppercase font-sans">Given Names:</span> BHAVESH</div>
                                <div><span className="opacity-50 uppercase font-sans">Nationality:</span> INDIAN</div>
                                <div><span className="opacity-50 uppercase font-sans">Date of Birth:</span> 14/08/1996</div>
                            </div>
                        </div>
                        <div className="flex justify-between items-end border-t border-slate-950 pt-2 text-[8px]">
                            <div>
                                <p className="font-sans text-[7px] opacity-50">Passport No</p>
                                <p className="font-bold text-[9px]">P987654321</p>
                            </div>
                            <div>
                                <p className="font-sans text-[7px] opacity-50">Expiry Date</p>
                                <p className="font-bold text-[9px]">{doc.renewalDate || '20/01/2028'}</p>
                            </div>
                            <div className="border border-slate-950 px-2 py-0.5 font-sans font-black text-[9px] rounded">IND</div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="w-full max-w-sm aspect-[1.58] border-2 border-slate-900 bg-sky-50 text-slate-950 p-5 flex flex-col justify-between relative overflow-hidden font-mono shadow-[4px_4px_0_0_#2563eb] rounded">
                        <div className="flex justify-between items-start border-b border-slate-950 pb-2">
                            <div>
                                <h4 className="text-[8px] tracking-wider uppercase font-bold font-sans">UNION OF INDIA</h4>
                                <h3 className="text-xs uppercase font-black tracking-widest text-slate-900 mt-0.5">DRIVING LICENSE</h3>
                            </div>
                            <span className="text-[7px] border border-slate-950 px-1.5 py-0.5 rounded font-mono font-bold bg-white">DL</span>
                        </div>
                        <div className="flex gap-4 items-center my-3">
                            <div className="w-12 h-16 border-[1.5px] border-slate-900 bg-white flex items-center justify-center text-[10px] font-bold rounded">
                                BS
                            </div>
                            <div className="text-[8px] space-y-0.5 flex-1">
                                <div><span className="opacity-50">Name:</span> BHAVESH SHARMA</div>
                                <div><span className="opacity-50">DL No:</span> DL-14-2021008453</div>
                                <div><span className="opacity-50">DOB:</span> 14-08-1996</div>
                                <div><span className="opacity-50">Class:</span> LMV, MCWG</div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-[8px]">
                            <div>
                                <span className="opacity-50 block text-[6px] uppercase font-bold">Valid Till</span>
                                <span className="font-bold text-[8px]">{doc.renewalDate || '12 Aug 2026'}</span>
                            </div>
                            <span className="text-[7px] font-bold font-sans uppercase">TRANSPORT AUTHORITY</span>
                        </div>
                    </div>
                );
            }
        }

        if (doc.type === 'Vehicle' && lowercaseTitle.includes('insurance')) {
            return (
                <div className="w-full bg-white dark:bg-slate-950 border-[1.5px] border-slate-900 dark:border-slate-100 p-5 rounded font-mono text-[10px] text-slate-800 dark:text-slate-200">
                    <div className="flex justify-between items-center border-b-[1.5px] border-slate-900 dark:border-slate-100 pb-3 mb-4">
                        <div>
                            <h4 className="font-extrabold uppercase text-[11px]">HDFC ERGO General Insurance</h4>
                            <p className="text-[8px] opacity-60 uppercase font-sans mt-0.5">// Vehicle Insurance Certificate</p>
                        </div>
                        <span className="badge badge-green font-mono">ACTIVE</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4 text-[9px]">
                        <div><span className="opacity-55 block uppercase font-sans">Policy Number:</span> <span className="font-bold">2315-9874-2025-A</span></div>
                        <div><span className="opacity-55 block uppercase font-sans">Insured Name:</span> <span className="font-bold">Bhavesh Sharma</span></div>
                        <div><span className="opacity-55 block uppercase font-sans">Vehicle Model:</span> <span className="font-bold">Hyundai Verna Sedan</span></div>
                        <div><span className="opacity-55 block uppercase font-sans">Period of Cover:</span> <span className="font-bold">20 Jun 25 to {doc.renewalDate || '20 Jun 26'}</span></div>
                    </div>
                    <table className="w-full text-left border-collapse text-[8px] border-t border-slate-200 dark:border-slate-800 pt-2">
                        <thead>
                            <tr className="border-b border-slate-300 dark:border-slate-700 opacity-60 uppercase font-sans"><th className="pb-1">Cover Section</th><th className="pb-1 text-right">Sum Insured</th></tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-100 dark:border-slate-900"><td className="py-1">Own Damage Limit</td><td className="py-1 text-right">₹4,50,000</td></tr>
                            <tr className="border-b border-slate-100 dark:border-slate-900"><td className="py-1">Third Party Liability</td><td className="py-1 text-right">Unlimited</td></tr>
                            <tr><td className="py-1">Personal Accident</td><td className="py-1 text-right">₹15,000</td></tr>
                        </tbody>
                    </table>
                </div>
            );
        }

        if (doc.type === 'Medical' && lowercaseTitle.includes('insurance')) {
            return (
                <div className="w-full max-w-sm aspect-[1.58] border-2 border-slate-900 bg-emerald-50 text-slate-950 p-5 flex flex-col justify-between relative overflow-hidden font-mono shadow-[4px_4px_0_0_#059669] rounded">
                    <div className="flex justify-between items-start border-b border-slate-950 pb-2">
                        <div>
                            <h4 className="text-[8px] tracking-wider uppercase font-bold font-sans">STAR HEALTH INSURANCE</h4>
                            <p className="text-[6px] opacity-60 uppercase font-bold tracking-widest mt-0.5">Family Health Optima Policy</p>
                        </div>
                        <svg className="w-5 h-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                    </div>
                    <div className="my-2 text-[8px] space-y-1.5">
                        <div><span className="opacity-55 block font-sans text-[7px] uppercase">Primary Insured</span> <span className="font-bold text-xs">BHAVESH SHARMA</span></div>
                        <div className="grid grid-cols-2 gap-2">
                            <div><span className="opacity-55 block font-sans text-[7px] uppercase">Card Number</span> <span className="font-bold">STAR-87654321</span></div>
                            <div><span className="opacity-55 block font-sans text-[7px] uppercase">Sum Insured</span> <span className="font-bold">₹5,00,000</span></div>
                        </div>
                    </div>
                    <div className="flex justify-between items-end text-[7px] border-t border-slate-950 pt-2">
                        <div><span className="opacity-55 text-[6px] uppercase font-sans block">Valid Upto</span> <span className="font-bold">{doc.renewalDate || '05 Sep 2026'}</span></div>
                        <span className="font-bold uppercase">CASHLESS NETWORK</span>
                    </div>
                </div>
            );
        }

        if (doc.type === 'Financial' || lowercaseTitle.includes('tax') || lowercaseTitle.includes('return')) {
            return (
                <div className="w-full bg-white dark:bg-slate-950 border-[1.5px] border-slate-900 dark:border-slate-100 p-5 rounded font-mono text-[10px] text-slate-800 dark:text-slate-200">
                    <div className="text-center border-b-[1.5px] border-slate-900 dark:border-slate-100 pb-2 mb-3">
                        <h4 className="font-extrabold uppercase text-[11px]">Income Tax Department</h4>
                        <p className="text-[7px] opacity-60 uppercase font-sans mt-0.5">Government of India • Form 16 / Tax Acknowledgement</p>
                    </div>
                    <div className="space-y-1 text-[9px] mb-3">
                        <div className="flex justify-between"><span className="opacity-55">Assessment Year:</span> <span className="font-bold">2026-27</span></div>
                        <div className="flex justify-between"><span className="opacity-55">PAN Card No:</span> <span className="font-bold">BPMPS8540G</span></div>
                        <div className="flex justify-between"><span className="opacity-55">Assessee Name:</span> <span className="font-bold">Bhavesh Sharma</span></div>
                    </div>
                    <div className="border-t border-slate-200 dark:border-slate-800 pt-2.5 space-y-1.5 text-[8px]">
                        <div className="flex justify-between font-bold border-b border-slate-100 dark:border-slate-900 pb-1"><span>Income Head</span><span className="text-right">Amount</span></div>
                        <div className="flex justify-between"><span>1. Gross Salary Income</span><span className="text-right">₹12,40,000</span></div>
                        <div className="flex justify-between"><span>2. Total Deductions</span><span className="text-right">- ₹1,50,000</span></div>
                        <div className="flex justify-between font-extrabold text-indigo-600 dark:text-indigo-400 pt-1 border-t border-slate-200 dark:border-slate-850">
                            <span>Net Taxable Income</span>
                            <span className="text-right">₹10,90,000</span>
                        </div>
                    </div>
                </div>
            );
        }

        // Default paper mockup for generic documents
        return (
            <div className="w-full bg-white dark:bg-slate-950 border-[1.5px] border-slate-900 dark:border-slate-100 p-5 rounded font-mono text-[10px] text-slate-800 dark:text-slate-200 min-h-[200px] flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-center border-b border-slate-900/10 dark:border-slate-100/10 pb-2 mb-3">
                        <h4 className="font-extrabold uppercase truncate max-w-[150px]">{doc.title}</h4>
                        <span className="text-[8px] opacity-50 uppercase font-sans">PAGE 1 OF 1</span>
                    </div>
                    <div className="space-y-2 opacity-85 text-[9px] leading-relaxed">
                        <p className="font-bold uppercase tracking-wider text-[7px] text-customAccent">// OCR Document summary</p>
                        <p className="font-sans">This document is stored securely in the Life Admin Hub encrypted digital vault.</p>
                        <div className="p-2 border border-slate-900/10 dark:border-slate-100/10 bg-slate-50 dark:bg-slate-900 rounded text-[8px] text-slate-500 font-mono">
                            File ID: {doc.id}<br />
                            Category: {doc.type}<br />
                            Notes: {doc.notes || 'No extra notes provided.'}
                        </div>
                    </div>
                </div>
                <div className="h-6 flex justify-between items-end border-t border-slate-900/10 dark:border-slate-100/10 pt-2 opacity-50 text-[7px]">
                    <span>SCAN ID: OCR_{doc.id}</span>
                    <span>DATE: {doc.uploadDate || 'RECENT'}</span>
                </div>
            </div>
        );
    };

    // Helper to get raw text for OCR sidebar in preview modal
    const getOcrText = (doc) => {
        if (!doc) return '';
        const lowercaseTitle = doc.title.toLowerCase();
        if (lowercaseTitle.includes('passport')) {
            return `REPUBLIC OF INDIA / RÉPUBLIQUE D'INDE\nPASSPORT / PASSEPORT\nType: P | Code: IND | Passport No: P987654321\nSurname: SHARMA\nGiven Names: BHAVESH\nNationality: INDIAN\nSex: M | Date of Birth: 14/08/1996\nPlace of Issue: DELHI\nDate of Issue: 21/01/2018\nDate of Expiry: 20/01/2028\nP<INDSHARMA<<BHAVESH<<<<<<<<<<<<<<<<<<<<<<<\nP9876543212IND9608144M2801208<<<<<<<<<<<<<<<0`;
        }
        if (lowercaseTitle.includes('license') || lowercaseTitle.includes('driving')) {
            return `UNION OF INDIA - INDIAN DRIVING LICENSE\nLicence No: DL-14-2021008453\nName: BHAVESH SHARMA\nS/O: R.K. SHARMA\nDOB: 14-08-1996\nAddress: Sector 12, Dwarka, New Delhi, 110075\nAuthorised Class: LMV, MCWG\nDate of Issue: 13-08-2021\nValidity Expiry: 12 Aug 2026\nAuthority: STATE TRANSPORT COMMISSIONER DELHI`;
        }
        if (lowercaseTitle.includes('insurance') && doc.type === 'Vehicle') {
            return `HDFC ERGO GENERAL INSURANCE COMPANY LTD.\nCERTIFICATE OF INSURANCE AND POLICY SCHEDULE\nPolicy No: 2315-9874-2025-A\nInsured: BHAVESH SHARMA\nVehicle Make/Model: HYUNDAI VERNA\nReg No: DL-3C-CA-1234\nChassis No: MALB3124567890\nCover Period: 20/06/2025 00:00 to 20/06/2026 23:59\nIDV (Sum Insured): Rs. 4,50,000\nThird Party Liability: Rs. Unlimited\nNet Premium Paid: Rs. 4,500`;
        }
        if (lowercaseTitle.includes('insurance') && doc.type === 'Medical') {
            return `STAR HEALTH AND ALLIED INSURANCE CO. LTD.\nHEALTH INSURANCE CARD\nCard No: STAR-87654321\nPolicy Holder: BHAVESH SHARMA\nProduct Name: Family Health Optima Insurance Plan\nSum Insured: Rs. 5,00,000\nCoverage Period: 05/09/2025 to 05/09/2026\nBeneficiary ID: STARBHSH96\nTPA Helpline: 1800 425 2255 (Cashless Desk)`;
        }
        if (lowercaseTitle.includes('tax') || lowercaseTitle.includes('return')) {
            return `INCOME TAX DEPARTMENT - GOVERNMENT OF INDIA\nFORM 16 - ASSESSMENT YEAR 2026-27 (FY 2025-26)\nTax Return Acknowledgement - ITR-1 (SAHAJ)\nAssessee: BHAVESH SHARMA\nPAN: BPMPS8540G\nFiling Status: 139(1) - Original\nGross Salary Income: Rs. 12,40,000\nDeductions Sec 80C/D: Rs. 1,50,000\nTaxable Income: Rs. 10,90,000\nTax Liability computed: Rs. 1,12,450\nTotal TDS Deducted: Rs. 1,12,450\nRefund / Tax Due: Rs. 0.00`;
        }
        return `DOCUMENT OCR EXTRACT\nTitle: ${doc.title}\nCategory: ${doc.type}\nUpload Date: ${doc.uploadDate || 'N/A'}\nFile Size: ${doc.fileSize || 'N/A'}\nNotes: ${doc.notes || 'N/A'}\n\n[Parsed OCR text elements...]\n- Decrypted key value parameters.\n- Secure storage fingerprint match.\n- Digital signature check passed.`;
    };

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Document Vault</h1>
                    <p className="page-subtitle">// SECURE STORAGE ARCHIVE & OCR METADATA NODES</p>
                </div>
                <button 
                    onClick={handleUploadClick} 
                    className="btn btn-dark flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                    Upload Document
                </button>
            </div>

            {/* Folder / Category Section */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {categories.map((cat) => {
                    const count = getCount(cat);
                    const isActive = selectedCategory === cat;
                    return (
                        <div 
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`border-[1.5px] p-3 rounded flex flex-col justify-between cursor-pointer transition-all duration-200 select-none ${
                                isActive 
                                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900 dark:border-slate-100 translate-y-[-2px] shadow-[3px_3px_0_0_var(--theme-accent)]' 
                                    : 'bg-white dark:bg-slate-900 border-slate-900/10 dark:border-slate-100/10 text-slate-800 dark:text-slate-200 hover:border-slate-900 dark:hover:border-slate-100'
                            }`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-7 h-7 rounded flex items-center justify-center ${isActive ? 'bg-white/20 text-white dark:bg-slate-900/10 dark:text-slate-900' : 'bg-slate-50 dark:bg-slate-800 border-[1.5px] border-slate-900/10 dark:border-slate-100/10'}`}>
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                                    </svg>
                                </div>
                                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${isActive ? 'bg-white/30 text-white dark:bg-slate-900/20' : 'bg-slate-50 dark:bg-slate-800 border border-slate-900/10 dark:border-slate-100/10 text-slate-500'}`}>
                                    {count}
                                </span>
                            </div>
                            <span className="font-extrabold text-xs uppercase tracking-wide">{cat === 'All' ? 'All' : cat}</span>
                        </div>
                    );
                })}
            </div>

            {/* Documents List & Search Container */}
            <div className="card shadow-[4px_4px_0_0_rgba(15,23,42,0.05)]">
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search document registry..."
                        className="input"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {filteredDocs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredDocs.map((doc) => (
                            <DocumentCard key={doc.id} document={doc} onView={setSelectedDoc} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-slate-400 dark:text-slate-500">
                        <svg className="w-10 h-10 mx-auto mb-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        <p className="font-extrabold uppercase tracking-tight text-sm">No node match</p>
                        <p className="text-xs font-mono opacity-60 mt-1">Try modifying filter scopes or query key.</p>
                    </div>
                )}
            </div>

            {/* Document Visual Preview Modal */}
            {selectedDoc && (
                <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) setSelectedDoc(null); }}>
                    <div className="bg-white dark:bg-slate-900 border-[1.5px] border-slate-900 dark:border-slate-100 shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto animate-popIn flex flex-col md:flex-row relative rounded">
                        <button onClick={() => setSelectedDoc(null)} className="absolute top-6 right-6 z-10 text-slate-400 hover:text-slate-900 dark:hover:text-white p-1.5 border border-slate-200 dark:border-slate-800 rounded transition-colors bg-white dark:bg-slate-900">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                        
                        {/* Visual Mockup Side */}
                        <div className="flex-1 bg-slate-50 dark:bg-slate-950 p-8 flex items-center justify-center border-r-[1.5px] border-slate-900 dark:border-slate-100">
                            {renderVisualMockup(selectedDoc)}
                        </div>

                        {/* Details/Metadata & OCR Side */}
                        <div className="w-full md:w-80 p-8 flex flex-col justify-between bg-white dark:bg-slate-900">
                            <div className="space-y-6">
                                <div>
                                    <span className="badge badge-blue">
                                        {selectedDoc.type} Document
                                    </span>
                                    <h2 className="text-xl font-extrabold uppercase tracking-tight mt-3">{selectedDoc.title}</h2>
                                    
                                    <div className="space-y-1.5 mt-3 text-xs font-mono opacity-85">
                                        <div className="flex justify-between"><span className="opacity-60">Uploaded:</span> <span>{selectedDoc.uploadDate || 'Recently'}</span></div>
                                        <div className="flex justify-between"><span className="opacity-60">File size:</span> <span>{selectedDoc.fileSize || '120 KB'}</span></div>
                                        {selectedDoc.renewalDate && (
                                            <div className="flex justify-between text-amber-600 dark:text-amber-450 font-bold"><span className="opacity-100">Renewal:</span> <span>{selectedDoc.renewalDate}</span></div>
                                        )}
                                    </div>
                                </div>

                                <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
                                    <h4 className="font-extrabold text-[10px] uppercase tracking-wider opacity-60 mb-2">// OCR Text Extracted</h4>
                                    <pre className="bg-slate-50 dark:bg-slate-950 border-[1.5px] border-slate-900 dark:border-slate-100 p-3 rounded font-mono text-[9px] text-slate-700 dark:text-slate-350 max-h-48 overflow-y-auto whitespace-pre-wrap leading-relaxed shadow-inner">
                                        {getOcrText(selectedDoc)}
                                    </pre>
                                </div>
                            </div>

                            <button 
                                onClick={() => setSelectedDoc(null)} 
                                className="w-full btn btn-dark mt-6"
                            >
                                Close Vault
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* OCR Upload Modal */}
            {isUploadModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget && uploadState !== 'scanning') setIsUploadModalOpen(false)}}>
                    <div className="auth-card relative animate-popIn">
                        {uploadState !== 'scanning' && <button onClick={() => setIsUploadModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg></button>}
                        
                        {uploadState === 'idle' && (
                            <form onSubmit={handleFormSubmit}>
                                <h2 className="text-2xl font-extrabold uppercase tracking-tight mb-2">// Upload Node</h2>
                                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-6">Enter file parameters to initialize OCR scan.</p>
                                
                                <div className="space-y-4 text-left mb-6">
                                    <div>
                                        <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1">Document Title</label>
                                        <input 
                                            type="text" 
                                            value={newDocData.title} 
                                            onChange={(e) => setNewDocData({...newDocData, title: e.target.value})} 
                                            className="input" 
                                            placeholder="e.g. Passport IND" 
                                            required 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1">Category</label>
                                        <select 
                                            value={newDocData.category} 
                                            onChange={(e) => setNewDocData({...newDocData, category: e.target.value})} 
                                            className="input font-bold uppercase tracking-wide"
                                        >
                                            <option value="Identity">Identity</option>
                                            <option value="Vehicle">Vehicle</option>
                                            <option value="Medical">Medical</option>
                                            <option value="Financial">Financial</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <button type="submit" className="w-full border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-slate-900 dark:hover:border-slate-100 rounded p-6 bg-slate-50 dark:bg-slate-900 cursor-pointer transition-colors group">
                                    <div className="w-10 h-10 mx-auto rounded border-[1.5px] border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-800 flex items-center justify-center text-customAccent mb-3 shadow-sm group-hover:scale-105 transition-transform">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                    </div>
                                    <h3 className="font-extrabold uppercase text-xs tracking-wider text-slate-800 dark:text-slate-100">Select Mock Vault File</h3>
                                    <p className="text-[9px] font-mono text-slate-500 mt-1">Triggers OCR indexing routines</p>
                                </button>
                            </form>
                        )}

                        {uploadState === 'scanning' && (
                            <div className="py-6">
                                <h2 className="text-xl font-extrabold uppercase tracking-tight mb-1">// Scanning...</h2>
                                <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mb-6">{scanText}</p>
                                
                                <div className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 h-3 mb-4 overflow-hidden rounded-sm">
                                    <div className="bg-customAccent h-full transition-all duration-150 ease-out" style={{ width: `${progress}%` }}></div>
                                </div>
                                <p className="font-mono text-xs font-black text-customAccent">{progress}%</p>
                            </div>
                        )}

                        {uploadState === 'success' && (
                            <div className="py-4">
                                <div className="w-12 h-12 mx-auto border-[1.5px] border-emerald-600 flex items-center justify-center text-emerald-600 bg-emerald-50 dark:bg-emerald-950 rounded mb-4">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <h2 className="text-xl font-extrabold uppercase tracking-tight">// Scan Success</h2>
                                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-2">Saved and parsed: {newDocData.title || 'Tax Return'}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
