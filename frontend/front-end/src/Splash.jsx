import react, { useEffect, useState } from 'react';
import axios from 'axios';
import EntityCard from './EntityCard';
import Login from './Login';
import './App.css';
import logoColor from './assets/logo-color1.png';
import workerimg from './assets/worker-animated-nobg.png';
import { useNavigate } from 'react-router-dom';

function Splash() {
  const [entities, setEntities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://connecto-dupe.onrender.com/main')
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
    <div className="p-1 m-1">
      <nav className="flex justify-between ">
        <div className="w-14 flex justify-evenly items-center ">
          <img src={logoColor} alt="" className="" />
        </div>

        <div className="flex gap-4 justify-evenly items-center font-semibold w-1/2">
          <h1 className='hover:underline' onClick={()=>{
            navigate("/About")
          }}>About</h1>
          <h1 className='hover:underline'>Case studies</h1>
          <h1 className='hover:underline'>Components</h1>
        </div>
      </nav>
      <br />
      
      <div className="flex ">
        <div className="m-4 p-4  w-1/2">
          <div className=" w-3/4 text-justify">
            <h1 className="font-semibold text-3xl">
              Unbeatable place to grow and find right person to work.{' '}
            </h1>
          </div>
          <br />
          <div className=" w-3/5 text-justify">
            <p>
              Work with us. Work from us. Get connected with Connecto. Trusted
              by many people
            </p>
          </div>
          <br />
          <div>
            <button
              className="w-52 bg-black p-2 h-[50px] my-3 flex items-center justify-center rounded cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-sky-500 before:to-sky-500 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded hover:before:left-0 text-[#fff] font-medium"
              onClick={() => {
                navigate(`/Login`);
              }}
            >
              Click Here to Proceed
            </button>
          </div>
        </div>
        <div className="flex justify-around items-center w-1/2">
          <div className=" size-80 rounded-full flex items-center justify-around bg-sky-100">
            <img src={workerimg} alt="" className=" w-64 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Splash;

{
  /* <div className="grid grid-cols-2 gap-8 ">
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
</div> */
}

// <div className="bg-gray-400 h-full flex ">
//   <div className="w-1/2 h-screen justify-center items-center ml-28 grid">
//     {/* <img src={workerimage} alt="" className="w-1/5 absolute top-20 " /> */}
//     <img
//       src={connectoLogo}
//       alt=""
//       className=" w-2/5 h-4/5  absolute top-9 left-5  "
//     />
//   </div>
//   <div className="bg-white w-3/4">
//     <div className="mt-24 w-3/4 ml-20 text-center">
//       <p className="text-black text-3xl font-bold">Work with Us</p>
//       <br />
//       <p className="text-black text-3xl font-bold">Work from Us</p>
//       <br />
//       <p className="text-black text-3xl font-bold">Let us Work Together</p>
//       <br />
//     </div>
//     <div className="flex justify-center items-center">
//       <button
//         className="text-red-400 border-red-400 border hover:text-red-400 backdrop-blur-lg bg-gradient-to-tr bg-white via-[rgba(121,121,121,0.16)]  rounded-md py-1 px-4 shadow hover:shadow-red-400 duration-700"
//         onClick={() => {
//           navigate(`/Login`);
//         }}
//       >
//         Get started
//       </button>
//     </div>
//   </div>
// </div>
