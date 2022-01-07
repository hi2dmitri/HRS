import React from 'react';

const Title = ({title}) => {
  return (
    <div className='header-container'>
      <div className ='header-title'>{title}</div>
    </div>
  );
};

export default Title;