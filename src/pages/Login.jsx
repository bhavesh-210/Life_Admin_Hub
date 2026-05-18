import { useNavigate, Link } from 'react-router-dom';

export default function Login({ setIsLoggedIn }) {
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        setIsLoggedIn(true);

        navigate('/dashboard');
    }

    return (
        <div className="auth-page">
            <form onSubmit={handleSubmit} className="auth-card">
                <h1>Welcome back</h1>

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
                    Login
                </button>

                <p
                    style={{
                        marginTop: '20px',
                        color: '#78716c',
                    }}>
                    New user? <Link to="/signup">Create account</Link>
                </p>
            </form>
        </div>
    );
}
