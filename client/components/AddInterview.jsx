import React, {useState, useEffect} from 'react';

/*
Gets all data from inputs, if one is empty renders error and sets inputs values to null;
Sends http request to post new interview. If error from server - renders error message.
Otherwise renders success.
 */

const AddInterview = (props) => {
  const newInterview = {
    candidate_id: null,
    date: null,
    time: null
  };
    
  const [newInfo, setNewInfo] = useState(newInterview);
  const [error, setError] = useState (false);
  const [result, setResult] = useState ('unknown');

  const submitNewJob = (e) => {
    document.getElementsByClassName('addInterviewForm')[0].reset();
    const allInputs = document.querySelectorAll('.form-addJob');
    allInputs.forEach(input => input.value = null);
    for (const prop in newInfo) {
      if (newInfo[prop] === null) {
        setError(true);
        setNewInfo(newInterview);
        return;
      }
    }

    fetch('/recruitment/addinterview', {
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
          setNewInfo(newInterview);
          setError(false);
        }
      })
      .catch(err => console.log(err));
  };

  const idEntered = (e) => {
    setNewInfo(oldInfo => ({...oldInfo, candidate_id:e.target.value}));
  };

  const dateEntered = (e) => {
    setNewInfo(oldInfo => ({...oldInfo, date:e.target.value}));
  };

  const timeEntered = (e) => {
    setNewInfo(oldInfo => ({...oldInfo, time:e.target.value}));
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
        <form className='addInterviewForm'> 
          {error && <p className='errorAddEmpl'>Error: All inputs required</p>}
          {result === true && <p className='resultOfAdding'> New interview has been scheduled</p>}
          {result === false && <p className='errorAddEmpl'> An error occured. Please contact technical support</p>}
          <section className = 'jobCardSect'>
            <p className='addEmplSectionheader'>SCHEDULE NEW INTERVIEW</p>
            <div className = 'emplCardInner'>
              <div className='miniSection'>
                <div className='addcarddescr'>Applicant ID:</div>
                <div>
                  <input type="text" className="form-addJob" placeholder="Input required" onChange={idEntered}/>
                </div>
              </div>
              <div className='miniSection'>
                <div className='addcarddescr'>Date:</div>
                <div>
                  <input type="text" className="form-addJob" placeholder="Format: MM-DD-YYYY" onChange={dateEntered}/>
                </div>
              </div>
              <div className='miniSection'>
                <div className='addcarddescr'>Time:</div>
                <div>
                  <input type="text" className="form-addJob" placeholder="Input required" onChange={timeEntered}/>
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


export default AddInterview;