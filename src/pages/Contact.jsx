import React, { useState, Fragment, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

// Contact type options
const contactOptions = [
  { value: "recruiter", label: "🏢 Recruiter" },
  { value: "student", label: "🎓 Student" },
  { value: "visitor", label: "👋 Visitor" },
];

const PaperPlaneIcon = ({ className, style }) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

const PaperBoatIcon = ({ className, style }) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2M12 10.5L8.5 14H15.5L12 10.5M6 16L12 20L18 16H6Z" />
  </svg>
);

const FloatingElements = ({ darkMode, status }) => {
  const [planes, setPlanes] = useState([]);
  const [boats, setBoats] = useState([]);

  useEffect(() => {
    if (status === "loading") {
      const initialPlanes = Array.from({ length: 3 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: i * 0.8,
        size: Math.random() * 0.5 + 0.8,
      }));

      const initialBoats = Array.from({ length: 2 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: i * 1.2 + 0.5,
        size: Math.random() * 0.3 + 0.7,
      }));

      setPlanes(initialPlanes);
      setBoats(initialBoats);
    }
  }, [status]);

  if (status !== "loading") return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {planes.map((plane) => (
        <PaperPlaneIcon
          key={`plane-${plane.id}`}
          className={`absolute w-6 h-6 ${
            darkMode ? "text-emerald-400/40" : "text-emerald-600/40"
          }`}
          style={{
            left: `${plane.x}%`,
            top: `${plane.y}%`,
            transform: `scale(${plane.size}) rotate(45deg)`,
            animation: `floatPlane 4s ease-in-out infinite ${plane.delay}s`,
          }}
        />
      ))}

      {boats.map((boat) => (
        <PaperBoatIcon
          key={`boat-${boat.id}`}
          className={`absolute w-5 h-5 ${
            darkMode ? "text-slate-400/30" : "text-slate-600/30"
          }`}
          style={{
            left: `${boat.x}%`,
            top: `${boat.y}%`,
            transform: `scale(${boat.size})`,
            animation: `floatBoat 5s ease-in-out infinite ${boat.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const AnimatedModal = ({ isOpen, status, onClose, darkMode }) => {
  if (!isOpen) return null;

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <div className="text-center relative">
            <div className="relative mb-8">
              <div className="relative w-40 h-40 mx-auto">
                <div
                  className={`absolute inset-0 rounded-full ${
                    darkMode ? "bg-emerald-500/10" : "bg-emerald-500/10"
                  }`}
                  style={{
                    animation: "pulseRing 2s ease-out infinite",
                  }}
                ></div>

                <div
                  className={`absolute inset-6 rounded-full ${
                    darkMode ? "bg-emerald-500/20" : "bg-emerald-500/20"
                  }`}
                  style={{
                    animation: "pulseRing 2s ease-out infinite 0.7s",
                  }}
                ></div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={`w-16 h-16 rounded-full ${
                      darkMode ? "bg-emerald-500" : "bg-emerald-600"
                    } flex items-center justify-center shadow-lg`}
                    style={{
                      animation: "bounce 1.5s ease-in-out infinite",
                    }}
                  >
                    <PaperPlaneIcon
                      className="w-8 h-8 text-white"
                      style={{
                        transform: "rotate(45deg)",
                        animation: "wiggle 0.8s ease-in-out infinite",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <h3
              className={`text-2xl font-bold mb-3 ${
                darkMode ? "text-white" : "text-slate-800"
              }`}
              style={{ animation: "fadeInUp 0.6s ease-out 0.3s both" }}
            >
              Sending Message...
            </h3>

            <p
              className={`text-base ${
                darkMode ? "text-slate-400" : "text-slate-600"
              } mb-4`}
              style={{ animation: "fadeInUp 0.6s ease-out 0.5s both" }}
            >
              Your message is sailing through cyberspace!
            </p>
          </div>
        );

      case "success":
        return (
          <div className="text-center">
            <div className="mb-8">
              <div className="relative w-32 h-32 mx-auto">
                <div
                  className={`absolute inset-0 rounded-full ${
                    darkMode ? "bg-emerald-500" : "bg-emerald-600"
                  }`}
                  style={{ animation: "successPulse 0.8s ease-out" }}
                ></div>

                <div
                  className={`absolute inset-4 rounded-full ${
                    darkMode ? "bg-emerald-500" : "bg-emerald-600"
                  } flex items-center justify-center`}
                >
                  <svg
                    className="w-16 h-16 text-white"
                    style={{ animation: "checkDraw 0.8s ease-out 0.3s both" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <h3
              className={`text-2xl font-bold mb-3 ${
                darkMode ? "text-white" : "text-slate-800"
              }`}
              style={{ animation: "fadeInUp 0.6s ease-out 0.5s both" }}
            >
              Message Delivered! 🎉
            </h3>

            <p
              className={`text-base ${
                darkMode ? "text-slate-400" : "text-slate-600"
              }`}
              style={{ animation: "fadeInUp 0.6s ease-out 0.7s both" }}
            >
              Thank you for reaching out! I'll get back to you soon.
            </p>
          </div>
        );

      case "error":
        return (
          <div className="text-center">
            <div className="mb-8">
              <div className="relative w-32 h-32 mx-auto">
                <div
                  className="absolute inset-0 rounded-full bg-red-500 flex items-center justify-center"
                  style={{ animation: "errorShake 0.6s ease-out" }}
                >
                  <svg
                    className="w-16 h-16 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <h3
              className={`text-2xl font-bold mb-3 ${
                darkMode ? "text-white" : "text-slate-800"
              }`}
            >
              Oops! Message Lost in Transit 😔
            </h3>

            <p
              className={`text-base ${
                darkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Your message couldn't be sent. Please try again.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes pulseRing {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes floatPlane {
          0%, 100% { transform: translateX(0) translateY(0) rotate(45deg); }
          50% { transform: translateX(20px) translateY(-10px) rotate(40deg); }
        }
        @keyframes floatBoat {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
          50% { transform: translateX(-15px) translateY(-8px) rotate(-8deg); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(45deg); }
          50% { transform: rotate(50deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes successPulse {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes checkDraw {
          0% { stroke-dasharray: 0 50; stroke-dashoffset: 0; }
          100% { stroke-dasharray: 50 50; stroke-dashoffset: 0; }
        }
        @keyframes errorShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes modalSlideIn {
          from { opacity: 0; transform: scale(0.8) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-all duration-500"
          onClick={status !== "loading" ? onClose : undefined}
        ></div>

        <div
          className={`relative w-full max-w-lg mx-auto rounded-3xl p-10 shadow-2xl transition-all duration-500 ${
            darkMode
              ? "bg-slate-800 border border-slate-700"
              : "bg-white border border-slate-200"
          }`}
          style={{ animation: "modalSlideIn 0.5s ease-out" }}
        >
          <FloatingElements darkMode={darkMode} status={status} />

          {status !== "loading" && (
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                darkMode
                  ? "hover:bg-slate-700 text-slate-400 hover:text-white"
                  : "hover:bg-slate-100 text-slate-400 hover:text-slate-900"
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          <div className="relative z-10">{renderContent()}</div>
        </div>
      </div>
    </>
  );
};

const Contact = ({ darkMode }) => {
  const [modalState, setModalState] = useState({ isOpen: false, status: null, errorMessage: "" });
  const [contactType, setContactType] = useState(contactOptions[0]);
  const [formData, setFormData] = useState({ email: "", name: "", message: "" });

  const isFormValid = formData.email.trim() && formData.name.trim() && formData.message.trim();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setModalState({ isOpen: true, status: "loading", errorMessage: "" });

    const data = {
      email: formData.email,
      name: formData.name,
      contactType: contactType.value,
      message: formData.message,
    };

    try {
      const response = await fetch(
        "https://my-vercel-api-olive.vercel.app/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      await new Promise((resolve) => setTimeout(resolve, 2500));

      if (response.ok) {
        setModalState({ isOpen: true, status: "success", errorMessage: "" });
        setFormData({ email: "", name: "", message: "" });
        setContactType(contactOptions[0]);
      } else {
        const errorData = await response.json();
        setModalState({
          isOpen: true,
          status: "error",
          errorMessage: errorData.error || "Failed to send message",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setModalState({
        isOpen: true,
        status: "error",
        errorMessage: "Network error occurred.",
      });
    }
  };

  const closeModal = () => {
    setModalState({ isOpen: false, status: null, errorMessage: "" });
  };

  return (
    <>
      <div className={`h-[100vh] flex items-center justify-center py-10 transition-colors duration-300 ${darkMode ? "bg-slate-900" : "bg-slate-50"}`}>
        <div
          className={`relative flex mx-[2vw] flex-wrap items-center justify-center border rounded-2xl overflow-hidden max-w-5xl w-full md:mx-auto h-[70vh] transition-all duration-300 hover:shadow-2xl ${
            darkMode
              ? "bg-slate-800 border-slate-700 shadow-xl"
              : "bg-white border-slate-200 shadow-xl"
          }`}
        >
          {/* Left Side: Contact Form */}
          <div
            className={`w-full lg:w-2/3 p-8 flex flex-col justify-center h-full transition-colors duration-300 ${
              darkMode ? "bg-slate-800 text-white" : "bg-white text-slate-800"
            }`}
          >
            <div>
              <h2 className={`text-2xl font-bold mb-1 ${darkMode ? "text-white" : "text-slate-900"}`}>
                Let's Talk
              </h2>
              <p className={`text-sm mb-6 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                I'd love to hear from you. Send me a message!
              </p>

              <div className="space-y-4 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className={`block text-xs font-medium mb-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email"
                      className={`w-full px-4 py-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                        darkMode
                          ? "bg-slate-700 border-slate-600 text-white focus:ring-emerald-500 focus:border-transparent"
                          : "bg-slate-50 border-slate-200 text-slate-900 focus:ring-emerald-500 focus:border-transparent"
                      }`}
                    />
                  </div>
                  <div>
                    <label htmlFor="name" className={`block text-xs font-medium mb-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your name"
                      className={`w-full px-4 py-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                        darkMode
                          ? "bg-slate-700 border-slate-600 text-white focus:ring-emerald-500 focus:border-transparent"
                          : "bg-slate-50 border-slate-200 text-slate-900 focus:ring-emerald-500 focus:border-transparent"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>Who is contacting?</label>
                  <Listbox value={contactType} onChange={setContactType}>
                    <div className="relative mt-1">
                      <Listbox.Button
                        className={`relative w-full cursor-pointer rounded-lg border py-2.5 pl-4 pr-10 text-left focus:outline-none focus:ring-2 transition-all ${
                          darkMode
                            ? "bg-slate-700 border-slate-600 text-white focus:ring-emerald-500"
                            : "bg-slate-50 border-slate-200 text-slate-900 focus:ring-emerald-500"
                        }`}
                      >
                        <span className="block truncate">{contactType.label}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <ChevronDown className="h-5 w-5 text-slate-400" />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options
                          className={`absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg shadow-lg ring-1 ring-black/5 focus:outline-none ${
                            darkMode ? "bg-slate-700 text-white" : "bg-white text-slate-900"
                          }`}
                        >
                          {contactOptions.map((option) => (
                            <Listbox.Option
                              key={option.value}
                              value={option}
                              className={({ active }) =>
                                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? darkMode ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-900"
                                    : ""
                                }`
                              }
                            >
                              {({ selected }) => (
                                <>
                                  <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                                    {option.label}
                                  </span>
                                  {selected ? (
                                    <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}>
                                      <Check className="h-5 w-5" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>

                <div className="flex-1">
                  <label htmlFor="message" className={`block text-xs font-medium mb-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    rows="4"
                    placeholder="Write your message here..."
                    className={`w-full px-4 py-2.5 text-sm rounded-lg border resize-none focus:outline-none focus:ring-2 transition-all duration-200 ${
                      darkMode
                        ? "bg-slate-700 border-slate-600 text-white focus:ring-emerald-500 focus:border-transparent"
                        : "bg-slate-50 border-slate-200 text-slate-900 focus:ring-emerald-500 focus:border-transparent"
                    }`}
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleSubmit}
                    disabled={!isFormValid || modalState.status === "loading"}
                    className={`w-full md:w-auto flex items-center justify-center font-bold text-sm px-8 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                      darkMode
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-900/20"
                        : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20"
                    }`}
                  >
                    {modalState.status === "loading" ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Map */}
          <div className="hidden lg:flex w-full lg:w-1/3 h-full relative overflow-hidden">
            <div className="h-full bg-cover bg-center relative w-full">
              <iframe
                width="100%"
                height="100%"
                src="https://www.openstreetmap.org/export/embed.html?bbox=88.24356079101564%2C22.476395980457973%2C88.56491088867189%2C22.690369008583705&amp;layer=mapnik&amp;marker=22.58342403920957%2C88.40423583984375"
                style={{ border: "none", filter: darkMode ? "grayscale(100%) invert(90%)" : "grayscale(20%)" }}
                className="transition-transform duration-300 hover:scale-105 opacity-80 hover:opacity-100"
              ></iframe>
              <div
                className={`absolute bottom-4 left-4 right-4 rounded-lg p-3 border shadow-lg backdrop-blur-md ${
                  darkMode ? "bg-slate-900/80 border-slate-700" : "bg-white/90 border-slate-200"
                }`}
              >
                <div className={`text-xs font-bold ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}>
                  📍 Kolkata, West Bengal
                </div>
                <div className={`text-xs ${darkMode ? "text-slate-300" : "text-slate-500"}`}>
                  Ready to connect!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatedModal
        isOpen={modalState.isOpen}
        status={modalState.status}
        onClose={closeModal}
        darkMode={darkMode}
      />
    </>
  );
};

export default Contact;
