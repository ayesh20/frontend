import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import ProductsPage from "./productpage";
import ProductOverViewPage from "./productOverView";
import CartPage from "./cart";
import CheckoutPage from "./checkoutPage";
import HomePage from "../homePage";
import Footer from "../../components/footer";
import ContactUs from "../contactus";
import UserReviewForm from "../review";

export default function ClientWebPage() {
	return <div className="w-full h-screen max-h-screen">
        <Header/>
        <div className="w-full h-[calc(100%-100px)]">
            <Routes path="/">
                <Route path="/" element={<HomePage/>}/>
                <Route path="/products" element={<ProductsPage/>}/>
                <Route path="/reviews" element={<UserReviewForm/>}/>
                
                <Route path="/contact-us" element={<ContactUs/>}/>
                <Route
						path="/cart"
						element={<CartPage/>}
					/>
                <Route path="/overview/:productId"  element={<ProductOverViewPage/>} />
                <Route
						path="/checkout"
						element={<CheckoutPage/>}/>
                <Route path="/*" element={<h1 className="text-3xl text-center">404 Not Found</h1>}/>

            </Routes>
        </div>
        
    </div>;
}