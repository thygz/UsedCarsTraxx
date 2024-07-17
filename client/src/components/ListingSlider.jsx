import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, FreeMode } from 'swiper/modules';
import Listingitem from '../components/Listingitem';
import { FaArrowRight } from 'react-icons/fa6';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/bundle';

export default function ListingSlider({
    recommendedListings,
    carBodytype,
    showMore,
    car,
}) {
    return (
        <Swiper
            slidesPerView={1.25}
            spaceBetween={6}
            pagination={{
                clickable: true,
            }}
            // navigation
            breakpoints={{
                320: {
                    slidesPerView: 1.15,
                    spaceBetween: 6,
                },
                350: {
                    slidesPerView: 1.2,
                    spaceBetween: 6,
                },
                370: {
                    slidesPerView: 1.25,
                    spaceBetween: 6,
                },
                390: {
                    slidesPerView: 1.3,
                    spaceBetween: 6,
                },
                410: {
                    slidesPerView: 1.38,
                    spaceBetween: 6,
                },
                430: {
                    slidesPerView: 1.45,
                    spaceBetween: 6,
                },
                510: {
                    slidesPerView: 1.9,
                    spaceBetween: 12,
                },
                650: {
                    slidesPerView: 2.3,
                    spaceBetween: 12,
                },
                768: {
                    slidesPerView: 2.7,
                    spaceBetween: 18,
                },
                950: {
                    slidesPerView: 3,
                    spaceBetween: 18,
                },
                1280: {
                    slidesPerView: 3,
                    spaceBetween: 36,
                },
            }}
            modules={[Pagination]}
            style={{
                '--swiper-pagination-color': '#0891B2',
            }}
            className="pb-10 recommended"
        >
            {recommendedListings.map((listing) => (
                <SwiperSlide>
                    <Listingitem listing={listing} key={listing._id} />
                </SwiperSlide>
            ))}
            <SwiperSlide>
                {showMore.length < 5 ? (
                    <Link to={'/search'}>
                        <div className="bg-inherit shadow-md hover:shadow-lg rounded-lg w-[95%] flex flex-col justify-center items-center gap-5 py-[4.6rem] sm:py-[4.72rem] md:py-[4.74rem] xl:py-[5.14rem] group">
                            <div className="h-20 w-20 rounded-full bg-slate-200 group-hover:bg-cyan-600 flex justify-center items-center">
                                <FaArrowRight className="text-xl text-slate-700 group-hover:text-white" />
                            </div>
                            <p className="text-xs text-slate-900 uppercase">
                                Show more car
                            </p>
                        </div>
                    </Link>
                ) : (
                    <Link to={`/search?bodyType=${carBodytype}`}>
                        <div className="bg-inherit shadow-md hover:shadow-lg rounded-lg w-[95%] flex flex-col justify-center items-center gap-5 py-[4.6rem] sm:py-[4.72rem] md:py-[4.74rem] xl:py-[5.14rem] group">
                            <div className="h-20 w-20 rounded-full bg-slate-200 group-hover:bg-cyan-600 flex justify-center items-center">
                                <FaArrowRight className="text-xl text-slate-700 group-hover:text-white" />
                            </div>
                            <p className="text-xs text-slate-900 uppercase">
                                Show more {car}
                            </p>
                        </div>
                    </Link>
                )}
            </SwiperSlide>
        </Swiper>
    );
}
