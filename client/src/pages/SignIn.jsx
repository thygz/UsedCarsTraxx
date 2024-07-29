import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    signInStart,
    signInSuccess,
    signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import ScrollToTop from '../components/ScrollToTop';

export default function SignIn() {
    const [formData, setFormData] = useState({});
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart());
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(signInFailure(data.message));
                return;
            }
            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };
    return (
        <div className="max-w-sm md:max-w-md mx-auto px-3 pt-10 pb-14 min-h-[75vh]">
            <ScrollToTop />
            <div className="bg-inherit px-4 py-6 md:p-7 border-2">
                <h1 className="text-2xl text-center mb-7 font-bold text-slate-800">
                    Welcome Back!
                </h1>
                <form
                    className="flex flex-col gap-3 md:gap-5"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-1">
                        <p className="text-xs font-semibold px-1 text-gray-600">
                            Email address
                        </p>
                        <input
                            type="email"
                            className={`border bg-inherit px-3 py-2 rounded-sm text-base ${
                                error
                                    ? 'border-red-600 focus:outline-none'
                                    : 'border-gray-300 focus:outline-gray-400'
                            }`}
                            id="email"
                            onChange={handleChange}
                        />
                        {error && (
                            <span className="text-red-600 font-semibold text-xs px-1">
                                Email address or password is incorrect
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-xs font-semibold px-1 text-gray-600">
                            Password
                        </p>
                        <input
                            type="password"
                            className={`border bg-inherit px-3 py-2 rounded-sm text-base ${
                                error
                                    ? 'border-red-600 focus:outline-none'
                                    : 'border-gray-300 focus:outline-gray-400'
                            }`}
                            id="password"
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        disabled={loading}
                        className="bg-cyan-700 text-white p-[9px] mt-5 rounded-sm font-semibold hover:opacity-95 disabled:opacity-80"
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                    <div className="flex justify-center items-center gap-3">
                        <span className="bg-gray-300 h-[.5px] w-full"></span>
                        <p className="text-gray-500">or</p>
                        <span className="bg-gray-300 h-[.5px] w-full"></span>
                    </div>
                    <OAuth />
                </form>
                <div className="flex gap-2 mt-5 text-xs">
                    <p>Dont have an account?</p>
                    <Link to={'/sign-up'}>
                        <span className="text-cyan-800">Sign Up</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
