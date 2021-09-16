import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

/*
  Renders member info
 */

const Member = (props) => {
  return (
    <div className='memberCard'>
      <div className='memName'>{props.first_name} {props.last_name}</div>
      <div className='memPosition'>{props.position}</div>
      <div className='memStatus'>
        {props.reg_status === 'N' ? 
          <FontAwesomeIcon className="faNotReg" icon={faCircle}/>
          : <FontAwesomeIcon className="faReg" icon={faCircle}/>
        }
      </div>
      <div className='memEmail'>{props.email}</div>
    </div>);
};


export default Member;