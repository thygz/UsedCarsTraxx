import ScrollToTop from '../components/ScrollToTop';
import { Link } from 'react-router-dom';

export default function About() {
    return (
        <div className="pt-10 sm:pt-14 pb-20 px-4 max-w-3xl mx-auto">
            <ScrollToTop />
            <h1 className="text-3xl font-bold mb-8 text-slate-800 capitalize text-center">
                About Us
            </h1>
            <p className="mb-8 text-slate-700 text-justify">
                We created the UsedCarsTraxx used car search engine to save you
                time, effort and guesswork by gathering results from searching
                through thousands of listings on many different car. Nowhere
                else will you find more listings in one place, and UsedCarsTraxx
                makes it easy so you can spend less time looking for your ideal
                car and more time driving it.
            </p>
            <p className="text-cyan-800 text-center text-lg mb-10">
                "It's our mission to provide all the informative tools you need
                to find that ideal vehicle while making the experience easy and
                enjoyable.""
            </p>
            <h1 className="text-3xl font-bold mb-8 text-slate-800 capitalize text-center">
                What car should you buy?
            </h1>
            <p className="mb-8 text-slate-700 text-justify">
                This guide will outline a very simple process by which you can
                narrow down your selection to a few models that will best fit
                you and your lifestyle. You’ll also get some resources that
                could help you save thousands during the car buying process.
                With so many different makes and models out there, trying to
                figure out which car you want to buy can be overwhelming.
            </p>
            <h1 className="text-2xl font-bold text-slate-800 capitalize mb-2">
                Figure out what you need
            </h1>
            <p className="mb-4 text-slate-700 text-justify">
                The biggest consideration you’ll have is what your budget is
                going to be. It’s best to figure out how much you can
                comfortably spend without having to borrow money. A car’s value
                typically decreases 15-20% in the first year, and 10% per year
                for the following four years. Borrowing money and taking on
                payments to buy something that’s going to drastically decrease
                in value over time is usually not a good plan. By buying within
                your budget, you can save yourself from making payments and put
                that money in the bank instead.
            </p>
            <p className="mb-8 text-slate-700 text-justify">
                Before you start looking at cars, take the time to think about
                what your needs and priorities for your car are. You may already
                have an idea of what you want, but if you start by figuring out
                what you need, you’re going to end up with a car that better
                suits your lifestyle. Do you need space for groceries or a child
                car seat? Do you prioritize MPG over power or vice versa? Are
                you more interested in style or convenience? Taking time to
                consider your needs before you start looking at specific cars
                will give you an idea of where to start and will keep you from
                buying a sweet ride that turns into a headache when you take it
                home.
            </p>
            <h1 className="text-2xl font-bold text-slate-800 capitalize mb-2">
                Get an idea of what you want
            </h1>
            <p className="mb-4 text-slate-700 text-justify">
                Once you’ve got an idea of your budget and what you need in a
                car, you could go check out some models in person at your local
                dealerships. Even if they don’t have the exact model year you’re
                interested in, a slightly newer or older version of the same
                model – even a brand new one if they don’t have a used model –
                should still give you a decent idea of what that car would be
                like to own. Models rarely change drastically year-to-year so
                there’s a good chance that a car that’s only a few years old
                (and a few thousand dollars cheaper) will be very similar to the
                ones you see at the new car lot. If you’ve got little to no idea
                of what sort of vehicle you’re looking for, going to a
                dealership gives you a great opportunity to see a wide range of
                comparable vehicles first hand, which should help narrow down
                what you’re looking for. Theory is great, but often just seeing
                a car in person or sitting in the driver’s seat will help you
                move it up, down, or entirely off your list.
            </p>
            <p className="mb-10 text-slate-700 text-justify">
                At this point, you’re really just trying to get an idea of
                what’s available. Look around, even hop in the driver’s seat of
                a few cars and see how things feel, but no need to start taking
                test drives. It’s really a waste of time to start driving cars
                before you’ve narrowed it down to a few models and a year range
                you’re really interested in anyway. Plus, it’s respectful to the
                sellers not to take up their time and put miles on their
                vehicles before you’re a bit more serious. Feel free to ask them
                questions and such though; just be open about the fact that
                you’re only narrowing things down at this point and have no
                intention of buying immediately. Most good dealers will still be
                happy to help.
            </p>
            <div className="flex flex-col justify-center items-center px-10 py-6 bg-slate-200">
                <h1 className="text-center mb-5 text-slate-800 text-xl font-semibold">
                    Get the best and latest used car deals
                </h1>
                <Link
                    to={'/search'}
                    className="flex flex-1 justify-center items-center"
                >
                    <button className="flex justify-center items-center bg-cyan-800 w-52 py-3 text-white text-sm sm:text-base rounded-md font-semibold hover:opacity-90">
                        Check all cars
                    </button>
                </Link>
            </div>
        </div>
    );
}
