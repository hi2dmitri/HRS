import React, {useState, useEffect} from 'react';
import PositionsChoice from './PositionsChoice';
import styled from 'styled-components';
/*
  Stores all data from inputs in state.
  if any input is empty - renders error and sets values of inputs to null;
  Based on response from http request renders success or error message;
 */

const AddApplicant = (props) => {


  const newApplicant = {
    first_name: null,
    last_name: null,
    email: null,
    phone: null,
    experience: null,
    education:null,
    notes: '',
    position: '',
  };
    
  const [newInfo, setNewInfo] = useState(newApplicant);
  const [error, setError] = useState (false);
  const [result, setResult] = useState ('unknown');

  const submitNewJob = (e) => {
    document.getElementsByClassName('addApplicantForm')[0].reset();
    const allInputs = document.querySelectorAll('.form-addJob');
    allInputs.forEach(input => input.value = null);
    for (const prop in newInfo) {
      if (newInfo[prop] === null) {
        setError(true);
        setNewInfo(newApplicant);
        return;
      }
    }

    fetch('/recruitment/addapplicant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newInfo)
    })
      .then(data => data.json())
      .then(resp => {
        if (resp === true) {
          setResult(true);
          setError(false);
          props.updateParent === true ? props.setUpdateParent(false) : props.setUpdateParent(true);
        }
        else if (resp === false) {
          setResult(false);
          setNewInfo(newApplicant);
          setError(false);
        }
      })
      .catch(err => console.log(err));
  };

  const firstNameEntered = (e) => {
    setNewInfo(oldInfo => ({...oldInfo, first_name:e.target.value}));
  };

  const lastNameEntered = (e) => {
    setNewInfo(oldInfo => ({...oldInfo, last_name:e.target.value}));
  };

  const emailEntered = (e) => {
    setNewInfo(oldInfo => ({...oldInfo, email:e.target.value}));
  };

  const phoneEntered = (e) => {
    setNewInfo(oldInfo => ({...oldInfo, phone:e.target.value}));
  };

  const experienceEntered = (e) => {
    setNewInfo(oldInfo => ({...oldInfo, experience:e.target.value}));
  };

  const educationEntered = (e) => {
    setNewInfo(oldInfo => ({...oldInfo, education:e.target.value}));
  };

  const notesEntered = (e) => {
    setNewInfo(oldInfo => ({...oldInfo, notes:e.target.value}));
  };

  useEffect(() => { 
    setTimeout(() => {
      setError(false);
    }, 3000);
  },[error]);

  useEffect(() => {
    setTimeout(() => {
      setResult('unknown');
    }, 3000);
  }, [result]);

  return (
    <div className='addJobContainer'>
      <div className = 'scrollcontainer'>
        <form className='addApplicantForm'> 
          {error && <p className='errorAddEmpl'>Error: All inputs required</p>}
          {result === true && <p className='resultOfAdding'> New applicant has been added</p>}
          {result === false && <p className='errorAddEmpl'> An error occured. Please contact technical support.</p>}
          <section className = 'jobCardSect'>
            <p className='addEmplSectionheader'>ADD NEW APPLICANT</p>
            <div className = 'emplCardInner'>
              <div className='miniSection'>
                <div className='addcarddescr'>First Name:</div>
                <div>
                  <input type="text" className="form-addJob" placeholder="Input required" onChange={firstNameEntered}/>
                </div>
              </div>
              <div className='miniSection'>
                <div className='addcarddescr'>Last Name:</div>
                <div>
                  <input type="text" className="form-addJob" placeholder="Input required" onChange={lastNameEntered}/>
                </div>
              </div>
              <div className='miniSection'>
                <div className='addcarddescr'>Email:</div>
                <div>
                  <input type="text" className="form-addJob" placeholder="Input required" onChange={emailEntered}/>
                </div>
              </div>
              <div className='miniSection'>
                <div className='addcarddescr'>Phone:</div>
                <div>
                  <input type="text" className="form-addJob" placeholder="Input required" onChange={phoneEntered}/>
                </div>
              </div>
              <div className='miniSection'>
                <div className='addcarddescr'>Experience:</div>
                <div>
                  <input type="text" className="form-addJob" placeholder="Input required" onChange={experienceEntered}/>
                </div>
              </div>
              <div className='miniSection'>
                <div className='addcarddescr'>Education:</div>
                <div>
                  <input type="text" className="form-addJob" placeholder="Input required" onChange={educationEntered}/>
                </div>
              </div>
              <div className='miniSection'>
                <div className='addcarddescr'>Notes:</div>
                <div>
                  <input type="text" className="form-addJob" placeholder="Input required" onChange={notesEntered}/>
                </div>
              </div>
              <div className='miniSection'>
                <div className='addcarddescr'>Position:</div>
                <div>
                  <div><PositionsChoice className='form-addJob' newInfo={newInfo} setNewInfo={setNewInfo} /></div>
                </div>
              </div>
            </div>
          </section>
          <div className='buttonContainer'>
            <button type="button" className="submitJob" onClick={submitNewJob} >Submit</button>
          </div>
        </form>
      </div>
    </div>
  
  );
};


export default AddApplicant;