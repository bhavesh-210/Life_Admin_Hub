export default function StatCard({ title, value, icon, trend }) {
    return (
        <div className="stat-card flex flex-col justify-between">
            <div className="stat-top mb-3">
                <h3>{title}</h3>
                <div className="stat-icon text-customAccent">
                    {icon}
                </div>
            </div>
            <div>
                <h1>{value}</h1>
                {trend && <p className="stat-trend">{trend}</p>}
            </div>
        </div>
    );
}
