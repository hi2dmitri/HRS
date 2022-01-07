import React from 'react';
import ChangedPastMonth from './ChangedPastMonth';
import PositionChart from './PositionsChart';
import ToScheduleInterviews from './ToScheduleInterviews';
import InterviewsDash from './InterviewsDash';

/*
  Renders Recently Hired, Recently Fired, PositionChart and ToScheduleInterviews components
 */

const BottomDash = (props) => { 
  return(
    <div className="mainBottomDash"> 
      <section className='interviews'>
        <InterviewsDash />
      </section>
      <div className="bottomlast"> 
        <ToScheduleInterviews />
      </div>
    </div>
  );
};

export default BottomDash;