import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import AdminPage from "./pages/adminPage";
import TestPage from "./pages/testPage";
import { Toaster } from "react-hot-toast";
import ClientWebPage from "./pages/client/clientPage";

const clientid=import.meta.env.clientid


function App() {
	return (
		<BrowserRouter>
		<GoogleOAuthProvider clientId={clientid} >
			<div className="w-full h-screen flex justify-center items-center">
					<Toaster position="top-right"/>
					<Routes path="/">
						
						<Route path="/login" element={<LoginPage/>}/>
						<Route path="/test" element={<TestPage/>}/>
						<Route path="/register" element={<RegisterPage/>}/>
						<Route path="/admin/*" element={<AdminPage/>}/>
						<Route path="/*" element={<ClientWebPage/>}/>
					</Routes>
				
			</div>

			</GoogleOAuthProvider>
		</BrowserRouter>
	);
}

export default App;
