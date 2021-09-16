import React, {useState, useEffect} from 'react';
import { CircularProgress } from '@material-ui/core';
import JobCard from './JobCard';
import AddJob from './AddJob';

/*
  Sends http request when view state is changing to receive all jobs from server.
  Depending on view state loads either AddJob or JobCards.
  isSuccess is passed to child component to rerender this component after Job was deleted.
  This will allow to rerender current component and get new list of jobs from server.
  updateParent is passed to AddJob to rerender current component when job was added.
 */

const JobsDept = (props) => {

  const [allJobs, setAllJobs] = useState([]);

  const [view, setView] = useState('jobs');

  const [updateParent, setUpdateParent] = useState(true);
  
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [isLoading, setIsLoading] = useState(true);
  
  const [jobsButtonStyle, setJobsButtonStyle] = useState({backgroundColor: 'white', color: '#3d79b9'});
  const [addJobStyle, setAddJobStyle] = useState({backgroundColor: '#3d79b9', color: 'white'});

  const jobsview = () => {
    setView('jobs');
    setJobsButtonStyle(oldStyle => ({...oldStyle, backgroundColor: 'white', color: '#3d79b9'}));
    setAddJobStyle(oldStyle => ({...oldStyle, backgroundColor: '#3d79b9', color: 'white'}));
  };

  const addjobsview = () => {
    setView('addjob');
    setJobsButtonStyle(oldStyle => ({...oldStyle, backgroundColor: '#3d79b9', color: 'white'}));
    setAddJobStyle(oldStyle => ({...oldStyle, backgroundColor: 'white', color: '#3d79b9'}));
  };

  useEffect(() => {
    fetchData();
  }, [view]);

  useEffect(()=> {
    setTimeout(() => {
      setIsSuccess(false);}, 4000);
  }, [isSuccess]);


  const fetchData = async() => {
    try {
      const result = await fetch('/recruitment/jobs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const jsonres = await result.json();
      setAllJobs(jsonres);
    } catch (err) {console.log(err);}
    finally {setIsLoading(false);}
  };

  return(
    <div>
      {isLoading && 
      <div className = "loading">
        < CircularProgress />
      </div>
      }
      <div className='emplButtonNav'>
        <button type='button' className='statusButton activeemplbutton' style = {{backgroundColor: jobsButtonStyle.backgroundColor, color: jobsButtonStyle.color}} onClick={jobsview}> Jobs </button>
        <button type='button' className='statusButton formeremplbutton' style = {{backgroundColor: addJobStyle.backgroundColor, color: addJobStyle.color}} onClick={addjobsview}> Add Job </button>
      </div>
      {!isLoading && <div>
        {view === 'jobs' &&
            <div className = 'employeesInner'>
              <div className='navForJobs'>
                <div>TITLE</div>
                <div>JOB ID</div>
                <div>DEPARTMENT</div>
                <div>OPEN SINCE</div>
                <div># OF APPLICATIONS</div>
                <div>ACTION</div>
              </div>
              {isSuccess && 
              <div className='successDeleteJob'>You successfully deleted listing</div>}
              {allJobs.map(job => 
                <JobCard 
                  key={job.id} 
                  id={job.id}
                  title={job.title} 
                  department={job.department}
                  open={job.open_since}
                  num={job.num_of_app}
                  setIsSuccess={setIsSuccess}
                /> )}
            </div>
        }
        {view === 'addjob' && 
        <div><AddJob updateParent={updateParent} setUpdateParent = {setUpdateParent}/>
        </div>    
        }
      </div>}
    </div>
  );
};

export default JobsDept;