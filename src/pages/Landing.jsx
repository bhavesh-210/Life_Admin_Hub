import { Link } from 'react-router-dom';

export default function Landing() {
    return (
        <div className="landing-page">
            <nav className="top-nav">
                <h2>Life Admin Hub</h2>

                <div className="nav-buttons">
                    <Link to="/login" className="outline-btn">
                        Login
                    </Link>

                    <Link to="/signup" className="primary-btn">
                        Get Started
                    </Link>
                </div>
            </nav>

            <section className="hero-section">
                <div>
                    <h1>Your entire life admin system in one place.</h1>

                    <p className="hero-text">
                        Manage bills, renewals, documents, subscriptions,
                        appointments and monthly spending with a beautiful
                        productivity dashboard.
                    </p>

                    <div className="hero-actions">
                        <Link to="/signup" className="primary-btn">
                            Start Free
                        </Link>

                        <Link to="/login" className="secondary-btn">
                            Login
                        </Link>
                    </div>
                </div>

                <div className="preview-card">
                    <div className="preview-box">
                        <h3>Monthly Spending</h3>
                        <h1>₹7,397</h1>
                    </div>

                    <div className="preview-box">
                        <h3>Upcoming Renewal</h3>
                        <p>Car Insurance • 20 June</p>
                    </div>

                    <div className="preview-box">
                        <h3>Next Appointment</h3>
                        <p>Doctor Checkup • 8 June</p>
                    </div>
                </div>
            </section>

            <section className="features-section">
                <div className="feature-card">💳 Bills Tracking</div>

                <div className="feature-card">📄 Secure Documents</div>

                <div className="feature-card">🔁 Renewal Reminders</div>

                <div className="feature-card">📅 Smart Appointments</div>
            </section>
        </div>
    );
}
