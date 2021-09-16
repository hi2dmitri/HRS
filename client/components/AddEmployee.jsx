import React, {useState, useEffect} from 'react';


/*
  Gets all values from inputs, if at least one is null, resets all values to null and renders a message to fill all inputs.
  Sends post request. if server fails with posting data - renders error. Else success message.
 */

const AddEmployee = () => {

  const newEmployee = {
    first_name: null,
    last_name: null,
    email: null, 
    dob:null,
    gender: null,
    marstatus: null,
    dependants: null,
    department: null,
    position: null,
    dateofhire: null,
    type: null,
    street:null,
    city: null,
    state: null,
    zip: null,
  };

  const [newInfo, setNewInfo] = useState(newEmployee);
  const [error, setError] = useState (false);
  const [result, setResult] = useState ('unknown');

  function firstNameEntered(e) {
    setNewInfo(oldInfo => ({...oldInfo, first_name:e.target.value}));
  }

  function lastNameEntered(e) {
    setNewInfo(oldInfo => ({...oldInfo, last_name:e.target.value}));
  }
  
  function emailEntered(e) {
    setNewInfo(oldInfo => ({...oldInfo, email:e.target.value}));
  }

  function dobEntered(e) {
    setNewInfo(oldInfo => ({...oldInfo, dob:e.target.value}));
  }

  function genderEntered(e) {
    setNewInfo(oldInfo => ({...oldInfo, gender:e.target.value}));
  }

  function marstatusEntered(e) {
    setNewInfo(oldInfo => ({...oldInfo, marstatus:e.target.value}));
  }

  function dependantsEntered(e) {
    setNewInfo(oldInfo => ({...oldInfo, dependants:e.target.value}));
  }

  function departmentEntered(e) {
    setNewInfo(oldInfo => ({...oldInfo, department:e.target.value}));
  }

  function positionEntered(e) {
    setNewInfo(oldInfo => ({...oldInfo, position:e.target.value}));
  }

  function dateofhireEntered(e) {
    setNewInfo(oldInfo => ({...oldInfo, dateofhire:e.target.value}));
  }

  function typeEntered(e) {
    setNewInfo(oldInfo => ({...oldInfo, type:e.target.value}));
  }

  function streetEntered(e) {
    setNewInfo(oldInfo => ({...oldInfo, street:e.target.value}));
  }

  function cityEntered(e) {
    setNewInfo(oldInfo => ({...oldInfo, city:e.target.value}));
  }

  function stateEntered(e) {
    setNewInfo(oldInfo => ({...oldInfo, state:e.target.value}));
  }

  function zipEntered(e) {
    setNewInfo(oldInfo => ({...oldInfo, zip:e.target.value}));
  }

  function submitNewEmployee (e) {
    document.getElementsByClassName('addEmployeeForm')[0].reset();
    const allInputs = document.querySelectorAll('.form-addEmpl');
    allInputs.forEach(input => input.value = null);
    for (const prop in newInfo) {
      if (newInfo[prop] === null) {
        setError(true);
        setNewInfo(newEmployee);
        return;
      }
    }

    fetch('/employees/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newInfo)
    })
      .then(data => data.json())
      .then(resp => {
        if (resp === true) {setResult(true);
          setError(false);
        }
        else if (resp === false) {setResult(false);
          setNewInfo(newEmployee);
          setError(false);
        }
      })
      .catch(err => console.log(err));
  }

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

  return (<div className='addEmployeeContainer'>
    <div className = 'scrollcontainer'>
      <form className='addEmployeeForm'> 
        {error && <p className='errorAddEmpl'>Error: All inputs required</p>}
        {result === true && <p className='resultOfAdding'> New employee has been added</p>}
        {result === false && <p className='errorAddEmpl'> An error occured. Please contact technical support.</p>}
        <section className = 'emplCardSect'>
          <p className='addEmplSectionheader'>GENERAL INFO</p>
          <div className = 'emplCardInner'>
            <div className='miniSection'>
              <div className='addcarddescr'>First Name:</div>
              <div>
                <input type="text" className="form-addEmpl" placeholder="Input required" onChange={firstNameEntered}/>
              </div>
            </div>
            <div className='miniSection'>
              <div className='addcarddescr'>Last Name:</div>
              <div>
                <input type="text" className="form-addEmpl" placeholder="Input required" onChange={lastNameEntered}/>
              </div>
            </div>
            <div className='miniSection'>
              <div className='addcarddescr'>Email:</div>
              <div>
                <input type="text" className="form-addEmpl" placeholder="Input required" onChange={emailEntered}/>
              </div>
            </div>
          </div>
        </section>
        <section className = 'emplCardSect'>
          <p className='addEmplSectionheader'>WORK</p>
          <div className = 'emplCardInner'>
            <div className='miniSection'>
              <div className='addcarddescr'>Dept:
              </div>
              <div>
                <input type="text" className="form-addEmpl" placeholder="Input required" onChange={departmentEntered}/>
              </div>
            </div>
            <div className='miniSection'>
              <div className='addcarddescr'>Date of Hire:</div>
              <div>
                <input type="text" className="form-addEmpl" placeholder="Format: MM-DD-YYYY" onChange={dateofhireEntered}/>
              </div>
            </div>
            <div className='miniSection'>
              <div className='addcarddescr'>Position:</div>
              <div>
                <input type="text" className="form-addEmpl" placeholder="Input required" onChange={positionEntered}/>
              </div>
            </div>
            <div className='miniSection'>
              <div className='addcarddescr'>Type:</div>
              <div>
                <input type="text" className="form-addEmpl" placeholder="Input required" onChange={typeEntered} />
              </div>
            </div>
            <div className='miniSection'>
              <div className='addcarddescr'>Dependants:</div>
              <div>
                <input type="text" className="form-addEmpl" placeholder="Input required" onChange={dependantsEntered} />
              </div>
            </div>
          </div>
        </section>
        <section className = 'emplCardSect'>
          <p className='addEmplSectionheader'>PERSONAL DETAILS</p>
          <div className = 'emplCardInner'>
            <div className='miniSection'>
              <div className='addcarddescr'>Street:</div>
              <div>
                <input type="text" className="form-addEmpl" placeholder="Input required" onChange={streetEntered} />
              </div>
            </div>
            <div className='miniSection'>
              <div className='addcarddescr'>DOB:</div>
              <div>
                <input type="text" className="form-addEmpl" placeholder="Format: MM-DD-YYYY" onChange={dobEntered}/>
              </div>
            </div>
            <div className='miniSection'>
              <div className='addcarddescr'>City:</div>
              <div>
                <input type="text" className="form-addEmpl" placeholder="Input required" onChange={cityEntered}  />
              </div>
            </div>
            <div className='miniSection'>
              <div className='addcarddescr'>Marital Status:</div>
              <div>
                <input type="text" className="form-addEmpl" placeholder="Input required" onChange={marstatusEntered}/>
              </div>
            </div>
            <div className='miniSection'>
              <div className='addcarddescr'>State:</div>
              <div>
                <input type="text" className="form-addEmpl" placeholder="Input required" onChange={stateEntered}  />
              </div>
            </div>
            <div className='miniSection'>
              <div className='addcarddescr'>Gender:</div>
              <div>
                <input type="text" className="form-addEmpl" placeholder="Input required" onChange={genderEntered} />
              </div>
            </div>
            <div className='miniSection'>
              <div className='addcarddescr'>Zip:</div>
              <div>
                <input type="text" className="form-addEmpl" placeholder="Input required" onChange={zipEntered} />
              </div>
            </div>
          </div>
        </section>
        <div className='buttonContainer'>
          <button type="button" className="submitEmpl" onClick={submitNewEmployee} >Submit</button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default AddEmployee;