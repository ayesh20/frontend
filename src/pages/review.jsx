import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function UserReviewForm() {
  const [reviewData, setReviewData] = useState({
    productName: '',
    rating: 0,
    title: '',
    review: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(token !== null);
    
    if (token === null) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Please login to write a review' 
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingClick = (rating) => {
    setReviewData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async () => {
    // Check token before submitting
    const token = localStorage.getItem("token");
    if (token === null) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Please login to submit a review' 
      });
      toast.error('Please login to submit a review');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Form validation
    if (!reviewData.productName || !reviewData.rating || !reviewData.title || !reviewData.review) {
      setSubmitStatus({ type: 'error', message: 'Please fill in all required fields' });
      toast.error('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    try {
      // Make API call with axios and token in Authorization header
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + '/api/reviews',
        {
          productName: reviewData.productName,
          rating: reviewData.rating,
          title: reviewData.title,
          review: reviewData.review
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Success response
      setSubmitStatus({ 
        type: 'success', 
        message: response.data.message || 'Review submitted successfully!' 
      });
      toast.success('Review submitted successfully!');
      
      // Reset form
      setReviewData({
        productName: '',
        rating: 0,
        title: '',
        review: ''
      });

    } catch (error) {
      console.error('Error submitting review:', error);
      
      // Handle different error scenarios
      if (error.response) {
        // Server responded with error status
        const { status, data } = error.response;
        
        if (status === 401) {
          localStorage.removeItem("token"); // Remove invalid token
          setIsAuthenticated(false);
          setSubmitStatus({ 
            type: 'error', 
            message: 'Session expired. Please login again' 
          });
          toast.error('Session expired. Please login again');
        } else {
          const errorMessage = data?.message || 'Failed to submit review';
          setSubmitStatus({ 
            type: 'error', 
            message: errorMessage
          });
          toast.error(errorMessage);
        }
      } else if (error.request) {
        // Network error
        const errorMessage = 'Network error. Please check your connection and try again.';
        setSubmitStatus({ 
          type: 'error', 
          message: errorMessage
        });
        toast.error(errorMessage);
      } else {
        // Other error
        const errorMessage = 'An unexpected error occurred. Please try again.';
        setSubmitStatus({ 
          type: 'error', 
          message: errorMessage
        });
        toast.error(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginRedirect = () => {
    // 
    
    toast('Redirecting to login page...');
   navigate("/login");
  };

  const renderStars = (interactive = false) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      return (
        <Star
          key={index}
          className={`w-6 h-6 ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''} ${
            starValue <= reviewData.rating 
              ? 'text-yellow-400 fill-yellow-400' 
              : 'text-gray-300'
          }`}
          onClick={interactive ? () => handleRatingClick(starValue) : undefined}
        />
      );
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-6 sm:p-8 lg:p-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
            Write a Review
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Share your experience and help others make informed decisions
          </p>
        </div>

        {/* Authentication Warning */}
        {!isAuthenticated && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <span className="text-yellow-700 font-medium">Please login to submit a review</span>
            </div>
          </div>
        )}

        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10">
          <div className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="productName"
                value={reviewData.productName}
                onChange={handleInputChange}
                placeholder="Enter the product name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none transition-colors duration-300"
                disabled={!isAuthenticated}
                required
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-3">
                Overall Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                {renderStars(isAuthenticated)}
                <span className="ml-3 text-gray-600">
                  {reviewData.rating > 0 ? `${reviewData.rating} out of 5 stars` : 'Click to rate'}
                </span>
              </div>
            </div>

            {/* Review Title */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Review Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={reviewData.title}
                onChange={handleInputChange}
                placeholder="Summarize your review in one line"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none transition-colors duration-300"
                disabled={!isAuthenticated}
                required
              />
            </div>

            {/* Detailed Review */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Detailed Review <span className="text-red-500">*</span>
              </label>
              <textarea
                name="review"
                value={reviewData.review}
                onChange={handleInputChange}
                placeholder="Tell us about your experience with this product..."
                rows={5}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none resize-none transition-colors duration-300"
                disabled={!isAuthenticated}
                required
              />
            </div>

            {/* Status Message */}
            {submitStatus && (
              <div className={`p-4 rounded-lg border ${
                submitStatus.type === 'success' 
                  ? 'bg-green-50 text-green-700 border-green-200' 
                  : 'bg-red-50 text-red-700 border-red-200'
              }`}>
                <div className="flex items-center gap-2">
                  {submitStatus.type === 'success' ? (
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  )}
                  {submitStatus.message}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !isAuthenticated}
                className={`${
                  !isAuthenticated 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                } disabled:from-gray-400 disabled:to-gray-500 text-white px-12 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Submitting Review...
                  </>
                ) : (
                  <>
                    <Star className="w-5 h-5" />
                    {isAuthenticated ? 'Submit Review' : 'Login Required'}
                  </>
                )}
              </button>
            </div>

            {/* Login Redirect Button */}
            {!isAuthenticated && (
              <div className="flex justify-center pt-2">
                <button
                  onClick={handleLoginRedirect}
                  className="text-blue-600 hover:text-blue-800 font-medium underline"
                >
                  Go to Login Page
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}