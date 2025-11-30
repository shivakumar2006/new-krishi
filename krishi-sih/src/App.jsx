// /src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SmartFarming from './pages/SmartFarming';
import FarmingSupport from './pages/FarmingSupport';
import FoodSupplyChain from './pages/FoodSupplyChain';
import Store from './pages/Store';
import Blog from './pages/Blog';
import Signup from './Register/Signup';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import Login from './Register/Login';
import BookingPage from './pages/Booking';
import PricingSystem from './pages/PricingSystem';
import UserStore from './pages/UserStore';
import Profile from './pages/Profile';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/smart-farming" element={<SmartFarming />} />
        <Route path="/farming-support" element={<FarmingSupport />} />
        <Route path="/food-supply" element={<FoodSupplyChain />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/store" element={<Store />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pricing-system" element={<PricingSystem />} />
        <Route path='/farmer-user' element={<UserStore />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <Footer />
    </>
  );
}
