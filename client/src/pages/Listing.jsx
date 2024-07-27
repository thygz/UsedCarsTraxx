import { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { useSelector, useDispatch } from 'react-redux';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Contact from '../components/Contact';
import { RiCloseLine } from 'react-icons/ri';
import ScrollToTop from '../components/ScrollToTop';
import Listingitem from '../components/Listingitem';
import ListingsSlider from '../components/ListingsSlider';
import { GiRaceCar } from 'react-icons/gi';
import { toast } from 'react-toastify';
import { IoMdHeart } from 'react-icons/io';
import { IoMdHeartDislike } from 'react-icons/io';
import MoonLoader from 'react-spinners/MoonLoader';

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
    const [favoriteListing, setFavoriteListing] = useState(null);
    const [toggleSave, setToggleSave] = useState(true);
    const [showFavoriteCarList, setShowFavoriteCarList] = useState(null);
    const [formData, setFormData] = useState({});
    const params = useParams();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const toggleImageDiv = useRef(null);
    SwiperCore.use([Navigation]);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/listing/get/${params.listingId}`);
                const data = await res.json();
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
                fetchFavorites();
            } catch (error) {
                console.log(error);
            }
        };

        const fetchFavorites = async () => {
            try {
                const res = await fetch(
                    `/api/user/getFavoriteCar/${currentUser._id}`
                );
                const data = await res.json();
                const favoriteCar = data[0].favorites;
                setFavoriteListing(favoriteCar);
                if (data.success === false) {
                    setError(true);
                    return;
                }
            } catch (error) {
                setError(true);
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

    const addToFavoriteHandler = async () => {
        try {
            const res = await fetch(`/api/user/favorites/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // ...formData,
                    favorites: listing,
                }),
            });
            const data = await res.json();
            setShowFavoriteCarList(data);
            toast(toastAddFavorites(), {
                position: 'bottom-center',
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDeleteFavorite = async (listingId) => {
        try {
            const res = await fetch(
                `/api/user/deleteFavoriteCar/${listingId}`,
                {
                    method: 'POST',
                }
            );
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                return;
            }
            setFavoriteListing((prev) =>
                prev.filter((listing) => listing._id !== listingId)
            );
            toast(toastRemoveFavorites(), {
                position: 'bottom-center',
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    const toggleFavorite = () => {
        setToggleSave(!toggleSave);
    };

    const toastAddFavorites = () => (
        <div className="flex justify-between items-center">
            <div className="flex justify-center items-center gap-1">
                <IoMdHeart className="text-slate-900 text-2xl" />
                <p className="text-slate-900">Favorite saved</p>
            </div>
            <button
                onClick={() => navigate('/favorites')}
                className="text-cyan-700"
            >
                View Favorites
            </button>
        </div>
    );

    const toastRemoveFavorites = () => (
        <div className="flex justify-between items-center">
            <div className="flex justify-center items-center gap-1">
                <IoMdHeartDislike className="text-slate-900 -scale-x-100 text-2xl" />
                <p className="text-slate-900">Favorite unsaved</p>
            </div>
            <button
                onClick={() => navigate('/favorites')}
                className="text-cyan-700"
            >
                View Favorites
            </button>
        </div>
    );

    return (
        <main className="">
            <ScrollToTop />
            {listing && !loading ? (
                <div className="flex flex-col max-w-full mx-auto gap-7 sm:gap-14 lg:gap-16 rounded-sm">
                    <div className="w-full">
                        <Swiper
                            slidesPerView={1}
                            // loop={true}
                            pagination={{
                                clickable: true,
                            }}
                            navigation
                            modules={[Pagination, Navigation]}
                            style={{
                                '--swiper-pagination-color': '#fff',
                            }}
                            breakpoints={{
                                780: {
                                    slidesPerView: 2,
                                },
                            }}
                            className="listing-image"
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
                        <div className="max-w-3xl mx-auto px-5 sm:px-10 lg:px-0">
                            <p className="text-xl md:text-2xl font-bold text-slate-800 mt-3 md:mt-5">
                                {listing.year} {''}
                                {listing.make} {''}
                                {listing.model}
                            </p>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="font-semibold text-cyan-700 text-lg sm:text-[1.3rem] mt-2 sm:mt-4">
                                        &#8369;
                                        {listing.price.toLocaleString('en-US')}
                                    </p>
                                    <p className="flex items-center gap-1 text-slate-600 text-xs sm:text-sm mt-0 sm:mt-1">
                                        <FaMapMarkerAlt className="text-green-700" />
                                        {listing.address}
                                    </p>
                                </div>
                                {favoriteListing && (
                                    <div>
                                        {currentUser &&
                                            listing.userRef !==
                                                currentUser._id && (
                                                <div>
                                                    {favoriteListing.find(
                                                        (item) =>
                                                            item._id ===
                                                            listing._id
                                                    ) ? (
                                                        <div>
                                                            {toggleSave ? (
                                                                <button
                                                                    onClick={() => {
                                                                        handleDeleteFavorite(
                                                                            listing._id
                                                                        );
                                                                    }}
                                                                    className="flex flex-col gap-1 justify-center items-center mr-3 cursor-pointer"
                                                                >
                                                                    <GiRaceCar className="h-9 sm:h-10 w-9 sm:w-10 rounded-full flex flex-col justify-center items-center p-1 text-white bg-cyan-500" />
                                                                    <p className="text-slate-700 font-bold text-xs sm:text-sm">
                                                                        Saved
                                                                    </p>
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => {
                                                                        addToFavoriteHandler();
                                                                    }}
                                                                    className="flex flex-col gap-1 justify-center items-center mr-3 cursor-pointer group"
                                                                >
                                                                    <GiRaceCar className="h-9 sm:h-10 w-9 sm:w-10 rounded-full bg-gray-300 flex flex-col justify-center items-center p-1 group-hover:text-white group-hover:bg-cyan-500" />
                                                                    <p className="text-slate-700 font-semibold text-xs sm:text-sm">
                                                                        Save
                                                                    </p>
                                                                </button>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            {toggleSave ? (
                                                                <button
                                                                    onClick={() => {
                                                                        addToFavoriteHandler();
                                                                        toggleFavorite();
                                                                    }}
                                                                    className="flex flex-col gap-1 justify-center items-center mr-3 cursor-pointer group"
                                                                >
                                                                    <GiRaceCar className="h-9 sm:h-10 w-9 sm:w-10 rounded-full bg-gray-300 flex flex-col justify-center items-center p-1 group-hover:text-white group-hover:bg-cyan-500" />
                                                                    <p className="text-slate-700 font-semibold text-xs sm:text-sm">
                                                                        Save
                                                                    </p>
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => {
                                                                        handleDeleteFavorite(
                                                                            listing._id
                                                                        );
                                                                        toggleFavorite();
                                                                    }}
                                                                    className="flex flex-col gap-1 justify-center items-center mr-3 cursor-pointer"
                                                                >
                                                                    <GiRaceCar className="h-9 sm:h-10 w-9 sm:w-10 rounded-full flex flex-col justify-center items-center p-1 text-white bg-cyan-500" />
                                                                    <p className="text-slate-700 font-bold text-xs sm:text-sm">
                                                                        Saved
                                                                    </p>
                                                                </button>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                    </div>
                                )}
                                {!currentUser && (
                                    <Link
                                        to={'/sign-in'}
                                        className="flex flex-col gap-1 justify-center items-center mr-3 cursor-pointer group"
                                    >
                                        <GiRaceCar className="h-9 sm:h-10 w-9 sm:w-10 rounded-full bg-gray-300 flex flex-col justify-center items-center p-1 group-hover:text-white group-hover:bg-cyan-500" />
                                        <p className="text-slate-700 font-semibold text-xs sm:text-sm">
                                            Save
                                        </p>
                                    </Link>
                                )}
                            </div>
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
                                <Link to={'/sign-in'}>
                                    <button className="bg-cyan-800 text-white text-sm sm:text-base font-semibold rounded-lg capitalize hover:opacity-95 px-7 py-3 sm:py-[0.65rem] mt-5 w-full">
                                        Contact Seller
                                    </button>
                                </Link>
                            )}
                            {contact && <Contact listing={listing} />}
                        </div>
                    </div>
                    <div className="w-full p-3 sm:p-0">
                        <div className="max-w-3xl mx-auto text-slate-700 px-3 sm:px-10 lg:px-0 py-3 sm:py-0 bg-inherit sm:bg-inherit">
                            <h1 className="font-bold text-gray-800">
                                Key Details
                            </h1>
                            <div className="flex flex-col sm:flex-row gap-0 sm:gap-16">
                                <div className="flex flex-col flex-1 gap-2 mt-4">
                                    <div className="flex justify-between items-center text-sm mt-0 sm:mt-2">
                                        <p className="font-medium">Price</p>
                                        <p className="font-bold">
                                            &#8369;
                                            {listing.price.toLocaleString(
                                                'en-US'
                                            )}
                                        </p>
                                    </div>
                                    <div className="h-[1px] bg-gray-300"></div>
                                    <div className="flex justify-between items-center text-sm mt-2">
                                        <p className="font-medium">Make</p>
                                        <p className="font-bold">
                                            {listing.make}
                                        </p>
                                    </div>
                                    <div className="h-[1px] bg-gray-300"></div>
                                    <div className="flex justify-between items-center text-sm mt-2">
                                        <p className="font-medium">Model</p>
                                        <p className="font-bold">
                                            {listing.model}
                                        </p>
                                    </div>
                                    <div className="h-[1px] bg-gray-300"></div>
                                    <div className="flex justify-between items-center text-sm mt-2">
                                        <p className="font-medium">Body Type</p>
                                        <p className="font-bold">
                                            {listing.bodyType}
                                        </p>
                                    </div>
                                    <div className="h-[1px] bg-gray-300"></div>
                                    <div className="flex justify-between items-center text-sm mt-2">
                                        <p className="font-medium">
                                            Engine Size
                                        </p>
                                        <p className="font-bold">
                                            {listing.engineSize}L
                                        </p>
                                    </div>
                                    <div className="h-[1px] bg-gray-300"></div>
                                </div>
                                <div className="flex flex-col flex-1 gap-2 mt-2 sm:mt-4">
                                    <div className="flex justify-between items-center text-sm mt-2">
                                        <p className="font-medium">
                                            Transmission
                                        </p>
                                        <p className="font-bold capitalize">
                                            {listing.transmission}
                                        </p>
                                    </div>
                                    <div className="h-[1px] bg-gray-300"></div>
                                    <div className="flex justify-between items-center text-sm mt-2">
                                        <p className="font-medium">Fuel Type</p>
                                        <p className="font-bold capitalize">
                                            {listing.fuelType}
                                        </p>
                                    </div>
                                    <div className="h-[1px] bg-gray-300"></div>
                                    <div className="flex justify-between items-center text-sm mt-2">
                                        <p className="font-medium">Mileage</p>
                                        <p className="font-bold">
                                            {listing.mileage.toLocaleString(
                                                'en-US'
                                            )}{' '}
                                            km
                                        </p>
                                    </div>
                                    <div className="h-[1px] bg-gray-300"></div>
                                    <div className="flex justify-between items-center text-sm mt-2">
                                        <p className="font-medium">
                                            Number of Doors
                                        </p>
                                        <p className="font-bold">
                                            {listing.doors}
                                        </p>
                                    </div>
                                    <div className="h-[1px] bg-gray-300"></div>
                                </div>
                            </div>
                            <h1 className="font-bold mt-10 text-gray-800">
                                Description
                            </h1>
                            <p className="text-sm mt-2 whitespace-pre-wrap font-medium">
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
                            // loop={true}
                            slidesPerView={1}
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
                        className={`fixed bg-black z-30 top-0 left-0 right-0 bottom-0 ${
                            toggleImage
                                ? 'opacity-1 pointer-events-auto'
                                : 'opacity-0 pointer-events-none'
                        }`}
                    ></div>
                </div>
            ) : (
                <div className="flex justify-center items-center h-[80vh]">
                    {loading && (
                        <div className="flex flex-col justify-center items-center gap-2">
                            <MoonLoader size={25} color="#155f75" />
                            <p className="text-center text-2xl font-semibold text-slate-600">
                                Loading
                            </p>
                        </div>
                    )}
                    {error && (
                        <p className="text-center text-2xl font-semibold text-slate-600">
                            Something went wrong!
                        </p>
                    )}
                </div>
            )}
            <div className="max-w-3xl xl:max-w-4xl mx-auto px-5 py-3 sm:px-10 lg:px-0 flex flex-col gap-8 my-10 md:mt-24 md:mb-16">
                {recommendedListings && recommendedListings.length > 0 && (
                    <div>
                        <div className="mt-5 mb-3">
                            <h2 className="text-xl lg:text-2xl font-semibold text-slate-800">
                                Recommended For You
                            </h2>
                        </div>
                        <ListingsSlider
                            recommendedListings={recommendedListings}
                            carBodytype={listing.bodyType}
                            showMore={listing.bodyType}
                        />
                    </div>
                )}
            </div>
        </main>
    );
}
