import React from 'react';

const CandidateMiniCard = (props) => {
  return(
    <div className='candidate-minicard'>
      <div>{props.first_name} {props.last_name}</div>
      <div>{props.id}</div>
      <div>{props.position}</div>
    </div>    
  );
};

export default CandidateMiniCard;