import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    function login() {
        console.log(email, password)
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
            email: email,
            password: password
        }).then(
            (response) => {
                console.log(response.data)
                localStorage.setItem("token", response.data.token)

                toast.success("login successful")
                
                // Decode JWT token to get user role
                try {
                    const decodedToken = jwtDecode(response.data.token);
                    const userRole = decodedToken.role;
                    
                    console.log("User role:", userRole);
                    
                    // Navigate based on role
                    if (userRole === "admin") {
                        navigate("/admin");
                    } else {
                        navigate("/");
                    }
                } catch (error) {
                    console.error("Error decoding token:", error);
                    // If decoding fails, go to home page
                    navigate("/");
                }
            }
        ).catch(
            (error) => {
                console.log(error)
                toast.error("Login Failed")
            }
        )
    }

    return (
        <div className="w-full h-screen bg-[url(./assets/images/login.jpg)] bg-cover bg-center flex justify-center items-center">
            <div className="w-[500px] h-[500px] backdrop-blur-sm shadow-2xl rounded-[30px] relative gap-[20px] text-black flex flex-col items-center justify-center">
                <h1 className="absolute top-[20px] text-2xl font-bold text-center my-5">Login</h1>
                <div className="w-[350px] flex flex-col">
                    <span className="text-lg">Email</span>
                    <input 
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        type="text" 
                        className="w-[350px] h-[40px] border border-black rounded-xl"
                    />
                </div>
                <div className="w-[350px] flex flex-col">
                    <span className="text-lg">Password</span>
                    <input 
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }} 
                        type="password" 
                        className="w-[350px] h-[40px] border border-black rounded-xl"
                    />
                </div>
                <button 
                    onClick={login} 
                    className="w-[350px] h-[40px] bg-blue-500 rounded-xl text-black text-lg mt-5 hover:bg-blue-600 transition-all duration-300"
                >
                    Login
                </button>
                <p>Don't have an account? <Link to="/register" className="text-blue-500">Sign up</Link> from here</p>
            </div>
        </div>
    );
}