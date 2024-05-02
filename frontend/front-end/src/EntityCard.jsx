import React from 'react';

const EntityCard = ({ entity }) => {
  return (
    <>
      <h3>Name : {entity.Name}</h3>
      <p>Work : {entity.Work}</p>
      <p>Phone Number : {entity.PhoneNumber} </p>
      <p>Email : {entity.Email}</p>
    </>
  );
};

export default EntityCard;
