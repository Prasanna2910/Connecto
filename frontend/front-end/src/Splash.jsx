import react, { useEffect, useState } from 'react';
import axios from 'axios';
import EntityCard from './EntityCard';
import Login from './Login';
import './App.css';
// import mainpagelogo from './assets/workerbackground.png';
import connectoLogo from './assets/blacksplash.png';
import workerimage from './assets/worker_image-removebg-preview.png';
import { useNavigate } from 'react-router-dom';

function Splash() {
  const [entities, setEntities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3553/main')
      .then((res) => {
        console.log('get in frontend is working');
        if (res.data.length > 0) {
          setEntities(res.data);
        }
      })
      .catch((error) => {
        console.log('error in getting', error);
      });
  }, []);
  return (
    <div className="bg-[#171717] h-full flex ">
      <div className="w-1/2 h-screen justify-center items-center ml-28 grid">
        <img src={workerimage} alt="" className="w-1/5 absolute top-20 " />
        <img
          src={connectoLogo}
          alt=""
          className=" w-1/5 h-2/6  absolute top-72  "
        />
      </div>
      <div className="bg-[#DA0037] w-3/4">
        <div className="mt-24 w-1/2 ml-32 text-center">
          <h1 className="text-6xl font-semibold text-white">Welcome!!</h1>
          <br />
          <p className='text-white text-xl'>A platform for everyone to find work</p>
          <p className="text-white text-l">Work with Us</p>
          <p className="text-white text-l">Work from Us</p>
          <p className="text-white text-xl">Let us Work Together</p>
        </div>
        <div className="mt-8 ml-[226px]">
          <button
            className="text-white hover:text-green-500 backdrop-blur-lg bg-gradient-to-tr bg-black via-[rgba(121,121,121,0.16)]  rounded-md py-1 px-4 shadow hover:shadow-white duration-700"
            onClick={() => {
              navigate(`/Login`);
            }}
          >
            Get started
          </button>
        </div>
      </div>
      {/* <div className="grid grid-cols-2 gap-8 ">
        {entities.map((entity, index) => (
          <div
            key={index}
            className=" w-8/12 ml-20 bg-white  rounded-xl grid items-center"
          >
            <div>
              <EntityCard key={index} entity={entity} />
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}
export default Splash;
