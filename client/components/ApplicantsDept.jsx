import React, {useState, useEffect} from 'react';
import { CircularProgress } from '@material-ui/core';
import AddApplicant from './AddApplicant';
import ApplicantsView from './ApplicantsView';

/*
  Based on state View renders AddApplicant or ApplicantsView Component;
  Sends request on view or updateParent change to get all applicants and stores it in state allApplicants;
 */

const ApplicantsDept = (props) => {
  const [allApplicants, setAllApplicants] = useState([]);

  const [view, setView] = useState('applicants');
  
  const [updateParent, setUpdateParent] = useState(true);
  
  const [isSuccess, setIsSuccess] = useState(false);
    
  const [isLoading, setIsLoading] = useState(true);
    
  const [applicantsButtonStyle, setApplicantsButtonStyle] = useState({backgroundColor: 'white', color: '#3d79b9'});

  const [addApplicantStyle, setAddApplicantStyle] = useState({backgroundColor: '#3d79b9', color: 'white'});

  const applicantsView = () => {
    setView('applicants');
    setApplicantsButtonStyle(oldStyle => ({...oldStyle, backgroundColor: 'white', color: '#3d79b9'}));
    setAddApplicantStyle(oldStyle => ({...oldStyle, backgroundColor: '#3d79b9', color: 'white'}));
  };

  const addApplicantView = () => {
    setView('addapplicant');
    setApplicantsButtonStyle(oldStyle => ({...oldStyle, backgroundColor: '#3d79b9', color: 'white'}));
    setAddApplicantStyle(oldStyle => ({...oldStyle, backgroundColor: 'white', color: '#3d79b9'}));
  };

  useEffect(() => {
    fetchData();
  }, [view, updateParent]);

  useEffect(()=> {
    setTimeout(() => {
      setIsSuccess(false);}, 4000);
  }, [isSuccess]);

  const fetchData = async() => {
    try {
      const result = await fetch('/recruitment/applicants', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const jsonres = await result.json();
      setAllApplicants(jsonres);
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
        <button type='button' className='statusButton activeemplbutton' style = {{backgroundColor: applicantsButtonStyle.backgroundColor, color: applicantsButtonStyle.color}} onClick={applicantsView}> Applicants </button>
        <button type='button' className='statusButton formeremplbutton' style = {{backgroundColor: addApplicantStyle.backgroundColor, color: addApplicantStyle.color}} onClick={addApplicantView}> Add Applicant </button>
      </div>
      {!isLoading && <div>
        {view === 'applicants' &&
          <div className = 'employeesInner'>
            {isSuccess && 
            <div className='successDeleteJob'>You successfully deleted listing</div>}
            <ApplicantsView applicants = {allApplicants} updateParent={updateParent} setUpdateParent = {setUpdateParent}/>
          </div>
        }
        {view === 'addapplicant' && 
      <div><AddApplicant updateParent={updateParent} setUpdateParent = {setUpdateParent}/>
      </div>    
        }
      </div>}
    </div>
  );
};

export default ApplicantsDept;