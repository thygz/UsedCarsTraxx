import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import ScrollToTop from '../components/ScrollToTop';

export default function SignUp() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
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
                            className="border border-gray-300 bg-inherit px-3 py-2 rounded-sm text-sm focus:outline-gray-400"
                            id="username"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-xs font-semibold px-1 text-gray-600">
                            Email
                        </p>
                        <input
                            type="email"
                            className="border border-gray-300 bg-inherit px-3 py-2 rounded-sm text-sm focus:outline-gray-400"
                            id="email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-xs font-semibold px-1 text-gray-600">
                            Password
                        </p>
                        <input
                            type="password"
                            className="border border-gray-300 bg-inherit px-3 py-2 rounded-sm text-sm focus:outline-gray-400"
                            id="password"
                            onChange={handleChange}
                        />
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
                {error && <p className="text-red-500 mt-5 text-xs">{error}</p>}
            </div>
        </div>
    );
}
