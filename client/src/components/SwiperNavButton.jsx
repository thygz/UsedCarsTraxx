import { useSwiper } from 'swiper/react';
import { GiCityCar } from 'react-icons/gi';

export default function SwiperNavButton() {
    const swiper = useSwiper();

    return (
        <div className="lg:flex gap-1 my-2 justify-end hidden">
            <button
                onClick={() => swiper.slidePrev()}
                className="bg-slate-50 h-9 w-9 rounded-full flex justify-center items-center shadow-md hover:bg-cyan-500 transition-all group"
            >
                <GiCityCar className="text-xl -scale-x-100 text-slate-500 group-hover:text-white transition-all" />
            </button>
            <button
                onClick={() => swiper.slideNext()}
                className="bg-slate-50 h-19 w-9 rounded-full flex justify-center items-center shadow-md hover:bg-cyan-500 transition-all group"
            >
                <GiCityCar className="text-xl text-slate-500 group-hover:text-white transition-all" />
            </button>
        </div>
    );
}
