import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation, Palette } from '@devexpress/dx-react-chart';
import { CircularProgress } from '@material-ui/core';
import {schemePaired} from 'd3-scale-chromatic';
/*
  sends request to backend to get all positions and number of apps.
  if error occurs displays error
  Renders PieChart
 */


const PositionsChart = (props) => {
  const dat = [
    { title: '', num_of_app: 0 }];
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
        setChartData(data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect (() => {
    fetchData();
  }, []);
  
  return (<div className='toinherit'>
    {isLoading &&
    <div className = "loadinginComponent">
      <CircularProgress />
    </div>}
    {!isLoading && 
    <div>
      {error && <div className='errorcontainer-chart'>Error occured. Please contact technical support</div>}
      {!error &&
      <Paper>
        <div className='headerChart'>
          <div className ='descrHeader'>STATS</div>
        </div>
        <Chart
          className='chartToUpdate'
          data={chartData}
        > 
          <Palette scheme={schemePaired} />
          <Legend 
            marginLeft='300'
          />
          <PieSeries
            valueField="num_of_app"
            argumentField="title"
            innerRadius={0.6}
          />
          <Animation />
        </Chart>
        <div className='descrPositionChart'>
          Applicants per position ratio
        </div>
      </Paper>
      }
    </div>}
  </div>
  );
};

export default PositionsChart;