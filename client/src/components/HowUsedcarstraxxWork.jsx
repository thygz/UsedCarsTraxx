import { MdOutlineScreenSearchDesktop } from 'react-icons/md';
import { FaRegHandPointUp } from 'react-icons/fa';
import { LuCheckSquare } from 'react-icons/lu';

export default function HowUsedcarstraxxWork() {
    return (
        <div className="max-w-full mt-20">
            <div className="max-w-6xl mx-auto pt-5 md:pt-10 pb-10">
                <h1 className="text-center mb-16 text-slate-800 text-2xl font-semibold px-3">
                    How UsedCarsTraxx Works
                </h1>
                <div className="flex flex-col md:flex-row gap-14 md:gap-5 lg:gap-10 px-16 md:px-5 lg:px-20 xl:px-28">
                    <div className="flex flex-col flex-1 gap-4 bg-slate-300 rounded-lg px-6 md:px-5 lg:px-6 py-7 md:py-5 lg:py-6">
                        <div className="flex flex-col justify-center items-center">
                            <MdOutlineScreenSearchDesktop className="text-4xl text-cyan-800" />
                            <h1 className="text-slate-950 text-lg text-center">
                                Search on any device
                            </h1>
                        </div>
                        <div>
                            <p className="text-center text-slate-800 text-sm leading-6">
                                UsedCarsTraxx works well on any device. Browse
                                them with all the sorting options you'd expect.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col flex-1 gap-4 bg-slate-300 rounded-lg px-6 md:px-5 lg:px-6 py-7 md:py-5 lg:py-6">
                        <div className="flex flex-col justify-center items-center">
                            <FaRegHandPointUp className="text-4xl text-cyan-800" />
                            <h1 className="text-slate-950 text-lg text-center">
                                Choose your car
                            </h1>
                        </div>
                        <div>
                            <p className="text-center text-slate-800 text-sm leading-6">
                                UsedCarsTraxx supports extensive search and
                                filtering. Cast your net locally or across the
                                country.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col flex-1 gap-4 bg-slate-300 rounded-lg px-6 md:px-5 lg:px-6 py-7 md:py-5 lg:py-6">
                        <div className="flex flex-col justify-center items-center">
                            <LuCheckSquare className="text-4xl text-cyan-800" />
                            <h1 className="text-slate-950 text-lg text-center">
                                Buy with confidence
                            </h1>
                        </div>
                        <div>
                            <p className="text-center text-slate-800 text-sm leading-6">
                                Contact your preferred dealer/seller to book an
                                appointment, test-drive or make a reservation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
