import react, { useEffect, useState } from 'react';
import axios from 'axios';
import EntityCard from './EntityCard';
import Login from './Login';
import './App.css';
// import mainpagelogo from './assets/workerbackground.png';
import connectoLogo from './assets/blacksplashA.png';
// import workerimage from './assets/worker_image-removebg-preview.png';
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
    <div className="bg-gray-400 h-full flex ">
      <div className="w-1/2 h-screen justify-center items-center ml-28 grid">
        {/* <img src={workerimage} alt="" className="w-1/5 absolute top-20 " /> */}
        <img
          src={connectoLogo}
          alt=""
          className=" w-2/5 h-4/5  absolute top-9 left-5  "
        />
      </div>
      <div className="bg-white w-3/4">
        <div className="mt-24 w-3/4 ml-20 text-center">
          <p className="text-black text-3xl font-bold">Work with Us</p>
          <br />
          <p className="text-black text-3xl font-bold">Work from Us</p>
          <br />
          <p className="text-black text-3xl font-bold">Let us Work Together</p>
          <br />
        </div>
        <div className="mt-7 ml-[248px]">
          <button
            className="text-red-400 border-red-400 border hover:text-red-400 backdrop-blur-lg bg-gradient-to-tr bg-white via-[rgba(121,121,121,0.16)]  rounded-md py-1 px-4 shadow hover:shadow-red-400 duration-700"
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
