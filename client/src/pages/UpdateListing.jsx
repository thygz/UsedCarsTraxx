import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import { useState, useRef, useEffect } from 'react';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUpload } from 'react-icons/fa6';
import ScrollToTop from '../components/ScrollToTop';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import MoonLoader from 'react-spinners/MoonLoader';

export default function CreateListing() {
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const imageFileRef = useRef(null);
    const params = useParams();
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
        make: '',
        model: '',
        bodyType: '',
        engineSize: '',
        doors: 1,
        year: 1990,
        mileage: 1000,
        price: 10000,
        transmission: '',
        fuelType: '',
        address: '',
        description: '',
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const bodyTypeOptions = [
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
        const fetchListing = async () => {
            const listingId = params.listingId;
            const res = await fetch(`/api/listing/get/${listingId}`);
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                return;
            }
            setFormData(data);
        };

        fetchListing();

        const handleImageSubmit = (e) => {
            if (
                files.length >= 0 &&
                files.length + formData.imageUrls.length < 7
            ) {
                setUploading(true);
                setImageUploadError(false);
                const promises = [];
                for (let i = 0; i < files.length; i++) {
                    promises.push(storeImage(files[i]));
                }
                Promise.all(promises)
                    .then((urls) => {
                        setFormData({
                            ...formData,
                            imageUrls: formData.imageUrls.concat(urls),
                        });
                        setImageUploadError(false);
                        setUploading(false);
                    })
                    .catch((err) => {
                        setImageUploadError(
                            'Image upload failed (2mb max per image)'
                        );
                        setUploading(false);
                    });
            } else {
                setImageUploadError('You can only upload 6 images per listing');
                setUploading(false);
            }
        };
        handleImageSubmit();
    }, [files]);

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            resolve(downloadURL);
                        }
                    );
                }
            );
        });
    };

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
    };

    const handleChange = (e) => {
        if (
            e.target.id === 'automatic' ||
            e.target.id === 'manual' ||
            e.target.id === 'cvt' ||
            e.target.id === 'others'
        ) {
            setFormData({
                ...formData,
                transmission: e.target.id,
            });
        }

        if (e.target.id === 'diesel' || e.target.id === 'gasoline') {
            setFormData({
                ...formData,
                fuelType: e.target.id,
            });
        }

        if (
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
            setFormData({
                ...formData,
                bodyType: e.target.value,
            });
        }

        if (
            e.target.type === 'number' ||
            e.target.type === 'text' ||
            e.target.type === 'textarea'
        ) {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.imageUrls.length < 1)
                return setError('You must upload at least one image');
            setLoading(true);
            setError(false);
            const res = await fetch(`/api/listing/update/${params.listingId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id,
                }),
            });
            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                setError(data.message);
            }
            navigate(`/listing/${data._id}`);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <main className="px-3 pt-3 md:pt-10 pb-20 max-w-3xl mx-auto">
            <ScrollToTop />
            <div className="p-3 bg-inherit rounded-sm">
                <h1 className="text-2xl font-semibold text-center text-slate-800 mt-5 mb-7 md:mb-10">
                    Edit Your Car For Sale
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="flex flex-col gap-3 sm:gap-5 flex-1">
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <div className="flex flex-col flex-1">
                                <p className="text-xs font-semibold p-[0.15rem] text-gray-800">
                                    Vehicle Make
                                </p>
                                <input
                                    type="text"
                                    className="border bg-inherit border-slate-400 px-3 py-2 rounded-sm text-sm focus:outline-slate-400"
                                    id="make"
                                    maxLength="50"
                                    minLength="2"
                                    required
                                    onChange={handleChange}
                                    value={formData.make}
                                />
                            </div>
                            <div className="flex flex-col flex-1">
                                <p className="text-xs font-semibold p-[0.15rem] text-gray-800">
                                    Model
                                </p>
                                <input
                                    type="text"
                                    className="border bg-inherit border-slate-400 px-3 py-2 rounded-sm text-sm focus:outline-slate-400"
                                    id="model"
                                    maxLength="50"
                                    minLength="2"
                                    required
                                    onChange={handleChange}
                                    value={formData.model}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <div className="flex flex-col flex-1">
                                <label
                                    htmlFor="bodyType"
                                    className="text-xs font-semibold p-[0.15rem] text-gray-800"
                                >
                                    Body Type
                                </label>
                                <div className="border border-slate-400 px-2">
                                    <select
                                        type="text"
                                        // name="bodyType"
                                        className="py-2 rounded-sm text-sm focus:outline-none w-full bg-inherit"
                                        // id="bodyType"
                                        // required
                                        value={formData.bodyType}
                                        onChange={handleChange}
                                    >
                                        {bodyTypeOptions.map(
                                            (option, index) => (
                                                <option
                                                    key={index}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col flex-1">
                                <p className="text-xs font-semibold p-[0.15rem] text-gray-800">
                                    Engine Size
                                </p>
                                <input
                                    type="text"
                                    className="border bg-inherit border-slate-400 px-3 py-2 rounded-sm text-sm focus:outline-slate-400"
                                    id="engineSize"
                                    // min="0.8"
                                    // max="8.0"
                                    maxLength="5"
                                    minLength="1"
                                    required
                                    onChange={handleChange}
                                    value={formData.engineSize}
                                />
                            </div>
                            <div className="flex flex-col flex-1">
                                <p className="text-xs font-semibold p-[0.15rem] text-gray-800">
                                    Number of Doors
                                </p>
                                <input
                                    type="number"
                                    className="border bg-inherit border-slate-400 px-3 py-2 rounded-sm text-sm focus:outline-slate-400"
                                    id="doors"
                                    min="2"
                                    max="5"
                                    required
                                    onChange={handleChange}
                                    value={formData.doors}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <div className="flex flex-col flex-1">
                                <p className="text-xs font-semibold p-[0.15rem] text-gray-800">
                                    Year
                                </p>
                                <input
                                    type="number"
                                    className="border bg-inherit border-slate-400 px-3 py-2 rounded-sm text-sm focus:outline-slate-400"
                                    id="year"
                                    min="1900"
                                    max="3000"
                                    required
                                    onChange={handleChange}
                                    value={formData.year}
                                />
                            </div>
                            <div className="flex flex-col flex-1">
                                <p className="text-xs font-semibold p-[0.15rem] text-gray-800">
                                    Mileage
                                </p>
                                <input
                                    type="number"
                                    className="border bg-inherit border-slate-400 px-3 py-2 rounded-sm text-sm focus:outline-slate-400"
                                    id="mileage"
                                    min="500"
                                    max="500000"
                                    required
                                    onChange={handleChange}
                                    value={formData.mileage}
                                />
                            </div>
                            <div className="flex flex-col flex-1">
                                <p className="text-xs font-semibold p-[0.15rem] text-gray-800">
                                    Price
                                </p>
                                <input
                                    type="number"
                                    className="border bg-inherit border-slate-400 px-3 py-2 rounded-sm text-sm focus:outline-slate-400"
                                    id="price"
                                    min="10000"
                                    max="5000000"
                                    required
                                    onChange={handleChange}
                                    value={formData.price}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row gap-0 sm:gap-20">
                            <div className="flex flex-col flex-1 gap-2 mt-2 sm:mt-0">
                                <p className="text-xs font-semibold p-[0.15rem] text-gray-800">
                                    Transmission
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between flex-wrap">
                                    <div className="flex gap-1">
                                        <input
                                            type="checkbox"
                                            id="automatic"
                                            className="w-5"
                                            onChange={handleChange}
                                            checked={
                                                formData.transmission ===
                                                'automatic'
                                            }
                                        />
                                        <span className="flex justify-center items-center text-xs">
                                            Automatic
                                        </span>
                                    </div>
                                    <div className="flex gap-1">
                                        <input
                                            type="checkbox"
                                            id="manual"
                                            className="w-5"
                                            onChange={handleChange}
                                            checked={
                                                formData.transmission ===
                                                'manual'
                                            }
                                        />
                                        <span className="flex justify-center items-center text-xs">
                                            Manual
                                        </span>
                                    </div>
                                    <div className="flex gap-1">
                                        <input
                                            type="checkbox"
                                            id="cvt"
                                            className="w-5"
                                            onChange={handleChange}
                                            checked={
                                                formData.transmission === 'cvt'
                                            }
                                        />
                                        <span className="flex justify-center items-center text-xs">
                                            CVT
                                        </span>
                                    </div>
                                    <div className="flex gap-1">
                                        <input
                                            type="checkbox"
                                            id="others"
                                            className="w-5"
                                            onChange={handleChange}
                                            checked={
                                                formData.transmission ===
                                                'others'
                                            }
                                        />
                                        <span className="flex justify-center items-center text-xs">
                                            Others
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col flex-1 gap-2 mt-2 sm:mt-0">
                                <p className="text-xs font-semibold p-[0.15rem] text-gray-800">
                                    Fuel Type
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-16 flex-wrap">
                                    <div className="flex gap-1">
                                        <input
                                            type="checkbox"
                                            id="diesel"
                                            className="w-5"
                                            onChange={handleChange}
                                            checked={
                                                formData.fuelType === 'diesel'
                                            }
                                        />
                                        <span className="flex justify-center items-center text-xs">
                                            Diesel
                                        </span>
                                    </div>
                                    <div className="flex gap-1">
                                        <input
                                            type="checkbox"
                                            id="gasoline"
                                            className="w-5"
                                            onChange={handleChange}
                                            checked={
                                                formData.fuelType === 'gasoline'
                                            }
                                        />
                                        <span className="flex justify-center items-center text-xs">
                                            Gasoline
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col flex-1 mt-2 sm:mt-0">
                            <p className="text-xs font-semibold p-[0.15rem] text-gray-800">
                                Address
                            </p>
                            <input
                                type="text"
                                // placeholder="Address"
                                className="border bg-inherit border-slate-400 px-3 py-2 rounded-sm text-sm focus:outline-slate-400"
                                id="address"
                                required
                                onChange={handleChange}
                                value={formData.address}
                            />
                        </div>
                        <div className="flex flex-col flex-1">
                            <p className="text-xs font-semibold p-[0.15rem] text-gray-800">
                                Description
                            </p>
                            <textarea
                                type="text"
                                // placeholder="Description"
                                className="border bg-inherit border-slate-400 p-3 rounded-sm text-sm focus:outline-slate-400"
                                id="description"
                                required
                                onChange={handleChange}
                                value={formData.description}
                            />
                        </div>
                        <div className="flex flex-col flex-1 gap-4 mt-3">
                            <div>
                                <p className="text-xs font-semibold p-[0.15rem] text-gray-800">
                                    Upload Image of Your Car
                                </p>
                                <p className="font-normal text-xs p-[0.15rem] text-gray-600">
                                    Note: The first image will be the cover
                                    (maximum of 6 images)
                                </p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <input
                                    onChange={(e) => setFiles(e.target.files)}
                                    className="p-3 border border-gray-300 text-xs rounded-sm w-full cursor-pointer"
                                    type="file"
                                    id="images"
                                    accept="image/*"
                                    multiple
                                    hidden
                                    ref={imageFileRef}
                                />
                                {uploading ? (
                                    <div className="flex flex-col justify-center items-center gap-1 border border-slate-500 border-dashed cursor-pointer p-3 text-gray-700 hover:text-cyan-600 font-medium">
                                        <MoonLoader size={20} color="#155f75" />
                                        <p className="text-xs">
                                            Uploading images
                                        </p>
                                    </div>
                                ) : (
                                    <div
                                        onClick={() =>
                                            imageFileRef.current.click()
                                        }
                                        className="flex flex-col justify-center items-center gap-1 border border-slate-500 border-dashed cursor-pointer p-3 text-gray-700 hover:text-cyan-600 font-medium"
                                    >
                                        <AiOutlineCloudUpload className="text-2xl" />
                                        <p className="text-xs">Upload images</p>
                                    </div>
                                )}
                            </div>
                            <p className="text-red-700 text-sm">
                                {imageUploadError && imageUploadError}
                            </p>
                            {formData.imageUrls.length > 0 &&
                                formData.imageUrls.map((url, index) => (
                                    <div
                                        key={url}
                                        className="flex justify-between p-3 border items-center"
                                    >
                                        <img
                                            src={url}
                                            alt="listing image"
                                            className="w-20 h-20 object-contain rouded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveImage(index)
                                            }
                                            className="p-1 text-slate-700 rounded-lg text-xl hover:bg-gray-100"
                                        >
                                            <IoMdClose />
                                        </button>
                                    </div>
                                ))}
                            <button
                                disabled={loading || uploading}
                                className="bg-cyan-700 text-white p-2 my-3 rounded-sm font-semibold hover:opacity-95 disabled:opacity-80"
                            >
                                {loading ? 'Updating...' : 'Update'}
                            </button>
                            {error && (
                                <p className="text-red-700 text-sm">{error}</p>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}
