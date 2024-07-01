import toyota from '../assets/toyota.webp';
import mitsubishi from '../assets/mitsubishi.webp';
import ford from '../assets/ford.webp';
import nissan from '../assets/nissan.webp';
import suzuki from '../assets/suzuki.webp';
import { Link } from 'react-router-dom';

const brandImage = [
    { image: `${toyota}`, make: 'Toyota' },
    { image: `${mitsubishi}`, make: 'Mitsubishi' },
    { image: `${ford}`, make: 'Ford' },
    { image: `${nissan}`, make: 'Nissan' },
    { image: `${suzuki}`, make: 'Suzuki' },
];

export default function CarBrand() {
    return (
        <div className="max-w-full bg-slate-200 shadow-md">
            <div className="max-w-6xl mx-auto px-2 md:px-10 lg:px-14 py-10 flex flex-col lg:flex-row gap-10">
                <div className="flex flex-col gap-8 justify-center items-center lg:items-start flex-1">
                    <div className="flex flex-col items-center lg:items-start gap-5">
                        <h1 className="text-2xl font-bold text-slate-800">
                            Popular Brands
                        </h1>
                        <div className="text-base font-medium text-slate-600 text-center lg:text-start">
                            <p className="leading-8">Planning to buy a car?</p>
                            <p>
                                Checkout the leading and the most popular brands
                                today.
                            </p>
                        </div>
                    </div>
                    <Link to={'/search'}>
                        <button className="flex justify-center items-center bg-cyan-800 w-52 py-2 text-white text-sm sm:text-base rounded-md font-semibold hover:opacity-90">
                            Check all cars
                        </button>
                    </Link>
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-3 lg:gap-5 justify-center items-center flex-1">
                    {brandImage.map((item) => (
                        <Link to={`/search?searchTerm=${item.make}`}>
                            <div className="w-32 h-32 bg-slate-400 bg-opacity-50 rounded-full flex flex-col justify-center items-center gap-3">
                                <img src={item.image} alt="logo" />
                                <p className="text-xs">{item.make}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
