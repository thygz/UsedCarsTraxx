import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';
import ShowListing from './pages/ShowListing';
import Footer from './components/Footer';
import Favorites from './pages/Favorites';
import Listings from './pages/Listings';

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/sign-in" element={<SignIn />}></Route>
                <Route path="/sign-up" element={<SignUp />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/search" element={<Search />}></Route>
                <Route path="/listing/:listingId" element={<Listing />}></Route>
                <Route
                    path="/listings/:listingId"
                    element={<Listings />}
                ></Route>
                <Route element={<PrivateRoute />}>
                    <Route path="/favorites" element={<Favorites />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                    <Route
                        path="/create-listing"
                        element={<CreateListing />}
                    ></Route>
                    <Route
                        path="/update-listing/:listingId"
                        element={<UpdateListing />}
                    ></Route>
                    <Route
                        path="/show-listing"
                        element={<ShowListing />}
                    ></Route>
                </Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
