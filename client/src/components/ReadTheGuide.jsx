import { Link } from 'react-router-dom';

export default function ReadTheGuide() {
    return (
        <div className="max-w-full bg-slate-200 shadow-md mb-10">
            <div className="max-w-6xl mx-auto px-3 sm:px-14 lg:px-24 py-10 flex flex-col min-[800px]:flex-row gap-10">
                <div className="flex flex-col flex-1 justify-center min-[800px]:justify-start items-center min-[800px]:items-start gap-5">
                    <h1 className="text-slate-800 font-semibold text-2xl">
                        Not sure what car to buy?
                    </h1>
                    <p className="text-slate-600 text-base text-center min-[800px]:text-start">
                        Here are some of the guides we've put together to help
                        you on your way to buying your perfect car. When you
                        have the right skills and information, the car buying
                        process is easy and enjoyable.
                    </p>
                </div>
                <Link
                    to={'/about'}
                    className="flex flex-1 justify-center items-center"
                >
                    <button className="flex justify-center items-center bg-cyan-800 w-52 py-2 text-white text-sm sm:text-base rounded-md font-semibold hover:opacity-90">
                        Read the Guide
                    </button>
                </Link>
            </div>
        </div>
    );
}
