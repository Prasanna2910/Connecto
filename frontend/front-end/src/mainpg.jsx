import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EntityCard from './EntityCard';
import { useNavigate } from 'react-router-dom';

function mainpage() {
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
    <div className="grid grid-cols-2 gap-8">
      {entities.map((entity, index) => (
        <div
          key={index}
          className="w-8/12 ml-20 bg-white rounded-xl grid items-center"
        >
          <EntityCard key={index} entity={entity} />
        </div>
      ))}
    </div>
  );
}
export default mainpage;
