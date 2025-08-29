import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';    
import Footer from '../components/footer.jsx';
import axios from 'axios';

// Contact Us Component
export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Add the missing handleInputChange function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    // Your specific validation
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("Please login to fill this");
      navigate("/login");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Form validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phoneNumber || !formData.message) {
      setSubmitStatus({ type: 'error', message: 'All fields are required' });
      setIsSubmitting(false);

      return;
    }

    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/contact", {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim().toLowerCase(),
      phoneNumber: formData.phoneNumber.trim(),
      message: formData.message.trim()
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(
      (response) => {
        console.log(response.data);
        setSubmitStatus({ type: 'success', message: 'Message sent successfully!' });
        toast.success('Message sent successfully!');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          message: ''
        })
        
        ;
      }
    ).catch(
      (error) => {
        console.log(error);
        if (error.response && error.response.data && error.response.data.message) {
          setSubmitStatus({ type: 'error', message: error.response.data.message });
          toast.error(error.response.data.message);
        } else {
          setSubmitStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
          toast.error('Failed to send message. Please try again.');
        }
      }
    ).finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <>
    <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12">
      <div className="bg-gray-100 rounded-3xl p-6 sm:p-8 lg:p-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
            Contact Us
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Any question or remarks? Just write us a message!
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Left Side - Contact Information */}
          <div className="bg-blue-400 p-6 sm:p-8 lg:p-10 lg:w-2/5">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
              Contact Information
            </h2>
            <p className="text-gray-700 text-sm sm:text-base mb-8 sm:mb-12">
              Say something to start a live chat!
            </p>

            <div className="space-y-6 sm:space-y-8">
              {/* Phone */}
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <span className="text-gray-700 text-sm sm:text-base">+012 3456 789</span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6" stroke="white" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
                <span className="text-gray-700 text-sm sm:text-base">demo@gmail.com</span>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mt-1">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <span className="text-gray-700 text-sm sm:text-base">132 Dartmouth Street Boston, Massachusetts 02156 United States</span>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="p-6 sm:p-8 lg:p-10 lg:w-3/5">
            <div className="space-y-6">
              {/* First Row - First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-blue-400 focus:outline-none transition-colors duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-blue-400 focus:outline-none transition-colors duration-300"
                    required
                  />
                </div>
              </div>

              {/* Second Row - Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-blue-400 focus:outline-none transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-blue-400 focus:outline-none transition-colors duration-300"
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Write your message..."
                  rows={4}
                  className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-blue-400 focus:outline-none resize-none transition-colors duration-300"
                  required
                ></textarea>
              </div>

              {/* Status Message */}
              {submitStatus && (
                <div className={`p-4 rounded-lg ${submitStatus.type === 'success' 
                  ? 'bg-green-100 text-green-700 border border-green-300' 
                  : 'bg-red-100 text-red-700 border border-red-300'
                }`}>
                  {submitStatus.message}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div >
      <Footer/> </div>
    </>
  );
}