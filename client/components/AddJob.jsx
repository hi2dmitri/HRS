import React, {useState, useEffect} from 'react';

/*
  Stores all info from inputs in state, if any input is empty - throws an error and resets inputs to null;
  Send http request to update records;
  Based on response either renders error or success message. Updates parent props to display this message.
 */


const AddJob = (props) => {
  const newJob = {
    title: null,
    department: null,
    open_since: null,
    notes: '',
  };
    
  const [newInfo, setNewInfo] = useState(newJob);
  const [error, setError] = useState (false);
  const [result, setResult] = useState ('unknown');

  const submitNewJob = (e) => {
    document.getElementsByClassName('addJobForm')[0].reset();
    const allInputs = document.querySelectorAll('.form-addJob');
    allInputs.forEach(input => input.value = null);
    for (const prop in newInfo) {
      if (newInfo[prop] === null) {
        setError(true);
        setNewInfo(newJob);
        return;
      }
    }

    fetch('/recruitment/addjob', {
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
          setNewInfo(newJob);
          setError(false);
        }
      })
      .catch(err => console.log(err));
  };

  const titleEntered = (e) => {
    setNewInfo(oldInfo => ({...oldInfo, title:e.target.value}));
  };

  const departmentEntered = (e) => {
    setNewInfo(oldInfo => ({...oldInfo, department:e.target.value}));
  };

  const openSinceEntered = (e) => {
    setNewInfo(oldInfo => ({...oldInfo, open_since:e.target.value}));
  };

  const notesEntered = (e) => {
    setNewInfo(oldInfo => ({...oldInfo, notes:e.target.value}));
  };

  useEffect(() => { 
    setTimeout(() => {
      setError(false);
    }, 3000);}
  , [error]);

  useEffect(() => {
    setTimeout(() => {
      setResult('unknown');
    }, 3000);
  }, [result]);

  return (
    <div className='addJobContainer'>
      <div className = 'scrollcontainer'>
        <form className='addJobForm'> 
          {error && <p className='errorAddEmpl'>Error: All inputs required</p>}
          {result === true && <p className='resultOfAdding'> New listing has been added</p>}
          {result === false && <p className='errorAddEmpl'> An error occured. Please contact technical support.</p>}
          <section className = 'jobCardSect'>
            <p className='addEmplSectionheader'>ADD NEW JOB LISTING</p>
            <div className = 'emplCardInner'>
              <div className='miniSection'>
                <div className='addcarddescr'>Job Title:</div>
                <div>
                  <input type="text" className="form-addJob" placeholder="Input required" onChange={titleEntered}/>
                </div>
              </div>
              <div className='miniSection'>
                <div className='addcarddescr'>Department:</div>
                <div>
                  <input type="text" className="form-addJob" placeholder="Input required" onChange={departmentEntered}/>
                </div>
              </div>
              <div className='miniSection'>
                <div className='addcarddescr'>Open Since:</div>
                <div>
                  <input type="text" className="form-addJob" placeholder="Format: MM-DD-YYYY" onChange={openSinceEntered}/>
                </div>
              </div>
              <div className='miniSection'>
                <div className='addcarddescr'>Notes:</div>
                <div>
                  <input type="text" className="form-addJob" placeholder="Input required" onChange={notesEntered}/>
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


export default AddJob;