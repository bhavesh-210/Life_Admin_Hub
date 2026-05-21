// React Router helpers
import { useNavigate, Link } from 'react-router-dom';

export default function Signup({ setIsLoggedIn }) {
    // Navigate hook for redirect
    const navigate = useNavigate();

    // Dummy submit handler — mark user logged in and redirect
    function handleSubmit(e) {
        e.preventDefault();

        setIsLoggedIn(true);

        navigate('/dashboard');
    }

    return (
        <div className="auth-page">
            <form onSubmit={handleSubmit} className="auth-card">
                <h1 className="text-2xl font-black">Create account</h1>

                {/* Name input */}
                <input
                    type="text"
                    placeholder="Full Name"
                    className="input"
                    required
                />

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

                {/* Signup button */}
                <button className="btn btn-dark w-full">Signup</button>

                {/* Link to login */}
                <p className="mt-5 text-text-muted text-center">
                    Already have account?{' '}
                    <Link to="/login" className="font-bold underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}
