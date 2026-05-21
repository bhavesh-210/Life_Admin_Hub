// Sidebar with navigation links
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
    return (
        <aside className="fixed left-6 top-6 bottom-6 w-64 glass-pane bg-white/40 backdrop-blur-[20px] border border-white/60 rounded-[32px] p-6 shadow-2xl flex flex-col z-20">
            <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-orange-500 text-white flex items-center justify-center font-black text-2xl shadow-[0_0_15px_rgba(217,70,239,0.5)]">L</div>
                <span className="font-extrabold text-xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">Admin Hub</span>
            </div>

            <div className="flex flex-col gap-2">
                {/* Navigation links using NavLink */}
                <NavLink 
                    className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${isActive ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:bg-white/50 hover:text-slate-800'}`} 
                    to="/dashboard"
                >
                    <span>🏠</span> Dashboard
                </NavLink>

                <NavLink 
                    className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${isActive ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:bg-white/50 hover:text-slate-800'}`} 
                    to="/bills"
                >
                    <span>💳</span> Bills
                </NavLink>

                <NavLink 
                    className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${isActive ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:bg-white/50 hover:text-slate-800'}`} 
                    to="/documents"
                >
                    <span>📄</span> Documents
                </NavLink>

                <NavLink 
                    className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${isActive ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:bg-white/50 hover:text-slate-800'}`} 
                    to="/renewals"
                >
                    <span>🔁</span> Renewals
                </NavLink>

                <NavLink 
                    className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${isActive ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:bg-white/50 hover:text-slate-800'}`} 
                    to="/appointments"
                >
                    <span>📅</span> Appointments
                </NavLink>
            </div>
            
            <div className="mt-auto pt-6 border-t border-slate-200/50">
                <button className="flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-slate-500 hover:bg-white/50 hover:text-rose-500 transition-all w-full text-left" onClick={() => window.location.href='/'}>
                    <span>🚪</span> Sign Out
                </button>
            </div>
        </aside>
    );
}
