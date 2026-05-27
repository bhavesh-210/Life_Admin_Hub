/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const LifeAdminContext = createContext();

export function useLifeAdmin() {
    return useContext(LifeAdminContext);
}

export function LifeAdminProvider({ children }) {
    // 1. Initial State Helpers
    const getStored = (key, fallback) => {
        const stored = localStorage.getItem(key);
        try {
            if (stored) {
                const parsed = JSON.parse(stored);
                if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
                    return { ...fallback, ...parsed };
                }
                return parsed;
            }
            return fallback;
        } catch {
            return fallback;
        }
    };

    // 2. State Hooks
    const [bills, setBills] = useState(() => getStored('life_admin_bills', [
        { id: '1', name: 'Electricity Bill', category: 'Utility', amount: 1200, dueDate: '5 June', status: 'Unpaid' },
        { id: '2', name: 'Netflix', category: 'Subscription', amount: 499, dueDate: '10 June', status: 'Paid' },
        { id: '3', name: 'Internet', category: 'Utility', amount: 899, dueDate: '15 June', status: 'Unpaid' },
        { id: '4', name: 'Car Insurance', category: 'Vehicle', amount: 4500, dueDate: '20 June', status: 'Unpaid' },
        { id: '5', name: 'Mobile Recharge', category: 'Phone', amount: 299, dueDate: '22 June', status: 'Paid' }
    ]));

    const [documents, setDocuments] = useState(() => getStored('life_admin_documents', [
        { id: '1', title: 'Driving License', type: 'Vehicle', renewalDate: '12 Aug 2026', uploadDate: '12 Aug 2021', fileSize: '1.2 MB', notes: 'State driving authority issued' },
        { id: '2', title: 'Passport', type: 'Identity', renewalDate: '20 Jan 2028', uploadDate: '20 Jan 2018', fileSize: '2.5 MB', notes: 'Republic Passport' },
        { id: '3', title: 'Health Insurance', type: 'Medical', renewalDate: '05 Sep 2026', uploadDate: '05 Sep 2025', fileSize: '850 KB', notes: 'Star Health premium' },
        { id: '4', title: 'Car Insurance Policy', type: 'Vehicle', renewalDate: '20 June 2026', uploadDate: '20 June 2025', fileSize: '1.8 MB', notes: 'Comprehensive HDFC policy document' }
    ]));

    const [appointments, setAppointments] = useState(() => getStored('life_admin_appointments', [
        { id: '1', title: 'Doctor Checkup', category: 'Medical', date: '8 June', time: '10:00 AM', notes: 'Routine checkup with Dr. Smith. Bring vaccine certificate.' },
        { id: '2', title: 'Business Meeting', category: 'Business', date: '12 June', time: '01:30 PM', notes: 'Quarterly review with the leadership team.' },
        { id: '3', title: 'Vehicle Service', category: 'Vehicle', date: '16 June', time: '04:00 PM', notes: 'Yearly service for Sedan. Engine oil change.' }
    ]));

    const [diaries, setDiaries] = useState(() => getStored('life_admin_diaries', [
        {
            id: '1',
            title: 'Deep Work & System Overhaul',
            createdAt: '2026-05-25T09:00:00Z',
            updatedAt: '2026-05-25T13:00:00Z',
            date: '2026-05-25',
            pages: [
                { pageIndex: 0, html: '<p>Today I spent 4 hours redesigning the central dashboard. Shifted from complex gradients to solid hairline grid layout. Codebase looks incredibly clean now.</p><p>The system needs a few alignment corrections but overall works beautifully.</p>' },
                { pageIndex: 1, html: '<p>Need to start working on the Personal Diary module tomorrow. I want it to look like a real notebook with page margins, ruled sheets, and physical binding.</p>' }
            ],
            content: 'Today I spent 4 hours redesigning the central dashboard. Shifted from complex gradients to solid hairline grid layout. Codebase looks incredibly clean now. Need to start working on the Personal Diary module tomorrow.',
            tags: ['work', 'design', 'coding'],
            mood: 'Productive',
            privacy: 'Private',
            locked: false,
            attachments: []
        },
        {
            id: '2',
            title: 'Reflections in the Park',
            createdAt: '2026-05-24T15:30:00Z',
            updatedAt: '2026-05-24T16:15:00Z',
            date: '2026-05-24',
            pages: [
                { pageIndex: 0, html: '<p>Ran 5km around the central lake today. Clear skies, crisp air.</p><p>Reminded me of why focus on simple, minimalistic designs works best. Nature does not use drop-shadows; it uses pure contrast and physical overlap.</p>' }
            ],
            content: 'Ran 5km around the central lake today. Clear skies, crisp air. Reminded me of why focus on simple, minimalistic designs works best. Nature does not use drop-shadows; it uses pure contrast and physical overlap.',
            tags: ['health', 'thoughts', 'nature'],
            mood: 'Reflective',
            privacy: 'Private',
            locked: false,
            attachments: []
        },
        {
            id: '3',
            title: 'Team Strategy Meeting',
            createdAt: '2026-05-23T10:00:00Z',
            updatedAt: '2026-05-23T11:30:00Z',
            date: '2026-05-23',
            pages: [
                { pageIndex: 0, html: '<p>Reviewed product roadmap with Sarah and Kevin. We agreed that the upcoming release should focus heavily on the user experience and premium look.</p><p>Visual excellence is key to modern SaaS products.</p>' }
            ],
            content: 'Reviewed product roadmap with Sarah and Kevin. We agreed that the upcoming release should focus heavily on the user experience and premium look. Visual excellence is key to modern SaaS products.',
            tags: ['meeting', 'strategy', 'ux'],
            privacy: 'Shared',
            locked: false,
            attachments: []
        }
    ]));


    const [profile, setProfile] = useState(() => getStored('life_admin_profile', {
        name: 'Bhavesh Sharma',
        email: 'bhavesh@example.com',
        avatar: 'BS',
        plan: 'Pro Plan'
    }));

    const [settings, setSettings] = useState(() => getStored('life_admin_settings', {
        notifications: true,
        darkMode: false,
        twoFactor: false,
        themeAccent: '#6366f1',
        themeHoverHex: '#6366f1',
        themeHover: 'rgba(99, 102, 241, 0.08)',
        themeHoverDark: 'rgba(99, 102, 241, 0.22)',
        bgPreset: 'lavender_pink',
        blob1Color: '#c7d2fe',
        blob2Color: '#fbcfe8',
        blob3Color: '#c084fc',
        lightBgStyle: 'white',
        darkBgStyle: 'midnight',
    }));

    const [toasts, setToasts] = useState([]);

    // 3. Effects for LocalStorage Synchronization
    useEffect(() => {
        localStorage.setItem('life_admin_bills', JSON.stringify(bills));
    }, [bills]);

    useEffect(() => {
        localStorage.setItem('life_admin_documents', JSON.stringify(documents));
    }, [documents]);

    useEffect(() => {
        localStorage.setItem('life_admin_appointments', JSON.stringify(appointments));
    }, [appointments]);

    useEffect(() => {
        localStorage.setItem('life_admin_diaries', JSON.stringify(diaries));
    }, [diaries]);

    useEffect(() => {
        localStorage.setItem('life_admin_profile', JSON.stringify(profile));
    }, [profile]);

    useEffect(() => {
        localStorage.setItem('life_admin_settings', JSON.stringify(settings));
    }, [settings]);

    // 4. Action Handlers
    const addToast = (message, type = 'success') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    };

    const addBill = (bill) => {
        setBills((prev) => [bill, ...prev]);
        addToast(`Bill "${bill.name}" added successfully.`);
    };

    const toggleBillStatus = (id) => {
        setBills((prev) =>
            prev.map((bill) => {
                if (bill.id === id) {
                    const nextStatus = bill.status === 'Paid' ? 'Unpaid' : 'Paid';
                    addToast(`"${bill.name}" status set to ${nextStatus}.`);
                    return { ...bill, status: nextStatus };
                }
                return bill;
            })
        );
    };

    const deleteBill = (id) => {
        setBills((prev) => {
            const bill = prev.find((b) => b.id === id);
            if (bill) addToast(`Bill "${bill.name}" deleted.`);
            return prev.filter((b) => b.id !== id);
        });
    };

    const addDocument = (doc) => {
        setDocuments((prev) => [doc, ...prev]);
        addToast(`Document "${doc.title}" uploaded.`);
    };

    const deleteDocument = (id) => {
        setDocuments((prev) => {
            const doc = prev.find((d) => d.id === id);
            if (doc) addToast(`Document "${doc.title}" removed.`);
            return prev.filter((d) => d.id !== id);
        });
    };

    const addAppointment = (appointment) => {
        setAppointments((prev) => [appointment, ...prev]);
        addToast(`Appointment "${appointment.title}" scheduled.`);
    };

    const deleteAppointment = (id) => {
        setAppointments((prev) => {
            const appt = prev.find((a) => a.id === id);
            if (appt) addToast(`Appointment "${appt.title}" deleted.`);
            return prev.filter((a) => a.id !== id);
        });
    };

    const addDiary = (diary) => {
        const newDiary = {
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            date: new Date().toISOString().split('T')[0],
            pages: diary.pages || [{ pageIndex: 0, html: diary.content || '' }],
            content: diary.content || '',
            tags: diary.tags || [],
            mood: diary.mood || 'Productive',
            privacy: diary.privacy || 'Private',
            locked: diary.locked || false,
            attachments: diary.attachments || [],
            lockMeta: diary.lockMeta || null,
            coverColor: diary.coverColor || '#1e3a8a',
            paperStyle: diary.paperStyle || 'ruled'
        };
        setDiaries((prev) => [newDiary, ...prev]);
        addToast(`Diary entry "${newDiary.title}" created.`);
    };

    const updateDiary = (id, partial) => {
        setDiaries((prev) =>
            prev.map((diary) => {
                if (diary.id === id) {
                    const updated = {
                        ...diary,
                        ...partial,
                        updatedAt: new Date().toISOString()
                    };
                    if (partial.content !== undefined && partial.pages === undefined) {
                        updated.pages = [{ pageIndex: 0, html: partial.content }];
                    } else if (partial.pages !== undefined && partial.content === undefined) {
                        updated.content = partial.pages.map(p => p.html.replace(/<[^>]*>/g, '')).join(' ');
                    }
                    return updated;
                }
                return diary;
            })
        );
        addToast(`Diary entry updated.`);
    };

    const deleteDiary = (id) => {
        setDiaries((prev) => {
            const diary = prev.find((d) => d.id === id);
            if (diary) addToast(`Diary entry "${diary.title}" deleted.`);
            return prev.filter((d) => d.id !== id);
        });
    };

    const addAttachment = (diaryId, file) => {
        setDiaries((prev) =>
            prev.map((diary) => {
                if (diary.id === diaryId) {
                    return {
                        ...diary,
                        attachments: [...(diary.attachments || []), file],
                        updatedAt: new Date().toISOString()
                    };
                }
                return diary;
            })
        );
        addToast(`Attachment "${file.name}" added.`);
    };

    const deleteAttachment = (diaryId, attachmentId) => {
        setDiaries((prev) =>
            prev.map((diary) => {
                if (diary.id === diaryId) {
                    return {
                        ...diary,
                        attachments: (diary.attachments || []).filter(a => a.id !== attachmentId),
                        updatedAt: new Date().toISOString()
                    };
                }
                return diary;
            })
        );
        addToast(`Attachment removed.`);
    };

    const toggleLock = (diaryId, { locked, lockMeta, pages, content }) => {
        setDiaries((prev) =>
            prev.map((diary) => {
                if (diary.id === diaryId) {
                    return {
                        ...diary,
                        locked,
                        lockMeta,
                        pages: pages !== undefined ? pages : diary.pages,
                        content: content !== undefined ? content : diary.content,
                        updatedAt: new Date().toISOString()
                    };
                }
                return diary;
            })
        );
        addToast(`Diary entry ${locked ? 'locked' : 'unlocked'}.`);
    };

    const exportDiary = (id) => {
        const diary = diaries.find(d => d.id === id);
        if (!diary) return;
        addToast(`Exporting "${diary.title}"...`);
    };

    const updateProfile = (updatedProfile) => {
        setProfile((prev) => {
            const nextProfile = { ...prev, ...updatedProfile };
            // Compute initials if name changes
            if (updatedProfile.name) {
                const words = updatedProfile.name.trim().split(/\s+/);
                nextProfile.avatar = words.map((w) => w[0]).join('').toUpperCase().slice(0, 2);
            }
            return nextProfile;
        });
        addToast('Profile details updated.');
    };

    const updateSetting = (key, value) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
        if (key === 'notifications') {
            addToast(`Push Notifications ${value ? 'turned on' : 'turned off'}.`);
        } else if (key === 'twoFactor') {
            addToast(`Two-Factor Auth ${value ? 'activated' : 'deactivated'}.`);
        }
    };

    const updateSettings = (newSettings) => {
        setSettings((prev) => ({ ...prev, ...newSettings }));
        if ('notifications' in newSettings) {
            addToast(`Push Notifications ${newSettings.notifications ? 'turned on' : 'turned off'}.`);
        }
        if ('twoFactor' in newSettings) {
            addToast(`Two-Factor Auth ${newSettings.twoFactor ? 'activated' : 'deactivated'}.`);
        }
    };

    return (
        <LifeAdminContext.Provider
            value={{
                bills,
                documents,
                appointments,
                profile,
                settings,
                toasts,
                addToast,
                addBill,
                toggleBillStatus,
                deleteBill,
                addDocument,
                deleteDocument,
                addAppointment,
                deleteAppointment,
                diaries,
                diaryEntries: diaries,
                addDiary,
                addDiaryEntry: addDiary,
                updateDiary,
                updateDiaryEntry: updateDiary,
                deleteDiary,
                deleteDiaryEntry: deleteDiary,
                addAttachment,
                deleteAttachment,
                toggleLock,
                exportDiary,
                updateProfile,
                updateSetting,
                updateSettings,
            }}
        >
            {children}
        </LifeAdminContext.Provider>
    );
}
