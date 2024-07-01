import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { useSelector } from 'react-redux';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Contact from '../components/Contact';
import { RiCloseLine } from 'react-icons/ri';
import ScrollToTop from '../components/ScrollToTop';
import Listingitem from '../components/Listingitem';
import ListingSlider from '../components/ListingSlider';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/bundle';

export default function Listing() {
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false);
    const [toggleImage, setToggleImage] = useState(false);
    const [recommendedListings, setRecommendedListings] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const params = useParams();
    const { currentUser } = useSelector((state) => state.user);
    const toggleImageDiv = useRef(null);
    SwiperCore.use([Navigation]);
    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/listing/get/${params.listingId}`);
                const data = await res.json();
                // console.log(data);
                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setListing(data);
                setLoading(false);
                setError(false);
                setContact(false);
                fetchRecommendedListings(data.bodyType, data._id);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };

        const fetchRecommendedListings = async (bodyType, itemRemoveId) => {
            try {
                const res = await fetch(
                    `/api/listing/get?bodyType=${bodyType}&limit=6`
                );
                const data = await res.json();
                const newData = data.filter(
                    (item) => item._id !== itemRemoveId
                );
                if (newData.length > 2) {
                    setShowMore(true);
                } else {
                    setShowMore(false);
                }
                setRecommendedListings(newData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchListing();
    }, [params.listingId]);

    const scrollToElement = () => {
        window.scrollTo({
            top: toggleImageDiv.current.offsetTop,
            behavior: 'smooth',
        });
    };

    return (
        <main className="">
            <ScrollToTop />
            {listing && !loading && !error ? (
                <div className="flex flex-col max-w-full mx-auto gap-7 sm:gap-14 lg:gap-10 rounded-sm">
                    <div className="w-full">
                        <Swiper
                            slidesPerView={1}
                            loop={true}
                            // pagination={{
                            //     clickable: true,
                            // }}
                            navigation
                            modules={[Pagination, Navigation]}
                            style={{
                                '--swiper-pagination-color': '#fff',
                            }}
                            breakpoints={{
                                780: {
                                    slidesPerView: 2,
                                    // spaceBetween: 6,
                                },
                            }}
                        >
                            {listing.imageUrls.map((url) => (
                                <SwiperSlide key={url}>
                                    <div
                                        className="h-[270px] sm:h-[320px] lg:h-[350px] xl:h-[400px] cursor-pointer"
                                        style={{
                                            background: `url(${url}) center no-repeat`,
                                            backgroundSize: 'cover',
                                        }}
                                        onClick={() => {
                                            setToggleImage(true);
                                            scrollToElement();
                                        }}
                                    ></div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="max-w-3xl mx-auto px-3 sm:px-10 lg:px-0">
                            <p className="text-xl md:text-2xl font-bold text-slate-800 mt-3 md:mt-5">
                                {listing.year} {''}
                                {listing.make} {''}
                                {listing.model}
                            </p>
                            <p className="font-semibold text-cyan-700 text-lg sm:text-[1.3rem] mt-2 sm:mt-4">
                                &#8369;{listing.price.toLocaleString('en-US')}
                            </p>
                            <p className="flex items-center gap-1 text-slate-600 text-xs sm:text-sm mt-0 sm:mt-1">
                                <FaMapMarkerAlt className="text-green-700" />
                                {listing.address}
                            </p>
                            {currentUser &&
                                listing.userRef !== currentUser._id &&
                                !contact && (
                                    <button
                                        onClick={() => setContact(true)}
                                        className="bg-cyan-800 text-white text-sm sm:text-base font-semibold rounded-lg capitalize hover:opacity-95 px-7 py-3 sm:py-[0.65rem] mt-5 w-full"
                                    >
                                        Contact Seller
                                    </button>
                                )}
                            {!currentUser && (
                                <Link to={'/sign-up'}>
                                    <button className="bg-cyan-800 text-white text-sm sm:text-base font-semibold rounded-lg capitalize hover:opacity-95 px-7 py-3 sm:py-[0.65rem] mt-5 w-full">
                                        Contact Seller
                                    </button>
                                </Link>
                            )}
                            {contact && <Contact listing={listing} />}
                        </div>
                        {/* <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
                            <FaShare
                                className="text-slate-500"
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        window.location.href
                                    );
                                    setCopied(true);
                                    setTimeout(() => {
                                        setCopied(false);
                                    }, 2000);
                                }}
                            />
                        </div>
                        {copied && (
                            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
                                Link copied!
                            </p>
                        )} */}
                    </div>
                    <div className="w-full p-3 sm:p-0">
                        <div className="max-w-3xl mx-auto text-gray-700 px-3 sm:px-10 lg:px-0 py-3 sm:py-0 bg-white sm:bg-inherit">
                            <h1 className="font-bold text-gray-800">
                                Key Details
                            </h1>
                            <div className="flex flex-col sm:flex-row gap-0 sm:gap-16">
                                <div className="flex flex-col flex-1 gap-2 mt-4">
                                    <div className="flex justify-between items-center text-sm mt-0 sm:mt-2">
                                        <p>Price</p>
                                        <p className="font-semibold">
                                            &#8369;
                                            {listing.price.toLocaleString(
                                                'en-US'
                                            )}
                                        </p>
                                    </div>
                                    <div className="h-[1px] bg-gray-300"></div>
                                    <div className="flex justify-between items-center text-sm mt-2">
                                        <p>Make</p>
                                        <p className="font-semibold">
                                            {listing.make}
                                        </p>
                                    </div>
                                    <div className="h-[1px] bg-gray-300"></div>
                                    <div className="flex justify-between items-center text-sm mt-2">
                                        <p>Model</p>
                                        <p className="font-semibold">
                                            {listing.model}
                                        </p>
                                    </div>
                                    <div className="h-[1px] bg-gray-300"></div>
                                    <div className="flex justify-between items-center text-sm mt-2">
                                        <p>Body Type</p>
                                        <p className="font-semibold">
                                            {listing.bodyType}
                                        </p>
                                    </div>
                                    <div className="h-[1px] bg-gray-300"></div>
                                    <div className="flex justify-between items-center text-sm mt-2">
                                        <p>Engine Size</p>
                                        <p className="font-semibold">
                                            {listing.engineSize}L
                                        </p>
                                    </div>
                                    <div className="h-[1px] bg-gray-300"></div>
                                </div>
                                <div className="flex flex-col flex-1 gap-2 mt-2 sm:mt-4">
                                    <div className="flex justify-between items-center text-sm mt-2">
                                        <p>Transmission</p>
                                        <p className="font-semibold capitalize">
                                            {listing.transmission}
                                        </p>
                                    </div>
                                    <div className="h-[1px] bg-gray-300"></div>
                                    <div className="flex justify-between items-center text-sm mt-2">
                                        <p>Fuel Type</p>
                                        <p className="font-semibold capitalize">
                                            {listing.fuelType}
                                        </p>
                                    </div>
                                    <div className="h-[1px] bg-gray-300"></div>
                                    <div className="flex justify-between items-center text-sm mt-2">
                                        <p>Mileage</p>
                                        <p className="font-semibold">
                                            {listing.mileage.toLocaleString(
                                                'en-US'
                                            )}{' '}
                                            km
                                        </p>
                                    </div>
                                    <div className="h-[1px] bg-gray-300"></div>
                                    <div className="flex justify-between items-center text-sm mt-2">
                                        <p>Number of Doors</p>
                                        <p className="font-semibold">
                                            {listing.doors}
                                        </p>
                                    </div>
                                    <div className="h-[1px] bg-gray-300"></div>
                                </div>
                            </div>
                            <h1 className="font-bold mt-10 text-slate-700">
                                Description
                            </h1>
                            <p className="text-sm mt-2 whitespace-pre-wrap">
                                {listing.description}
                            </p>
                        </div>
                    </div>
                    <div
                        className={`absolute inset-0 mx-auto my-auto p-0 md:p-10 lg:p-20 2xl:p-80 z-40 ${
                            !toggleImage
                                ? 'opacity-0 pointer-events-none'
                                : 'opacity-1 pointer-events-auto'
                        }`}
                        ref={toggleImageDiv}
                    >
                        <Swiper
                            navigation
                            loop={true}
                            // style={{
                            //     '--swiper-navigation-color': '#fff',
                            //     '--swiper-pagination-color': '#fff',
                            //     '--swiper-navigation-size': '2rem',
                            // }}
                            breakpoints={{
                                320: {
                                    navigation: {
                                        enabled: false,
                                    },
                                },
                                640: {
                                    navigation: {
                                        enabled: true,
                                    },
                                },
                            }}
                        >
                            {listing.imageUrls.map((url) => (
                                <SwiperSlide key={url}>
                                    <div className="h-[100vh] md:h-[90vh] lg:h-[80vh] 2xl:h-[60vh]">
                                        <div
                                            className="h-full"
                                            style={{
                                                background: `url(${url}) center no-repeat`,
                                                backgroundSize: 'contain',
                                            }}
                                        ></div>
                                    </div>
                                    {/* <div className="flex justify-center items-center">
                                        <img
                                            src={url}
                                            alt="image"
                                            className="h-auto max-w-full"
                                        />
                                    </div> */}
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <RiCloseLine
                            onClick={() => setToggleImage(false)}
                            className="text-3xl md:text-4xl font-bold text-white absolute top-3 right-4 z-40 cursor-pointer"
                        />
                    </div>
                    <div className="hidden">
                        {toggleImage
                            ? (document.body.style.overflow = 'hidden')
                            : (document.body.style.overflow = 'visible')}
                    </div>
                    <div
                        onClick={() => setToggleImage(false)}
                        className={`fixed bg-black bg-opacity-90 z-30 top-0 left-0 right-0 bottom-0 ${
                            toggleImage
                                ? 'opacity-1 pointer-events-auto'
                                : 'opacity-0 pointer-events-none'
                        }`}
                    ></div>
                </div>
            ) : (
                <div className="flex justify-center items-center h-[80vh]">
                    {loading && (
                        <p className="text-center text-2xl font-semibold text-slate-600">
                            Loading...
                        </p>
                    )}
                    {error && (
                        <p className="text-center text-2xl font-semibold text-slate-600">
                            Something went wrong!
                        </p>
                    )}
                </div>
            )}
            <div className="max-w-4xl mx-auto p-3 sm:px-10 lg:px-0 flex flex-col gap-8 mt-10 mb-8 md:mb-12">
                {recommendedListings && recommendedListings.length > 0 && (
                    <div>
                        <div className="mt-5 mb-3">
                            <h2 className="text-xl lg:text-2xl font-semibold text-slate-800">
                                Recommended For You
                            </h2>
                        </div>
                        <ListingSlider
                            recommendedListings={recommendedListings}
                            carBodytype={listing.bodyType}
                            showMore={showMore}
                            car={'car'}
                        />
                        {/* <div className="flex flex-wrap justify-between sm:justify-normal gap-x-0 sm:gap-x-3 gap-y-7">
                            {recommendedListings.map((listing) => (
                                <Listingitem
                                    listing={listing}
                                    key={listing._id}
                                />
                            ))}
                        </div>
                        {showMore && (
                            <div className="max-w-full flex justify-center items-center mt-10">
                                <Link
                                    className="text-sm font-semibold uppercase text-cyan-800 hover:underline"
                                    to={`/search?bodyType=${listing.bodyType}`}
                                >
                                    Show more
                                </Link>
                            </div>
                        )} */}
                    </div>
                )}
            </div>
        </main>
    );
}
