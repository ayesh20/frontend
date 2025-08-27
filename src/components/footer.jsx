import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-blue-300 px-4 sm:px-8 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-12 lg:mb-16">
          {/* Left Section - Brand */}
          <div className="flex-1 max-w-md mb-12 lg:mb-0">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              GREENMIND
            </h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
              We help you find<br />
              your dream plant
            </p>
            
            {/* Social Media Icons */}
            <div className="flex gap-3 sm:gap-4">
              <button 
                onClick={() => handleNavigation('#')}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-700 flex items-center justify-center hover:bg-gray-700 hover:text-white transition-colors duration-300"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </button>
              
              <button 
                onClick={() => handleNavigation('#')}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-700 flex items-center justify-center hover:bg-gray-700 hover:text-white transition-colors duration-300"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </button>
              
              <button 
                onClick={() => handleNavigation('#')}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-700 flex items-center justify-center hover:bg-gray-700 hover:text-white transition-colors duration-300"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Right Section - Navigation Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 xl:gap-16 lg:flex-1 lg:max-w-2xl">
            {/* Information Column */}
            <div className="flex flex-col">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Information</h3>
              <div className="flex flex-col gap-3 sm:gap-4">
                <button 
                  onClick={() => handleNavigation('/about')}
                  className="text-gray-700 hover:text-gray-900 text-left transition-colors duration-300 text-sm sm:text-base"
                >
                  About
                </button>
                <button 
                  onClick={() => handleNavigation('/product')}
                  className="text-gray-700 hover:text-gray-900 text-left transition-colors duration-300 text-sm sm:text-base"
                >
                  Product
                </button>
                <button 
                  onClick={() => handleNavigation('/blog')}
                  className="text-gray-700 hover:text-gray-900 text-left transition-colors duration-300 text-sm sm:text-base"
                >
                  Blog
                </button>
              </div>
            </div>

            {/* Company Column */}
            <div className="flex flex-col">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Company</h3>
              <div className="flex flex-col gap-3 sm:gap-4">
                <button 
                  onClick={() => handleNavigation('/community')}
                  className="text-gray-700 hover:text-gray-900 text-left transition-colors duration-300 text-sm sm:text-base"
                >
                  Community
                </button>
                <button 
                  onClick={() => handleNavigation('/career')}
                  className="text-gray-700 hover:text-gray-900 text-left transition-colors duration-300 text-sm sm:text-base"
                >
                  Career
                </button>
                <button 
                  onClick={() => handleNavigation('/our-story')}
                  className="text-gray-700 hover:text-gray-900 text-left transition-colors duration-300 text-sm sm:text-base"
                >
                  Our story
                </button>
              </div>
            </div>

            {/* Contact Column */}
            <div className="flex flex-col sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Contact</h3>
              <div className="flex flex-col gap-3 sm:gap-4">
                <button 
                  onClick={() => handleNavigation('/getting-started')}
                  className="text-gray-700 hover:text-gray-900 text-left transition-colors duration-300 text-sm sm:text-base"
                >
                  Getting Started
                </button>
                <button 
                  onClick={() => handleNavigation('/pricing')}
                  className="text-gray-700 hover:text-gray-900 text-left transition-colors duration-300 text-sm sm:text-base"
                >
                  Pricing
                </button>
                <button 
                  onClick={() => handleNavigation('/resources')}
                  className="text-gray-700 hover:text-gray-900 text-left transition-colors duration-300 text-sm sm:text-base"
                >
                  Resources
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="pt-6 sm:pt-8 border-t border-gray-600">
          <p className="text-gray-700 text-xs sm:text-sm text-center sm:text-left">
            2025 all Right Reserved Term of use GREENMIND
          </p>
        </div>
      </div>
    </footer>
  );
}