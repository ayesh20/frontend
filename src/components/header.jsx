import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { BiCart } from 'react-icons/bi';
import logo from '../assets/images/logo2.jpg'; // Update with your actual logo path

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();
    
    // Function to handle login button click
    const handleLoginClick = () => {
        navigate('/login');
    };

    // Function to handle logout
    const handleLogout = () => {
        // Remove token from localStorage
        localStorage.removeItem("token");
        
        // Update state
        setIsLoggedIn(false);
        setUserInfo(null);
        
        // Show success message
        toast.success("Logged out successfully");
        
        // Navigate to home page
        navigate('/');
    };
    return (
        <header className="w-full h-[100px] flex justify-center items-center relative">
            <img src={logo} alt="logo" className="w-[130px] h-[130px] absolute left-[20px]"/>
            
            <Link to="/" className="text-black text-xl hover:text-blue-300 hover:border-b-2 border-blue-300">
                Home
            </Link>
            <Link to="/products" className="ml-4 text-black text-xl hover:text-blue-300 hover:border-b-2 border-blue-300">
                Products
            </Link>
            <Link to="/reviews" className="ml-4 text-black text-xl hover:text-blue-300 hover:border-b-2 border-blue-300">
                Reviews
            </Link>
            <Link to="/about-us" className="ml-4 text-black text-xl hover:text-blue-300 hover:border-b-2 border-blue-300">
                About Us
            </Link>
            <Link to="/contact-us" className="ml-4 text-black text-xl hover:text-blue-300 hover:border-b-2 border-blue-300">
                Contact Us
            </Link>
            
            <Link to="/cart" className="absolute right-[180px]">
                <BiCart className="text-black text-3xl ml-4" />
            </Link>
            
            {/* Conditional rendering for Login/Logout button */}
            {isLoggedIn ? (
                <button 
                    onClick={handleLogout}
                    className="absolute right-[50px] bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-lg transition-colors duration-200"
                >
                    Logout
                </button>
            ) : (
                <button 
                    onClick={handleLoginClick}
                    className="absolute right-[50px] bg-blue-400 hover:bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-md text-lg transition-colors duration-200"
                >
                    Login
                </button>
            )}
        </header>
    );
}