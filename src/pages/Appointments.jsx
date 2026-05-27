import { useState } from 'react';
import { useLifeAdmin } from '../context/LifeAdminContext';

export default function Appointments() {
    const { appointments, addAppointment, deleteAppointment, settings, updateSetting } = useLifeAdmin();
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All'); // All, Medical, Business, Vehicle, Personal, Other
    
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
    const [connectState, setConnectState] = useState('idle'); // idle, connecting, success

    const [selectedAppt, setSelectedAppt] = useState(null); // Selected appointment for ticket preview modal

    const categories = ['All', 'Medical', 'Business', 'Vehicle', 'Personal', 'Other'];

    const handleConnect = () => {
        setConnectState('connecting');
        setTimeout(() => {
            setConnectState('success');
            setTimeout(() => {
                updateSetting('calendarSynced', true);
                
                // Add a dynamic synced event to state
                const syncedEvent = {
                    id: 'synced-1',
                    title: 'Dinner with Family',
                    category: 'Personal',
                    date: '20 June',
                    time: '7:00 PM',
                    notes: 'Family dinner at Olive Garden. Reservation under Bhavesh.',
                    isSynced: true
                };
                
                // Only add if not already exists
                if (!appointments.some(a => a.id === 'synced-1')) {
                    addAppointment(syncedEvent);
                }
                
                setIsConnectModalOpen(false);
            }, 1500);
        }, 2000);
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        // Format Date (e.g. "8 June")
        const rawDate = formData.get('date');
        let formattedDate = rawDate;
        if (rawDate) {
            const dateObj = new Date(rawDate);
            if (!isNaN(dateObj.getTime())) {
                formattedDate = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
            }
        }

        // Format Time (e.g. "10:00 AM")
        const rawTime = formData.get('time');
        let formattedTime = rawTime;
        if (rawTime) {
            const [hours, minutes] = rawTime.split(':');
            const hrs = parseInt(hours);
            const ampm = hrs >= 12 ? 'PM' : 'AM';
            const displayHrs = hrs % 12 || 12;
            formattedTime = `${displayHrs}:${minutes} ${ampm}`;
        }

        const newAppt = {
            id: Date.now().toString(),
            title: formData.get('title'),
            category: formData.get('category'),
            date: formattedDate,
            time: formattedTime,
            notes: formData.get('notes') || ''
        };

        addAppointment(newAppt);
        setIsAddModalOpen(false);
    };

    // Helper counts
    const getCount = (cat) => {
        if (cat === 'All') return appointments.length;
        return appointments.filter(a => a.category === cat).length;
    };

    const filteredAppts = appointments.filter((appt) => {
        const matchesSearch = appt.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || appt.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const getCategoryStyles = (category) => {
        switch (category) {
            case 'Medical': return 'bg-sky-100 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 border-sky-200/50 dark:border-sky-900/30';
            case 'Business': return 'bg-fuchsia-100 dark:bg-fuchsia-950/40 text-fuchsia-700 dark:text-fuchsia-400 border-fuchsia-200/50 dark:border-fuchsia-900/30';
            case 'Vehicle': return 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200/50 dark:border-amber-900/30';
            case 'Personal': return 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-900/30';
            default: return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200/50 dark:border-slate-700/50';
        }
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'Medical':
                return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>;
            case 'Business':
                return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>;
            case 'Vehicle':
                return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path></svg>;
            case 'Personal':
                return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
            default:
                return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>;
        }
    };

    // Render Event Ticket / Pass mockup inside previewer
    const renderTicketMockup = (appt) => {
        if (!appt) return null;
        
        return (
            <div className="w-full max-w-sm border-[1.5px] border-slate-900 bg-white text-slate-950 p-6 flex flex-col justify-between font-mono shadow-[4px_4px_0_0_var(--theme-accent)] rounded relative overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <span className="text-[8px] uppercase tracking-widest bg-slate-100 border border-slate-950 px-2 py-0.5 rounded font-bold">EVENT PASS</span>
                        <h4 className="text-base font-black tracking-tight mt-2 uppercase">{appt.title}</h4>
                    </div>
                    <div className="w-8 h-8 border-[1.5px] border-slate-900 flex items-center justify-center rounded bg-slate-50">
                        {getCategoryIcon(appt.category)}
                    </div>
                </div>
                
                <div className="space-y-2 my-4 border-t border-b border-dashed border-slate-900/30 py-4 text-[10px]">
                    <div><span className="opacity-55">NAME:</span> Bhavesh Sharma</div>
                    <div><span className="opacity-55">TYPE:</span> {appt.category} Node</div>
                    <div><span className="opacity-55">INFO:</span> {appt.notes || 'No notes available'}</div>
                </div>

                <div className="flex justify-between items-end text-[9px]">
                    <div>
                        <p className="opacity-55">SCHEDULE TIME</p>
                        <p className="font-bold text-xs tracking-tight mt-0.5">{appt.date} @ {appt.time}</p>
                    </div>
                    <span className="opacity-30 text-[9px]">#{appt.category.toUpperCase().slice(0, 3)}_{appt.id.slice(-4)}</span>
                </div>
            </div>
        );
    };

    const isCalendarConnected = settings?.calendarSynced;

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Appointments</h1>
                    <p className="page-subtitle">// ORCHESTRATE CLINIC VISITS, BUSINESS MEETINGS, AND AGENDA NODES</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    {!isCalendarConnected ? (
                        <button 
                            onClick={() => { setIsConnectModalOpen(true); setConnectState('idle'); }} 
                            className="btn flex items-center gap-2"
                        >
                            Sync Calendar
                        </button>
                    ) : (
                        <button className="btn border-emerald-600 text-emerald-600 dark:text-emerald-450 flex items-center gap-2 cursor-default hover:transform-none hover:shadow-none">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                            Synced
                        </button>
                    )}
                    <button 
                        onClick={() => setIsAddModalOpen(true)} 
                        className="btn btn-dark"
                    >
                        Add Appointment
                    </button>
                </div>
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
                                    {getCategoryIcon(cat === 'All' ? 'Default' : cat)}
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

            {/* List/Grid Container */}
            <div className="card shadow-[4px_4px_0_0_rgba(15,23,42,0.05)]">
                {/* Search Bar */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search appointments..."
                        className="input"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {filteredAppts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredAppts.map((appt) => (
                            <div 
                                key={appt.id} 
                                onClick={() => setSelectedAppt(appt)}
                                className="editorial-card editorial-card-interactive p-5 flex flex-col justify-between cursor-pointer"
                            >
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="w-8 h-8 border-[1.5px] border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-800 flex items-center justify-center rounded">
                                        {getCategoryIcon(appt.category)}
                                    </div>
                                    
                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-extrabold text-slate-800 dark:text-slate-200 truncate uppercase tracking-wide group-hover:text-customAccent transition-colors text-sm" title={appt.title}>
                                            {appt.title}
                                        </h3>
                                        <p className="text-[10px] font-mono opacity-60 mt-1 uppercase">
                                            {appt.date} • {appt.time}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                                    <div className="flex gap-2">
                                        <span className={`badge ${getCategoryStyles(appt.category)}`}>
                                            {appt.category}
                                        </span>
                                        {appt.isSynced && (
                                            <span className="badge badge-green font-mono">
                                                Synced
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); setSelectedAppt(appt); }}
                                            className="btn p-1.5"
                                            title="View Details"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </button>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); deleteAppointment(appt.id); }}
                                            className="btn p-1.5 border-rose-500 hover:bg-rose-500 hover:text-white"
                                            title="Delete Appointment"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-slate-400 dark:text-slate-500">
                        <svg className="w-10 h-10 mx-auto mb-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <p className="font-extrabold uppercase tracking-tight text-sm">No node match</p>
                        <p className="text-xs font-mono opacity-60 mt-1">Try modifying filter scopes or query key.</p>
                    </div>
                )}
            </div>

            {/* Detail Ticket Preview Modal */}
            {selectedAppt && (
                <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) setSelectedAppt(null) }}>
                    <div className="bg-white dark:bg-slate-900 border-[1.5px] border-slate-900 dark:border-slate-100 shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto animate-popIn flex flex-col md:flex-row gap-6 p-6 relative rounded">
                        <button onClick={() => setSelectedAppt(null)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 border border-slate-200 dark:border-slate-800 rounded z-10 bg-white dark:bg-slate-900">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                        
                        {/* Left: Graphic Mockup */}
                        <div className="flex-shrink-0 flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 border border-slate-900/10 dark:border-slate-100/10 rounded">
                            {renderTicketMockup(selectedAppt)}
                        </div>

                        {/* Right: Metadata Panel */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between bg-white dark:bg-slate-900">
                            <div>
                                <div className="flex gap-2 items-center mb-3">
                                    <span className={`badge ${getCategoryStyles(selectedAppt.category)}`}>
                                        {selectedAppt.category}
                                    </span>
                                    {selectedAppt.isSynced && (
                                        <span className="badge badge-green font-mono">
                                            Google Sync
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-xl font-extrabold uppercase tracking-tight leading-tight mb-2 truncate" title={selectedAppt.title}>
                                    {selectedAppt.title}
                                </h3>
                                <p className="text-xs font-mono opacity-65 mb-4">{selectedAppt.date} @ {selectedAppt.time}</p>
                                
                                <div className="space-y-4 text-xs font-sans">
                                    <div>
                                        <h4 className="font-extrabold text-[10px] uppercase tracking-wider opacity-60 mb-2">// Notes & Details</h4>
                                        <p className="bg-slate-50 dark:bg-slate-950 p-3 border border-slate-900/10 dark:border-slate-100/10 text-slate-700 dark:text-slate-300 leading-relaxed max-h-36 overflow-y-auto rounded text-xs font-mono">
                                            {selectedAppt.notes || "No extra notes or location details provided."}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
                                <button 
                                    onClick={() => { deleteAppointment(selectedAppt.id); setSelectedAppt(null); }}
                                    className="btn border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white"
                                >
                                    Delete
                                </button>
                                <button 
                                    onClick={() => setSelectedAppt(null)}
                                    className="btn btn-dark"
                                >
                                    Close Pass
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Appointment Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) setIsAddModalOpen(false)}}>
                    <div className="auth-card relative animate-popIn">
                        <button onClick={() => setIsAddModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                        <h2 className="text-2xl font-extrabold uppercase tracking-tight mb-2">// Add Appointment</h2>
                        <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-6">Schedule new operational node calendar node.</p>
                        <form onSubmit={handleAddSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1">Appointment Name</label>
                                <input name="title" type="text" placeholder="e.g. Dental Checkup" className="input" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1">Category</label>
                                    <select name="category" className="input font-bold uppercase tracking-wide">
                                        <option value="Medical">Medical</option>
                                        <option value="Business">Business</option>
                                        <option value="Vehicle">Vehicle</option>
                                        <option value="Personal">Personal</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1">Time</label>
                                    <input name="time" type="time" className="input font-bold" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1">Date</label>
                                <input name="date" type="date" className="input font-bold" required />
                            </div>
                            <div>
                                <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1">Notes / Details</label>
                                <textarea name="notes" placeholder="Room no, address, guidelines..." className="input h-20 resize-none font-mono text-xs"></textarea>
                            </div>
                            <button type="submit" className="w-full btn btn-dark mt-2">Write Node Entry</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Google Calendar Connect Modal */}
            {isConnectModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget && connectState !== 'connecting') setIsConnectModalOpen(false)}}>
                    <div className="auth-card text-center relative animate-popIn">
                        {connectState !== 'connecting' && <button onClick={() => setIsConnectModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg></button>}
                        
                        {connectState === 'idle' && (
                            <>
                                <div className="w-12 h-12 mx-auto border-[1.5px] border-slate-900 dark:border-slate-100 flex items-center justify-center text-slate-700 bg-slate-50 dark:bg-slate-800 rounded mb-4">
                                    <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"></path></svg>
                                </div>
                                <h2 className="text-xl font-extrabold uppercase tracking-tight mb-2">// Sync Calendar</h2>
                                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-6">Connect system to scan linked Google Account calendar node schedules.</p>
                                <button onClick={handleConnect} className="w-full btn btn-dark">Authorize Google Connection</button>
                            </>
                        )}
                        
                        {connectState === 'connecting' && (
                            <div className="py-6">
                                <div className="w-10 h-10 border-2 border-customAccent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <h2 className="text-xl font-extrabold uppercase tracking-tight">// Sync Syncing...</h2>
                                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-2">Waiting for OAuth token response.</p>
                            </div>
                        )}

                        {connectState === 'success' && (
                            <div className="py-4">
                                <div className="w-12 h-12 mx-auto border-[1.5px] border-emerald-600 flex items-center justify-center text-emerald-600 bg-emerald-50 dark:bg-emerald-950 rounded mb-4">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <h2 className="text-xl font-extrabold uppercase tracking-tight">// Sync Enabled</h2>
                                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-2">Google Calendar synced successfully.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
