export default function Renewals() {
    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Renewals</h1>

                    <p className="page-subtitle">
                        Upcoming renewals and alerts.
                    </p>
                </div>

                <button className="btn btn-dark">Add Renewal</button>
            </div>

            <div className="grid grid-3">
                <div className="card">
                    <h2>Vehicle Insurance</h2>

                    <p
                        style={{
                            marginTop: '12px',
                            color: '#78716c',
                        }}>
                        Renew before 20 June
                    </p>
                </div>

                <div className="card">
                    <h2>Netflix Premium</h2>

                    <p
                        style={{
                            marginTop: '12px',
                            color: '#78716c',
                        }}>
                        Renew before 5 July
                    </p>
                </div>

                <div className="card">
                    <h2>Driving License</h2>

                    <p
                        style={{
                            marginTop: '12px',
                            color: '#78716c',
                        }}>
                        Renew before 12 Aug
                    </p>
                </div>
            </div>
        </div>
    );
}
