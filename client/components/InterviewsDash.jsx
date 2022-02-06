import React, {useState, useEffect} from 'react';
import { CircularProgress } from '@material-ui/core';
import InterviewsDashList from './InterviewsDashList';
import CandidateCardDash from './CandidateCardDash';

/*
  Receives interviews from backend.
  Renders either list of interviews or each candidate card based on currView state 
*/



const InterviewsDash = (props) => {
  const [interviews, setInterviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currView, setCurrView] = useState('interviews');
  const [candidateId, setCandidateId] = useState(0);
 

  const fetchData = async() => {
    try {
      const response = await fetch('/interviews');
      const data =  await response.json();
      if (data === false) {
        setError(true);
      }
      else {
        setInterviews(data);
      }
      
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  },[]);


  return (<div className = 'interviews-container'> 
    {isLoading && 
      <div className = "loadinginComponent">
        < CircularProgress />
      </div>
    }
    {!isLoading &&
      <div> {error && 
      <p>Error occured. Please contact technical support</p>}
      <div>
        {currView === 'interviews' &&
          <InterviewsDashList interviews = {interviews} setCurrView = {setCurrView} setCandidateId={setCandidateId}/>
        }
        {currView === 'candidate' &&
        <CandidateCardDash setCurrView={setCurrView} interviews={interviews} candidateId={candidateId}/>}
      </div>
      </div>
    }
  </div>);
};


export default InterviewsDash;