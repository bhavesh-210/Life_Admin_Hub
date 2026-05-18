import { useNavigate, Link } from 'react-router-dom';

export default function Signup({ setIsLoggedIn }) {
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        setIsLoggedIn(true);

        navigate('/dashboard');
    }

    return (
        <div className="auth-page">
            <form onSubmit={handleSubmit} className="auth-card">
                <h1>Create account</h1>

                <input
                    type="text"
                    placeholder="Full Name"
                    className="input"
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="input"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="input"
                    required
                />

                <button className="btn btn-dark" style={{ width: '100%' }}>
                    Signup
                </button>

                <p
                    style={{
                        marginTop: '20px',
                        color: '#78716c',
                    }}>
                    Already have account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
}
