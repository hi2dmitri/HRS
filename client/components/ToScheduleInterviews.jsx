import { CircularProgress } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import CandidateMiniCard from './CandidateMiniCard';


/*
  requests data from backend, receives all applicants who has applied but not yet scheduled.
  if server fails - displays error.
  for each elem in array received in response renders CandidateMiniCard Component.
  if no such candidates - displays custom message.
*/

const ToScheduleInterviews = (props) => {

  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async() => {
    try {
      const response = await fetch('/recruitment/awaitingscheduling');
      const data =  await response.json();
      if (data === false) {
        setError(true);
      }
      else {
        setCandidates(data);
      }
    } finally {
      setIsLoading(false);
    }
  };
    
  useEffect(() => {
    fetchData();
  },[]);

  return (
    <div className = 'toinherit'> 
      {isLoading && 
      <div className = "loadinginComponent">
        <CircularProgress />
      </div>}
      {!isLoading && 
      <div>
        <div className='headerChart'>
          <div className ='descrHeader'>INTERVIEWS TO SCHEDULE</div>
        </div>
        <div>
          {error && <div>
            Error occured. Please contact technical support.
          </div>}
          <div className='thead'>
            <div className='throw1-awaiting'>
              Candidate Name
            </div>
            <div className='throw2-awaiting'>
              ID
            </div>
            <div className='throw3-awaiting'>
              Position  
            </div>
          </div>
          <div className='tbody-awaiting'>
            {candidates.length === 0 && 
          <div className='nointerviews'> All applicants have interviews scheduled</div>} 
            {candidates.map(candidate => {
              return <CandidateMiniCard 
                key={candidate.id} 
                id={candidate.id} 
                first_name={candidate.first_name} 
                last_name={candidate.last_name}
                position={candidate.position}
              />;
            })}
          </div>
        </div>
      </div>
      }
    </div>
  );
};

export default ToScheduleInterviews;