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
      // Initialize floating planes
      const initialPlanes = Array.from({ length: 3 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: i * 0.8,
        size: Math.random() * 0.5 + 0.8,
      }));

      // Initialize floating boats
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
      {/* Paper Planes */}
      {planes.map((plane) => (
        <PaperPlaneIcon
          key={`plane-${plane.id}`}
          className={`absolute w-6 h-6 ${
            darkMode ? "text-[#DFFF00]/40" : "text-[#E3735E]/40"
          }`}
          style={{
            left: `${plane.x}%`,
            top: `${plane.y}%`,
            transform: `scale(${plane.size}) rotate(45deg)`,
            animation: `floatPlane 4s ease-in-out infinite ${plane.delay}s`,
          }}
        />
      ))}

      {/* Paper Boats */}
      {boats.map((boat) => (
        <PaperBoatIcon
          key={`boat-${boat.id}`}
          className={`absolute w-5 h-5 ${
            darkMode ? "text-[#FFD580]/30" : "text-[#D65A47]/30"
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
            {/* Main Animation Container */}
            <div className="relative mb-8">
              <div className="relative w-40 h-40 mx-auto">
                {/* Outer Pulse Ring */}
                <div
                  className={`absolute inset-0 rounded-full ${
                    darkMode ? "bg-[#DFFF00]/10" : "bg-[#E3735E]/10"
                  }`}
                  style={{
                    animation: "pulseRing 2s ease-out infinite",
                  }}
                ></div>

                {/* Middle Pulse Ring */}
                <div
                  className={`absolute inset-6 rounded-full ${
                    darkMode ? "bg-[#DFFF00]/20" : "bg-[#E3735E]/20"
                  }`}
                  style={{
                    animation: "pulseRing 2s ease-out infinite 0.7s",
                  }}
                ></div>

                {/* Central Paper Plane */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={`w-16 h-16 rounded-full ${
                      darkMode ? "bg-[#DFFF00]" : "bg-[#E3735E]"
                    } flex items-center justify-center shadow-lg`}
                    style={{
                      animation: "bounce 1.5s ease-in-out infinite",
                    }}
                  >
                    <PaperPlaneIcon
                      className={`w-8 h-8 ${
                        darkMode ? "text-[#1a5c35]" : "text-white"
                      }`}
                      style={{
                        transform: "rotate(45deg)",
                        animation: "wiggle 0.8s ease-in-out infinite",
                      }}
                    />
                  </div>
                </div>

                {/* Orbiting Elements */}
                <div className="absolute inset-0">
                  <PaperBoatIcon
                    className={`absolute w-6 h-6 ${
                      darkMode ? "text-[#FFD580]" : "text-[#D65A47]"
                    }`}
                    style={{
                      top: "10%",
                      left: "50%",
                      transformOrigin: "50% 250%",
                      animation: "orbit 3s linear infinite",
                    }}
                  />
                  <PaperPlaneIcon
                    className={`absolute w-5 h-5 ${
                      darkMode ? "text-[#DFFF00]/70" : "text-[#E3735E]/70"
                    }`}
                    style={{
                      bottom: "10%",
                      right: "50%",
                      transformOrigin: "50% -150%",
                      transform: "rotate(180deg)",
                      animation: "orbit 3s linear infinite 1.5s",
                    }}
                  />
                </div>
              </div>
            </div>

            <h3
              className={`text-2xl font-bold mb-3 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
              style={{ animation: "fadeInUp 0.6s ease-out 0.3s both" }}
            >
              Sending Message...
            </h3>

            <p
              className={`text-base ${
                darkMode ? "text-[#FFD580]" : "text-gray-600"
              } mb-4`}
              style={{ animation: "fadeInUp 0.6s ease-out 0.5s both" }}
            >
              Your message is sailing through cyberspace!
            </p>

            <div
              className="flex items-center justify-center space-x-2"
              style={{ animation: "fadeInUp 0.6s ease-out 0.7s both" }}
            >
              <span
                className="text-2xl animate-bounce"
                style={{ animationDelay: "0s" }}
              >
                ✈️
              </span>
              <span
                className="text-xl animate-bounce"
                style={{ animationDelay: "0.2s" }}
              >
                ⛵
              </span>
              <span
                className="text-2xl animate-bounce"
                style={{ animationDelay: "0.4s" }}
              >
                📧
              </span>
            </div>
          </div>
        );

      case "success":
        return (
          <div className="text-center">
            <div className="mb-8">
              <div className="relative w-32 h-32 mx-auto">
                {/* Success Ring Animation */}
                <div
                  className={`absolute inset-0 rounded-full ${
                    darkMode ? "bg-[#DFFF00]" : "bg-[#E3735E]"
                  }`}
                  style={{ animation: "successPulse 0.8s ease-out" }}
                ></div>

                <div
                  className={`absolute inset-4 rounded-full ${
                    darkMode ? "bg-[#DFFF00]" : "bg-[#E3735E]"
                  } flex items-center justify-center`}
                >
                  <svg
                    className={`w-16 h-16 ${
                      darkMode ? "text-[#1a5c35]" : "text-white"
                    }`}
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

                {/* Celebration Elements */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-3 h-3 rounded-full ${
                        darkMode ? "bg-[#FFD580]" : "bg-[#D65A47]"
                      }`}
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: `rotate(${i * 60}deg) translateY(-60px)`,
                        animation: `celebrate 1s ease-out ${i * 0.1}s both`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            <h3
              className={`text-2xl font-bold mb-3 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
              style={{ animation: "fadeInUp 0.6s ease-out 0.5s both" }}
            >
              Message Delivered! 🎉
            </h3>

            <p
              className={`text-base ${
                darkMode ? "text-[#FFD580]" : "text-gray-600"
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

                {/* Broken plane animation */}
                <PaperPlaneIcon
                  className="absolute w-6 h-6 text-red-300 top-2 right-2"
                  style={{
                    transform: "rotate(45deg)",
                    animation: "fallDown 1s ease-in 0.5s both",
                  }}
                />
              </div>
            </div>

            <h3
              className={`text-2xl font-bold mb-3 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Oops! Message Lost in Transit 😔
            </h3>

            <p
              className={`text-base ${
                darkMode ? "text-[#FFD580]" : "text-gray-600"
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
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }

        @keyframes floatPlane {
          0%,
          100% {
            transform: translateX(0) translateY(0) rotate(45deg);
          }
          25% {
            transform: translateX(10px) translateY(-5px) rotate(50deg);
          }
          50% {
            transform: translateX(20px) translateY(-10px) rotate(40deg);
          }
          75% {
            transform: translateX(15px) translateY(-5px) rotate(45deg);
          }
        }

        @keyframes floatBoat {
          0%,
          100% {
            transform: translateX(0) translateY(0) rotate(0deg);
          }
          25% {
            transform: translateX(-8px) translateY(-3px) rotate(-5deg);
          }
          50% {
            transform: translateX(-15px) translateY(-8px) rotate(-8deg);
          }
          75% {
            transform: translateX(-10px) translateY(-4px) rotate(-3deg);
          }
        }

        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(45deg);
          }
          25% {
            transform: rotate(50deg);
          }
          75% {
            transform: rotate(40deg);
          }
        }

        @keyframes orbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes successPulse {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes checkDraw {
          0% {
            stroke-dasharray: 0 50;
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dasharray: 50 50;
            stroke-dashoffset: 0;
          }
        }

        @keyframes celebrate {
          0% {
            transform: rotate(var(--rotation)) translateY(0) scale(0);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: rotate(var(--rotation)) translateY(-100px) scale(1);
            opacity: 0;
          }
        }

        @keyframes errorShake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        @keyframes fallDown {
          0% {
            transform: rotate(45deg) translateY(0);
            opacity: 1;
          }
          100% {
            transform: rotate(45deg) translateY(20px);
            opacity: 0;
          }
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
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
              ? "bg-gradient-to-br from-[#022a02] via-[#1a4a1a] to-[#355E3B] border-2 border-[#DFFF00]/40"
              : "bg-gradient-to-br from-[#FAD5A5] via-[#FAC898] to-[#F4A460] border-2 border-[#E97451]/40"
          }`}
          style={{
            animation: "modalSlideIn 0.5s ease-out",
            backgroundImage: darkMode
              ? "radial-gradient(circle at 20% 30%, rgba(223, 255, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255, 213, 128, 0.1) 0%, transparent 50%)"
              : "radial-gradient(circle at 20% 30%, rgba(227, 115, 94, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(212, 90, 71, 0.1) 0%, transparent 50%)",
          }}
        >
          {/* Floating Background Elements */}
          <FloatingElements darkMode={darkMode} status={status} />

          {/* Close Button */}
          {status !== "loading" && (
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                darkMode
                  ? "hover:bg-[#355E3B] text-[#FFD580] hover:text-white"
                  : "hover:bg-[#FAC898] text-[#E97451] hover:text-gray-700"
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          {/* Main Content */}
          <div className="relative z-10">{renderContent()}</div>
        </div>
      </div>
    </>
  );
};

const Contact = ({ darkMode }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    status: null,
    errorMessage: "",
  });
  const [contactType, setContactType] = useState(contactOptions[0]);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    message: "",
  });

  const isFormValid =
    formData.email.trim() && formData.name.trim() && formData.message.trim();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      await new Promise((resolve) => setTimeout(resolve, 2500)); // Increased delay to show animations

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
        errorMessage:
          "Network error occurred. Please check your connection and try again.",
      });
    }
  };

  const closeModal = () => {
    setModalState({ isOpen: false, status: null, errorMessage: "" });
  };

  return (
    <>
      <style jsx>{`
        @keyframes fly {
          0% {
            transform: translateX(-10px);
            opacity: 0.3;
          }
          50% {
            transform: translateX(20px);
            opacity: 0.7;
          }
          100% {
            transform: translateX(-10px);
            opacity: 0.3;
          }
        }
      `}</style>
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
              <h2
                className={`text-2xl font-bold mb-3 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Let's{" "}
                <span
                  className={`${
                    darkMode ? "text-[#FFD580]" : "text-[#E97451]"
                  }`}
                >
                  Talk
                </span>
              </h2>
              <div className="space-y-3 flex-1">
                {/* Email and Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="email"
                      className={`block text-xs font-medium mb-1 ${
                        darkMode ? "text-lime-200" : "text-gray-700"
                      }`}
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="Enter your email"
                      className={`w-full px-3 py-2 text-sm rounded-lg border shadow-md focus:outline-none focus:ring-2 transition-all duration-200 ${
                        darkMode
                          ? "bg-[#355E3B] text-white border-lime-600/50 focus:ring-lime-500"
                          : "bg-[#FAC898] text-black border-orange-400/50 focus:ring-orange-500"
                      }`}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className={`block text-xs font-medium mb-1 ${
                        darkMode ? "text-lime-200" : "text-gray-700"
                      }`}
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="Enter your name"
                      className={`w-full px-3 py-2 text-sm rounded-lg border shadow-md focus:outline-none focus:ring-2 transition-all duration-200 ${
                        darkMode
                          ? "bg-[#355E3B] text-white border-lime-600/50 focus:ring-lime-500"
                          : "bg-[#FAC898] text-black border-orange-400/50 focus:ring-orange-500"
                      }`}
                    />
                  </div>
                </div>

                {/* Contact Type (HeadlessUI Dropdown) */}
                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${
                      darkMode ? "text-lime-200" : "text-gray-700"
                    }`}
                  >
                    Who is contacting?
                  </label>
                  <Listbox value={contactType} onChange={setContactType}>
                    <div className="relative mt-1">
                      <Listbox.Button
                        className={`relative w-full cursor-pointer rounded-lg border py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus:ring-2 ${
                          darkMode
                            ? "bg-[#355E3B] text-white border-lime-600/50 focus:ring-lime-500"
                            : "bg-[#FAC898] text-black border-orange-400/50 focus:ring-orange-500"
                        }`}
                      >
                        <span className="block truncate">
                          {contactType.label}
                        </span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options
                          className={`absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg shadow-lg ring-1 ring-black/10 focus:outline-none ${
                            darkMode ? "bg-[#355E3B]" : "bg-white"
                          }`}
                        >
                          {contactOptions.map((option) => (
                            <Listbox.Option
                              key={option.value}
                              value={option}
                              className={({ active }) =>
                                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? darkMode
                                      ? "bg-lime-600 text-white"
                                      : "bg-orange-400 text-white"
                                    : ""
                                }`
                              }
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    {option.label}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-400">
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

                {/* Message */}
                <div className="flex-1">
                  <label
                    htmlFor="message"
                    className={`block text-xs font-medium mb-1 ${
                      darkMode ? "text-lime-200" : "text-gray-700"
                    }`}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    rows="4"
                    placeholder="Write your message here..."
                    className={`w-full px-3 py-2 text-sm rounded-lg border resize-none shadow-md focus:outline-none focus:ring-2 transition-all duration-200 ${
                      darkMode
                        ? "bg-[#355E3B] text-white border-lime-600/50 focus:ring-lime-500"
                        : "bg-[#FAC898] text-black border-orange-400/50 focus:ring-orange-500"
                    }`}
                  ></textarea>
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    onClick={handleSubmit}
                    disabled={!isFormValid || modalState.status === "loading"}
                    className={`md:w-[40%] w-full flex items-center justify-center font-bold text-sm px-6 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                      darkMode
                        ? "bg-[#DFFF00] hover:bg-[#CFFF00] text-[#1a5c35] border-2 border-lime-300"
                        : "bg-[#E3735E] hover:bg-[#D65A47] text-white border-2 border-orange-300"
                    }`}
                  >
                    <span className="flex items-center">
                      {modalState.status === "loading"
                        ? "Sending..."
                        : "Send Message"}
                    </span>
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
                style={{ border: "none" }}
                className="transition-transform duration-300 hover:scale-105"
              ></iframe>
              <div
                className={`absolute bottom-4 left-4 right-4 ${
                  darkMode ? "bg-black/60" : "bg-white/80"
                } rounded-lg p-3 border-2 ${
                  darkMode ? "border-lime-600/60" : "border-orange-400/60"
                } shadow-lg`}
              >
                <div
                  className={`text-xs font-medium ${
                    darkMode ? "text-lime-100" : "text-gray-800"
                  }`}
                >
                  📍 Kolkata, West Bengal
                </div>
                <div
                  className={`text-xs ${
                    darkMode ? "text-lime-200" : "text-gray-600"
                  }`}
                >
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
