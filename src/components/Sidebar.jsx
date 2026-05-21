// Sidebar with navigation links
import { NavLink, useNavigate } from 'react-router-dom';

export default function Sidebar() {
    const navigate = useNavigate();

    return (
        <aside className="fixed left-6 top-6 bottom-6 w-64 glass-pane bg-white/40 backdrop-blur-[20px] border border-white/60 rounded-[32px] p-6 shadow-2xl flex flex-col z-20">
            <div className="flex items-center gap-3 mb-10 cursor-pointer" onClick={() => navigate('/dashboard')}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-orange-500 text-white flex items-center justify-center font-black text-2xl shadow-[0_0_15px_rgba(217,70,239,0.5)]">L</div>
                <span className="font-extrabold text-xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">Admin Hub</span>
            </div>

            <div className="flex flex-col gap-2">
                <NavLink 
                    className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${isActive ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:bg-white/50 hover:text-slate-800'}`} 
                    to="/dashboard"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                    Dashboard
                </NavLink>

                <NavLink 
                    className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${isActive ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:bg-white/50 hover:text-slate-800'}`} 
                    to="/bills"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                    Bills
                </NavLink>

                <NavLink 
                    className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${isActive ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:bg-white/50 hover:text-slate-800'}`} 
                    to="/documents"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    Documents
                </NavLink>

                <NavLink 
                    className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${isActive ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:bg-white/50 hover:text-slate-800'}`} 
                    to="/renewals"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                    Renewals
                </NavLink>

                <NavLink 
                    className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${isActive ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:bg-white/50 hover:text-slate-800'}`} 
                    to="/appointments"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    Appointments
                </NavLink>

                <NavLink 
                    className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${isActive ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:bg-white/50 hover:text-slate-800'}`} 
                    to="/profile"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    Profile
                </NavLink>
            </div>
            
            <div className="mt-auto pt-6 border-t border-slate-200/50">
                <button className="flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-slate-500 hover:bg-white/50 hover:text-rose-500 transition-all w-full text-left" onClick={() => window.location.href='/'}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
