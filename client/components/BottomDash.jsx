import React from 'react';
import ChangedPastMonth from './ChangedPastMonth';
import PositionChart from './PositionsChart';
import ToScheduleInterviews from './ToScheduleInterviews';

/*
  Renders Recently Hired, Recently Fired, PositionChart and ToScheduleInterviews components
 */

const BottomDash = (props) => { 
  const names = ['bottomleft1', 'bottomleft2'];
  return(
    <div className="mainBottomDash"> 
      <div className="bottomleft">
        <div className='bottomleft1'>
          <ChangedPastMonth parent={names[0]}/></div>
        <div className='bottomleft2'>
          <ChangedPastMonth parent={names[1]}/>
        </div>
      </div>
      <div className="bottomright"> 
        <PositionChart />
      </div>
      <div className="bottomlast"> 
        <ToScheduleInterviews />
      </div>
    </div>
  );
};

export default BottomDash;