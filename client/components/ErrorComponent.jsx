/* eslint-disable react/no-unescaped-entities */
import React from 'react';
/*
  Component to display error on login/signup
 */
function Error (props)  {
  return (
    <div className='errordiv'>
      <p>Information you entered does not match our records
        {props.registered === true &&
        <span> If you are not registered, please signup or try again</span>}
      </p>
    </div>
  );
}
export default Error;
