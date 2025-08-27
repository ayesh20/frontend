
import toast from "react-hot-toast";
import hero from "../assets/images/hero2.jpg";
import Footer from "../components/footer";

export default function HomePage() {

    return(
        <>
        {/* Hero Section */}
        <div className="w-[1220px] h-[400px] flex items-center bg-blue-300 rounded-lg shadow-2xl m-[60px]">
            {/* Left side - Text content */}
            <div className="flex-1 pl-12 text-white">
                <h1 className="text-4xl font-bold mb-6">
                    Buy your Cosmatic Products from here!
                </h1>
                
                <div className="flex space-x-12">
                    <div>
                        <div className="text-2xl font-bold">50+</div>
                        <div className="text-sm">Cosmatic Species</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">100+</div>
                        <div className="text-sm">Customers</div>
                    </div>
                </div>
            </div>
            
            {/* Right side - Plant images */}
            <div className="flex-1 flex justify-center items-center pr-12">
                <div className="flex space-x-4">
                    {/* Large image on left */}
                    <div className=" rounded-lg shadow-lg">
                        <img 
                            src={hero}
                            alt="Plant room"
                            className="w-100 h-70 object-cover rounded"
                        />
                    </div>
                    
                    
                </div>
            </div>
             
        </div>
         
        {/*best seller section*/}
{/*footer section*/}
        <div >
                <Footer/>
             </div>
</>
        
    );
}