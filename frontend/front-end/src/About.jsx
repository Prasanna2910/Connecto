import React from "react";
import { useNavigate } from "react-router-dom";
import handshakeimage from "./assets/handshakeIMG.png";

function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-teal-50 to-sky-50 text-gray-900 flex flex-col font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-16 py-4 md:py-6 backdrop-blur-md bg-white/40 sticky top-0 z-50 shadow-sm">
        <div className="font-bold text-2xl text-teal-700 tracking-wide">Connecto</div>

        <div className="flex gap-6 md:gap-10 font-semibold text-lg md:text-xl tracking-wide">
          <h1
            className="hover:text-sky-600 transition-all cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </h1>
          <h1 className="hover:text-sky-600 transition-all cursor-pointer">
            Case Studies
          </h1>
          <h1 className="hover:text-sky-600 transition-all cursor-pointer">
            Components
          </h1>
        </div>
      </nav>

      {/* Header Section */}
      <div className="text-center flex flex-col items-center px-6 md:px-12 py-12 md:py-16 space-y-6 animate-fadeIn">
        <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl leading-snug w-full md:w-2/3">
          At <span className="text-teal-600">Connecto</span>, Every Job Becomes Recognized — 
          <br className="hidden sm:block" /> Become a Professional
        </h1>
        <p className="text-gray-600 text-base sm:text-lg md:text-xl font-light md:w-1/2">
          Connecto — A User-friendly, Accessible, and Dynamic platform for everyone.
        </p>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-20 py-8 md:py-12 gap-12">
        {/* Left Text */}
        <div className="md:w-1/2 text-justify space-y-6 animate-fadeIn">
          <h2 className="font-semibold text-2xl sm:text-3xl md:text-4xl text-gray-800">
            Welcome to Connecto — Bridging Talent with Opportunities
          </h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            At <b>Connecto</b>, we are dedicated to empowering rural communities by
            providing a seamless link between job seekers and providers. Our vision
            is to enhance employment accessibility and connect untapped rural
            professionals with diverse industries, fostering mutual growth and
            development.
          </p>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            Rural job seekers can easily register and showcase their skills, while
            employers can browse through a rich database of motivated individuals
            ready to bring their talent to the table. Together, we’re building
            bridges that transform potential into success.
          </p>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center items-center">
          <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full bg-white shadow-xl flex items-center justify-center overflow-hidden animate-float">
            <img
              src={handshakeimage}
              alt="Handshake"
              className="w-64 sm:w-72 md:w-[22rem] object-contain"
            />
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-center items-center py-8">
        <button
          onClick={() => {
            navigate(`/`);
            console.log("Navigation to Splash successful");
          }}
          className="relative inline-flex items-center justify-center w-48 h-12 bg-teal-600 text-white text-lg font-medium rounded-full shadow-md overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl 
                     before:absolute before:top-0 before:-left-full before:w-full before:h-full 
                     before:bg-gradient-to-r before:from-teal-400 before:to-sky-500 
                     before:transition-all before:duration-500 hover:before:left-0"
        >
          Back
        </button>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-4 text-sm">
        © {new Date().getFullYear()} Connecto — All Rights Reserved.
      </footer>

      {/* Custom Animations (Tailwind-compatible inline styles) */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default About;
