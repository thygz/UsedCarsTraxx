import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function SearchInput() {
    const [searchTerm, setSearchTerm] = useState('');
    const [modelSearch, setModelSearch] = useState('');
    const [sidebardata, setSidebardata] = useState({
        sort: 'price',
        order: 'desc',
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        urlParams.set('modelSearch', modelSearch);
        urlParams.set('sort', sidebardata.sort);
        urlParams.set('order', sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
        // setToggleMenu(false);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const modelSearchFromUrl = urlParams.get('modelSearch');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }

        if (modelSearchFromUrl) {
            setModelSearch(modelSearchFromUrl);
        }

        if (sortFromUrl || orderFromUrl) {
            setSidebardata({
                sort: sortFromUrl || 'price',
                order: orderFromUrl || 'desc',
            });
        }
    }, [location.search]);

    const handleChange = (e) => {
        if (e.target.id === 'price_order') {
            const sort = e.target.value.split('_')[0] || 'price';
            const order = e.target.value.split('_')[1] || 'desc';
            setSidebardata({ ...sidebardata, sort, order });
        }
    };

    return (
        <div className="max-w-full lg:max-w-4xl mx-auto px-5 min-[500px]:px-20 min-[610px]:px-32 md:px-10 py-10 bg-slate-200 shadow-md lg:rounded-xl flex flex-col gap-8 justify-center items-center mt-[-2.5rem] lg:mt-[-7rem]">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col lg:flex-row justify-center items-end gap-5 lg:gap-3 w-full"
            >
                <div className="flex flex-1 flex-col md:flex-row gap-3 w-full">
                    <div className="flex flex-col flex-1">
                        <p className="text-xs font-semibold px-1 text-gray-700 uppercase">
                            Make
                        </p>
                        <input
                            type="text"
                            // placeholder="Search brand, price and more"
                            className="border border-slate-400 bg-gray-50 px-3 py-2 rounded-md text-base text-gray-600 focus:outline-gray-300"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <p className="text-xs font-semibold px-1 text-gray-700 uppercase">
                            Model
                        </p>
                        <input
                            type="text"
                            // placeholder="Search brand, price and more"
                            className="border border-slate-400 bg-gray-50 px-3 py-2 rounded-md text-base text-gray-600 focus:outline-gray-300"
                            value={modelSearch}
                            onChange={(e) => setModelSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col flex-1 w-full">
                        <label className="text-xs font-semibold px-1 text-gray-700 uppercase">
                            Price
                        </label>
                        <div className="border border-slate-400 px-3 py-2 rounded-md bg-gray-50">
                            <select
                                id="price_order"
                                className="rounded-sm text-sm text-gray-600 focus:outline-none w-full bg-gray-50 cursor-pointer"
                                onChange={handleChange}
                                value={`${sidebardata.sort}_${sidebardata.order}`}
                                // defaultValue={sidebardata.sort}
                            >
                                <option value="price_desc">
                                    Highest to lowest
                                </option>
                                <option value="price_asc">
                                    Lowest to highest
                                </option>
                                <option value="createdAt_desc">
                                    Latest to oldest post
                                </option>
                                <option value="createdAt_asc">
                                    Oldest to latest post
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-auto">
                    {/* <div className="flex flex-col flex-1 w-full">
                        <label className="text-xs font-semibold px-1 text-gray-700 uppercase">
                            Price
                        </label>
                        <div className="border border-slate-400 px-3 py-2 rounded-md bg-gray-50">
                            <select
                                id="price_order"
                                className="rounded-sm text-sm text-gray-600 focus:outline-none w-full bg-gray-50 cursor-pointer"
                                onChange={handleChange}
                                value={`${sidebardata.sort}_${sidebardata.order}`}
                                // defaultValue={sidebardata.sort}
                            >
                                <option value="price_desc">
                                    Highest to lowest
                                </option>
                                <option value="price_asc">
                                    Lowest to highest
                                </option>
                                <option value="createdAt_desc">
                                    Latest to oldest post
                                </option>
                                <option value="createdAt_asc">
                                    Oldest to latest post
                                </option>
                            </select>
                        </div>
                    </div> */}
                    <button className="bg-cyan-800 text-white text-sm sm:text-base font-semibold rounded-sm capitalize hover:opacity-90 px-6 py-[0.52rem] flex justify-center items-center w-full">
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
}
