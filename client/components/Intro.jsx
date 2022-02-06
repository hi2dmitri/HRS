import React from 'react';
import GrowthChart from './GrowthChart';
import InterviewsDash from './InterviewsDash';
import ChangedPastMonth from './ChangedPastMonth';
import PositionsChart from './PositionsChart';
import ToScheduleInterviews from './ToScheduleInterviews';

/*
  Renders GrowthChart, InterviewsDash and BottomDash components
*/


const Intro = (props) => {
  const names = ['bottomleft1', 'bottomleft2'];
  return (
    <div className='mainDash'>
      <section className = 'top-dash'>
        <div className='companyGrowth'>
          <GrowthChart />
        </div>
        <div className="monthly-updates">
          <div className='bottomleft1'>
            <ChangedPastMonth parent={names[0]}/></div>
          <div className='bottomleft2'>
            <ChangedPastMonth parent={names[1]}/>
          </div>
        </div>
        <div className="ratio-chart"> 
          <PositionsChart />
        </div>
      </section>
      <section className='bottom-dash'>
        <section className='interviews'>
          <InterviewsDash />
        </section>
        <div className="to-schedule-container"> 
          <ToScheduleInterviews />
        </div>
      </section>
    </div>
  );
};


export default Intro;