import React, { useState} from 'react';
import GrowthChart from './GrowthChart';
import InterviewsDash from './InterviewsDash';
import BottomDash from './BottomDash';

/*
  Renders GrowthChart, InterviewsDash and BottomDash components
*/


const Intro = (props) => {
  return (
    <div className='mainDash'>
      <div className = 'mainIntro'>
        <section className='companyGrowth'>
          <GrowthChart / >
        </section>
        <section className='interviews'>
          <InterviewsDash />
        </section>
      </div>
      <section className='candidates'>
        <BottomDash />
      </section>
    </div>
  );
};


export default Intro;