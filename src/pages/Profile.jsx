import { useState } from 'react';
import { useLifeAdmin } from '../context/LifeAdminContext';

export default function Profile() {
    const { profile, settings, updateProfile, updateSetting, updateSettings, addToast } = useLifeAdmin();
    const [expandedFaq, setExpandedFaq] = useState(null);

    // Modal toggles
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [isSupportOpen, setIsSupportOpen] = useState(false);
    const [is2faOpen, setIs2faOpen] = useState(false);

    // Modal states
    const [supportState, setSupportState] = useState('idle'); // idle, sending, success
    const [twoFactorCode, setTwoFactorCode] = useState('');
    const [twoFactorState, setTwoFactorState] = useState('idle'); // idle, verifying, success

    const faqs = [
        { q: "How do I sync my emails?", a: "Go to the Bills section and click 'Sync Email' to automatically scan your connected Gmail account for invoices and utility receipts." },
        { q: "Is my data secure?", a: "Yes, all parsed emails and uploaded vault documents are encrypted locally in your browser sandbox. We never store raw documents on external servers." },
        { q: "Can I connect multiple Google Calendars?", a: "Currently, we support syncing with a single primary Google Calendar. You can authorize another calendar by signing out and re-authenticating." }
    ];

    const hexToRgba = (hex, alpha) => {
        if (!hex) return '';
        const cleanHex = hex.replace('#', '');
        const num = parseInt(cleanHex, 16);
        const r = (num >> 16) & 255;
        const g = (num >> 8) & 255;
        const b = num & 255;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        updateProfile({
            name: formData.get('name'),
            email: formData.get('email')
        });
        setIsEditProfileOpen(false);
    };

    const handleSupportSubmit = (e) => {
        e.preventDefault();
        setSupportState('sending');
        setTimeout(() => {
            setSupportState('success');
            setTimeout(() => {
                setIsSupportOpen(false);
                setSupportState('idle');
                addToast("Support request submitted!");
            }, 1500);
        }, 2000);
    };

    const handle2faToggle = () => {
        if (settings.twoFactor) {
            updateSetting('twoFactor', false);
        } else {
            setIs2faOpen(true);
            setTwoFactorState('idle');
            setTwoFactorCode('');
        }
    };

    const handle2faVerify = (e) => {
        e.preventDefault();
        if (twoFactorCode.length !== 6) return;
        setTwoFactorState('verifying');
        setTimeout(() => {
            setTwoFactorState('success');
            setTimeout(() => {
                updateSetting('twoFactor', true);
                setIs2faOpen(false);
            }, 1200);
        }, 1500);
    };

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Profile Nodes</h1>
                    <p className="page-subtitle">// ACCOUNT CONFIGURATIONS, ACCENTS, AND SECURITY REGISTRY</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: User Card & Settings */}
                <div className="lg:col-span-1 space-y-8">
                    {/* User Card */}
                    <div className="card text-center flex flex-col items-center shadow-[3px_3px_0_0_rgba(15,23,42,0.05)]">
                        <div className="w-20 h-20 border-2 border-slate-900 dark:border-slate-100 flex items-center justify-center text-3xl font-mono font-black mb-4 bg-slate-50 dark:bg-slate-800 rounded">
                            {profile.avatar}
                        </div>
                        <h2 className="text-xl font-extrabold uppercase tracking-tight">{profile.name}</h2>
                        <p className="text-xs font-mono opacity-60 mb-5">{profile.email}</p>
                        <div className="flex gap-2">
                            <span className="badge badge-blue">
                                {profile.plan || 'Pro Plan'}
                            </span>
                            <button 
                                onClick={() => setIsEditProfileOpen(true)}
                                className="btn px-3 py-1.5 text-[10px]"
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className="card shadow-[3px_3px_0_0_rgba(15,23,42,0.05)]">
                        <h3 className="section-title">// SYSTEM REGISTRY</h3>
                        
                        <div className="space-y-5">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-900/10 dark:border-slate-100/10">
                                <div>
                                    <h4 className="font-extrabold text-xs uppercase tracking-wide">Notifications</h4>
                                    <p className="text-[10px] font-mono opacity-60 mt-0.5">Alerts for bills & renewals.</p>
                                </div>
                                <button 
                                    onClick={() => updateSetting('notifications', !settings.notifications)} 
                                    className={`w-12 h-6 border-[1.5px] border-slate-900 dark:border-slate-100 transition-colors relative rounded-[3px] ${settings.notifications ? 'bg-slate-900 dark:bg-slate-100' : 'bg-transparent'}`}
                                >
                                    <div className={`w-3.5 h-3.5 border border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-800 absolute top-0.5 transition-all rounded-[1px] ${settings.notifications ? 'left-6.5' : 'left-0.5'}`}></div>
                                </button>
                            </div>

                            <div className="flex items-center justify-between pb-3 border-b border-slate-900/10 dark:border-slate-100/10">
                                <div>
                                    <h4 className="font-extrabold text-xs uppercase tracking-wide">Dark Mode</h4>
                                    <p className="text-[10px] font-mono opacity-60 mt-0.5">Toggle dark workspace theme.</p>
                                </div>
                                <button 
                                    onClick={() => updateSetting('darkMode', !settings.darkMode)} 
                                    className={`w-12 h-6 border-[1.5px] border-slate-900 dark:border-slate-100 transition-colors relative rounded-[3px] ${settings.darkMode ? 'bg-slate-900 dark:bg-slate-100' : 'bg-transparent'}`}
                                >
                                    <div className={`w-3.5 h-3.5 border border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-800 absolute top-0.5 transition-all rounded-[1px] ${settings.darkMode ? 'left-6.5' : 'left-0.5'}`}></div>
                                </button>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-extrabold text-xs uppercase tracking-wide">Two-Factor Auth</h4>
                                    <p className="text-[10px] font-mono opacity-60 mt-0.5">Extra validation protocol layer.</p>
                                </div>
                                <button 
                                    onClick={handle2faToggle} 
                                    className={`w-12 h-6 border-[1.5px] border-slate-900 dark:border-slate-100 transition-colors relative rounded-[3px] ${settings.twoFactor ? 'bg-slate-900 dark:bg-slate-100' : 'bg-transparent'}`}
                                >
                                    <div className={`w-3.5 h-3.5 border border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-800 absolute top-0.5 transition-all rounded-[1px] ${settings.twoFactor ? 'left-6.5' : 'left-0.5'}`}></div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Theme Panel, FAQ & Support */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Custom Theme Panel */}
                    <div className="card shadow-[4px_4px_0_0_rgba(15,23,42,0.05)]">
                        <h3 className="section-title">// THEMATIC CONFIGURATION</h3>
                        <p className="text-xs font-mono opacity-65 mb-6">Choose your workspace accents and light/dark theme page foundations.</p>

                        <div className="space-y-6">
                            {/* Accent Presets */}
                            <div>
                                <h4 className="font-extrabold text-xs uppercase tracking-wider opacity-60 mb-3">Theme Accent Node</h4>
                                <div className="flex flex-wrap items-center gap-3">
                                    {[
                                        { name: 'Indigo', hex: '#6366f1' },
                                        { name: 'Violet', hex: '#8b5cf6' },
                                        { name: 'Emerald', hex: '#10b981' },
                                        { name: 'Rose', hex: '#f43f5e' },
                                        { name: 'Amber', hex: '#f59e0b' },
                                        { name: 'Cyan', hex: '#06b6d4' }
                                    ].map((preset) => (
                                        <button
                                            key={preset.hex}
                                            onClick={() => {
                                                updateSettings({
                                                    themeAccent: preset.hex,
                                                    themeHoverHex: preset.hex,
                                                    themeHover: hexToRgba(preset.hex, 0.08),
                                                    themeHoverDark: hexToRgba(preset.hex, 0.22)
                                                });
                                            }}
                                            className={`w-8 h-8 rounded border-2 transition-all hover:scale-105 active:scale-95 shadow flex items-center justify-center ${
                                                settings.themeAccent === preset.hex
                                                    ? 'scale-105 ring-[1.5px] ring-offset-2 ring-slate-900 dark:ring-offset-slate-900 border-white dark:border-slate-800'
                                                    : 'border-transparent'
                                            }`}
                                            style={{ backgroundColor: preset.hex }}
                                            title={preset.name}
                                        >
                                            {settings.themeAccent === preset.hex && (
                                                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                            )}
                                        </button>
                                    ))}
                                    <div className="flex items-center gap-2 border-[1.5px] border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 rounded px-2.5 py-1.5 ml-1">
                                        <input
                                            type="color"
                                            value={settings.themeAccent}
                                            onChange={(e) => {
                                                const hex = e.target.value;
                                                updateSettings({
                                                    themeAccent: hex,
                                                    themeHoverHex: hex,
                                                    themeHover: hexToRgba(hex, 0.08),
                                                    themeHoverDark: hexToRgba(hex, 0.22)
                                                });
                                            }}
                                            className="w-5 h-5 border-0 p-0 bg-transparent cursor-pointer rounded"
                                        />
                                        <span className="text-[10px] font-mono font-bold uppercase">{settings.themeAccent}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Hover Glow Customizer */}
                            <div className="border-t border-slate-200 dark:border-slate-800 pt-5">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="font-extrabold text-xs uppercase tracking-wider opacity-60">Interactive Glow Color</h4>
                                    <span className="badge badge-green font-mono">glow mode</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 border-[1.5px] border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 rounded px-2.5 py-1.5">
                                        <input
                                            type="color"
                                            value={settings.themeHoverHex || settings.themeAccent}
                                            onChange={(e) => {
                                                const hex = e.target.value;
                                                updateSettings({
                                                    themeHoverHex: hex,
                                                    themeHover: hexToRgba(hex, 0.08),
                                                    themeHoverDark: hexToRgba(hex, 0.22)
                                                });
                                            }}
                                            className="w-5 h-5 border-0 p-0 bg-transparent cursor-pointer rounded"
                                        />
                                        <span className="text-[10px] font-mono font-bold uppercase">Configure Glow</span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            updateSettings({
                                                themeHoverHex: settings.themeAccent,
                                                themeHover: hexToRgba(settings.themeAccent, 0.08),
                                                themeHoverDark: hexToRgba(settings.themeAccent, 0.22)
                                            });
                                        }}
                                        className="text-[10px] font-bold uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity"
                                    >
                                        Match Accent
                                    </button>
                                </div>
                            </div>

                            {/* Light Mode Page Background */}
                            <div className="border-t border-slate-200 dark:border-slate-800 pt-5">
                                <h4 className="font-extrabold text-xs uppercase tracking-wider opacity-60 mb-3">Light Mode Page Background</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { id: 'white', label: 'Minimalist White', desc: '#ffffff style', value: '#ffffff' },
                                        { id: 'cream', label: 'Warm Cream', desc: '#f7f5f0 style', value: '#f7f5f0' }
                                    ].map((style) => (
                                        <button
                                            key={style.id}
                                            onClick={() => updateSettings({ lightBgStyle: style.id })}
                                            className={`p-3 rounded border-[1.5px] text-left transition-all ${
                                                (settings.lightBgStyle || 'white') === style.id
                                                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900 dark:border-slate-100 shadow-[3px_3px_0_0_var(--theme-accent)]'
                                                    : 'bg-white dark:bg-slate-900 border-slate-900/10 dark:border-slate-100/10 text-slate-850 dark:text-slate-200 hover:border-slate-900'
                                            }`}
                                        >
                                            <div className="text-xs font-extrabold uppercase tracking-wide">{style.label}</div>
                                            <div className="text-[9px] font-mono opacity-70 mt-1">{style.desc}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Dark Mode Page Background */}
                            <div className="border-t border-slate-200 dark:border-slate-800 pt-5">
                                <h4 className="font-extrabold text-xs uppercase tracking-wider opacity-60 mb-3">Dark Mode Page Background</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { id: 'midnight', label: 'Midnight Navy', desc: '#020617 style' },
                                        { id: 'carbon', label: 'Deep Carbon', desc: '#0a0a0a style' }
                                    ].map((style) => (
                                        <button
                                            key={style.id}
                                            onClick={() => updateSettings({ darkBgStyle: style.id })}
                                            className={`p-3 rounded border-[1.5px] text-left transition-all ${
                                                (settings.darkBgStyle || 'midnight') === style.id
                                                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900 dark:border-slate-100 shadow-[3px_3px_0_0_var(--theme-accent)]'
                                                    : 'bg-white dark:bg-slate-900 border-slate-900/10 dark:border-slate-100/10 text-slate-850 dark:text-slate-200 hover:border-slate-900'
                                            }`}
                                        >
                                            <div className="text-xs font-extrabold uppercase tracking-wide">{style.label}</div>
                                            <div className="text-[9px] font-mono opacity-70 mt-1">{style.desc}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Support Banner */}
                    <div className="card bg-slate-50 dark:bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[3px_3px_0_0_rgba(15,23,42,0.05)]">
                        <div>
                            <h3 className="font-extrabold text-sm uppercase tracking-wide mb-1">Need Help?</h3>
                            <p className="text-xs opacity-60 font-mono">Our support team is active for troubleshooting connection issues.</p>
                        </div>
                        <button 
                            onClick={() => setIsSupportOpen(true)}
                            className="btn btn-dark"
                        >
                            Contact Support
                        </button>
                    </div>

                    {/* FAQ Accordion */}
                    <div className="card shadow-[3px_3px_0_0_rgba(15,23,42,0.05)]">
                        <h3 className="section-title">// FAQ ACCORDION</h3>
                        <div className="space-y-3">
                            {faqs.map((faq, idx) => {
                                const isOpen = expandedFaq === idx;
                                return (
                                    <div 
                                        key={idx} 
                                        className="border-[1.5px] border-slate-900/10 dark:border-slate-100/10 p-4 rounded cursor-pointer hover:border-slate-900 dark:hover:border-slate-100 transition-all select-none"
                                        onClick={() => setExpandedFaq(isOpen ? null : idx)}
                                    >
                                        <h4 className="font-extrabold text-xs uppercase tracking-wider flex items-center justify-between gap-2">
                                            <span className="flex items-center gap-2">
                                                <svg className="w-4 h-4 text-customAccent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                {faq.q}
                                            </span>
                                            <svg className={`w-3.5 h-3.5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                                        </h4>
                                        <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-24 opacity-100 mt-3 pt-3 border-t border-slate-900/10 dark:border-slate-100/10' : 'max-h-0 opacity-0'}`}>
                                            <p className="text-xs font-mono opacity-65 leading-relaxed">{faq.a}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {isEditProfileOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) setIsEditProfileOpen(false)}}>
                    <div className="auth-card relative animate-popIn">
                        <button onClick={() => setIsEditProfileOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                        <h2 className="text-2xl font-extrabold uppercase tracking-tight mb-2">// Edit Profile</h2>
                        <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-6">Modify user profile params in database registry.</p>
                        <form onSubmit={handleProfileSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1">Full Name</label>
                                <input name="name" defaultValue={profile.name} type="text" className="input" required />
                            </div>
                            <div>
                                <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1">Email Address</label>
                                <input name="email" defaultValue={profile.email} type="email" className="input" required />
                            </div>
                            <button type="submit" className="w-full btn btn-dark mt-2">Update User Registry</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Contact Support Modal */}
            {isSupportOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget && supportState !== 'sending') setIsSupportOpen(false)}}>
                    <div className="auth-card text-center relative animate-popIn">
                        {supportState !== 'sending' && <button onClick={() => setIsSupportOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg></button>}
                        
                        {supportState === 'idle' && (
                            <form onSubmit={handleSupportSubmit} className="space-y-4 text-left">
                                <h2 className="text-2xl font-extrabold uppercase tracking-tight mb-2 text-center">// Support Ticket</h2>
                                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-6 text-center">Instantiate support node query with helpdesk.</p>
                                <div>
                                    <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1">Subject</label>
                                    <input name="subject" type="text" placeholder="e.g. Synchronization Error" className="input" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1">Message</label>
                                    <textarea name="message" placeholder="Describe operational nodes bug details..." className="input h-24 resize-none font-mono text-xs" required></textarea>
                                </div>
                                <button type="submit" className="w-full btn btn-dark mt-2">Transmit Ticket</button>
                            </form>
                        )}

                        {supportState === 'sending' && (
                            <div className="py-6">
                                <div className="w-10 h-10 border-2 border-customAccent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <h2 className="text-xl font-extrabold uppercase tracking-tight">// Transmitting...</h2>
                                <p className="text-xs font-mono text-slate-500 mt-2">Saving logs & files to helpdesk endpoint.</p>
                            </div>
                        )}

                        {supportState === 'success' && (
                            <div className="py-4">
                                <div className="w-12 h-12 mx-auto border-[1.5px] border-emerald-600 flex items-center justify-center text-emerald-600 bg-emerald-50 dark:bg-emerald-950 rounded mb-4">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <h2 className="text-xl font-extrabold uppercase tracking-tight">// Ticket Synced</h2>
                                <p className="text-xs font-mono text-slate-500 mt-2">Our engineers will scan logs within 24 hours.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* 2FA Setup Modal */}
            {is2faOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget && twoFactorState !== 'verifying') setIs2faOpen(false)}}>
                    <div className="auth-card text-center relative animate-popIn">
                        {twoFactorState !== 'verifying' && <button onClick={() => setIs2faOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg></button>}
                        
                        {twoFactorState === 'idle' && (
                            <form onSubmit={handle2faVerify}>
                                <h2 className="text-2xl font-extrabold uppercase tracking-tight mb-2">// Setup 2FA</h2>
                                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-6">Scan QR with Google Authenticator and enter confirmation code.</p>
                                
                                {/* QR visual */}
                                <div className="w-36 h-36 mx-auto bg-white p-2 border-[1.5px] border-slate-900 flex flex-wrap items-center justify-center gap-1.5 mb-6 rounded">
                                    <div className="grid grid-cols-4 gap-2 w-28 h-28">
                                        <div className="bg-slate-900 rounded-[1px] border-[1.5px] border-slate-900"></div>
                                        <div className="bg-slate-900 rounded-[1px]"></div>
                                        <div className="bg-white"></div>
                                        <div className="bg-slate-900 rounded-[1px] border-[1.5px] border-slate-900"></div>
                                        <div className="bg-white"></div>
                                        <div className="bg-slate-900 rounded-[1px]"></div>
                                        <div className="bg-slate-900 rounded-[1px]"></div>
                                        <div className="bg-white"></div>
                                        <div className="bg-slate-900 rounded-[1px]"></div>
                                        <div className="bg-white"></div>
                                        <div className="bg-slate-900 rounded-[1px]"></div>
                                        <div className="bg-slate-900 rounded-[1px]"></div>
                                        <div className="bg-slate-900 rounded-[1px] border-[1.5px] border-slate-900"></div>
                                        <div className="bg-slate-900 rounded-[1px]"></div>
                                        <div className="bg-white"></div>
                                        <div className="bg-slate-900 rounded-[1px] border-[1.5px] border-slate-900"></div>
                                    </div>
                                </div>

                                <div className="text-left mb-6">
                                    <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-2 text-center">Confirm Token (use 123456)</label>
                                    <input 
                                        type="text" 
                                        maxLength="6"
                                        value={twoFactorCode}
                                        onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, ''))}
                                        placeholder="000000" 
                                        className="input text-center text-xl font-mono tracking-widest" 
                                        required 
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={twoFactorCode.length !== 6}
                                    className="w-full btn btn-dark disabled:opacity-50"
                                >
                                    Activate 2FA Node
                                </button>
                            </form>
                        )}

                        {twoFactorState === 'verifying' && (
                            <div className="py-6">
                                <div className="w-10 h-10 border-2 border-customAccent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <h2 className="text-xl font-extrabold uppercase tracking-tight">// Handshake...</h2>
                                <p className="text-xs font-mono text-slate-500 mt-2">Checking time sync token hash keys.</p>
                            </div>
                        )}

                        {twoFactorState === 'success' && (
                            <div className="py-4">
                                <div className="w-12 h-12 mx-auto border-[1.5px] border-emerald-600 flex items-center justify-center text-emerald-600 bg-emerald-50 dark:bg-emerald-950 rounded mb-4">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <h2 className="text-xl font-extrabold uppercase tracking-tight">// 2FA Synced</h2>
                                <p className="text-xs font-mono text-slate-500 mt-2">Handshake authenticated successfully.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
