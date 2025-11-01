import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { IoSearchOutline, IoLocationSharp, IoGitNetworkSharp } from "react-icons/io5";
import { CgDesignmodo } from "react-icons/cg";
import { MdManageAccounts, MdDeveloperMode, MdOutlineCurrencyRupee, MdElectricalServices } from "react-icons/md";
import { HiServerStack } from "react-icons/hi2";
import { FaHackerrank, FaRegEye, FaTrowelBricks } from "react-icons/fa6";
import { SiPytest } from "react-icons/si";
import { GiArtificialHive, GiPipes, GiWoodPile, GiSwordSmithing, GiWaterTank } from "react-icons/gi";
import { LuFileClock } from "react-icons/lu";

function Mainpg() {
  const [entities, setEntities] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  // Fetch data
  useEffect(() => {
    axios
      .get("http://localhost:3553/main")
      .then((res) => {
        if (res.data.length > 0) {
          setEntities(res.data);
          setFiltered(res.data);
        }
      })
      .catch((error) => console.log("Error fetching data:", error));
  }, []);

  // Toast Notification
  const notify = () => {
    toast.success("Your person is available!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  // Handle Search Input
  const handleInput = (e) => {
    const input = e.target.value.toLowerCase();
    if (input === "") setFiltered(entities);
    else {
      const results = entities.filter((el) =>
        el.Work.toLowerCase().includes(input)
      );
      setFiltered(results);
    }
  };

  // Filter by job
  const filterEntities = (work) => {
    const results = entities.filter((entity) => entity.Work === work);
    setFiltered(results);
  };

  // ✅ Send SMS when Connect button is clicked
  const handleConnect = async (entity) => {
  notify(); // show toast

  try {
    await axios.post("http://localhost:3553/send-sms", {
      phone: entity.PhoneNumber, // number from DB
      message: `Hello ${entity.Name}, someone is interested in connecting with you for the ${entity.Work} job!`,
    });
    console.log("SMS sent successfully!");
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
};


  if (entities.length === 0) {
    return (
      <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-sky-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-100">
      {/* Header */}
      <div className="text-center py-10 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 tracking-wide">
          Find People Here
        </h1>
        <button
          onClick={() => navigate("/Applyform")}
          className="px-8 py-3 bg-gradient-to-r from-sky-500 to-cyan-400 text-white rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all"
        >
          Apply Yourself
        </button>

        {/* Search Bar */}
        <div className="mt-10 flex justify-center">
          <div className="w-full md:w-1/2 bg-white shadow-lg rounded-full flex items-center px-5 border border-gray-200">
            <IoSearchOutline className="text-gray-500 text-2xl" />
            <input
              type="text"
              placeholder="Search for skills or works..."
              onChange={handleInput}
              className="w-full px-4 py-3 outline-none rounded-full text-gray-700 text-lg"
            />
          </div>
        </div>
      </div>

      {/* Job Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 px-6 mb-10">
        {[
          { label: "Plumber", icon: <GiPipes /> },
          { label: "Carpenter", icon: <GiWoodPile /> },
          { label: "Supervisor", icon: <FaRegEye /> },
          { label: "Mason", icon: <FaTrowelBricks /> },
          { label: "Waterman", icon: <GiWaterTank /> },
          { label: "Electrician", icon: <MdElectricalServices /> },
          { label: "Smith", icon: <GiSwordSmithing /> },
          { label: "UX Architect", icon: <CgDesignmodo /> },
          { label: "HR", icon: <MdManageAccounts /> },
          { label: "Developer", icon: <MdDeveloperMode /> },
          { label: "Serverman", icon: <HiServerStack /> },
          { label: "Hacker", icon: <FaHackerrank /> },
          { label: "Tester", icon: <SiPytest /> },
          { label: "AI", icon: <GiArtificialHive /> },
        ].map((job, i) => (
          <button
            key={i}
            onClick={() => filterEntities(job.label)}
            className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-md hover:shadow-lg hover:bg-sky-50 border border-gray-200 transition-all text-gray-700 font-medium"
          >
            {job.icon} {job.label}
          </button>
        ))}
      </div>

      {/* User Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 px-8 pb-16 justify-items-center">
        {filtered.map((entity, index) => (
          <div
            key={index}
            className="bg-white w-full max-w-md rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 p-6"
          >
            {/* Profile */}
            <div className="flex items-center gap-4">
              <img
                src={entity.Profile}
                alt="Profile"
                className="w-16 h-16 rounded-full border-2 border-sky-400 object-cover"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-800">{entity.Name}</h3>
                <p className="text-sky-600 font-medium">{entity.Work}</p>
              </div>
            </div>

            {/* Details */}
            <div className="mt-4 border-t pt-4 text-gray-700 space-y-2">
              <div className="flex items-center gap-2">
                <LuFileClock className="text-sky-500" />
                <span>{entity.WorkExp}</span>
              </div>
              <div className="flex items-center gap-2">
                <IoLocationSharp className="text-sky-500" />
                <span>{entity.Location}</span>
              </div>
              <div className="flex items-center gap-2">
                <MdOutlineCurrencyRupee className="text-sky-500" />
                <span>{entity.ExpectedSalary}</span>
              </div>
              <div className="flex items-center gap-2">
                <IoGitNetworkSharp className="text-sky-500" />
                <span>{entity.Email}</span>
              </div>
              <p className="text-gray-500">{entity.PhoneNumber}</p>
            </div>

            {/* ✅ Connect Button */}
            <div className="flex justify-end mt-5">
              <button
  onClick={() => handleConnect(entity)}
  className="px-5 py-2 bg-gradient-to-r from-sky-500 to-cyan-400 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
>
  Connect
</button>

            </div>
          </div>
        ))}
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default Mainpg;
