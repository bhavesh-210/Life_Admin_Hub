// React Router ke helpers: page navigate aur Link component
import { useNavigate, Link } from 'react-router-dom';

export default function Login({ setIsLoggedIn }) {
    // Navigate hook se programmatically route change karenge
    const navigate = useNavigate();

    // Form submit handler: demo login behavior
    function handleSubmit(e) {
        e.preventDefault();

        // App state me logged-in mark kar do
        setIsLoggedIn(true);

        // Dashboard page pe redirect
        navigate('/dashboard');
    }

    return (
        <div className="auth-page">
            {/* Login form */}
            <form onSubmit={handleSubmit} className="auth-card">
                <h1>Welcome back</h1>

                {/* Email input */}
                <input
                    type="email"
                    placeholder="Email"
                    className="input"
                    required
                />

                {/* Password input */}
                <input
                    type="password"
                    placeholder="Password"
                    className="input"
                    required
                />

                {/* Submit button */}
                <button className="btn btn-dark" style={{ width: '100%' }}>
                    Login
                </button>

                {/* Link to signup */}
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
