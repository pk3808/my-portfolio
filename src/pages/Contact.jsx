import React, { useState } from "react";

const AnimatedModal = ({ isOpen, status, onClose, darkMode }) => {
  if (!isOpen) return null;

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="text-center">
            <div className="relative mb-6">
              {/* Paper plane flying animation */}
              <div className="relative w-32 h-32 mx-auto">
                {/* Background circles */}
                <div className={`absolute inset-0 rounded-full ${darkMode ? 'bg-[#DFFF00]/10' : 'bg-[#E3735E]/10'} animate-ping`}></div>
                <div className={`absolute inset-4 rounded-full ${darkMode ? 'bg-[#DFFF00]/20' : 'bg-[#E3735E]/20'} animate-ping`} style={{ animationDelay: '0.5s' }}></div>
                
                {/* Flying paper planes */}
                <div className="absolute inset-0">
                  {/* Main paper plane */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="absolute w-full h-full animate-spin" style={{ animationDuration: '4s' }}>
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <svg width="20" height="20" viewBox="0 0 24 24" className={`${darkMode ? 'text-[#FFD580]' : 'text-[#FAC898]'} opacity-80`}>
                        <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                      </svg>
                    </div>
                  </div>
                  </div>
                  
                  {/* Flying paper plane 1 - circular path */}
                  <div className="absolute w-full h-full animate-spin" style={{ animationDuration: '4s' }}>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <svg width="16" height="16" viewBox="0 0 24 24" className={`${darkMode ? 'text-[#CFFF00]' : 'text-[#D65A47]'} opacity-60`}>
                        <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Flying paper plane 2 - reverse circular path */}
                  <div className="absolute w-full h-full animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }}>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <svg width="16" height="16" viewBox="0 0 24 24" className={`${darkMode ? 'text-[#CFFF00]' : 'text-[#D65A47]'} opacity-60`}>
                        <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Flying paper plane 3 - diagonal movement */}
                  <div className="absolute top-0 right-0 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2s' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" className={`${darkMode ? 'text-[#355E3B]' : 'text-[#FAD5A5]'} opacity-40`}>
                      <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                  </div>
                  
                  {/* Flying paper plane 4 - left side movement */}
                  <div className="absolute bottom-0 left-0 animate-pulse" style={{ animationDelay: '1s' }}>
                    <div className="animate-bounce">
                      <svg width="14" height="14" viewBox="0 0 24 24" className={`${darkMode ? 'text-[#FFD580]' : 'text-[#E97451]'} opacity-50`}>
                        <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Animated trail lines */}
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  <div className={`absolute top-1/2 left-0 w-full h-0.5 ${darkMode ? 'bg-gradient-to-r from-transparent via-[#DFFF00]/30 to-transparent' : 'bg-gradient-to-r from-transparent via-[#E3735E]/30 to-transparent'} animate-pulse`}></div>
                  <div className={`absolute left-1/2 top-0 h-full w-0.5 ${darkMode ? 'bg-gradient-to-b from-transparent via-[#FFD580]/20 to-transparent' : 'bg-gradient-to-b from-transparent via-[#FAC898]/20 to-transparent'} animate-pulse`} style={{ animationDelay: '0.5s' }}></div>
                </div>
              </div>
            </div>
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Sending Message...
            </h3>
            <p className={`text-sm ${darkMode ? 'text-[#FFD580]' : 'text-gray-600'}`}>
              Your message is soaring through cyberspace! ✈️
            </p>
          </div>
        );
      
      case 'success':
        return (
          <div className="text-center">
            <div className="mb-6">
              <div className={`w-24 h-24 mx-auto rounded-full ${darkMode ? 'bg-[#DFFF00]' : 'bg-[#E3735E]'} flex items-center justify-center animate-bounce`}>
                <svg className={`w-12 h-12 ${darkMode ? 'text-[#1a5c35]' : 'text-white'} animate-pulse`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Message Sent! 🎉
            </h3>
            <p className={`text-sm mb-4 ${darkMode ? 'text-[#FFD580]' : 'text-gray-600'}`}>
              Thank you for reaching out! I'll get back to you soon.
            </p>
            <button
              onClick={onClose}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                darkMode
                  ? 'bg-[#DFFF00] hover:bg-[#CFFF00] text-[#1a5c35]'
                  : 'bg-[#E3735E] hover:bg-[#D65A47] text-white'
              }`}
            >
              Close
            </button>
          </div>
        );
      
      case 'error':
        return (
          <div className="text-center">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-red-500 flex items-center justify-center animate-pulse">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Oops! Something went wrong 😔
            </h3>
            <p className={`text-sm mb-4 ${darkMode ? 'text-[#FFD580]' : 'text-gray-600'}`}>
              Your message couldn't be sent. Please try again.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200"
            >
              Try Again
            </button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={status !== 'loading' ? onClose : undefined}
      ></div>
      
      {/* Modal */}
      <div className={`relative w-full max-w-md mx-auto rounded-2xl p-8 shadow-2xl transform transition-all duration-300 ${
        darkMode 
          ? 'bg-gradient-to-br from-[#022a02] to-[#355E3B] border-2 border-[#DFFF00]/30' 
          : 'bg-gradient-to-br from-[#FAD5A5] to-[#FAC898] border-2 border-[#E97451]/30'
      } animate-scale-in`}>
        {/* Close button for non-loading states */}
        {status !== 'loading' && (
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 p-2 rounded-full transition-colors duration-200 ${
              darkMode 
                ? 'hover:bg-[#355E3B] text-[#FFD580] hover:text-white' 
                : 'hover:bg-[#FAC898] text-[#E97451] hover:text-gray-700'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        
        {renderContent()}
      </div>
    </div>
  );
};

const Contact = ({ darkMode, hide }) => {
  const [modalState, setModalState] = useState({ isOpen: false, status: null, errorMessage: '' });

  const handleSubmit = async () => {
    setModalState({ isOpen: true, status: 'loading', errorMessage: '' });

    const data = {
      email: document.getElementById('email').value,
      name: document.getElementById('name').value,
      contactType: document.getElementById('contactType').value,
      message: document.getElementById('message').value,
    };

    try {
      const response = await fetch(
        "https://my-vercel-api-olive.vercel.app/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      // Simulate a delay to show the loading animation
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (response.ok) {
        setModalState({ isOpen: true, status: 'success', errorMessage: '' });
        // Reset form after successful submission
        document.getElementById('email').value = '';
        document.getElementById('name').value = '';
        document.getElementById('contactType').value = 'recruiter';
        document.getElementById('message').value = '';
      } else {
        const errorData = await response.json();
        setModalState({ 
          isOpen: true, 
          status: 'error', 
          errorMessage: errorData.error || 'Failed to send message'
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setModalState({ 
        isOpen: true, 
        status: 'error', 
        errorMessage: 'Network error occurred. Please check your connection and try again.'
      });
    }
  };

  const closeModal = () => {
    setModalState({ isOpen: false, status: null, errorMessage: '' });
  };

  return (
    <>
      <div className="h-[100vh] flex items-center justify-center py-10 bg-transparent">
        <div
          className={`relative flex mx-[2vw] flex-wrap items-center justify-center border-2 rounded-2xl overflow-hidden max-w-5xl w-full md:mx-auto h-[70vh] transition-all duration-300 hover:shadow-xl ${
            darkMode 
              ? "bg-gradient-to-br from-green-900 to-emerald-800 border-lime-600/40 shadow-2xl" 
              : "bg-gradient-to-br from-orange-200 to-amber-100 border-orange-400/40 shadow-2xl"
          }`}
        >
          {/* Left Side: Contact Form */}
          <div
            className={`w-full lg:w-2/3 p-6 flex flex-col justify-center h-full ${
              darkMode
                ? "text-white bg-[#022a02]"
                : "text-gray-800 bg-[#FAD5A5]"
            }`}
          >
            <div>
              <h2 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Let's{" "}
                <span
                  className={`${darkMode ? 'text-[#FFD580]' : 'text-[#E97451]'}`}
                >
                  Talk
                </span>
              </h2>
              <div className="space-y-3 flex-1">
                {/* Email and Name in a row on larger screens */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="email" className={`block text-xs font-medium mb-1 ${darkMode ? 'text-lime-200' : 'text-gray-700'}`}>
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="Enter your email"
                      className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 ${
                        darkMode
                          ? "bg-[#355E3B] text-white border-lime-600/50 focus:border-lime-500"
                          : "bg-[#FAC898] text-black border-orange-400/50 focus:border-orange-500"
                      } shadow-md focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-lime-500' : 'focus:ring-orange-500'} focus:ring-opacity-50`}
                    />
                  </div>
                  <div>
                    <label htmlFor="name" className={`block text-xs font-medium mb-1 ${darkMode ? 'text-lime-200' : 'text-gray-700'}`}>
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Enter your name"
                      className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 ${
                        darkMode
                          ? "bg-[#355E3B] text-white border-lime-600/50 focus:border-lime-500"
                          : "bg-[#FAC898] text-black border-orange-400/50 focus:border-orange-500"
                      } shadow-md focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-lime-500' : 'focus:ring-orange-500'} focus:ring-opacity-50`}
                    />
                  </div>
                </div>

                {/* Contact Type */}
                <div>
                  <label
                    htmlFor="contactType"
                    className={`block text-xs font-medium mb-1 ${darkMode ? 'text-lime-200' : 'text-gray-700'}`}
                  >
                    Who is contacting?
                  </label>
                  <select
                    id="contactType"
                    name="contactType"
                    className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 ${
                      darkMode
                        ? "bg-[#355E3B] text-white border-lime-600/50 focus:border-lime-500"
                        : "bg-[#FAC898] text-black border-orange-400/50 focus:border-orange-500"
                    } shadow-md focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-lime-500' : 'focus:ring-orange-500'} focus:ring-opacity-50 cursor-pointer`}
                  >
                    <option value="recruiter">🏢 Recruiter</option>
                    <option value="student">🎓 Student</option>
                    <option value="visitor">👋 Visitor</option>
                  </select>
                </div>

                {/* Message */}
                <div className="flex-1">
                  <label
                    htmlFor="message"
                    className={`block text-xs font-medium mb-1 ${darkMode ? 'text-lime-200' : 'text-gray-700'}`}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="4"
                    placeholder="Write your message here..."
                    className={`w-full px-3 py-2 text-sm rounded-lg border resize-none transition-all duration-200 ${
                      darkMode ? "bg-[#355E3B] text-white border-lime-600/50 focus:border-lime-500" : "bg-[#FAC898] text-black border-orange-400/50 focus:border-orange-500"
                    } shadow-md focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-lime-500' : 'focus:ring-orange-500'} focus:ring-opacity-50`}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    onClick={handleSubmit}
                    disabled={modalState.status === 'loading'}
                    className={`md:w-[40%] w-full flex items-center justify-center ${
                      darkMode
                        ? "bg-[#DFFF00] hover:bg-[#CFFF00] text-[#1a5c35] border-2 border-lime-300"
                        : "bg-[#E3735E] hover:bg-[#D65A47] text-white border-2 border-orange-300"
                    } font-bold text-sm px-6 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                  >
                    <span className="flex items-center">
                      {modalState.status === 'loading' ? 'Sending...' : 'Send Message'}
                      <svg 
                        className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Image with Map */}
          <div className="hidden lg:flex w-full lg:w-1/3 h-full relative overflow-hidden">
            <div className="h-full bg-cover bg-center relative w-full">
              <iframe
                width="100%"
                height="100%"
                src="https://www.openstreetmap.org/export/embed.html?bbox=88.24356079101564%2C22.476395980457973%2C88.56491088867189%2C22.690369008583705&amp;layer=mapnik&amp;marker=22.58342403920957%2C88.40423583984375"
                style={{ border: "none" }}
                className="transition-transform duration-300 hover:scale-105"
              ></iframe>
              
              {/* Map overlay with location info */}
              <div className={`absolute bottom-4 left-4 right-4 ${darkMode ? 'bg-black/60' : 'bg-white/80'} rounded-lg p-3 border-2 ${darkMode ? 'border-lime-600/60' : 'border-orange-400/60'} shadow-lg`}>
                <div className={`text-xs font-medium ${darkMode ? 'text-lime-100' : 'text-gray-800'}`}>
                  📍 Kolkata, West Bengal
                </div>
                <div className={`text-xs ${darkMode ? 'text-lime-200' : 'text-gray-600'}`}>
                  Ready to connect!
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Me Button */}
        {hide && (
          <div
            className={`flex items-center justify-center md:block w-8 h-[70vh] ml-4 ${
              darkMode ? "text-white bg-lime-600" : "text-gray-800 bg-orange-400"
            } rounded-lg shadow-lg border-2 ${darkMode ? 'border-lime-500' : 'border-orange-300'} transition-all duration-300 hover:scale-105`}
          >
            <h2
              className={`text-sm font-bold text-center px-1 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                letterSpacing: "2px",
              }}
            >
              Contact me
            </h2>
          </div>
        )}
      </div>

      {/* Animated Modal */}
      <AnimatedModal 
        isOpen={modalState.isOpen} 
        status={modalState.status} 
        onClose={closeModal} 
        darkMode={darkMode}
      />

      <style jsx>{`
        @keyframes scale-in {
          0% {
            transform: scale(0.9);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Contact;