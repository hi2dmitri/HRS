import React, {useState, useEffect} from 'react';
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { CircularProgress } from '@material-ui/core';

/*
  Gets data from backend on mount,
  renders Chart that displays number of employees this year each month;
 */

const dat = [
  { month: 'Jan', employees: 0 },
  { month: 'Feb', employees: 0 },
  { month: 'Mar', employees: 0 },
  { month: 'Apr', employees: 0 },
  { month: 'May', employees: 0 },
  { month: 'Jun', employees: 0 },
  { month: 'Jul', employees: 0 },
  { month: 'Aug', employees: 0 },
  { month: 'Sep', employees: 0 },
  { month: 'Oct', employees: 0 },
  { month: 'Nov', employees: 0 },
  { month: 'Dec', employees: 0 },
];


const GrowthChart = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(dat);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async() => {
    try {
      const result = await fetch('/employees/graphdata', {method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const array = await result.json();
      if (array === true) {
        setError(true);
      }
      else {
        setData(array);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (<div className="graphMainContainer">
    {isLoading && 
    <div className = "loadinginComponent">
      <CircularProgress />
    </div>
    }
    {!isLoading &&
    <div>
      {error && 
            <p>Error occured. Please contact technical support</p>
      }
      {!error && 
          <div>
            <div className='headerChart'>
              <div className ='descrHeader'>STATS</div>
            </div>
            <div className='chartCont'>
              <Chart 
                className='chart'
                width = "78vh"
                data={data}>
                <ArgumentAxis />
                <ValueAxis max={7}/>
                <BarSeries
                  valueField="employees"
                  argumentField="month"/>
                <Animation />
              </Chart>
              <div className = 'chartdescription'>
                Number of employees per month current year
              </div>
            </div> 
          </div>
      }
    </div>
    }
  </div>
  );
};


export default GrowthChart;