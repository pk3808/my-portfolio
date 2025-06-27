import React from "react";

const Contact = ({ darkMode, hide }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      name: e.target.name.value,
      contactType: e.target.contactType.value,
      message: e.target.message.value,
    };

    try {
      const response = await fetch(
        "https://messageserver-production.up.railway.app/send-message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        alert("Message sent successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to send message: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending the message.");
    }
  };

  return (
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
              ? "text-white bg-[#014421]"
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
            <form onSubmit={handleSubmit} className="space-y-3 flex-1">
              {/* Email and Name in a row on larger screens */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="email" className={`block text-xs font-medium mb-1 ${darkMode ? 'text-lime-200' : 'text-gray-700'}`}>
                    Email
                  </label>
                  <input
                    id="email"
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
                  type="submit"
                  className={`md:w-[40%] w-full flex items-center justify-center ${
                    darkMode
                      ? "bg-[#DFFF00] hover:bg-[#CFFF00] text-[#1a5c35] border-2 border-lime-300"
                      : "bg-[#E3735E] hover:bg-[#D65A47] text-white border-2 border-orange-300"
                  } font-bold text-sm px-6 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105`}
                >
                  <span className="flex items-center">
                    Send Message
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
            </form>
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
  );
};

export default Contact;