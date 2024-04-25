import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EntityCard from './EntityCard';
import { useNavigate } from 'react-router-dom';

function Mainpg() {
  const [entities, setEntities] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get('http://localhost:3553/main')
      .then((res) => {
        console.log('Fetch successful');
        if (res.data.length > 0) {
          setEntities(res.data);
        }
      })
      .catch((error) => {
        console.log('error in getting', error);
      });
  }, []);
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
    <div className="bg-pink-200 ">
      <div className=" flex justify-center text-center">
        <h1 className="text-purple-500 text-3xl font-medium text-justify bg-fuchsia-950 w-1/4 p-2  flex justify-around rounded-3xl ">
          Enitites
        </h1>
      </div>
      <div></div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-8 mt-2.5">
        {entities.map((entity, index) => (
          <div
            className="w-10/12 rounded-2xl ml-12 text-center p-2 bg-pink-300 h-44 grid items-center	"
            key={index}
          >
            <div>
              <EntityCard key={index} entity={entity} />
            </div>
            <div className="w-7/12 flex justify-evenly ml-24 p-0.5">
              <button className="bg-red-500 text-black-300 border border-rose-300 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                <span className="bg-rose-300 shadow-rose-300 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                Delete
              </button>
              <button
                className="bg-red-500 text-black-300 border border-rose-300 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
                
              >
                <span className="bg-rose-300 shadow-rose-300 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* <div>
        <Form />
      </div> */}
      <div className="flex justify-around">
        <button className="bg-purple-500 text-black-300 border border-rose-300 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
          <span className="bg-rose-300 shadow-rose-300 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
          Add
        </button>
      </div>
    </div>
  );
}
export default Mainpg;
