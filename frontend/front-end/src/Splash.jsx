import React from "react";
import { useNavigate } from "react-router-dom";
import logoColor from "./assets/logo-color1.png";
import workerimg from "./assets/worker-animated-nobg.png";

function Splash() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-sky-50 to-sky-100 text-gray-900 flex flex-col font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-16 py-4 md:py-6 backdrop-blur-md bg-white/40 sticky top-0 z-50 shadow-sm">
        <div className="w-20 md:w-24 flex items-center">
          <img src={logoColor} alt="logo" className="w-full" />
        </div>

        <div className="flex gap-6 md:gap-10 font-semibold text-lg md:text-xl tracking-wide">
          <h1
            className="hover:text-sky-600 transition-all cursor-pointer"
            onClick={() => navigate("/About")}
          >
            About
          </h1>
          <h1 className="hover:text-sky-600 transition-all cursor-pointer">
            Case Studies
          </h1>
          <h1 className="hover:text-sky-600 transition-all cursor-pointer">
            Components
          </h1>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row justify-between items-center flex-1 px-8 md:px-20 py-8 md:py-16 gap-10 md:gap-20">
        {/* Left Content */}
        <div className="md:w-1/2 space-y-8 animate-fadeIn">
          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight text-gray-800">
            Unbeatable place to{" "}
            <span className="text-sky-600">grow</span> and find the right
            person to <span className="text-sky-600">work</span>.
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed md:w-4/5">
            Work with us. Work from us. Get connected with{" "}
            <b>Connecto</b> — a trusted platform that bridges opportunities for
            everyone, from corporate to craft.
          </p>

          <button
            onClick={() => navigate("/Login")}
            className="relative inline-flex items-center justify-center w-60 h-14 bg-sky-600 text-white text-lg font-medium rounded-full shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl 
                       before:absolute before:top-0 before:-left-full before:w-full before:h-full 
                       before:bg-gradient-to-r before:from-sky-400 before:to-sky-600 
                       before:transition-all before:duration-500 hover:before:left-0"
          >
            Click Here to Proceed
          </button>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center items-center">
          <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full bg-white shadow-xl flex items-center justify-center overflow-hidden animate-float">
            <img
              src={workerimg}
              alt="worker"
              className="w-72 sm:w-80 md:w-[22rem] object-contain"
            />
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default Splash;
