import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import EntityCard from './EntityCard';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { IoSearchOutline } from 'react-icons/io5';
import { CgDesignmodo } from 'react-icons/cg';
import { MdManageAccounts } from 'react-icons/md';
import { MdDeveloperMode } from 'react-icons/md';
import { HiServerStack } from 'react-icons/hi2';
import { FaHackerrank } from 'react-icons/fa';
import { SiPytest } from 'react-icons/si';
import { GiArtificialHive } from 'react-icons/gi';
import { GiPipes } from 'react-icons/gi';
import { GiWoodPile } from 'react-icons/gi';
import { FaRegEye } from 'react-icons/fa';
import { FaTrowelBricks } from 'react-icons/fa6';
import { GiWaterTank } from 'react-icons/gi';
import { MdElectricalServices } from 'react-icons/md';
import { GiSwordSmithing } from 'react-icons/gi';
import { IoGitNetworkSharp } from 'react-icons/io5';
import { LuFileClock } from 'react-icons/lu';

function Mainpg() {
  // toast.configure();
  const [entities, setEntities] = useState([]);
  const [array, setArray] = useState([]);
  const [activeButton, setActiveButton] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get('http://localhost:3553/main')
      .then((res) => {
        console.log('Fetch successful');
        if (res.data.length > 0) {
          setEntities(res.data);
          setArray(res.data);
        }
      })
      .catch((error) => {
        console.log('error in getting', error);
      });
  }, []);
  const notify = () => {
    toast.success('Your person is available');
  };
  const handleInput = (e) => {
    console.log(e.value);
    let input = e.value.toLowerCase();
    console.log(entities);
    let modarr = entities.filter((element, index) => {
      if (e.value == '') {
        setEntities(entities);
      }
      let work = element.Work;
      work = work.toLowerCase();
      console.log(work.includes(input), element);
      return work.includes(input);
    });
    setArray(modarr);
  };
  const filterEntities = (work) => {
    const filtered = entities.filter((entity) => entity.Work === work);
    setArray(filtered);
    setActiveButton(work);
  };
  const refresh = () => {};

  console.log(array);
  if (entities.length === 0) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#0074A2_0deg,#0074A2_180deg,transparent_180deg,transparent_360deg)]">
          <span className="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#21C0FF_0deg,#0088BE_180deg,transparent_180deg,transparent_360deg)]"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="manindiv ">
      <div className="HeaderDiv bg-slate-100 h-96 p-2">
        <div className=" flex justify-center items-center m-4">
          <div className="FirstText w-2/5 font-bold text-3xl text-black flex justify-center items-center">
            Find People Here
          </div>
          <button
            className="w-28 bg-black h-[30px] my-3 flex items-center justify-center rounded cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-red-500 before:to-zinnc-500 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded hover:before:left-0 text-[#fff] font-medium text-sm"
            onClick={() => {
              navigate('/Applyform');
            }}
          >
            Apply yourself
          </button>
        </div>
        <div className=" flex justify-center items-center h-2/5 gap-3">
          <div className=" w-3/4 flex justify-center rounded-full bg-white shadow-md border gap-2">
            <div>
              <IoSearchOutline className="h-full bg-white w-12 p-3 rounded-[100%]" />
            </div>
            <input
              type="text"
              placeholder="Enter Skills/Works"
              // value={input}
              className="p-4 w-full outline-none border-0 rounded-full"
              onChange={(e) => {
                {
                  handleInput(e.target);
                }
              }}
            />

            {/* <button className=" border-black border-l-[1px] bg-black p-1 font-semibold text-white">
              Search
            </button> */}
          </div>
          <button
            className=" border-white bg-black p-4 font-semibold text-white rounded-full"
            onClick={refresh}
          >
            Clear
          </button>
        </div>
        <div className="buttonsDiv h-10 flex justify-evenly items-center ">
          <div className="Firstset  flex justify-center w-3/4 gap-3 items-center">
            <div className=" flex gap-2 items-center p-3 rounded-xl bg-white text-black border border-slate-300 font-medium">
              <GiPipes />
              <button onClick={() => filterEntities('Plumber')} className="">
                Plumber
              </button>
            </div>
            <div className=" flex gap-2 items-center p-3 rounded-xl bg-white text-black border border-slate-300 font-medium">
              <GiWoodPile />
              <button className="" onClick={() => filterEntities('Carpenter')}>
                Carpenter
              </button>
            </div>
            <div className=" flex gap-2 items-center p-3 rounded-xl bg-white text-black border border-slate-300 font-medium">
              <FaRegEye />
              <button className="" onClick={() => filterEntities('Supervisor')}>
                Supervisor
              </button>
            </div>
            <div className=" flex gap-2 items-center p-3 rounded-xl bg-white text-black border border-slate-300 font-medium">
              <FaTrowelBricks />
              <button className="" onClick={() => filterEntities('Mason')}>
                Mason
              </button>
            </div>
            <div className=" flex gap-2 items-center p-3 rounded-xl bg-white text-black border border-slate-300 font-medium">
              <GiWaterTank />
              <button className="" onClick={() => filterEntities('Waterman')}>
                Waterman
              </button>
            </div>
            <div className=" flex gap-2 items-center p-3 rounded-xl bg-white text-black border border-slate-300 font-medium">
              <MdElectricalServices />
              <button
                className=""
                onClick={() => filterEntities('Electrician')}
              >
                Electrician
              </button>
            </div>
            <div className=" flex gap-2 items-center p-3 rounded-xl bg-white text-black border border-slate-300 font-medium">
              <GiSwordSmithing />
              <button className="" onClick={() => filterEntities('Smith')}>
                Smith
              </button>
            </div>
          </div>
        </div>
        <br />
        <div className="btnsiv h-10 flex justify-evenly items-center">
          <div className="  Secondset flex justify-evenly gap-3 w-3/4 items-center">
            <div className=" flex gap-2 items-center p-3 rounded-xl bg-white text-black border border-slate-300 font-medium">
              <CgDesignmodo className="" />
              <button
                className=""
                onClick={() => filterEntities('UX/UI architect')}
              >
                UX architect
              </button>
            </div>
            <div className="flex gap-2 items-center p-3 rounded-xl bg-white text-black border border-slate-300 font-medium">
              <MdManageAccounts />
              <button className="" onClick={() => filterEntities('HR')}>
                HR
              </button>
            </div>
            <div className="flex gap-2 items-center p-3 rounded-xl bg-white text-black border border-slate-300 font-medium">
              <MdDeveloperMode />
              <button className="" onClick={() => filterEntities('Developer')}>
                Developer
              </button>
            </div>
            <div className="flex gap-2 items-center p-3 rounded-xl bg-white text-black border border-slate-300 font-medium">
              <HiServerStack />
              <button className="" onClick={() => filterEntities('Serverman')}>
                Serverman
              </button>
            </div>
            <div className="flex gap-2 items-center p-3 rounded-xl bg-white text-black border border-slate-300 font-medium">
              <FaHackerrank />
              <button className="" onClick={() => filterEntities('Hacker')}>
                Hacker
              </button>
            </div>
            <div className="flex gap-2 items-center p-3 rounded-xl bg-white text-black border border-slate-300 font-medium">
              <SiPytest />
              <button
                className=""
                onClick={() => filterEntities('Backend Developer')}
              >
                Tester
              </button>
            </div>
            <div className="flex gap-2 items-center p-3 rounded-xl bg-white text-black border border-slate-300 font-medium">
              <GiArtificialHive />
              <button
                className=""
                onClick={() => filterEntities('AI developer')}
              >
                AI
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        {' '}
        <div className="border border-green-500 grid gap-5 justify-center items-center p-10">
          {array.map((entity, index) => (
            <div className="border border-black w-[45vw] h-48 pt-4" key={index}>
              <div className="pl-5">
                <p className="font-semibold text-lg">{entity.Name}</p>
              </div>
              <div className=" pl-5 flex items-center gap-2 w-1/4 ">
                <p className="text-slate-800">{entity.Work}</p>
              </div>
              <div className="pl-5 mt-1 w-1/4 flex items-center gap-1 border-r-2">
                <LuFileClock />
                <p className="text-slate-800">{entity.WorkExp}</p>
              </div>
              <div className='pl-5 w-1/3 '></div>
            </div>
          ))}
        </div>
        {/* <div className="grid grid-cols-2 gap-x-8 gap-y-8 mt-2.5">
          {array.map((entity, index) => (
            <div
              className="w-10/12 rounded-2xl ml-12 text-center p-2 bg-sky-100 border border-sky-400 h-44 grid items-center	"
              key={index}
            >
              <div>
                <EntityCard key={index} entity={entity} />
              </div>
              <div className="w-7/12 flex justify-evenly ml-24 p-0.5"> */}
        {/* <button className="bg-red-500 text-black-300 border border-rose-300 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                  <span className="bg-rose-300 shadow-rose-300 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                  Add +
                </button> */}
        {/* <button
                  className="button bg-sky-500 border border-sky-600 p-1 font-semibold rounded-lg"
                  onClick={notify}
                >
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div> */}
        <ToastContainer />
      </div>
    </div>
  );
}
export default Mainpg;

// bg-gradient-to-r from-[#70c7ff] via-[#2fa8be] to-[#70c7ff]
