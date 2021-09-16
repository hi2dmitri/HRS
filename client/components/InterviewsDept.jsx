import React, {useState, useEffect} from 'react';
import { CircularProgress } from '@material-ui/core';
import AddInterview from './AddInterview';
import InterviewsDeptList from './InterviewsDeptList';

/*
  Gets all interviews from http req response. Stores in state.
  View state conditionally renders InterviewsDeptList or AddInterview Component;
 */

const InterviewsDept = (props) => {
  const [allInterviews, setAllInterviews] = useState([]);
  //state to fetch current and past employees
  const [view, setView] = useState('interviews');
  const [updateParent, setUpdateParent] = useState(true);
  
  const [isLoading, setIsLoading] = useState(true);
    
  const [interviewsButtonStyle, setInterviewsButtonStyle] = useState({backgroundColor: 'white', color: '#3d79b9'});
  const [addInterviewStyle, setAddInterviewStyle] = useState({backgroundColor: '#3d79b9', color: 'white'});

  const interviewsView = () => {
    setView('interviews');
    setInterviewsButtonStyle(oldStyle => ({...oldStyle, backgroundColor: 'white', color: '#3d79b9'}));
    setAddInterviewStyle(oldStyle => ({...oldStyle, backgroundColor: '#3d79b9', color: 'white'}));
  };

  const addInterviewView = () => {
    setView('addinterview');
    setInterviewsButtonStyle(oldStyle => ({...oldStyle, backgroundColor: '#3d79b9', color: 'white'}));
    setAddInterviewStyle(oldStyle => ({...oldStyle, backgroundColor: 'white', color: '#3d79b9'}));
  };

  useEffect(() => {
    fetchData();
  }, [view]);

  const fetchData = async() => {
    try {
      const result = await fetch('/interviews', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const jsonres = await result.json();
      setAllInterviews(jsonres);
    } catch (err) {
      console.log(err);
    }
    finally {
      setIsLoading(false);}
  };
  return (
    <div>
      {isLoading && 
    <div className = "loading">
      < CircularProgress />
    </div>
      }
      <div className='emplButtonNav'>
        <button type='button' className='statusButton activeemplbutton' style = {{backgroundColor: interviewsButtonStyle.backgroundColor, color: interviewsButtonStyle.color}} onClick={interviewsView}> Interviews </button>
        <button type='button' className='statusButton formeremplbutton' style = {{backgroundColor: addInterviewStyle.backgroundColor, color: addInterviewStyle.color}} onClick={addInterviewView}> Schedule Interview </button>
      </div>
      {!isLoading && <div>
        {view === 'interviews' &&
          <div className = 'employeesInner'>
            <InterviewsDeptList interviews={allInterviews}/>
          </div>
        }
        {view === 'addinterview' && 
      <div><AddInterview updateParent={updateParent} setUpdateParent = {setUpdateParent}/>
      </div>    
        }
      </div>}
    </div>
  );
};

export default InterviewsDept;