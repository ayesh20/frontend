import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import signup from "../assets/images/signup.jpg";

export default function RegisterPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    
    function register() {
       

        setIsLoading(true);
        
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/register", {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            password: password
        }).then(
            (response) => {
                console.log(response.data);
                toast.success("Account created successfully! Please login.");
                
                navigate("/login");
            }
        ).catch(
            (error) => {
                console.log(error);
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message);
                } else if (error.response && error.response.status === 409) {
                    toast.error("Email already exists. Please use a different email.");
                } else {
                    toast.error("Registration failed. Please try again.");
                }
            }
        ).finally(() => {
            setIsLoading(false);
        });
    }

    const handleGoogleSignIn = () => {
        toast.info("Google Sign In - Coming Soon!");
    };

    const handleAppleSignIn = () => {
        toast.info("Apple Sign In - Coming Soon!");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex w-full pt-1">
            {/* Left Side - Form */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-12">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Get Started Now</h2>
                    </div>
                    
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        {/* First Name */}
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                First Name
                            </label>
                            <input
                                id="firstName"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                placeholder="Enter your first name"
                            />
                        </div>

                        {/* Last Name */}
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name
                            </label>
                            <input
                                id="lastName"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                placeholder="Enter your last name"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                placeholder="Enter your phone number"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                placeholder="Create a password"
                            />
                        </div>

                        

                        {/* Terms Agreement */}
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="agreeToTerms"
                                    type="checkbox"
                                    checked={agreeToTerms}
                                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                                    className="h-4 w-4 text-blue-400 focus:ring-blue-400 border-gray-300 rounded"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="agreeToTerms" className="text-gray-700">
                                    I agree to the{' '}
                                    <Link to="/terms" className="text-blue-400 hover:blue-400">
                                        terms & policy
                                    </Link>
                                </label>
                            </div>
                        </div>

                        {/* Sign Up Button */}
                        <button
                            type="button"
                            onClick={register}
                            disabled={isLoading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                            {isLoading ? "Creating Account..." : "Signup"}
                        </button>


                      

                        {/* Sign In Link */}
                        <div className="text-center">
                            <span className="text-sm text-gray-600">
                                Have an account?{' '}
                                <Link to="/login" className="font-medium text-blue-500 hover:text-blue-300">
                                    Sign In
                                </Link>
                            </span>
                            <p> <Link to="/" className="text-blue-500">home</Link> </p>
                        </div>
                    </form>
                </div>
            </div>

            {/* Right Side - Plant Image */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-green-600">
                    <div className="flex items-center justify-center h-full p-8">
                        <div className="text-center text-white">
                            <div className="mb-8">
                                <div className="mx-auto w-95 h-95 bg-[url(./assets/images/signup.jpg)]  rounded-full flex items-center justify-center shadow-2xl">
                                 
                                </div>
                            </div>
                            <h2 className="text-4xl font-bold mb-4">Welcome to Beauty Paradise</h2>
                            <p className="text-xl opacity-90">Join thousands of cosmetic lovers and discover amazing products for you</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}