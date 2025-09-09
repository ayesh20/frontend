import toast from "react-hot-toast";
import hero from "../assets/images/hero2.jpg";
import Footer from "../components/footer";
import Loader from "../components/loader";
import ProductCard from "../components/productCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star } from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch both products and reviews
    fetchProducts();
    fetchReviews();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products");
      // Limit to only first 3 products
      const limitedProducts = response.data.products.slice(0, 3);
      setProducts(limitedProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      setReviewsLoading(true);
      // Fetch reviews with limit of 3 for homepage display
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews?limit=3&sort=latest`
      );
      
      if (response.data && response.data.reviews) {
        setReviews(response.data.reviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setError('Failed to load reviews');
    } finally {
      setReviewsLoading(false);
    }
  };

  const renderStars = (rating) => {
    const numRating = parseInt(rating);
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < numRating 
            ? 'text-yellow-400 fill-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const truncateText = (text, maxLength = 120) => {
    if (!text) return 'No review details provided';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
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

      {/* Best Seller Section */}
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4 text-secondary">Best Seller Products</h1>

        {loading ? (
          <Loader />
        ) : (
          <div className="w-full flex flex-wrap gap-[40px] justify-center items-center p-[20px]">
            {products.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        )}

        <button 
          onClick={() => navigate("/products")}
          className="mb-8 bg-blue-400 hover:bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg text-lg transition-colors duration-200"
        >
          See More <i className="fa fa-arrow-right ml-2"></i>
        </button>
      </div>

      {/* Service Section */}
      <div className="w-full py-16 px-6 bg-gray-50">
        <div className="max-w-[1220px] mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 text-lg">
              Order now and appreciate the beauty of nature
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Large Assortment */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Large Assortment
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We offer many different types of cosmetic products with premium quality variations in each category.
              </p>
            </div>

            {/* Fast & Free Shipping */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2-2v-5H14a2 2 0 01-2-2V7H8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Fast & Free Shipping
              </h3>
              <p className="text-gray-600 leading-relaxed">
                3-day or less delivery time, free shipping and an expedited delivery option for urgent orders.
              </p>
            </div>

            {/* 24/7 Support */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                24/7 Support
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Answers to any beauty related inquiry 24/7 and in real-time with expert consultation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="w-full flex flex-col items-center justify-center py-16 px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 text-center">Customer Reviews</h1>
        <p className="text-gray-600 text-lg mb-12 text-center">See what our customers are saying about our products</p>

        {reviewsLoading ? (
          <Loader />
        ) : error ? (
          <div className="text-center">
            <div className="text-gray-500 mb-8">
              Unable to load reviews at the moment. Please try again later.
            </div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center">
            <div className="text-gray-500 mb-8">
              No reviews yet. Be the first to share your experience!
            </div>
            <button 
              onClick={() => navigate('/review')}
              className="bg-blue-400 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Write a Review
            </button>
          </div>
        ) : (
          <>
            {/* Reviews Grid */}
            <div className="w-full max-w-[1220px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {reviews.map((review, index) => (
                <div 
                  key={review._id || index} 
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
                >
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">
                      {review.rating}/5
                    </span>
                  </div>

                  {/* Review Title */}
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {review.title}
                  </h3>

                  {/* Product Name */}
                  <div className="text-sm text-blue-600 font-medium mb-3">
                    {review.productName}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {truncateText(review.details || review.review)}
                  </p>

                  {/* Review Date */}
                  <div className="text-xs text-gray-400">
                    {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Recent'}
                  </div>
                </div>
              ))}
            </div>

            {/* View More Button */}
            <div className="text-center">
              <button 
                onClick={() => navigate('/reviews')}
                className="bg-blue-400 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                Add Reviews <i className="fa fa-arrow-right ml-2"></i>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Footer Section */}
      <div>
        <Footer />
      </div>
    </>
  );
}