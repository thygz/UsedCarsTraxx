import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import ScrollToTop from '../components/ScrollToTop';

export default function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const validationErrors = {};
            if (!formData.username.trim()) {
                validationErrors.username = 'Username is required';
            }
            if (!formData.email.trim()) {
                validationErrors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                validationErrors.email = 'Invalid email address';
            }
            if (!formData.password.trim()) {
                validationErrors.password = 'Password is required';
            } else if (formData.password.length < 8) {
                validationErrors.password =
                    'Password must be at least 8 characters long';
            }
            setValidationErrors(validationErrors);
            if (Object.keys(validationErrors).length === 0) {
                setLoading(true);
                const res = await fetch('/api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                const data = await res.json();
                if (data.success === false) {
                    setLoading(false);
                    setError(data.message);
                    return;
                }
                setLoading(false);
                setError(null);
                navigate('/sign-in');
            }
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };
    return (
        <div className="max-w-sm md:max-w-md mx-auto px-3 pt-10 pb-14 min-h-[75vh]">
            <ScrollToTop />
            <div className="bg-inherit px-4 py-6 md:p-7 border-2">
                <h1 className="text-2xl text-center mb-7 font-bold text-slate-800">
                    Sign up for an UsedCarsTraxx Account
                </h1>
                <form
                    className="flex flex-col gap-3 md:gap-5"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-1">
                        <p className="text-xs font-semibold px-1 text-gray-600">
                            Username
                        </p>
                        <input
                            type="text"
                            className={`border bg-inherit px-3 py-2 rounded-sm text-sm ${
                                validationErrors.username || error
                                    ? 'border-red-600 focus:outline-none'
                                    : 'border-gray-300 focus:outline-gray-400'
                            }`}
                            id="username"
                            onChange={handleChange}
                        />
                        {validationErrors.username && (
                            <span className="text-xs text-red-600 font-semibold px-1">
                                {validationErrors.username}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-xs font-semibold px-1 text-gray-600">
                            Email
                        </p>
                        <input
                            type="email"
                            className={`border bg-inherit px-3 py-2 rounded-sm text-sm ${
                                validationErrors.email || error
                                    ? 'border-red-600 focus:outline-none'
                                    : 'border-gray-300 focus:outline-gray-400'
                            }`}
                            id="email"
                            onChange={handleChange}
                        />
                        {validationErrors.email && (
                            <span className="text-xs text-red-600 font-semibold px-1">
                                {validationErrors.email}
                            </span>
                        )}
                        {error && (
                            <span className="text-xs text-red-600 font-semibold px-1">
                                Email or username is already used
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-xs font-semibold px-1 text-gray-600">
                            Password
                        </p>
                        <input
                            type="password"
                            className={`border bg-inherit px-3 py-2 rounded-sm text-sm ${
                                validationErrors.password
                                    ? 'border-red-600 focus:outline-none'
                                    : 'border-gray-300 focus:outline-gray-400'
                            }`}
                            id="password"
                            onChange={handleChange}
                        />
                        {validationErrors.password && (
                            <span className="text-xs text-red-600 font-semibold px-1">
                                {validationErrors.password}
                            </span>
                        )}
                    </div>
                    <button
                        disabled={loading}
                        className="bg-cyan-700 text-white p-2 mt-5 rounded-sm font-semibold hover:opacity-95 disabled:opacity-80"
                    >
                        {loading ? 'Loading...' : 'Sign Up'}
                    </button>
                    <div className="flex justify-center items-center gap-3">
                        <span className="bg-gray-300 h-[.5px] w-full"></span>
                        <p className="text-gray-500">or</p>
                        <span className="bg-gray-300 h-[.5px] w-full"></span>
                    </div>
                    <OAuth />
                </form>
                <div className="flex gap-2 mt-5 text-xs">
                    <p>Have an account?</p>
                    <Link to={'/sign-in'}>
                        <span className="text-cyan-800">Login</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
