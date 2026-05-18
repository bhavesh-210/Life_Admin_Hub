export default function StatCard({ title, value, icon, trend }) {
    return (
        <div className="stat-card">
            <div className="stat-top">
                <h3>{title}</h3>
                <div className="stat-icon">{icon}</div>
            </div>

            <h1>{value}</h1>

            {trend && <p className="stat-trend">{trend}</p>}
        </div>
    );
}
