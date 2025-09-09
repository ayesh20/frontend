import { useState } from "react";
import { BiCart, BiStore } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiHome } from "react-icons/hi";
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

	return (
		<header className="h-[100px] bg-accent flex justify-center items-center relative">
			{isOpen && (
				<div className="fixed z-[100] top-0 right-0 w-[100vw] h-[100vh] bg-[#00000050]">
					<div className="h-full w-[350px] bg-white flex flex-col">
						<div className="w-full bg-accent h-[100px] flex pl-[45px] flex-row items-center gap-[20px]">
							<GiHamburgerMenu className="text-white text-4xl  md:hidden " onClick={()=>{
                                setIsOpen(close);
                            }}/>
							<img
								className="w-[150px] h-[80px] object-cover  cursor-pointer"
								onClick={() => {
									navigate("/");
								}}
								src={logo}
								alt="Logo"
							/>
						</div>
						<div className="w-full h-full flex flex-col p-[45px] items-start">
							<button
								className="text-accent text-2xl flex flex-row items-center"
								onClick={() => {
									setIsOpen(false);
									navigate("/");
								}}
							>
								<HiHome className="text-accent text-2xl mr-2" />
								Home
							</button>
                            {/* products */}
                            <button
								className="text-accent text-2xl flex flex-row items-center"
								onClick={() => {
									setIsOpen(false);
									navigate("/products");
								}}
							>
								<BiStore className="text-accent text-2xl mr-2" />
								Products
							</button>
                            {/* cart */}
                            <button
								className="text-accent text-2xl flex flex-row items-center"
								onClick={() => {
									setIsOpen(false);
									navigate("/cart");
								}}
							>
								<BiCart className="text-accent text-2xl mr-2" />
								Cart
							</button>
						</div>
					</div>
				</div>
			)}
			<img
				className="w-[150px] h-[80px] object-cover absolute md:left-[40px] md:w-[130px] md:h-[130px] md:absolute left-[20px] cursor-pointer"
				onClick={() => {
					navigate("/");
				}}
				src={logo}
				alt="Logo"
			/>
			<GiHamburgerMenu className="text-white text-4xl absolute md:hidden left-[40px]" onClick={
                ()=>{
                    setIsOpen(true);
                }
            }/>
			<div className="hidden w-full md:flex justify-center items-center">
				<Link to="/" className="text-black text-xl hover:text-blue-300 hover:border-b-2 border-blue-300 ">
					Home
				</Link>
				<Link to="/products" className="ml-4 text-black text-xl hover:text-blue-300 hover:border-b-2 border-blue-300">
					Products
				</Link>
				<Link to="/reviews" className="ml-4 text-black text-xl hover:text-blue-300 hover:border-b-2 border-blue-300">
					Reviews
				</Link>
				
				<Link to="/contact-us" className="ml-4 text-black text-xl hover:text-blue-300 hover:border-b-2 border-blue-300">
					Contact Us
				</Link>
				<Link to="/cart" className="absolute right-[250px] ">
					<BiCart className="text-black text-3xl ml-4" />
				</Link>
                <button 
                    onClick={handleLoginClick}
                    className="absolute right-[50px] bg-blue-400 hover:bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-md text-lg transition-colors duration-200"
                >
                    Login
                </button>

				{
					token!=null&&<button className="absolute  bg-red-400 hover:bg-red-600 px-4 py-2 rounded-md  right-[140px] text-white text-xl ml-4" onClick={
						()=>{
							localStorage.removeItem("token");
							navigate("/login");
						}
					}>
						Logout
					</button>
				}
			</div>
		</header>
	);
}