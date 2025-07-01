import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductCard from './components/productCard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";

import AdminPage from "./pages/adminPage";
import TestPage from "./pages/testPage";
import { Toaster } from "react-hot-toast";

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <>
     <div className="w-full h-screen flex justify-center items-center">
					<Toaster position="top-right"/>
					<Routes path="/">
						<Route path="/" element={<HomePage/>}/>
						<Route path="/login" element={<LoginPage/>}/>
						<Route path="/test" element={<TestPage/>}/>
						
						<Route path="/admin/*" element={<AdminPage/>}/>
					</Routes>
				
			</div>
    </>
    </BrowserRouter>
  )
}

export default App;
