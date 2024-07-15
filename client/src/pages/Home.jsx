import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, FreeMode } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import Listingitem from '../components/Listingitem';
import audi from '../assets/audi.png';
import ScrollToTop from '../components/ScrollToTop';
import { FaArrowRight } from 'react-icons/fa6';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

import HomeSlider from '../components/HomeSlider';
import CarBrand from '../components/CarBrand';
import SearchInput from '../components/SearchInput';
import ReadTheGuide from '../components/ReadTheGuide';
import HowUsedcarstraxxWork from '../components/HowUsedcarstraxxWork';

export default function Home() {
    const [latestListings, setLatestListings] = useState([]);
    const [sedanListings, setSedanListings] = useState([]);
    const [suvListings, setSuvListings] = useState([]);
    const [hatchbackListings, setHatchbackListings] = useState([]);
    const [carBodyType, setCarBodyType] = useState('Sedan');
    const [bodyTypeListings, setBodyTypeListings] = useState([]);
    const [carTransmission, setCarTransmission] = useState('automatic');
    const [transmissionListings, setTransmissionListings] = useState([]);
    SwiperCore.use([Navigation]);
    // console.log(latestListings);

    const bodyTypeOptions = ['Sedan', 'Hatchback', 'SUV', 'MPV/MUV', 'Pickup'];

    const transmissionOptions = ['automatic', 'manual', 'cvt', 'others'];

    useEffect(() => {
        const fetchLatestListings = async () => {
            try {
                const res = await fetch(
                    '/api/listing/get?sort=createdAt&order=desc&limit=5'
                );
                const data = await res.json();
                setLatestListings(data);
                fetchSedanListings();
            } catch (error) {
                console.log(error);
            }
        };

        const fetchSedanListings = async () => {
            try {
                const res = await fetch(
                    '/api/listing/get?bodyType=Sedan&limit=5'
                );
                const data = await res.json();
                setBodyTypeListings(data);
                fetchSuvListings();
            } catch (error) {
                console.log(error);
            }
        };

        const fetchSuvListings = async () => {
            try {
                const res = await fetch(
                    '/api/listing/get?bodyType=SUV&limit=5'
                );
                const data = await res.json();
                setSuvListings(data);
                fetchHatchbackListings();
            } catch (error) {
                console.log(error);
            }
        };

        const fetchHatchbackListings = async () => {
            try {
                const res = await fetch(
                    '/api/listing/get?bodyType=Hatchback&limit=5'
                );
                const data = await res.json();
                setHatchbackListings(data);
                fetchAutomaticListings();
            } catch (error) {
                console.log(error);
            }
        };

        const fetchAutomaticListings = async () => {
            try {
                const res = await fetch(
                    '/api/listing/get?transmission=automatic&limit=5'
                );
                const data = await res.json();
                setTransmissionListings(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchLatestListings();
    }, []);

    const handleClickBodyType = async (bodyTypeName) => {
        try {
            const res = await fetch(
                `/api/listing/get?bodyType=${bodyTypeName}&limit=5`
            );
            const data = await res.json();
            setBodyTypeListings(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickTransmission = async (transmissionName) => {
        try {
            const res = await fetch(
                `/api/listing/get?transmission=${transmissionName}&limit=5`
            );
            const data = await res.json();
            setTransmissionListings(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <ScrollToTop />
            <div className="h-[300px] md:h-[400px] xl:h-[500px] bg-car bg-center bg-cover bg-no-repeat bg-slate-900 bg-blend-lighten mb-10">
                <div className="max-w-6xl mx-auto px-3 flex h-[100%] justify-center items-center">
                    <h1
                        className="text-gray-100 font-bold text-4xl md:text-[2.6rem] lg:text-5xl xl:text-6xl text-center mt-40 min-[370px]:mt-48 sm:mt-52 md:mt-72 lg:mt-44 xl:mt-64"
                        style={{
                            textShadow: '0px 3px 2px rgba(0,0,0,0.7)',
                        }}
                    >
                        Find your next{' '}
                        <span
                            className="text-white"
                            style={{
                                textShadow: '0px 3px 1px rgba(0,0,0,0.7)',
                            }}
                        >
                            dream
                        </span>{' '}
                        car with ease
                    </h1>
                    {/* <div>
                        <Link to={'/start-search'}>
                            <button
                                className="bg-red-700 text-gray-100 px-5 md:px-8 py-3 rounded-full tracking-wide font-semibold text-xs lg:text-sm text-center hover:opacity-90 mb-3 md:mb-7 xl:mb-10 uppercase"
                                style={{
                                    textShadow: '0px 1px 1px rgba(0,0,0,0.7)',
                                }}
                            >
                                Start The Engine
                            </button>
                        </Link>
                    </div> */}
                    {/* <div className="text-gray-400 text-xs sm:text-sm">
                        Sahand Estate will help you find your home fast, easy
                        and comfortable. <br /> Our expert support are always
                        available.
                    </div>
                    <Link
                        to={'/search'}
                        className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
                    >
                        Let's get started...
                    </Link> */}
                </div>
                {/* <img
                    className="w-5/12 hidden sm:block opacity-90"
                    src={audi}
                    alt="audi_image"
                /> */}
            </div>
            <div className="">
                <SearchInput />
                {/* <div>
                    <Link to={'/start-search'}>
                        <button
                            className="bg-red-700 text-gray-100 px-5 md:px-8 py-3 rounded-sm tracking-wide font-semibold text-xs lg:text-sm text-center hover:opacity-90"
                            style={{
                                textShadow: '0px 1px 1px rgba(0,0,0,0.7)',
                            }}
                        >
                            Advance Search
                        </button>
                    </Link>
                </div> */}
            </div>
            <HowUsedcarstraxxWork />
            {/* <Swiper navigation>
                {offerListings &&
                    offerListings.length > 0 &&
                    offerListings.map((listing) => (
                        <SwiperSlide>
                            <div
                                style={{
                                    background: `url(${listing.imageUrls[0]}) center no-repeat`,
                                    backgroundSize: 'cover',
                                }}
                                className="h-[500px]"
                                key={listing._id}
                            ></div>
                        </SwiperSlide>
                    ))}
            </Swiper> */}

            <div className="max-w-6xl mx-auto px-5 py-3 flex flex-col gap-8 mt-10 md:mt-16 mb-10 md:mb-16">
                <div>
                    <div className="mt-3 mb-5">
                        <h2 className="text-xl lg:text-2xl font-semibold text-slate-800 mb-2">
                            Cars by Body Type
                        </h2>
                        {bodyTypeOptions.map((item, index) => (
                            <button
                                key={index}
                                className={`pr-2 min-[350px]:pr-3 min-[400px]:pr-5 min-[420px]:pr-6 text-sm font-medium hover:text-cyan-600 duration-300 ${
                                    item === carBodyType
                                        ? 'text-cyan-600 underline underline-offset-8 decoration-2'
                                        : 'text-slate-800'
                                }`}
                                onClick={() => {
                                    setCarBodyType(item);
                                    handleClickBodyType(item);
                                }}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                    {carBodyType === 'Sedan' ? (
                        <HomeSlider
                            bodytypeListings={bodyTypeListings}
                            carBodytype={`bodyType=${carBodyType}`}
                            showMore={carBodyType}
                        />
                    ) : (
                        <HomeSlider
                            bodytypeListings={bodyTypeListings}
                            carBodytype={`bodyType=${carBodyType}`}
                            showMore={carBodyType}
                        />
                    )}
                    {/* <div className="flex flex-wrap justify-between gap-y-7">
                            {sedanListings.map((listing) => (
                                <Listingitem
                                    listing={listing}
                                    key={listing._id}
                                />
                            ))}
                        </div>
                        <div className="max-w-full flex justify-end">
                            <Link
                                to={'/search?bodyType=Sedan'}
                                className="text-xs m-2 text-end text-cyan-800 hover:underline uppercase"
                            >
                                Show more Sedan
                            </Link>
                        </div> */}
                </div>
                <div>
                    <div className="mt-3 mb-5">
                        <h2 className="text-xl lg:text-2xl font-semibold text-slate-800 mb-2">
                            Cars by Transmission
                        </h2>
                        {transmissionOptions.map((item, index) => (
                            <button
                                key={index}
                                className={`pr-2 min-[350px]:pr-3 min-[400px]:pr-5 min-[420px]:pr-6 text-sm font-medium hover:text-cyan-600 duration-300 capitalize ${
                                    item === carTransmission
                                        ? 'text-cyan-600 underline underline-offset-8 decoration-2'
                                        : 'text-slate-800'
                                }`}
                                onClick={() => {
                                    setCarTransmission(item);
                                    handleClickTransmission(item);
                                }}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                    {carTransmission === 'automatic' ? (
                        <HomeSlider
                            bodytypeListings={transmissionListings}
                            carBodytype={`transmission=${carTransmission}`}
                            showMore={carTransmission}
                        />
                    ) : (
                        <HomeSlider
                            bodytypeListings={transmissionListings}
                            carBodytype={`transmission=${carTransmission}`}
                            showMore={carTransmission}
                        />
                    )}
                    {/* <HomeSlider
                            bodytypeListings={transmissionListings}
                            carBodytype={`transmission=${carTransmission}`}
                            showMore={carTransmission}
                        /> */}
                    {/* <div className="flex flex-wrap justify-between gap-y-7">
                            {suvListings.map((listing) => (
                                <Listingitem
                                    listing={listing}
                                    key={listing._id}
                                />
                            ))}
                        </div>
                        <div className="max-w-full flex justify-end">
                            <Link
                                to={'/search?bodyType=SUV'}
                                className="text-xs m-2 text-end text-cyan-800 hover:underline uppercase"
                            >
                                Show more SUV
                            </Link>
                        </div> */}
                </div>
            </div>
            <CarBrand />
            <div className="max-w-6xl mx-auto px-5 py-3 flex flex-col gap-8 mt-10 md:mt-16 mb-10 md:mb-20">
                {hatchbackListings && hatchbackListings.length > 0 && (
                    <div>
                        <div className="my-3">
                            <h2 className="text-xl lg:text-2xl font-semibold text-slate-800">
                                Hatchback
                            </h2>
                        </div>
                        <HomeSlider
                            bodytypeListings={hatchbackListings}
                            carBodytype={'bodyType=Hatchback'}
                            showMore={'Hatchback'}
                        />
                        {/* <div className="flex flex-wrap justify-between gap-y-7">
                            {hatchbackListings.map((listing) => (
                                <Listingitem
                                    listing={listing}
                                    key={listing._id}
                                />
                            ))}
                        </div> */}
                        {/* <div className="max-w-full flex justify-end">
                            <Link
                                to={'/search?bodyType=Hatchback'}
                                className="text-xs m-2 text-end text-cyan-800 hover:underline uppercase"
                            >
                                Show more Hatchback
                            </Link>
                        </div> */}
                    </div>
                )}
                {latestListings && latestListings.length > 0 && (
                    <div>
                        <div className="my-3">
                            <h2 className="text-xl lg:text-2xl font-semibold text-slate-800">
                                Recent Car for Sale
                            </h2>
                        </div>
                        <HomeSlider
                            bodytypeListings={latestListings}
                            carBodytype={'sort=createdAt&order=desc'}
                            showMore={'car'}
                        />
                        {/* <div className="flex flex-wrap justify-between gap-y-7">
                            {latestListings.map((listing) => (
                                <Listingitem
                                    listing={listing}
                                    key={listing._id}
                                />
                            ))}
                        </div> */}
                        {/* <div className="max-w-full flex justify-end">
                            <Link
                                to={'/search?sort=createdAt&order=desc'}
                                className="text-xs m-2 text-end text-cyan-800 hover:underline uppercase"
                            >
                                Show more car
                            </Link>
                        </div> */}
                    </div>
                )}
            </div>
            <ReadTheGuide />
        </div>
    );
}
