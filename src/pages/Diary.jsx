import { useState, useRef, useMemo } from 'react';
import { useLifeAdmin } from '../context/LifeAdminContext';
import { encryptContent, decryptContent } from '../utils/crypto';

export default function Diary() {
    const { 
        diaries, 
        addDiary, 
        updateDiary, 
        deleteDiary, 
        addAttachment, 
        deleteAttachment, 
        toggleLock 
    } = useLifeAdmin();

    // UI View State
    const [viewMode, setViewMode] = useState('library'); // 'library', 'timeline', 'book-read', 'book-edit'
    const [selectedDiary, setSelectedDiary] = useState(null);
    const [activeSpread, setActiveSpread] = useState(0); // 0 = cover/page0, 1 = page1/page2, etc.
    const [paperStyle, setPaperStyle] = useState('ruled'); // 'ruled', 'grid', 'blank'
    const [isFlipping, setIsFlipping] = useState(false);
    const [flipDirection, setFlipDirection] = useState(null); // 'left', 'right'

    // Form / Composer State
    const [composerTitle, setComposerTitle] = useState('');
    const [composerMood, setComposerMood] = useState('Calm');
    const [composerPrivacy, setComposerPrivacy] = useState('Private');
    const [composerTags, setComposerTags] = useState('');
    const [composerCover, setComposerCover] = useState('#574635'); // Brown leather
    const [composerPages, setComposerPages] = useState([{ pageIndex: 0, html: '<p></p>' }]);
    const [activeEditPageIdx, setActiveEditPageIdx] = useState(0);
    const [composerAttachments, setComposerAttachments] = useState([]);

    // Search / Filters
    const [search, setSearch] = useState('');
    const [selectedMood, setSelectedMood] = useState('All');
    const [selectedPrivacy, setSelectedPrivacy] = useState('All');
    const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest'

    // Bulk selection state
    const [selectedIds, setSelectedIds] = useState([]);

    // Security Lock State
    const [isLockModalOpen, setIsLockModalOpen] = useState(false);
    const [lockPassword, setLockPassword] = useState('');
    const [lockDiaryId, setLockDiaryId] = useState(null);
    const [decryptedContents, setDecryptedContents] = useState({}); // { diaryId: [ { pageIndex, html } ] }
    const [decryptError, setDecryptError] = useState('');

    // Attachments Upload Simulator
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    // View Attachment Modals
    const [previewFile, setPreviewFile] = useState(null); // { name, type, blobDataUrl, size }

    const editorRef = useRef(null);

    const moods = ['Productive', 'Reflective', 'Calm', 'Motivated', 'Creative', 'Tired'];
    const coverColors = [
        { name: 'Brown Leather', hex: '#574635' },
        { name: 'Midnight Blue', hex: '#1e3a8a' },
        { name: 'Forest Green', hex: '#064e3b' },
        { name: 'Crimson Satin', hex: '#991b1b' },
        { name: 'Gold Onyx', hex: '#111111' }
    ];

    // Derived Diary list with filters
    const filteredDiaries = useMemo(() => {
        let result = diaries.filter((entry) => {
            const isLocked = entry.locked;
            const plainTextMatch = isLocked 
                ? false 
                : entry.content?.toLowerCase().includes(search.toLowerCase());
            
            const titleMatch = entry.title?.toLowerCase().includes(search.toLowerCase());
            const tagMatch = entry.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()));

            const matchesSearch = search === '' || titleMatch || plainTextMatch || tagMatch;
            const matchesMood = selectedMood === 'All' || entry.mood === selectedMood;
            const matchesPrivacy = selectedPrivacy === 'All' || entry.privacy === selectedPrivacy;
            
            return matchesSearch && matchesMood && matchesPrivacy;
        });

        // Sorting
        return result.sort((a, b) => {
            const dateA = new Date(a.createdAt || a.date);
            const dateB = new Date(b.createdAt || b.date);
            return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
        });
    }, [diaries, search, selectedMood, selectedPrivacy, sortBy]);

    // Handle Open Locked entry
    const handleTryOpen = (entry) => {
        if (entry.locked && !decryptedContents[entry.id]) {
            setLockDiaryId(entry.id);
            setLockPassword('');
            setDecryptError('');
            setIsLockModalOpen(true);
        } else {
            setSelectedDiary(entry);
            setActiveSpread(0);
            setViewMode('book-read');
            if (entry.paperStyle) setPaperStyle(entry.paperStyle);
        }
    };

    // Unlock Verification using Web Crypto Decrypt
    const handleUnlockSubmit = async (e) => {
        e.preventDefault();
        const entry = diaries.find(d => d.id === lockDiaryId);
        if (!entry || !entry.lockMeta) return;

        try {
            setDecryptError('');
            // Decrypt the encrypted payload
            const rawDecrypted = await decryptContent(
                entry.lockMeta.encryptedPayload,
                lockPassword
            );
            const parsedPages = JSON.parse(rawDecrypted);
            
            setDecryptedContents(prev => ({
                ...prev,
                [lockDiaryId]: parsedPages
            }));
            
            setIsLockModalOpen(false);
            
            // Open the book
            const unlockedEntry = { ...entry, pages: parsedPages };
            setSelectedDiary(unlockedEntry);
            setActiveSpread(0);
            setViewMode('book-read');
            if (entry.paperStyle) setPaperStyle(entry.paperStyle);
        } catch {
            setDecryptError('Incorrect passphrase. Content remains securely encrypted.');
        }
    };

    // Format rich text helper
    const handleFormat = (command, value = null) => {
        document.execCommand(command, false, value);
        if (editorRef.current) {
            updateComposerPageHtml(editorRef.current.innerHTML);
        }
    };

    const updateComposerPageHtml = (html) => {
        setComposerPages(prev => {
            const copy = [...prev];
            if (copy[activeEditPageIdx]) {
                copy[activeEditPageIdx].html = html;
            }
            return copy;
        });
    };

    // Page navigation helper in book reading view
    const handleTurnPage = (direction) => {
        if (isFlipping) return;

        const maxSpreads = Math.ceil((selectedDiary.pages.length + 1) / 2);
        if (direction === 'next' && activeSpread < maxSpreads - 1) {
            setFlipDirection('right');
            setIsFlipping(true);
            setTimeout(() => {
                setActiveSpread(prev => prev + 1);
                setIsFlipping(false);
            }, 600);
        } else if (direction === 'prev' && activeSpread > 0) {
            setFlipDirection('left');
            setIsFlipping(true);
            setTimeout(() => {
                setActiveSpread(prev => prev - 1);
                setIsFlipping(false);
            }, 600);
        }
    };

    // Active pages in current reading spread
    const currentSpreadPages = useMemo(() => {
        if (!selectedDiary) return { left: null, right: null };
        const pages = decryptedContents[selectedDiary.id] || selectedDiary.pages || [];

        if (activeSpread === 0) {
            // Left: cover metadata, Right: Page 0
            return { left: 'cover', right: pages[0] || null };
        } else {
            // Left: Page 2s - 1, Right: Page 2s
            const leftIdx = activeSpread * 2 - 1;
            const rightIdx = activeSpread * 2;
            return { left: pages[leftIdx] || null, right: pages[rightIdx] || null };
        }
    }, [selectedDiary, activeSpread, decryptedContents]);

    // Handle New Composer Setup
    const handleStartComposer = () => {
        setComposerTitle('');
        setComposerMood('Calm');
        setComposerPrivacy('Private');
        setComposerTags('');
        setComposerCover('#574635');
        setComposerPages([{ pageIndex: 0, html: '<p>Write your thoughts here...</p>' }]);
        setComposerAttachments([]);
        setActiveEditPageIdx(0);
        setSelectedDiary(null);
        setViewMode('book-edit');
    };

    // Handle Edit Composer Setup
    const handleStartEdit = (entry) => {
        const pages = decryptedContents[entry.id] || entry.pages || [];
        setComposerTitle(entry.title);
        setComposerMood(entry.mood);
        setComposerPrivacy(entry.privacy || 'Private');
        setComposerTags(entry.tags?.join(', ') || '');
        setComposerCover(entry.coverColor || '#574635');
        setComposerPages(pages.length > 0 ? pages : [{ pageIndex: 0, html: '<p></p>' }]);
        setComposerAttachments(entry.attachments || []);
        setActiveEditPageIdx(0);
        setSelectedDiary(entry);
        setViewMode('book-edit');
    };

    // Save Entry to Context
    const handleSaveEntry = async () => {
        if (!composerTitle.trim()) return;

        // Parse tags
        const tagsArray = composerTags
            .split(',')
            .map(t => t.trim())
            .filter(t => t.length > 0);

        // Render plain text content from pages for full-text search indexing
        const aggregatedContent = composerPages
            .map(p => p.html.replace(/<[^>]*>/g, ''))
            .join(' ');

        const payload = {
            title: composerTitle,
            mood: composerMood,
            privacy: composerPrivacy,
            tags: tagsArray,
            coverColor: composerCover,
            pages: composerPages,
            content: aggregatedContent,
            paperStyle,
            attachments: composerAttachments
        };

        if (selectedDiary) {
            // Preserve encryption state if it was locked
            if (selectedDiary.locked) {
                payload.locked = true;
                payload.lockMeta = selectedDiary.lockMeta;
            }
            updateDiary(selectedDiary.id, payload);
        } else {
            addDiary(payload);
        }
        setViewMode('library');
    };

    // Web Crypto Locking of an Entry
    const handleLockToggle = async (entry) => {
        if (entry.locked) {
            // Unlock completely / remove passphrase
            const passphrase = prompt('Enter passphrase to unlock this entry permanently:');
            if (!passphrase) return;
            try {
                const decPages = decryptedContents[entry.id] || await decryptContent(entry.lockMeta.encryptedPayload, passphrase);
                toggleLock(entry.id, {
                    locked: false,
                    lockMeta: null,
                    pages: decPages,
                    content: decPages.map(p => p.html.replace(/<[^>]*>/g, '')).join(' ')
                });
                // Remove from decrypted cache
                setDecryptedContents(prev => {
                    const copy = { ...prev };
                    delete copy[entry.id];
                    return copy;
                });
            } catch {
                alert('Passphrase incorrect. Decryption failed.');
            }
        } else {
            // Lock with passphrase
            const passphrase = prompt('Enter a new security passphrase to lock and encrypt this entry:');
            if (!passphrase) return;
            const confirmPass = prompt('Confirm passphrase:');
            if (passphrase !== confirmPass) {
                alert('Passphrases do not match. Cancelled.');
                return;
            }

            try {
                // Encrypt page payload
                const serializedPages = JSON.stringify(entry.pages);
                const encryptedPayload = await encryptContent(serializedPages, passphrase);

                toggleLock(entry.id, {
                    locked: true,
                    lockMeta: {
                        encryptedPayload
                    },
                    // Erase plain text from stored variables
                    pages: [{ pageIndex: 0, html: '<p>[SECURELY ENCRYPTED NODE]</p>' }],
                    content: '[Locked Secure Entry]'
                });
            } catch (err) {
                alert('Encryption failed: ' + err.message);
            }
        }
    };

    const handleDeleteAttachment = (attachmentId) => {
        setComposerAttachments(prev => prev.filter(a => a.id !== attachmentId));
        if (selectedDiary) {
            deleteAttachment(selectedDiary.id, attachmentId);
            setSelectedDiary(prevDiary => ({
                ...prevDiary,
                attachments: (prevDiary.attachments || []).filter(a => a.id !== attachmentId)
            }));
        }
    };

    // Attach File Simulator
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Restriction: Max 5MB
        if (file.size > 5 * 1024 * 1024) {
            alert('File size exceeds the 5MB attachment restriction.');
            return;
        }

        setUploading(true);
        setUploadProgress(0);

        // Simulate progress bar upload animation
        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        const reader = new FileReader();
                        reader.onload = () => {
                            const newAttachment = {
                                id: Date.now().toString(),
                                name: file.name,
                                size: `${(file.size / 1024).toFixed(1)} KB`,
                                type: file.type || 'application/octet-stream',
                                blobDataUrl: reader.result,
                                uploadedAt: new Date().toISOString()
                            };
                            
                            // Update local list
                            setComposerAttachments(prevAtt => [...prevAtt, newAttachment]);

                            if (selectedDiary) {
                                addAttachment(selectedDiary.id, newAttachment);
                                // Also update selectedDiary pages cache
                                setSelectedDiary(prevDiary => ({
                                    ...prevDiary,
                                    attachments: [...(prevDiary.attachments || []), newAttachment]
                                }));
                            }
                            setUploading(false);
                        };
                        
                        if (file.type.startsWith('image/') || file.type === 'application/pdf' || file.type.startsWith('text/')) {
                            reader.readAsDataURL(file);
                        } else {
                            reader.readAsText(file); // fallback
                        }
                    }, 200);
                    return 100;
                }
                return prev + 25;
            });
        }, 300);
    };



    // Bulk Delete
    const handleBulkDelete = () => {
        if (!window.confirm(`Delete ${selectedIds.length} selected entries?`)) return;
        selectedIds.forEach(id => deleteDiary(id));
        setSelectedIds([]);
    };

    // Bulk Export to simulated ZIP
    const handleBulkExport = () => {
        const entriesToExport = diaries.filter(d => selectedIds.includes(d.id));
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(entriesToExport, null, 2)
        )}`;
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute('href', jsonString);
        downloadAnchor.setAttribute('download', `life_admin_diary_export_${Date.now()}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        setSelectedIds([]);
    };

    // Printer-friendly clean layout
    const handlePrintEntry = (entry) => {
        const pages = decryptedContents[entry.id] || entry.pages || [];
        const printWindow = window.open('', '_blank');
        const renderedHtml = pages.map(p => p.html).join('<hr style="border: 1px dashed #aaa; margin: 30px 0;" />');

        printWindow.document.write(`
            <html>
                <head>
                    <title>Life Admin Diary - ${entry.title}</title>
                    <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=EB+Garamond&display=swap" rel="stylesheet">
                    <style>
                        body {
                            font-family: 'EB Garamond', Georgia, serif;
                            color: #222;
                            padding: 40px;
                            max-width: 800px;
                            margin: 0 auto;
                            line-height: 1.6;
                        }
                        h1 {
                            font-family: 'Caveat', cursive;
                            font-size: 42px;
                            text-transform: uppercase;
                            border-bottom: 2px solid #222;
                            padding-bottom: 10px;
                            margin-bottom: 5px;
                        }
                        .meta {
                            font-family: monospace;
                            font-size: 11px;
                            color: #666;
                            margin-bottom: 30px;
                        }
                        p { font-size: 18px; margin-bottom: 1.5em; }
                    </style>
                </head>
                <body>
                    <h1>${entry.title}</h1>
                    <div class="meta">Date: ${entry.date} | Mood: ${entry.mood} | Scope: ${entry.privacy}</div>
                    <div>${renderedHtml}</div>
                    <script>
                        window.onload = function() {
                            window.print();
                            window.close();
                        }
                    </script>
                </body>
            </html>
        `);
        printWindow.document.close();
    };

    // Toggle bulk select box
    const toggleSelectId = (id, e) => {
        e.stopPropagation();
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Personal Diary</h1>
                    <p className="page-subtitle">// TACTILE WORKSPACE MEMORY JOURNAL NODE</p>
                </div>
                
                {viewMode === 'library' && (
                    <button onClick={handleStartComposer} className="btn btn-dark">
                        + New Entry
                    </button>
                )}
                {viewMode !== 'library' && (
                    <button onClick={() => setViewMode('library')} className="btn">
                        &larr; Exit to Library
                    </button>
                )}
            </div>

            {/* Shelf & Filters Top Section */}
            {viewMode === 'library' && (
                <div className="space-y-6">
                    {/* Filters Row */}
                    <div className="card shadow-[3px_3px_0_0_rgba(15,23,42,0.05)]">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            {/* Search bar */}
                            <div className="w-full md:w-80">
                                <input
                                    type="text"
                                    placeholder="Search entries or tags..."
                                    className="input font-mono text-xs"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                            {/* Filters & Actions */}
                            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
                                <select 
                                    className="input text-xs w-36 uppercase font-bold tracking-wide"
                                    value={selectedMood}
                                    onChange={(e) => setSelectedMood(e.target.value)}
                                >
                                    <option value="All">All Moods</option>
                                    {moods.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>

                                <select 
                                    className="input text-xs w-36 uppercase font-bold tracking-wide"
                                    value={selectedPrivacy}
                                    onChange={(e) => setSelectedPrivacy(e.target.value)}
                                >
                                    <option value="All">All Scopes</option>
                                    <option value="Private">Private</option>
                                    <option value="Shared">Shared</option>
                                </select>

                                <select 
                                    className="input text-xs w-36 uppercase font-bold tracking-wide"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                </select>
                            </div>
                        </div>

                        {/* Bulk Action Panel */}
                        {selectedIds.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-3 rounded">
                                <span className="text-xs font-mono font-bold text-customAccent">
                                    {selectedIds.length} item(s) selected
                                </span>
                                <div className="flex gap-2">
                                    <button onClick={handleBulkExport} className="btn py-1 px-3 text-[10px] border-indigo-500 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950">
                                        Export JSON
                                    </button>
                                    <button onClick={handleBulkDelete} className="btn py-1 px-3 text-[10px] border-rose-500 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950">
                                        Delete Selected
                                    </button>
                                    <button onClick={() => setSelectedIds([])} className="btn py-1 px-3 text-[10px]">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Tactile Book Shelf Library View */}
                    <div className="card shadow-[3px_3px_0_0_rgba(15,23,42,0.05)]">
                        <h3 className="section-title">// JOURNAL ARCHIVES</h3>
                        {filteredDiaries.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 py-4">
                                {filteredDiaries.map((entry) => (
                                    <div 
                                        key={entry.id} 
                                        onClick={() => handleTryOpen(entry)}
                                        className="flex flex-col items-center gap-3 group relative"
                                    >
                                        {/* Bulk Action checkbox overlay */}
                                        <div className="absolute top-2 left-2 z-10">
                                            <input 
                                                type="checkbox" 
                                                checked={selectedIds.includes(entry.id)}
                                                onChange={(e) => toggleSelectId(entry.id, e)}
                                                className="w-4 h-4 cursor-pointer"
                                            />
                                        </div>

                                        {/* Cover */}
                                        <div 
                                            className="diary-cover" 
                                            style={{ backgroundColor: entry.coverColor || '#574635' }}
                                        >
                                            {/* Decorative lines/gold stamping */}
                                            <div className="absolute top-3 bottom-3 left-3 w-[1px] bg-black/10"></div>
                                            <div className="absolute top-3 bottom-3 left-4 w-[1.5px] bg-black/25"></div>
                                            <div className="absolute top-3 bottom-3 right-3 left-6 border border-black/10 rounded"></div>

                                            {/* Label Card */}
                                            <div className="diary-cover-label">
                                                <h4>{entry.title}</h4>
                                                <p>{entry.date}</p>
                                            </div>

                                            {/* Physical Lock indicator */}
                                            {entry.locked && (
                                                <div className="diary-cover-lock">
                                                    <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                                                </div>
                                            )}
                                        </div>

                                        {/* Entry Title & Metadata */}
                                        <div className="text-center">
                                            <h4 className="font-extrabold uppercase text-[11px] tracking-tight group-hover:text-customAccent transition-colors max-w-[130px] truncate">{entry.title}</h4>
                                            <div className="flex gap-1.5 justify-center mt-1">
                                                <span className="text-[8px] font-mono border border-slate-900/10 px-1 rounded opacity-60 uppercase">{entry.mood}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 text-slate-400 dark:text-slate-500">
                                <svg className="w-14 h-14 mx-auto mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.754 18 18.168 18.477 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                                <p className="font-extrabold uppercase tracking-tight text-sm">Diary shelf is empty</p>
                                <p className="text-xs font-mono opacity-60 mt-1.5">No entries match your current sorting / filtering configurations.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Tactile Book Reading View */}
            {viewMode === 'book-read' && selectedDiary && (
                <div className="space-y-6">
                    {/* Ribbon Controls bar */}
                    <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950 p-4 border border-slate-900/10 dark:border-slate-100/10 rounded">
                        {/* Selector variables */}
                        <div className="flex gap-2">
                            {['ruled', 'grid', 'blank'].map((style) => (
                                <button
                                    key={style}
                                    onClick={() => setPaperStyle(style)}
                                    className={`btn px-3 py-1 text-[10px] uppercase ${paperStyle === style ? 'btn-dark' : ''}`}
                                >
                                    {style} paper
                                </button>
                            ))}
                        </div>

                        {/* Export & Edit actions */}
                        <div className="flex gap-2">
                            <button 
                                onClick={() => handleLockToggle(selectedDiary)} 
                                className="btn py-1 px-3 text-[10px] flex items-center gap-1 border-yellow-600 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-950/20"
                            >
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                                {selectedDiary.locked ? 'Unlock Database' : 'Lock & Encrypt'}
                            </button>
                            <button onClick={() => handlePrintEntry(selectedDiary)} className="btn py-1 px-3 text-[10px] border-emerald-500 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/20">
                                Print PDF
                            </button>
                            <button onClick={() => handleStartEdit(selectedDiary)} className="btn py-1 px-3 text-[10px]">
                                Edit Page
                            </button>
                        </div>
                    </div>

                    {/* Visual 3D Book Layout */}
                    <div className="diary-book-wrapper">
                        <div className={`diary-book ${isFlipping ? (flipDirection === 'right' ? 'page-flip-right' : 'page-flip-left') : ''}`}>
                            
                            {/* Decorative spine */}
                            <div className="diary-spine"></div>
                            {/* Metallic binders */}
                            <div className="diary-binder-ring" style={{ top: '10%' }}></div>
                            <div className="diary-binder-ring" style={{ top: '30%' }}></div>
                            <div className="diary-binder-ring" style={{ top: '50%' }}></div>
                            <div className="diary-binder-ring" style={{ top: '70%' }}></div>
                            <div className="diary-binder-ring" style={{ top: '90%' }}></div>

                            {/* Bookmark Ribbon */}
                            <div className="diary-bookmark" style={{ backgroundColor: selectedDiary.coverColor }}></div>

                            {/* Left Page */}
                            {currentSpreadPages.left === 'cover' ? (
                                <div className="diary-page diary-page-left diary-page-edge-left paper-noise flex flex-col justify-between">
                                    <div className="space-y-6">
                                        <div className="text-[10px] font-mono border-b border-slate-900/10 dark:border-slate-100/10 pb-2">
                                            // VINTAGE LOG ENTRY
                                        </div>
                                        <h2 className="font-handwriting text-4xl font-bold text-slate-800 dark:text-slate-200 mt-4 leading-tight">{selectedDiary.title}</h2>
                                        
                                        <div className="space-y-3 font-mono text-[10px] opacity-75">
                                            <div><span className="font-bold">CREATED:</span> {selectedDiary.createdAt ? new Date(selectedDiary.createdAt).toLocaleString() : selectedDiary.date}</div>
                                            <div><span className="font-bold">MOOD BLOCK:</span> <span className="badge badge-blue">{selectedDiary.mood}</span></div>
                                            <div><span className="font-bold">SCOPE SECURITY:</span> <span className="badge badge-green">{selectedDiary.privacy}</span></div>
                                        </div>

                                        {selectedDiary.tags?.length > 0 && (
                                            <div className="space-y-1">
                                                <div className="text-[9px] font-mono font-bold uppercase opacity-50">Tags</div>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {selectedDiary.tags.map(t => (
                                                        <span key={t} className="text-[9px] font-mono bg-white border border-slate-900/10 px-2 py-0.5 rounded shadow-sm">#{t}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Attachments tray inside reading book cover */}
                                    {selectedDiary.attachments?.length > 0 && (
                                        <div className="border-t border-slate-900/10 dark:border-slate-100/10 pt-4">
                                            <div className="text-[9px] font-mono font-bold uppercase opacity-50 mb-2">Attachments</div>
                                            <div className="grid grid-cols-1 gap-2 max-h-44 overflow-y-auto pr-1">
                                                {selectedDiary.attachments.map((file) => (
                                                    <div 
                                                        key={file.id} 
                                                        onClick={() => setPreviewFile(file)}
                                                        className="flex items-center justify-between border border-slate-900/10 bg-white/60 p-2 rounded cursor-pointer hover:bg-white"
                                                    >
                                                        <span className="text-[9px] font-mono truncate max-w-[150px]">{file.name}</span>
                                                        <span className="text-[8px] font-mono opacity-50">{file.size}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className={`diary-page diary-page-left diary-page-edge-left paper-noise paper-${paperStyle}`}>
                                    {currentSpreadPages.left ? (
                                        <div className="flex flex-col justify-between h-full font-book text-[16px] text-slate-800 dark:text-slate-200">
                                            <div className="diary-page-content overflow-y-auto pr-1" dangerouslySetInnerHTML={{ __html: currentSpreadPages.left.html }}></div>
                                            <div className="text-center font-mono text-[10px] mt-4 opacity-50">
                                                Page {currentSpreadPages.left.pageIndex + 1}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-slate-300 dark:text-slate-700 font-mono text-xs italic">
                                            Empty Sheet
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Right Page */}
                            <div className={`diary-page diary-page-right diary-page-edge-right paper-noise paper-${paperStyle}`}>
                                {currentSpreadPages.right ? (
                                    <div className="flex flex-col justify-between h-full font-book text-[16px] text-slate-800 dark:text-slate-200">
                                        <div className="diary-page-content overflow-y-auto pr-1" dangerouslySetInnerHTML={{ __html: currentSpreadPages.right.html }}></div>
                                        <div className="text-center font-mono text-[10px] mt-4 opacity-50">
                                            Page {currentSpreadPages.right.pageIndex + 1}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-full text-slate-300 dark:text-slate-700 font-mono text-xs italic">
                                        End of Book
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>

                    {/* Book view pagination controls */}
                    <div className="flex justify-between items-center py-2 px-1">
                        <button 
                            onClick={() => handleTurnPage('prev')}
                            disabled={activeSpread === 0}
                            className="btn px-4 py-2 disabled:opacity-30"
                        >
                            &larr; Turn Back
                        </button>
                        <span className="font-mono text-xs font-bold text-slate-600 dark:text-slate-400">
                            Spread {activeSpread + 1}
                        </span>
                        <button 
                            onClick={() => handleTurnPage('next')}
                            disabled={!selectedDiary || activeSpread >= Math.ceil((selectedDiary.pages.length + 1) / 2) - 1}
                            className="btn px-4 py-2 disabled:opacity-30"
                        >
                            Turn Next &rarr;
                        </button>
                    </div>
                </div>
            )}

            {/* Tactile Book Composing/Editing View */}
            {viewMode === 'book-edit' && (
                <div className="space-y-6">
                    {/* Visual 3D Book Layout */}
                    <div className="diary-book-wrapper">
                        <div className="diary-book">
                            {/* Decorative spine */}
                            <div className="diary-spine"></div>
                            <div className="diary-binder-ring" style={{ top: '10%' }}></div>
                            <div className="diary-binder-ring" style={{ top: '30%' }}></div>
                            <div className="diary-binder-ring" style={{ top: '50%' }}></div>
                            <div className="diary-binder-ring" style={{ top: '70%' }}></div>
                            <div className="diary-binder-ring" style={{ top: '90%' }}></div>

                            {/* Left Page (Meta Editor) */}
                            <div className="diary-page diary-page-left diary-page-edge-left paper-noise flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div className="text-[10px] font-mono border-b border-slate-900/10 dark:border-slate-100/10 pb-2">
                                        // LOG CONFIGURATIONS
                                    </div>

                                    <div>
                                        <label className="block text-[9px] font-mono font-bold uppercase opacity-60 mb-1 text-slate-700 dark:text-slate-300">Title Registry</label>
                                        <input
                                            type="text"
                                            className="w-full handwriting-input font-bold bg-transparent border-b border-slate-900/10 dark:border-slate-100/10 focus:border-slate-900/30 dark:focus:border-slate-100/30 outline-none pb-1 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                                            placeholder="Write entry title..."
                                            value={composerTitle}
                                            onChange={(e) => setComposerTitle(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-[9px] font-mono font-bold uppercase opacity-60 mb-1 text-slate-700 dark:text-slate-300">Mood Node</label>
                                            <select
                                                className="w-full text-xs font-mono border border-slate-900/20 dark:border-slate-100/20 bg-transparent dark:bg-slate-800 rounded p-1.5 outline-none font-bold uppercase text-slate-900 dark:text-slate-100"
                                                value={composerMood}
                                                onChange={(e) => setComposerMood(e.target.value)}
                                            >
                                                {moods.map(m => <option key={m} value={m} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">{m}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[9px] font-mono font-bold uppercase opacity-60 mb-1 text-slate-700 dark:text-slate-300">Security Scope</label>
                                            <select
                                                className="w-full text-xs font-mono border border-slate-900/20 dark:border-slate-100/20 bg-transparent dark:bg-slate-800 rounded p-1.5 outline-none font-bold uppercase text-slate-900 dark:text-slate-100"
                                                value={composerPrivacy}
                                                onChange={(e) => setComposerPrivacy(e.target.value)}
                                            >
                                                <option value="Private" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">Private</option>
                                                <option value="Shared" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">Shared</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[9px] font-mono font-bold uppercase opacity-60 mb-1 text-slate-700 dark:text-slate-300">Tags (Comma-separated)</label>
                                        <input
                                            type="text"
                                            className="w-full text-xs font-mono border border-slate-900/20 dark:border-slate-100/20 bg-transparent rounded p-1.5 outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                                            placeholder="thoughts, personal, code"
                                            value={composerTags}
                                            onChange={(e) => setComposerTags(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[9px] font-mono font-bold uppercase opacity-60 mb-2 text-slate-700 dark:text-slate-300">Leather Cover Color</label>
                                        <div className="flex gap-2">
                                            {coverColors.map(c => (
                                                <button
                                                    key={c.hex}
                                                    type="button"
                                                    onClick={() => setComposerCover(c.hex)}
                                                    className={`w-6 h-6 rounded border transition-all ${composerCover === c.hex ? 'ring-2 ring-offset-1 ring-slate-900 scale-105 border-white' : 'border-transparent'}`}
                                                    style={{ backgroundColor: c.hex }}
                                                    title={c.name}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Attachment Upload Area */}
                                <div className="border-t border-slate-900/10 dark:border-slate-100/10 pt-4">
                                    <label className="block text-[9px] font-mono font-bold uppercase opacity-60 mb-2 text-slate-700 dark:text-slate-300">Attach Files (Max 5MB)</label>
                                    <div className="flex items-center gap-2">
                                        <input 
                                            type="file" 
                                            id="diary-upload" 
                                            className="hidden" 
                                            onChange={handleFileChange}
                                            disabled={uploading}
                                        />
                                        <label 
                                            htmlFor="diary-upload"
                                            className={`btn py-1.5 px-3 text-[10px] w-full text-center ${uploading ? 'opacity-50 pointer-events-none' : ''} text-slate-800 dark:text-slate-100`}
                                        >
                                            {uploading ? 'Parsing...' : 'Upload File Attachment'}
                                        </label>
                                    </div>

                                    {/* simulated progress bar */}
                                    {uploading && (
                                        <div className="mt-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                                            <div className="bg-customAccent h-1.5 transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                                        </div>
                                    )}

                                    {/* Attachments List */}
                                    {composerAttachments.length > 0 && (
                                        <div className="mt-3 grid grid-cols-1 gap-1.5 max-h-24 overflow-y-auto">
                                            {composerAttachments.map(file => (
                                                <div key={file.id} className="flex justify-between items-center border border-slate-900/10 dark:border-slate-100/10 bg-white/60 dark:bg-black/30 p-1.5 rounded">
                                                    <span className="text-[8px] font-mono truncate max-w-[120px] text-slate-800 dark:text-slate-200">{file.name}</span>
                                                    <button 
                                                        type="button"
                                                        onClick={() => handleDeleteAttachment(file.id)}
                                                        className="text-rose-500 hover:text-rose-700 text-[9px] font-bold px-1"
                                                    >
                                                        &times;
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right Page (Rich Editor) */}
                            <div className={`diary-page diary-page-right diary-page-edge-right paper-noise paper-${paperStyle}`}>
                                {/* Rich Edit Formatting bar */}
                                <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-900/15 dark:border-slate-100/15 pb-2 mb-3 z-10 relative text-slate-800 dark:text-slate-200">
                                    <button type="button" onMouseDown={(e) => { e.preventDefault(); handleFormat('bold'); }} className="p-1 text-xs hover:bg-black/10 dark:hover:bg-white/10 rounded font-bold">B</button>
                                    <button type="button" onMouseDown={(e) => { e.preventDefault(); handleFormat('italic'); }} className="p-1 text-xs hover:bg-black/10 dark:hover:bg-white/10 rounded italic">I</button>
                                    <button type="button" onMouseDown={(e) => { e.preventDefault(); handleFormat('formatBlock', '<h1>'); }} className="p-1 text-xs hover:bg-black/10 dark:hover:bg-white/10 rounded font-bold">H1</button>
                                    <button type="button" onMouseDown={(e) => { e.preventDefault(); handleFormat('formatBlock', '<h2>'); }} className="p-1 text-xs hover:bg-black/10 dark:hover:bg-white/10 rounded font-bold">H2</button>
                                    <button type="button" onMouseDown={(e) => { e.preventDefault(); handleFormat('insertUnorderedList'); }} className="p-1 text-xs hover:bg-black/10 dark:hover:bg-white/10 rounded font-bold">List</button>
                                    <button type="button" onMouseDown={(e) => { e.preventDefault(); handleFormat('formatBlock', '<blockquote>'); }} className="p-1 text-xs hover:bg-black/10 dark:hover:bg-white/10 rounded italic">Quote</button>
                                    <button type="button" onMouseDown={(e) => { e.preventDefault(); handleFormat('formatBlock', '<pre>'); }} className="p-1 text-xs hover:bg-black/10 dark:hover:bg-white/10 rounded font-mono">Code</button>
                                </div>

                                {/* Contenteditable Page Sheet */}
                                <div className="flex-1 overflow-y-auto min-h-[350px]">
                                    <div
                                        contentEditable
                                        ref={editorRef}
                                        className="outline-none min-h-[350px] w-full font-book text-[16px] leading-[28px] paper-ruled"
                                        onBlur={(e) => updateComposerPageHtml(e.target.innerHTML)}
                                        dangerouslySetInnerHTML={{ __html: composerPages[activeEditPageIdx]?.html || '<p></p>' }}
                                    />
                                </div>

                                {/* Page Split Composing Pagination Controls */}
                                <div className="border-t border-slate-900/10 pt-3 mt-4 flex items-center justify-between font-mono text-[10px]">
                                    <button 
                                        type="button" 
                                        disabled={activeEditPageIdx === 0}
                                        onClick={() => {
                                            if (editorRef.current) updateComposerPageHtml(editorRef.current.innerHTML);
                                            setActiveEditPageIdx(prev => prev - 1);
                                        }}
                                        className="btn py-1 px-2.5 text-[9px] disabled:opacity-30"
                                    >
                                        &larr; Prev Page
                                    </button>

                                    <span>Page {activeEditPageIdx + 1} of {composerPages.length}</span>

                                    <div className="flex gap-1.5">
                                        <button 
                                            type="button"
                                            onClick={() => {
                                                if (editorRef.current) updateComposerPageHtml(editorRef.current.innerHTML);
                                                if (activeEditPageIdx < composerPages.length - 1) {
                                                    setActiveEditPageIdx(prev => prev + 1);
                                                } else {
                                                    // Add new sheet to book
                                                    setComposerPages(prev => [...prev, { pageIndex: prev.length, html: '<p>New page sheet...</p>' }]);
                                                    setActiveEditPageIdx(composerPages.length);
                                                }
                                            }}
                                            className="btn py-1 px-2.5 text-[9px]"
                                        >
                                            {activeEditPageIdx < composerPages.length - 1 ? 'Next Page &rarr;' : '+ Add Page'}
                                        </button>

                                        {composerPages.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setComposerPages(prev => prev.filter((_, idx) => idx !== activeEditPageIdx));
                                                    setActiveEditPageIdx(prev => Math.max(0, prev - 1));
                                                }}
                                                className="btn py-1 px-2 border-rose-500 text-rose-500 text-[9px]"
                                            >
                                                Delete Page
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Editor save/cancel actions */}
                    <div className="flex gap-3 justify-end">
                        <button onClick={() => setViewMode('library')} className="btn">
                            Cancel Changes
                        </button>
                        <button onClick={handleSaveEntry} className="btn btn-dark">
                            Write & Seal Log
                        </button>
                    </div>
                </div>
            )}

            {/* Lock/Passphrase Unlock Modal */}
            {isLockModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="auth-card relative text-center">
                        <button 
                            onClick={() => setIsLockModalOpen(false)}
                            className="absolute top-6 right-6 text-slate-400 hover:text-slate-900"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>

                        <div className="w-12 h-12 mx-auto border-[1.5px] border-yellow-600 flex items-center justify-center text-yellow-600 bg-yellow-50 rounded mb-4">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                        </div>

                        <h2 className="text-xl font-extrabold uppercase tracking-tight mb-2">// Locked Memory Node</h2>
                        <p className="text-xs font-mono text-slate-500 mb-6">Enter decryption passphrase. Contents are decrypted entirely client-side.</p>

                        <form onSubmit={handleUnlockSubmit} className="space-y-4 text-left">
                            <div>
                                <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1">Passphrase</label>
                                <input 
                                    type="password" 
                                    className="input font-mono text-center tracking-widest text-lg"
                                    placeholder="••••••••"
                                    value={lockPassword}
                                    onChange={(e) => setLockPassword(e.target.value)}
                                    required
                                    autoFocus
                                />
                            </div>

                            {decryptError && (
                                <p className="text-[10px] font-mono text-rose-500 font-bold text-center">{decryptError}</p>
                            )}

                            <button type="submit" className="w-full btn btn-dark">
                                Decrypt & Open Book
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Attachment Preview Modal */}
            {previewFile && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setPreviewFile(null)}>
                    <div 
                        className="bg-white dark:bg-slate-900 border-[1.5px] border-slate-900 dark:border-slate-100 p-6 rounded shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto flex flex-col justify-between"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4 border-b border-slate-200 dark:border-slate-800 pb-3">
                            <div>
                                <h3 className="font-extrabold text-sm uppercase tracking-wide truncate max-w-md">{previewFile.name}</h3>
                                <p className="text-[10px] font-mono opacity-50">Size: {previewFile.size} | Type: {previewFile.type}</p>
                            </div>
                            <button onClick={() => setPreviewFile(null)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>

                        {/* Content area */}
                        <div className="flex-1 min-h-[350px] bg-slate-50 dark:bg-slate-950 border border-slate-900/10 dark:border-slate-100/10 rounded flex items-center justify-center p-4 overflow-auto">
                            {previewFile.type.startsWith('image/') ? (
                                <img src={previewFile.blobDataUrl} alt={previewFile.name} className="max-h-[50vh] object-contain rounded shadow-lg" />
                            ) : previewFile.type === 'application/pdf' ? (
                                <embed src={previewFile.blobDataUrl} type="application/pdf" className="w-full h-[55vh]" />
                            ) : (
                                <pre className="w-full h-[55vh] text-[11px] font-mono p-4 overflow-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded">
                                    <code>{atob(previewFile.blobDataUrl.split(',')[1] || '')}</code>
                                </pre>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
                            <a 
                                href={previewFile.blobDataUrl} 
                                download={previewFile.name}
                                className="btn btn-dark text-xs py-1.5"
                            >
                                Download File
                            </a>
                            <button onClick={() => setPreviewFile(null)} className="btn text-xs py-1.5">
                                Close Preview
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
