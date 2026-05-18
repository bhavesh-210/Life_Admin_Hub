export default function Appointments() {
    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Appointments</h1>

                    <p className="page-subtitle">
                        Manage doctor, business and service appointments.
                    </p>
                </div>

                <button className="btn btn-dark">Add Appointment</button>
            </div>

            <div className="card">
                <div className="list">
                    <div className="list-item">
                        <div>
                            <h3>Doctor Checkup</h3>
                            <p>8 June • 10:00 AM</p>
                        </div>

                        <span className="badge badge-blue">Medical</span>
                    </div>

                    <div className="list-item">
                        <div>
                            <h3>Business Meeting</h3>
                            <p>12 June • 1:30 PM</p>
                        </div>

                        <span className="badge badge-blue">Business</span>
                    </div>

                    <div className="list-item">
                        <div>
                            <h3>Vehicle Service</h3>
                            <p>16 June • 9:00 AM</p>
                        </div>

                        <span className="badge badge-blue">Vehicle</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
