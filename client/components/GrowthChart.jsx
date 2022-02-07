import React, {useState, useEffect} from 'react';
import { CircularProgress } from '@material-ui/core';
import Title from '../components/Title';
import {BarChart} from 'd3reactor';

/*
  Gets data from backend on mount,
  renders Chart that displays number of employees this year each month;
 */


const numberOfEmplInMonth =  (arr) => {
  const currentYear =  new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const pYear = currentYear - 1;
  const pMonth = 12;
  let isRun = false;

  const helper =  (array, year, month) => {
    const currYear = {};
    for (let i = 1; i <= month; i++) {
      currYear[i] = 0;
    }
    const keysOfCurr = Object.keys(currYear);
    keysOfCurr.forEach((elem, i)=> keysOfCurr[i] = parseInt(elem));

    if(isRun === false) {
      for (let i = 0; i < array.length; i++) {
        array[i].dateofhire = array[i].dateofhire.split('-');

        if (array[i].termindate === null) {
          array[i].termindate = [null];
        } 
        else {
          array[i].termindate = array[i].termindate.split('-');
        }
      }
    }
    const stack = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].termindate[0] === null || array[i].termindate[2] == year)
        stack.push(array[i]);
    }
    for (let i = 0; i < stack.length; i++) {
      if (stack[i].dateofhire[2] < year && stack[i].termindate[0] === null) {
        keysOfCurr.forEach(month => currYear[month]++);
      } 
      else if (stack[i].dateofhire[2] < year ) {
        for (let j = 0; j < keysOfCurr.length; j++) {
          if (keysOfCurr[j] <= stack[i].termindate[0]) {
            currYear[keysOfCurr[j]]++;
          }
        }
      }
      else if(stack[i].dateofhire[2] == year && stack[i].termindate[0] === null) {
        for(let k = 0; k < keysOfCurr.length; k++) {
          if(keysOfCurr[k] >= stack[i].dateofhire[0]) {
            currYear[keysOfCurr[k]]++;
          }
        }
      }
      else if(stack[i].dateofhire[2] == year && stack[i].termindate[2] == year) {
        for(let t = 0; t < keysOfCurr.length; t++) {
          if(keysOfCurr[t] >= stack[i].dateofhire[0] && keysOfCurr[t] <= stack[i].termindate[0]) {
            currYear[keysOfCurr[t]]++;
          }
        }
      }
    }
    const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
    const newArr = [];
    for (const prop in currYear) {
      newArr.push({month: months[prop - 1], employees: currYear[prop]});
    }
    newArr.forEach(obj => obj.year = year);
    if (isRun === false) isRun = true;
    return newArr;
  };
  return helper(arr, pYear, pMonth).concat(helper(arr, currentYear, currentMonth));
  
};

const dat = [
  { month: 'Jan', employees: 0, year: 0},
  { month: 'Feb', employees: 0, year: 0},
  { month: 'Mar', employees: 0, year: 0},
  { month: 'Apr', employees: 0, year: 0},
  { month: 'May', employees: 0, year: 0},
  { month: 'Jun', employees: 0, year: 0},
  { month: 'Jul', employees: 0, year: 0},
  { month: 'Aug', employees: 0, year: 0},
  { month: 'Sep', employees: 0, year: 0},
  { month: 'Oct', employees: 0, year: 0},
  { month: 'Nov', employees: 0, year: 0},
  { month: 'Dec', employees: 0, year: 0},
];


const GrowthChart = (props) => {


  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(dat);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchdata();
  }, []);
console.log('data, ', data)
  const fetchdata = async() => {
    try {
      const result = await fetch('/employees/graphdata', {method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const arr = await result.json();
      if (arr === true) {
        setError(true);
      }
      else {
        const newResult =  numberOfEmplInMonth(arr);

        setData(newResult);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (<div className="graphMainContainer">
    <Title title="EMPLOYEES PER MONTH" />
    {isLoading && 
    <div className = "loadinginComponent">
      <CircularProgress />
    </div>
    }
    {!isLoading &&
    <>
      {error && 
            <p>Error occured. Please contact technical support</p>
      }
      {!error && 
            <div className='chartCont'>
              <BarChart
                height="100%"
                width="100%"
                data={data}
                xKey="month"
                yKey="employees"
                groupBy="year"
                xAxis="bottom"
                yAxis="right"
                yGrid={true}
                yAxisLabel="Value"
                legend="top"
              />
            </div> 
      }
    </>
    }
  </div>
  );
};


export default GrowthChart;