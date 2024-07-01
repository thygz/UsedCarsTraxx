import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import Listingitem from '../components/Listingitem';
import audi from '../assets/audi.png';

export default function Home() {
    const [offerListings, setOfferListings] = useState([]);
    const [rentListings, setRentListings] = useState([]);
    const [saleListings, setSaleListings] = useState([]);
    SwiperCore.use([Navigation]);
    console.log(offerListings);

    useEffect(() => {
        const fetchOfferListings = async () => {
            try {
                const res = await fetch('/api/listing/get?offer=true&limit=4');
                const data = await res.json();
                setOfferListings(data);
                fetchRentListings();
            } catch (error) {
                console.log(error);
            }
        };

        const fetchRentListings = async () => {
            try {
                const res = await fetch('/api/listing/get?type=rent&limit=4');
                const data = await res.json();
                setRentListings(data);
                fetchSaleListings();
            } catch (error) {
                console.log(error);
            }
        };

        const fetchSaleListings = async () => {
            try {
                const res = await fetch('/api/listing/get?type=sale&limit=4');
                const data = await res.json();
                setSaleListings(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchOfferListings();
    }, []);

    return (
        <div>
            <div className="h-[300px] md:h-[400px] xl:h-[500px] bg-car bg-center bg-cover bg-no-repeat mb-10">
                <div className="max-w-6xl mx-auto px-3 flex flex-col gap-4 h-[100%] justify-end items-center">
                    <h1
                        className="text-cyan-100 font-bold text-4xl md:text-[2.6rem] lg:text-5xl xl:text-6xl text-center"
                        style={{
                            textShadow: '0px 7px 1px rgba(0,0,0,0.7)',
                        }}
                    >
                        Find your next{' '}
                        <span
                            className="text-cyan-200"
                            style={{
                                textShadow: '0px 7px 1px rgba(0,0,0,0.7)',
                            }}
                        >
                            dream
                        </span>{' '}
                        car with ease
                    </h1>
                    <div>
                        <Link to={'/search'}>
                            <button
                                className="bg-red-700 text-gray-100 px-5 md:px-8 py-3 rounded-full tracking-wide font-semibold text-xs lg:text-sm text-center hover:opacity-90 mb-3 md:mb-7 xl:mb-10 uppercase"
                                style={{
                                    textShadow: '0px 1px 1px rgba(0,0,0,0.7)',
                                }}
                            >
                                Start The Engine
                            </button>
                        </Link>
                    </div>
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

            <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
                {offerListings && offerListings.length > 0 && (
                    <div>
                        <div className="my-3">
                            <h2 className="text-2xl font-semibold text-slate-600">
                                Recent offers
                            </h2>
                            <Link
                                className="text-sm text-blue-800 hover:underline"
                                to={'/search?offer=true'}
                            >
                                Show more offers
                            </Link>
                        </div>
                        <div className="flex flex-wrap justify-between gap-y-7">
                            {offerListings.map((listing) => (
                                <Listingitem
                                    listing={listing}
                                    key={listing._id}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {rentListings && rentListings.length > 0 && (
                    <div>
                        <div className="my-3">
                            <h2 className="text-2xl font-semibold text-slate-600">
                                Recent places for rent
                            </h2>
                            <Link
                                className="text-sm text-blue-800 hover:underline"
                                to={'/search?type=rent'}
                            >
                                Show more places for rent
                            </Link>
                        </div>
                        <div className="flex flex-wrap justify-between gap-y-7">
                            {rentListings.map((listing) => (
                                <Listingitem
                                    listing={listing}
                                    key={listing._id}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {saleListings && saleListings.length > 0 && (
                    <div>
                        <div className="my-3">
                            <h2 className="text-2xl font-semibold text-slate-600">
                                Recent places for sale
                            </h2>
                            <Link
                                className="text-sm text-blue-800 hover:underline"
                                to={'/search?type=sale'}
                            >
                                Show more places for sale
                            </Link>
                        </div>
                        <div className="flex flex-wrap justify-between gap-y-7">
                            {saleListings.map((listing) => (
                                <Listingitem
                                    listing={listing}
                                    key={listing._id}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
