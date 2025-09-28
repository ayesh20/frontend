import { useState, useEffect } from "react";
import { BiCart, BiStore } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiHome, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo2.jpg";

export default function Header() {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const [token, setToken] = useState(localStorage.getItem("token"));
    
    // Update token state when localStorage changes
    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem("token"));
        };
        
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Function to handle login button click
    const handleLoginClick = () => {
        setIsOpen(false);
        navigate('/login');
    };

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setIsOpen(false);
        navigate("/login");
    };

    // Close mobile menu when clicking outside
    const closeMobileMenu = () => {
        setIsOpen(false);
    };

    // Navigation items
    const navigationItems = [
        { path: "/", label: "Home", icon: HiHome },
        { path: "/products", label: "Products", icon: BiStore },
        { path: "/reviews", label: "Reviews", icon: null },
        { path: "/contact-us", label: "Contact Us", icon: null },
    ];

	return (
		<header className="h-[80px] sm:h-[100px] bg-accent flex items-center px-4 sm:px-6 lg:px-8 relative z-50">
			{/* Mobile Menu Overlay */}
			{isOpen && (
				<div 
					className="fixed z-[100] top-0 left-0 w-full h-full bg-black bg-opacity-50 md:hidden"
					onClick={closeMobileMenu}
				>
					<div 
						className="h-full w-[280px] sm:w-[350px] bg-white flex flex-col shadow-xl"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Mobile Menu Header */}
						<div className="w-full bg-accent h-[80px] flex px-4 flex-row items-center justify-between">
							<img
								className="w-[120px] h-[60px] object-cover cursor-pointer"
								onClick={() => {
									setIsOpen(false);
									navigate("/");
								}}
								src={logo}
								alt="Logo"
							/>
							<button 
								onClick={closeMobileMenu}
								className="text-white text-2xl p-2 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors"
							>
								<HiX />
							</button>
						</div>

						{/* Mobile Menu Content */}
						<div className="flex-1 flex flex-col p-6 space-y-4">
							{/* Navigation Items */}
							{navigationItems.map((item) => (
								<button
									key={item.path}
									className="text-accent text-xl flex flex-row items-center py-3 px-2 hover:bg-gray-100 rounded-lg transition-colors w-full text-left"
									onClick={() => {
										setIsOpen(false);
										navigate(item.path);
									}}
								>
									{item.icon && <item.icon className="text-accent text-xl mr-3" />}
									{item.label}
								</button>
							))}

							{/* Cart Button */}
							<button
								className="text-accent text-xl flex flex-row items-center py-3 px-2 hover:bg-gray-100 rounded-lg transition-colors w-full text-left"
								onClick={() => {
									setIsOpen(false);
									navigate("/cart");
								}}
							>
								<BiCart className="text-accent text-xl mr-3" />
								Cart
							</button>

							{/* Divider */}
							<hr className="my-4 border-gray-200" />

							{/* Auth Buttons */}
							{token ? (
								<button 
									onClick={handleLogout}
									className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg text-lg transition-colors duration-200 font-medium"
								>
									Logout
								</button>
							) : (
								<button 
									onClick={handleLoginClick}
									className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg text-lg transition-colors duration-200 font-medium"
								>
									Login
								</button>
							)}
						</div>
					</div>
				</div>
			)}

			{/* Hamburger Menu - Mobile Only */}
			<button
				className="text-black text-3xl p-2 hover:bg-gray-200 rounded-full transition-colors md:hidden"
				onClick={() => setIsOpen(true)}
			>
				<GiHamburgerMenu />
			</button>

			{/* Logo - Centered on Mobile, Left on Desktop */}
			<div className="flex-1 flex justify-center md:justify-start md:flex-none">
				<img
					className="w-[120px] h-[60px] sm:w-[130px] sm:h-[65px] lg:w-[150px] lg:h-[80px] object-cover cursor-pointer"
					onClick={() => navigate("/")}
					src={logo}
					alt="Logo"
				/>
			</div>

			{/* Desktop Navigation - Centered */}
			<nav className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
				{navigationItems.map((item) => (
					<Link
						key={item.path}
						to={item.path}
						className="text-black text-lg lg:text-xl hover:text-blue-400 hover:border-b-2 border-blue-400 pb-1 transition-all duration-200"
					>
						{item.label}
					</Link>
				))}
			</nav>

			{/* Desktop Right Side */}
			<div className="hidden md:flex items-center space-x-4 ml-auto">
				{/* Cart Icon */}
				<Link 
					to="/cart" 
					className="text-black hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-gray-100"
				>
					<BiCart className="text-2xl lg:text-3xl" />
				</Link>

				{/* Auth Buttons */}
				{token ? (
					<button 
						onClick={handleLogout}
						className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-lg transition-colors duration-200 font-medium"
					>
						Logout
					</button>
				) : (
					<button 
						onClick={handleLoginClick}
						className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-lg transition-colors duration-200 font-medium"
					>
						Login
					</button>
				)}
			</div>

			{/* Mobile Cart Icon (visible only on mobile) */}
			<Link 
				to="/cart" 
				className="text-white hover:text-blue-200 transition-colors p-2 rounded-full md:hidden"
			>
				<BiCart className="text-2xl" />
			</Link>
		</header>
	);
}