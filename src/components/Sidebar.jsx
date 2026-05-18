import { NavLink } from 'react-router-dom';

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">Life Admin Hub</div>
            <p className="sidebar-subtitle">Personal operating system</p>

            <NavLink className="sidebar-link" to="/dashboard">
                <span>🏠</span> Dashboard
            </NavLink>

            <NavLink className="sidebar-link" to="/bills">
                <span>💳</span> Bills
            </NavLink>

            <NavLink className="sidebar-link" to="/documents">
                <span>📄</span> Documents
            </NavLink>

            <NavLink className="sidebar-link" to="/renewals">
                <span>🔁</span> Renewals
            </NavLink>

            <NavLink className="sidebar-link" to="/appointments">
                <span>📅</span> Appointments
            </NavLink>
        </aside>
    );
}
