import { Link } from 'react-router-dom';
import usedCarsTraxxLogo from '../assets/usedCarsTraxxLogo.png';
import { FaFacebookF } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function Footer() {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <footer className="bg-inherit">
            <div className="border-y-[1px] border-gray-300">
                <div className="max-w-6xl mx-auto flex justify-between flex-wrap py-10 px-5">
                    <div className="hidden min-[600px]:block">
                        <Link to="/">
                            <img
                                className="w-36 md:w-40"
                                src={usedCarsTraxxLogo}
                                alt="logo"
                            />
                        </Link>
                    </div>
                    <div className="">
                        <ul className="gap-4 capitalize flex flex-col text-xs">
                            <Link to="/">
                                <li className="inline text-cyan-800 hover:text-cyan-500 duration-300">
                                    Home
                                </li>
                            </Link>
                            <Link to="/about">
                                <li className="inline text-cyan-800 hover:text-cyan-500 duration-300">
                                    About
                                </li>
                            </Link>
                            {!currentUser ? (
                                <Link to={'/sign-in'}>
                                    <li className="inline text-cyan-800 hover:text-cyan-500 duration-300">
                                        Sell Car
                                    </li>
                                </Link>
                            ) : (
                                <Link to={'/create-listing'}>
                                    <li className="inline text-cyan-800 hover:text-cyan-500 duration-300">
                                        Sell Car
                                    </li>
                                </Link>
                            )}
                            {!currentUser ? (
                                <Link to={'/sign-in'}>
                                    <li className="inline text-cyan-800 hover:text-cyan-500 duration-300">
                                        Favorites
                                    </li>
                                </Link>
                            ) : (
                                <Link to={'/favorites'}>
                                    <li className="inline text-cyan-800 hover:text-cyan-500 duration-300">
                                        Favorites
                                    </li>
                                </Link>
                            )}
                        </ul>
                    </div>
                    <div>
                        <ul className="gap-4 capitalize flex flex-col text-xs">
                            <Link to="">
                                <li className="inline text-cyan-800 hover:text-cyan-500 duration-300">
                                    Toyota
                                </li>
                            </Link>
                            <Link to="">
                                <li className="inline text-cyan-800 hover:text-cyan-500 duration-300">
                                    Mitsubishi
                                </li>
                            </Link>
                            <Link>
                                <li className="inline text-cyan-800 hover:text-cyan-500 duration-300">
                                    Nissan
                                </li>
                            </Link>
                            <Link>
                                <li className="inline text-cyan-800 hover:text-cyan-500 duration-300">
                                    Ford
                                </li>
                            </Link>
                            <Link>
                                <li className="inline text-cyan-800 hover:text-cyan-500 duration-300">
                                    Honda
                                </li>
                            </Link>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-3">
                        <button
                            type="button"
                            className="flex items-center justify-center w-44 bg-inherit border border-slate-400 h-14 rounded-xl"
                        >
                            <div className="mr-3 text-slate-700">
                                <svg viewBox="0 0 384 512" width="27">
                                    <path
                                        fill="currentColor"
                                        d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                                    ></path>
                                </svg>
                            </div>
                            <div className="text-slate-700 hover:text-gray-400 duration-300">
                                <div className="text-[0.65rem]">
                                    Download on the
                                </div>
                                <div className="-mt-1 font-sans text-lg font-semibold">
                                    App Store
                                </div>
                            </div>
                        </button>
                        <button
                            type="button"
                            className="flex items-center justify-center w-44 bg-inherit border border-slate-400 rounded-lg h-14"
                        >
                            <div className="mr-3">
                                <svg viewBox="30 336.7 120.9 129.2" width="27">
                                    <path
                                        fill="#FFD400"
                                        d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"
                                    ></path>
                                    <path
                                        fill="#FF3333"
                                        d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"
                                    ></path>
                                    <path
                                        fill="#48FF48"
                                        d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"
                                    ></path>
                                    <path
                                        fill="#3BCCFF"
                                        d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"
                                    ></path>
                                </svg>
                            </div>
                            <div className="text-slate-700 hover:text-gray-400 duration-300">
                                <div className="text-[0.65rem]">GET IT ON</div>
                                <div className="-mt-1 font-sans text-lg font-semibold">
                                    Google Play
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div className="max-w-6xl mx-auto py-6 md:py-8 px-5 flex justify-between items-center flex-col-reverse md:flex-row gap-3 md:gap-0">
                <p className="text-slate-500 text-xs">
                    Copyright @ Usedcarstraxx 2024. All Right Reserved.
                </p>
                <div className="">
                    <ul className="gap-4 flex">
                        <Link to="/">
                            <li className="inline text-cyan-800 hover:text-cyan-500 duration-300 text-base">
                                <FaFacebookF />
                            </li>
                        </Link>
                        <Link to="/about">
                            <li className="inline text-cyan-800 hover:text-cyan-500 duration-300 text-xl">
                                <FaTwitter />
                            </li>
                        </Link>
                        <Link>
                            <li className="inline text-cyan-800 hover:text-cyan-500 duration-300 text-xl">
                                <FaYoutube />
                            </li>
                        </Link>
                        <Link>
                            <li className="inline text-cyan-800 hover:text-cyan-500 duration-300 text-xl">
                                <FaInstagram />
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
