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
                <h1 className="text-2xl font-black">Welcome back</h1>

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
                <button className="btn btn-dark w-full">Login</button>

                {/* Link to signup */}
                <p className="mt-5 text-text-muted text-center">
                    New user?{' '}
                    <Link to="/signup" className="font-bold underline">
                        Create account
                    </Link>
                </p>
            </form>
        </div>
    );
}
