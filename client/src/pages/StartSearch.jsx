import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Listingitem from '../components/Listingitem';
import ScrollToTop from '../components/ScrollToTop';
import SearchListingitem from '../components/SearchListingitem';

export default function StartSearch() {
    const navigate = useNavigate();
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        transmission: 'allTransmission',
        fuelType: 'allFuelType',
        bodyType: 'allBodyType',
        sort: 'created_at',
        order: 'desc',
    });
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const searchResult = useRef(null);

    const bodyTypeOptions = [
        { label: 'All', value: 'allBodyType' },
        { label: 'Sedan', value: 'Sedan' },
        { label: 'Hatchback', value: 'Hatchback' },
        { label: 'SUV', value: 'SUV' },
        { label: 'MPV/MUV', value: 'MPV/MUV' },
        { label: 'Van', value: 'Van' },
        { label: 'Crossover', value: 'Crossover' },
        { label: 'Pickup', value: 'Pickup' },
        { label: 'Hybrid', value: 'Hybrid' },
        { label: 'Sports Car', value: 'Sports Car' },
        { label: 'Others', value: 'Others' },
    ];

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const transmissionFromUrl = urlParams.get('transmission');
        const fuelTypeFromUrl = urlParams.get('fuelType');
        const bodyTypeFromUrl = urlParams.get('bodyType');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if (
            searchTermFromUrl ||
            transmissionFromUrl ||
            fuelTypeFromUrl ||
            bodyTypeFromUrl ||
            sortFromUrl ||
            orderFromUrl
        ) {
            setSidebardata({
                searchTerm: searchTermFromUrl || '',
                transmission: transmissionFromUrl || 'allTransmission',
                fuelType: fuelTypeFromUrl || 'allFuelType',
                bodyType: bodyTypeFromUrl || 'allBodyType',
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            });
        }

        const fetchListings = async () => {
            setLoading(true);
            setShowMore(false);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            if (data.length > 8) {
                setShowMore(true);
            } else {
                setShowMore(false);
            }
            setListings(data);
            setLoading(false);
        };
        fetchListings();
    }, [location.search]);

    const handleChange = (e) => {
        if (
            e.target.id === 'allTransmission' ||
            e.target.id === 'automatic' ||
            e.target.id === 'manual' ||
            e.target.id === 'cvt' ||
            e.target.id === 'others'
        ) {
            setSidebardata({ ...sidebardata, transmission: e.target.id });
        }

        if (
            e.target.id === 'allFuelType' ||
            e.target.id === 'diesel' ||
            e.target.id === 'gasoline'
        ) {
            setSidebardata({ ...sidebardata, fuelType: e.target.id });
        }

        if (
            e.target.value === 'allBodyType' ||
            e.target.value === 'Sedan' ||
            e.target.value === 'Hatchback' ||
            e.target.value === 'SUV' ||
            e.target.value === 'MPV/MUV' ||
            e.target.value === 'Van' ||
            e.target.value === 'Crossover' ||
            e.target.value === 'Pickup' ||
            e.target.value === 'Hybrid' ||
            e.target.value === 'Sports Car' ||
            e.target.value === 'Others'
        ) {
            setSidebardata({ ...sidebardata, bodyType: e.target.value });
        }

        if (e.target.id === 'searchTerm') {
            setSidebardata({ ...sidebardata, searchTerm: e.target.value });
        }

        if (e.target.id === 'price_order') {
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setSidebardata({ ...sidebardata, sort, order });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebardata.searchTerm);
        urlParams.set('transmission', sidebardata.transmission);
        urlParams.set('fuelType', sidebardata.fuelType);
        urlParams.set('bodyType', sidebardata.bodyType);
        urlParams.set('sort', sidebardata.sort);
        urlParams.set('order', sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);

        // const scrollToElement = () => {
        //     window.scrollTo({
        //         top: searchResult.current.offsetTop,
        //         behavior: 'smooth',
        //     });
        // };
        // scrollToElement();
    };

    const onShowMoreClick = async () => {
        const numberOfListings = listings.length;
        const startIndex = numberOfListings;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        if (data.length < 9) {
            setShowMore(false);
        }
        setListings([...listings, ...data]);
    };

    return (
        <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-3 md:pt-10 pb-10 md:pb-14 lg:px-4 min-h-[75vh]">
            <ScrollToTop />
            <div className="md:pr-4 p-3 md:px-0 md:pt-[5rem] md:border-r-2 lg:w-[22%] bg-white md:bg-inherit">
                <p className="text-base font-semibold lg:border-b p-1 text-slate-700 mb-3 lg:mb-4">
                    Filters
                </p>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-7 lg:gap-8"
                >
                    {/* <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap font-semibold">
                            Make
                        </label>
                        <input
                            type="text"
                            id="searchTerm"
                            placeholder="Search..."
                            className="border rounded-lg p-3 w-full"
                            value={sidebardata.searchTerm}
                            onChange={handleChange}
                        />
                    </div> */}
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col flex-1">
                            <p className="text-xs font-semibold p-[0.15rem] text-gray-600">
                                Vehicle Make
                            </p>
                            <input
                                type="text"
                                className="border-[1px] border-slate-400 px-3 py-2 rounded-sm text-sm bg-inherit focus:outline-slate-400"
                                id="searchTerm"
                                // placeholder="Search..."
                                onChange={handleChange}
                                value={sidebardata.searchTerm}
                            />
                        </div>
                        <div className="flex flex-col flex-1">
                            <label
                                htmlFor="bodyType"
                                className="text-xs font-semibold p-[0.15rem] text-gray-600"
                            >
                                Body Type
                            </label>
                            <div className="border-[1px] border-slate-400 px-2">
                                <select
                                    type="text"
                                    // name="bodyType"
                                    className="py-2 rounded-sm text-sm focus:outline-none w-full bg-inherit"
                                    // id="bodyType"
                                    // required
                                    value={sidebardata.bodyType}
                                    onChange={handleChange}
                                >
                                    {bodyTypeOptions.map((option, index) => (
                                        <option
                                            key={index}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col flex-1">
                            <label className="text-xs font-semibold p-[0.15rem] text-gray-600">
                                Price
                            </label>
                            <div className="border-[1px] border-slate-400 px-2">
                                <select
                                    id="price_order"
                                    className="py-2 rounded-sm text-sm focus:outline-none w-full bg-inherit"
                                    onChange={handleChange}
                                    defaultValue={'created_at_desc'}
                                >
                                    <option value="price_desc">
                                        Price high to low
                                    </option>
                                    <option value="price_asc">
                                        Price low to high
                                    </option>
                                    <option value="createdAt_desc">
                                        Latest
                                    </option>
                                    <option value="createdAt_asc">
                                        Oldest
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row lg:flex-col lg:gap-8 ">
                        <div className="flex gap-2 flex-col flex-1">
                            <label className="text-xs font-semibold p-[0.15rem] text-gray-600">
                                Transmission
                            </label>
                            <div className="flex flex-col gap-3">
                                <div className="flex gap-2">
                                    <input
                                        type="checkbox"
                                        id="allTransmission"
                                        className="w-5"
                                        onChange={handleChange}
                                        checked={
                                            sidebardata.transmission ===
                                            'allTransmission'
                                        }
                                    />
                                    <span className="text-xs">All</span>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="checkbox"
                                        id="automatic"
                                        className="w-5"
                                        onChange={handleChange}
                                        checked={
                                            sidebardata.transmission ===
                                            'automatic'
                                        }
                                    />
                                    <span className="text-xs">Automatic</span>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="checkbox"
                                        id="manual"
                                        className="w-5"
                                        onChange={handleChange}
                                        checked={
                                            sidebardata.transmission ===
                                            'manual'
                                        }
                                    />
                                    <span className="text-xs">Manual</span>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="checkbox"
                                        id="cvt"
                                        className="w-5"
                                        onChange={handleChange}
                                        checked={
                                            sidebardata.transmission === 'cvt'
                                        }
                                    />
                                    <span className="text-xs">CVT</span>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="checkbox"
                                        id="others"
                                        className="w-5"
                                        onChange={handleChange}
                                        checked={
                                            sidebardata.transmission ===
                                            'others'
                                        }
                                    />
                                    <span className="text-xs">Others</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 flex-col flex-1">
                            <label className="text-xs font-semibold p-[0.15rem] text-gray-600">
                                Fuel Type
                            </label>
                            <div className="flex flex-col gap-3">
                                <div className="flex gap-2">
                                    <input
                                        type="checkbox"
                                        id="allFuelType"
                                        className="w-5"
                                        onChange={handleChange}
                                        checked={
                                            sidebardata.fuelType ===
                                            'allFuelType'
                                        }
                                    />
                                    <span className="text-xs">All</span>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="checkbox"
                                        id="diesel"
                                        className="w-5"
                                        onChange={handleChange}
                                        checked={
                                            sidebardata.fuelType === 'diesel'
                                        }
                                    />
                                    <span className="text-xs">Diesel</span>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="checkbox"
                                        id="gasoline"
                                        className="w-5"
                                        onChange={handleChange}
                                        checked={
                                            sidebardata.fuelType === 'gasoline'
                                        }
                                    />
                                    <span className="text-xs">Gasoline</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="bg-cyan-700 text-white p-2 mt-5 rounded-sm font-semibold hover:opacity-95 disabled:opacity-80">
                        Search
                    </button>
                </form>
            </div>
            <div
                className="p-2 md:p-0 md:ml-5 xl:ml-7 flex-1 hidden md:block"
                ref={searchResult}
            >
                <h1 className="text-lg md:text-xl font-semibold pb-5 md:pb-10 text-slate-700 mt-1">
                    Your Search Results:
                </h1>
                <div className="flex flex-wrap gap-x-4 gap-y-7 pb-10">
                    {!loading && listings.length === 0 && (
                        <div className="flex justify-center items-center w-full min-h-[50vh]">
                            <p className="text-xl font-semibold text-slate-600">
                                No listing found!
                            </p>
                        </div>
                    )}
                    {loading && (
                        <p className="text-xl text-slate-700 text-center w-full">
                            Loading...
                        </p>
                    )}
                    {!loading &&
                        listings &&
                        listings.map((listing) => (
                            <SearchListingitem
                                key={listing._id}
                                listing={listing}
                            />
                        ))}
                    {showMore && (
                        <button
                            onClick={onShowMoreClick}
                            className="text-cyan-700 hover:underline p-3 text-center w-full uppercase text-sm font-semibold"
                        >
                            Show more
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
