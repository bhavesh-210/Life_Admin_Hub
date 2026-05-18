// Small card component to show a metric
export default function StatCard({ title, value, icon, trend }) {
    return (
        <div className="stat-card">
            <div className="stat-top">
                {/* Title and optional icon */}
                <h3>{title}</h3>
                <div className="stat-icon">{icon}</div>
            </div>

            {/* Main value */}
            <h1>{value}</h1>

            {/* Optional trend text */}
            {trend && <p className="stat-trend">{trend}</p>}
        </div>
    );
}
