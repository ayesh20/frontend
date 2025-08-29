
import toast from "react-hot-toast";
import hero from "../assets/images/hero2.jpg";
import Footer from "../components/footer";

export default function HomePage() {

    return(
        <>
        {/* Hero Section */}
        <div className="max-w-[1220px] w-full mx-auto h-[400px] flex flex-col lg:flex-row items-center bg-blue-300 rounded-lg shadow-2xl px-6 py-10 lg:px-12 lg:py-0 my-8">
  {/* Left side - Text content */}
  <div className="flex-1 text-white mb-8 lg:mb-0 lg:pl-8 text-center lg:text-left">
    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
      Buy your Cosmetic Products from here!
    </h1>

    <div className="flex justify-center lg:justify-start space-x-8 sm:space-x-12">
      <div>
        <div className="text-xl sm:text-2xl font-bold">50+</div>
        <div className="text-xs sm:text-sm">Cosmetic Species</div>
      </div>
      <div>
        <div className="text-xl sm:text-2xl font-bold">100+</div>
        <div className="text-xs sm:text-sm">Customers</div>
      </div>
    </div>
  </div>

  {/* Right side - Image */}
  <div className="flex-1 flex justify-center items-center lg:pr-12">
    <div className="rounded-lg shadow-lg overflow-hidden">
      <img 
        src={hero}
        alt="Cosmetic products"
        className="w-64 sm:w-80 md:w-96 lg:w-[400px] object-cover rounded"
      />
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