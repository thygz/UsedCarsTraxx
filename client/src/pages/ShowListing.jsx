import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdOutlineEdit } from 'react-icons/md';
import ScrollToTop from '../components/ScrollToTop';
import { toast } from 'react-toastify';

export default function ShowListing() {
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const [showListingsError, setShowListingsError] = useState(false);
    const [listingLoading, setListingLoading] = useState(false);
    const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [deleteMake, setDeleteMake] = useState('');
    const [deleteModel, setDeleteModel] = useState('');
    const [userListings, setUserListings] = useState([]);

    useEffect(() => {
        const handleShowListings = async () => {
            try {
                setShowListingsError(false);
                setListingLoading(true);
                const res = await fetch(
                    `/api/user/listings/${currentUser._id}`
                );
                const data = await res.json();
                if (data.success === false) {
                    setShowListingsError(true);
                    return;
                }
                setUserListings(data);
                setListingLoading(false);
            } catch (error) {
                setShowListingsError(true);
                setListingLoading(false);
            }
        };
        handleShowListings();
    }, [currentUser._id]);

    const handleDeleteListing = async (listingId) => {
        try {
            const res = await fetch(`/api/listing/delete/${listingId}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                return;
            }

            setUserListings((prev) =>
                prev.filter((listing) => listing._id !== listingId)
            );
            toast.info('Vehicle unsaved', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
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

    const handleOpenDeleteModal = (listingId, make, model) => {
        setDeleteId(listingId);
        setDeleteMake(make);
        setDeleteModel(model);
        setToggleDeleteModal(true);
    };

    return (
        <div className="px-3 pt-10 pb-20 max-w-3xl mx-auto min-h-[75vh]">
            <ScrollToTop />
            <div className="p-3 bg-inherit rounded-sm">
                {userListings && userListings.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        <h1 className="text-2xl font-semibold text-slate-800 text-center mt-5 mb-7">
                            My Vehicles for Sale
                        </h1>
                        {userListings.map((listing) => (
                            <div
                                key={listing._id}
                                className="border-2 rounded-lg py-2 px-3 flex justify-between items-center gap-4"
                            >
                                <Link to={`/listing/${listing._id}`}>
                                    <img
                                        src={listing.imageUrls[0]}
                                        alt="listing image"
                                        className="h-24 w-24 object-contain"
                                    />
                                </Link>
                                <Link
                                    className="text-slate-700 font-semibold text-sm hover:underline truncate flex-1"
                                    to={`/listing/${listing._id}`}
                                >
                                    <p>
                                        {listing.year} {''}
                                        {listing.make} {''}
                                        {listing.model}
                                    </p>
                                </Link>
                                <div className="flex gap-3 items-center">
                                    <button
                                        onClick={() =>
                                            handleOpenDeleteModal(
                                                listing._id,
                                                listing.make,
                                                listing.model
                                            )
                                        }
                                        className="text-lg bg-slate-200 p-1 hover:bg-slate-300 duration-300 rounded-sm"
                                    >
                                        <RiDeleteBin6Line />
                                    </button>
                                    <Link to={`/update-listing/${listing._id}`}>
                                        <button className="text-lg bg-slate-200 p-1 hover:bg-slate-300 duration-300 rounded-sm">
                                            <MdOutlineEdit />
                                        </button>
                                    </Link>
                                </div>
                                <div
                                    className={`fixed flex flex-col justify-center items-center gap-5 inset-0 w-80 sm:w-96 h-32 rounded-lg mx-auto my-auto bg-slate-50 p-3 sm:p-5 z-50 ${
                                        toggleDeleteModal ? 'block' : 'hidden'
                                    }`}
                                >
                                    <p className="text-center text-sm text-slate-800 font-semibold">
                                        Are you sure you want to delete{' '}
                                        {deleteMake} {deleteModel}?
                                    </p>
                                    <div className="flex gap-5">
                                        <button
                                            className="text-white text-sm bg-red-600 w-24 h-8 rounded-md hover:bg-opacity-90 font-medium"
                                            onClick={() => {
                                                handleDeleteListing(deleteId);
                                                setToggleDeleteModal(false);
                                            }}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="text-sm bg-white w-24 h-8 rounded-md shadow-sm font-medium"
                                            onClick={() =>
                                                setToggleDeleteModal(false)
                                            }
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-[60vh]">
                        {showListingsError && (
                            <p className="text-xl font-semibold text-red-700">
                                Error showing the listings
                            </p>
                        )}
                        {listingLoading ? (
                            <p className="text-center text-2xl font-semibold text-slate-600">
                                Loading...
                            </p>
                        ) : (
                            <p className="text-xl font-semibold text-slate-600">
                                You have no listing yet.
                            </p>
                        )}
                    </div>
                )}
                <div className="hidden">
                    {toggleDeleteModal
                        ? (document.body.style.overflow = 'hidden')
                        : (document.body.style.overflow = 'auto')}
                </div>
                <div
                    onClick={() => setToggleDeleteModal(false)}
                    className={`fixed bg-black bg-opacity-70 z-40 top-0 left-0 right-0 bottom-0 ${
                        toggleDeleteModal
                            ? 'opacity-1 pointer-events-auto'
                            : 'opacity-0 pointer-events-none'
                    }`}
                ></div>
            </div>
        </div>
    );
}
