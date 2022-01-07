import React from 'react';
import GrowthChart from './GrowthChart';
import InterviewsDash from './InterviewsDash';
import BottomDash from './BottomDash';
import ChangedPastMonth from './ChangedPastMonth';
import PositionsChart from './PositionsChart';

/*
  Renders GrowthChart, InterviewsDash and BottomDash components
*/


const Intro = (props) => {
  const names = ['bottomleft1', 'bottomleft2'];
  return (
    <div className='mainDash'>
      <div className = 'mainIntro'>
        <section className='companyGrowth'>
          <GrowthChart />
        </section>
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
      </div>
      <section className='candidates'>
        <BottomDash />
      </section>
    </div>
  );
};


export default Intro;