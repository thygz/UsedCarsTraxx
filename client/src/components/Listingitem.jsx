import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function Listingitem({ listing }) {
    return (
        <div className="bg-inherit shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-[260px] sm:w-[250px] lg:w-[240px] xl:w-[270px] h-auto">
            <Link to={`/listing/${listing._id}`}>
                <div className="p-[0.6rem]">
                    <div className="h-[155px] sm:h-[145px] overflow-hidden rounded-lg">
                        <img
                            src={
                                listing.imageUrls[0] ||
                                'https://hooquest.com/wp-content/uploads/2021/11/facebook-cover-8.jpg'
                            }
                            alt="listing cover"
                            className="h-[155px] sm:h-[145px] w-full object-cover hover:scale-105 transition-scale duration-300"
                        />
                    </div>
                </div>
                <div className="px-2 md:px-3 pt-1 pb-4 flex flex-col justify-center items-center gap-5 md:gap-6 xl:gap-7">
                    <div className="text-sm xl:text-base font-semibold text-slate-900 text-center truncate">
                        {listing.year} {''}
                        {listing.make} {''}
                        {listing.model}
                    </div>
                    <div className="flex flex-col justify-center items-center gap-1">
                        <div className="flex justify-between items-center text-[0.65rem] xl:text-xs font-normal capitalize text-slate-700 gap-2 md:gap-3 truncate">
                            <p>{listing.mileage.toLocaleString('en-US')} Km</p>
                            <p>{listing.fuelType}</p>
                            <p>
                                {listing.engineSize} {listing.transmission}
                            </p>
                        </div>
                        <p className="text-sm xl:text-base text-slate-700 font-semibold">
                            &#8369;
                            {listing.price.toLocaleString('en-US')}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
}
