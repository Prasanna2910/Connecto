import react, { useEffect, useState } from 'react';
import axios from 'axios';
import EntityCard from './EntityCard';

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
    <>
      <div>
        {entities.map((entity, index) => (
          <div key={index}>
            <div>
              <EntityCard key={index} entity={entity} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default Home;
