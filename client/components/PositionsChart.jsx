import React, {useState, useEffect} from 'react';
import { CircularProgress } from '@material-ui/core';
import Title from './Title';
import {PieChart} from 'd3reacts';
/*
  sends request to backend to get all positions and number of apps.
  if error occurs displays error
  Renders PieChart
 */


const PositionsChart = (props) => {
  const dat = [
    { title: '', applications: 0 }];
  const [chartData, setChartData] = useState(dat);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch('/recruitment/positionlist');
      const data =  await response.json();
      if (data === true) {
        setError(true);
      }
      else {

        data.forEach(elem => {elem.applications = elem.num_of_app; delete elem.num_of_app;});
        setChartData(data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect (() => {
    fetchData();
  }, []);
  
  return (
    <div style={{height: 'inherit'}}>
      <Title title="APPLICANTS PER POSITION" />
      {isLoading &&
    <div className = "loadinginComponent">
      <CircularProgress />
    </div>}
      {!isLoading && 
    <div style={{height: '90%'}}>
      {error && <div className='errorcontainer-chart'>Error occured. Please contact technical support</div>}
      {!error &&
       <PieChart
         data={chartData}
         label="title"
         value="applications"
         innerRadius='60%'
         outerRadius='90%'
         legend='right'
       />
      }
    </div>}
    </div>
  );
};

export default PositionsChart;