import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function SearchInput() {
    const [searchTerm, setSearchTerm] = useState('');
    const [modelSearch, setModelSearch] = useState('');
    const [sidebardata, setSidebardata] = useState({
        price: 'AllPrice',
    });
    const navigate = useNavigate();

    const priceOptions = [
        { label: 'All', value: 'AllPrice' },
        { label: 'Under ₱250,000', value: 'Under 250,000' },
        { label: 'Under ₱500,000', value: 'Under 500,000' },
        { label: 'Under ₱750,000', value: 'Under 750,000' },
        { label: 'Under ₱1,000,000', value: 'Under 1,000,000' },
        { label: 'Under ₱3,000,000', value: 'Under 3,000,000' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        urlParams.set('modelSearch', modelSearch);
        urlParams.set('price', sidebardata.price);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const modelSearchFromUrl = urlParams.get('modelSearch');
        const priceFromUrl = urlParams.get('price');

        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }

        if (modelSearchFromUrl) {
            setModelSearch(modelSearchFromUrl);
        }

        if (priceFromUrl) {
            setSidebardata({
                price: priceFromUrl || 'AllPrice',
            });
        }
    }, [location.search]);

    const handleChange = (e) => {
        if (
            e.target.value === 'AllPrice' ||
            e.target.value === 'Under 250,000' ||
            e.target.value === 'Under 500,000' ||
            e.target.value === 'Under 750,000' ||
            e.target.value === 'Under 1,000,000' ||
            e.target.value === 'Under 3,000,000'
        ) {
            setSidebardata({ ...sidebardata, price: e.target.value });
        }
    };

    return (
        <div className="max-w-full lg:max-w-4xl mx-auto px-5 min-[500px]:px-20 min-[610px]:px-32 md:px-10 pt-10 pb-10 md:pb-3 bg-gradient-to-b from-gray-600 to-slate-400 shadow-md lg:rounded-xl flex flex-col gap-1 md:gap-7 justify-center items-center mt-[-2.5rem] lg:mt-[-7rem]">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col lg:flex-row justify-center items-center lg:items-end gap-8 md:gap-4 lg:gap-3 w-full"
            >
                <div className="flex flex-1 flex-col md:flex-row gap-3 w-full">
                    <div className="flex flex-col flex-1">
                        <p className="text-xs font-medium px-1 text-white uppercase">
                            Make
                        </p>
                        <input
                            type="text"
                            // placeholder="Search brand, price and more"
                            className="border border-slate-400 bg-white px-3 py-2 rounded-md text-base text-gray-700 focus:outline-gray-400"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <p className="text-xs font-medium px-1 text-white uppercase">
                            Model
                        </p>
                        <input
                            type="text"
                            // placeholder="Search brand, price and more"
                            className="border border-slate-400 bg-white px-3 py-2 rounded-md text-base text-gray-700 focus:outline-gray-400"
                            value={modelSearch}
                            onChange={(e) => setModelSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col flex-1 w-full">
                        <label
                            htmlFor="price"
                            className="text-xs font-medium px-1 text-white uppercase"
                        >
                            Price
                        </label>
                        <div className="border border-slate-400 px-3 py-2 rounded-md bg-white">
                            <select
                                className="rounded-sm text-sm text-gray-700 focus:outline-none w-full bg-white cursor-pointer"
                                onChange={handleChange}
                                value={sidebardata.price}
                            >
                                {priceOptions.map((option, index) => (
                                    <option key={index} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-auto flex justify-center items-center">
                    <button className="bg-cyan-600 text-white text-sm sm:text-base font-semibold rounded-md capitalize hover:opacity-90 px-20 lg:px-6 py-3 sm:py-[0.6rem] lg:py-[0.52rem] flex justify-center items-center w-full">
                        Search
                    </button>
                </div>
            </form>
            <div className="w-full">
                <p className="text-[0.7rem] text-center text-slate-900">
                    Note: Can be searched even only one input is filled in or
                    key word is not complete.
                </p>
            </div>
        </div>
    );
}
