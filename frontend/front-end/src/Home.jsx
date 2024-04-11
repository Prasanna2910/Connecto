import react, { useEffect, useState } from 'react';
import axios from 'axios';
import EntityCard from './EntityCard';
import './App.css';

function Home() {
  const [entities, setEntities] = useState([]);

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
    <div className="bg-gray-300 h-screen">
      <nav className='flex justify-between'>
        <p className="font-mono ">Connecto</p>
      </nav>
      <div className="grid grid-cols-2 gap-8 ">
        {entities.map((entity, index) => (
          <div key={index} className=" w-8/12 ml-20 bg-white  rounded-xl grid items-center">
            <div>
              <EntityCard key={index} entity={entity} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Home;
