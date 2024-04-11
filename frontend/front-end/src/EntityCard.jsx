import React from 'react';

const EntityCard = ({ entity }) => {
  return (
    <>
      <h3>Name : {entity.Name}</h3>
      <p>Work : {entity.Work}</p>
      <p>Phone Number : {entity.PhoneNumber} </p>
    </>
  );
};

export default EntityCard;
