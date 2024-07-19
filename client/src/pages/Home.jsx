import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation, Pagination, FreeMode } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ScrollToTop from '../components/ScrollToTop';

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
    const [carBodyType, setCarBodyType] = useState('Sedan');
    const [bodyTypeListings, setBodyTypeListings] = useState([]);
    const [carTransmission, setCarTransmission] = useState('automatic');
    const [transmissionListings, setTransmissionListings] = useState([]);
    const [carPriceOrder, setCarPriceOrder] = useState('desc');
    const [priceOrderListings, setPriceOrderListings] = useState([]);
    SwiperCore.use([Navigation]);

    const bodyTypeOptions = ['Sedan', 'Hatchback', 'SUV', 'MPV/MUV', 'Pickup'];

    const transmissionOptions = ['automatic', 'manual', 'cvt', 'others'];

    const priceOrderOptions = [
        { name: 'Highest to lowest', order: 'desc' },
        { name: 'Lowest to highest', order: 'asc' },
    ];

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
                fetchHighestToLowestPriceListing();
            } catch (error) {
                console.log(error);
            }
        };

        const fetchHighestToLowestPriceListing = async () => {
            try {
                const res = await fetch(
                    '/api/listing/get?sort=price&order=desc&limit=5'
                );
                const data = await res.json();
                setPriceOrderListings(data);
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

    const handleClickPriceOrder = async (order) => {
        try {
            const res = await fetch(
                `/api/listing/get?sort=price&order=${order}&limit=5`
            );
            const data = await res.json();
            setPriceOrderListings(data);
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
                </div>
            </div>
            <SearchInput />
            <HowUsedcarstraxxWork />
            <div className="max-w-6xl mx-auto px-5 py-3 flex flex-col gap-16 lg:gap-8 mt-10 mb-20 lg:mb-16">
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
                    <HomeSlider
                        carListings={bodyTypeListings}
                        carBodytype={`bodyType=${carBodyType}`}
                        showMore={carBodyType}
                    />
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
                    <HomeSlider
                        carListings={transmissionListings}
                        carBodytype={`transmission=${carTransmission}`}
                        showMore={carTransmission}
                    />
                </div>
            </div>
            <CarBrand />
            <div className="max-w-6xl mx-auto px-5 py-3 flex flex-col gap-8 my-20">
                {latestListings && latestListings.length > 0 && (
                    <div>
                        <div className="my-3">
                            <h2 className="text-xl lg:text-2xl font-semibold text-slate-800">
                                Recent Car for Sale
                            </h2>
                        </div>
                        <HomeSlider
                            carListings={latestListings}
                            carBodytype={'sort=createdAt&order=desc'}
                            showMore={''}
                        />
                    </div>
                )}
            </div>
            <ReadTheGuide />
            <div className="max-w-6xl mx-auto px-5 py-3 flex flex-col gap-8 my-20">
                <div>
                    <div className="mt-3 mb-5">
                        <h2 className="text-xl lg:text-2xl font-semibold text-slate-800 mb-2">
                            Cars by Price Order
                        </h2>
                        {priceOrderOptions.map((item, index) => (
                            <button
                                key={index}
                                className={`pr-2 min-[350px]:pr-3 min-[400px]:pr-5 min-[420px]:pr-6 text-sm font-medium hover:text-cyan-600 duration-300 capitalize ${
                                    item.order === carPriceOrder
                                        ? 'text-cyan-600 underline underline-offset-8 decoration-2'
                                        : 'text-slate-800'
                                }`}
                                onClick={() => {
                                    setCarPriceOrder(item.order);
                                    handleClickPriceOrder(item.order);
                                }}
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                    <HomeSlider
                        carListings={priceOrderListings}
                        carBodytype={`sort=price&order=${carPriceOrder}`}
                        showMore={''}
                    />
                </div>
            </div>
        </div>
    );
}
