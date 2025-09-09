import { useState } from "react";
import { BiCart, BiStore } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiHome, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo2.jpg";

export default function Header() {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const token = localStorage.getItem("token");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    // Function to handle login button click
    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

	return (
		<header className="h-16 sm:h-20 lg:h-24 bg-accent flex justify-between items-center px-4 sm:px-6 lg:px-8 relative">
			{/* Mobile Menu Overlay */}
			{isOpen && (
				<div className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 md:hidden">
					<div className="h-full w-full max-w-sm bg-white flex flex-col animate-slide-in-left">
						{/* Mobile Menu Header */}
						<div className="w-full bg-accent h-16 flex px-4 items-center justify-between">
							<img
								className="w-24 h-12 sm:w-28 sm:h-14 object-cover cursor-pointer"
								onClick={() => {
									closeMenu();
									navigate("/");
								}}
								src={logo}
								alt="Logo"
							/>
							<HiX 
								className="text-white text-2xl cursor-pointer" 
								onClick={closeMenu}
							/>
						</div>
						
						{/* Mobile Menu Items */}
						<div className="flex-1 flex flex-col p-6 space-y-6">
							<button
								className="text-accent text-xl flex items-center hover:text-blue-600 transition-colors"
								onClick={() => {
									closeMenu();
									navigate("/");
								}}
							>
								<HiHome className="text-accent text-xl mr-3" />
								Home
							</button>
							
							<button
								className="text-accent text-xl flex items-center hover:text-blue-600 transition-colors"
								onClick={() => {
									closeMenu();
									navigate("/products");
								}}
							>
								<BiStore className="text-accent text-xl mr-3" />
								Products
							</button>
							
							<button
								className="text-accent text-xl flex items-center hover:text-blue-600 transition-colors"
								onClick={() => {
									closeMenu();
									navigate("/reviews");
								}}
							>
								<BiStore className="text-accent text-xl mr-3" />
								Reviews
							</button>
							
							<button
								className="text-accent text-xl flex items-center hover:text-blue-600 transition-colors"
								onClick={() => {
									closeMenu();
									navigate("/contact-us");
								}}
							>
								<BiStore className="text-accent text-xl mr-3" />
								Contact Us
							</button>
							
							<button
								className="text-accent text-xl flex items-center hover:text-blue-600 transition-colors"
								onClick={() => {
									closeMenu();
									navigate("/cart");
								}}
							>
								<BiCart className="text-accent text-xl mr-3" />
								Cart
							</button>
							
							{/* Mobile Auth Buttons */}
							<div className="pt-4 border-t border-gray-200 space-y-3">
								{!token ? (
									<button 
										onClick={() => {
											closeMenu();
											handleLoginClick();
										}}
										className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg text-lg font-medium transition-colors duration-200"
									>
										Login
									</button>
								) : (
									<button 
										onClick={() => {
											closeMenu();
											handleLogout();
										}}
										className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg text-lg font-medium transition-colors duration-200"
									>
										Logout
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Logo */}
			<img
				className="w-20 h-10 sm:w-24 sm:h-12 lg:w-32 lg:h-16 object-cover cursor-pointer"
				onClick={() => navigate("/")}
				src={logo}
				alt="Logo"
			/>

			{/* Hamburger Menu Button - Mobile Only */}
			<GiHamburgerMenu 
				className="text-white text-2xl sm:text-3xl cursor-pointer md:hidden" 
				onClick={() => setIsOpen(true)}
			/>

			{/* Desktop Navigation */}
			<div className="hidden md:flex items-center justify-center flex-1 px-8">
				<nav className="flex items-center space-x-8">
					<Link 
						to="/" 
						className="text-white text-lg lg:text-xl hover:text-blue-300 hover:border-b-2 border-blue-300 pb-1 transition-all duration-200"
					>
						Home
					</Link>
					<Link 
						to="/products" 
						className="text-white text-lg lg:text-xl hover:text-blue-300 hover:border-b-2 border-blue-300 pb-1 transition-all duration-200"
					>
						Products
					</Link>
					<Link 
						to="/reviews" 
						className="text-white text-lg lg:text-xl hover:text-blue-300 hover:border-b-2 border-blue-300 pb-1 transition-all duration-200"
					>
						Reviews
					</Link>
					<Link 
						to="/contact-us" 
						className="text-white text-lg lg:text-xl hover:text-blue-300 hover:border-b-2 border-blue-300 pb-1 transition-all duration-200"
					>
						Contact Us
					</Link>
				</nav>
			</div>

			{/* Desktop Right Side Actions */}
			<div className="hidden md:flex items-center space-x-4">
				<Link to="/cart" className="hover:scale-110 transition-transform">
					<BiCart className="text-white text-2xl lg:text-3xl" />
				</Link>
				
				{!token ? (
					<button 
						onClick={handleLoginClick}
						className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg text-base lg:text-lg font-medium transition-colors duration-200"
					>
						Login
					</button>
				) : (
					<button 
						onClick={handleLogout}
						className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg text-base lg:text-lg font-medium transition-colors duration-200"
					>
						Logout
					</button>
				)}
			</div>
		</header>
	);
}