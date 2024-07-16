import { useEffect, useState } from 'react';
import ScrollToTop from '../components/ScrollToTop';
import { GiRaceCar } from 'react-icons/gi';
import { useSelector, useDispatch } from 'react-redux';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link, useParams } from 'react-router-dom';

export default function Favorites() {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [favoriteListing, setFavoriteListing] = useState(null);
    const { currentUser } = useSelector((state) => state.user);
    const params = useParams();

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `/api/user/getFavoriteCar/${currentUser._id}`
                );
                const data = await res.json();
                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                const favoriteCar = data[0].favorites;
                setFavoriteListing(favoriteCar);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [currentUser._id]);

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
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="px-3 pt-10 pb-14 max-w-3xl mx-auto min-h-[75vh]">
            <ScrollToTop />
            <div className="p-3 bg-inherit">
                {!loading && favoriteListing && favoriteListing.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-center items-center">
                            <GiRaceCar className="text-center text-5xl text-slate-800" />
                        </div>
                        <h1 className="text-2xl font-semibold text-slate-800 text-center mt-[-2rem] mb-7">
                            My Favorites
                        </h1>
                        {favoriteListing.map((item) => (
                            <div
                                key={item._id}
                                className="border-2 rounded-lg py-2 px-3 flex justify-between items-center gap-4"
                            >
                                <Link to={`/listing/${item._id}`}>
                                    <img
                                        src={item.imageUrls[0]}
                                        alt="favorite image"
                                        className="h-24 w-24 object-contain"
                                    />
                                </Link>
                                <Link
                                    className="text-slate-700 font-semibold text-sm truncate flex-1"
                                    to={`/listing/${item._id}`}
                                >
                                    <p>
                                        {item.year} {''}
                                        {item.make} {''}
                                        {item.model}
                                    </p>
                                    <div>
                                        <p className="font-semibold text-cyan-700 text-md mt-3">
                                            &#8369;
                                            {item.price.toLocaleString('en-US')}
                                        </p>
                                        <p className="flex items-center gap-1 text-slate-500 text-xs">
                                            <FaMapMarkerAlt className="text-green-700" />
                                            {item.address}
                                        </p>
                                    </div>
                                </Link>
                                <button
                                    onClick={() =>
                                        handleDeleteFavorite(item._id)
                                    }
                                    className="text-lg bg-slate-200 p-1 hover:bg-slate-300 duration-300 rounded-sm"
                                >
                                    <RiDeleteBin6Line />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-[60vh]">
                        {loading ? (
                            <p className="text-center text-2xl font-semibold text-slate-600">
                                Loading...
                            </p>
                        ) : (
                            <p className="text-xl font-semibold text-slate-600">
                                You have no favorite listing yet.
                            </p>
                        )}
                        {error && (
                            <p className="text-center text-2xl font-semibold text-slate-600">
                                Something went wrong!
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
