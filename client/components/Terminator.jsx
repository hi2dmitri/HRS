import React, {useEffect, useState} from 'react';

/*
  Depending on props button value renders update or terminate section;
  submitTermination checks if empty inpts exist and throws error.
  sends 2 different requests to update or delete. 
  if error returned - renders error,
  otherwise success message.
 */

const Terminator = (props) => {

  const sectionIs = props.buttonVal;

  const info = {
    termindate: null, 
    terminreason: null,
  };

  const infoToUpdate = {
    email: null,
    department: null,
    position: null,
    dependants: null,
    type: null,
    street: null,
    city: null,
    state: null,
    zip: null,
    marstatus: null
  };

  const [termInfo, setTermInfo] = useState(info);
  const [error, setError] = useState('notvalid');
  const [emptyFields, setEmptyFields] = useState(false);
  const [updInfo, setUpdInfo] = useState(infoToUpdate);

  function cancelTermination () {
    console.log('go back');
    props.setIsButtonActive(true);
    props.setTerm(false);
  }

  function submitTermination (e) {
    let body = {};
    if (sectionIs === 'terminatebutton') {
      body = termInfo;
      body.id = e.target.id;
      if (!body.termindate || !body.terminreason) {    
        setTermInfo(oldInfo => ({...oldInfo, termindate: null, terminreason: null}));
        document.getElementsByClassName('terminateForm')[0].reset();
        const allInputs = document.querySelectorAll('.form-addEmpl');
        allInputs.forEach(input => input.value = null);
        setEmptyFields(true);
        return;}
    }
    else if (sectionIs === 'updatebutton') {
      body = updInfo;
      body.id = e.target.id;
    }

    document.getElementsByClassName('terminateForm')[0].reset();

    let url = '';
    sectionIs === 'terminatebutton' ? url = '/employees/terminate' 
      : url = '/employees/update';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(data => data.json())
      .then(resp => {
        if (resp === true) {
          setError(false);
        }
        else if (resp === false) {
          setError(true);
        }
        setEmptyFields(false);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    setTimeout(() => {
      setEmptyFields(false);
    }, 3000);
  }, [emptyFields]);
  
  function dateEntered (e) {
    setTermInfo(oldInfo => ({...oldInfo, termindate: e.target.value}));
  }

  function reasonEntered (e) {
    setTermInfo(oldInfo => ({...oldInfo, terminreason: e.target.value}));
  }

  function emailEntered (e) {
    setUpdInfo(oldInfo => ({...oldInfo, email: e.target.value}));
  }

  function deptEntered (e) {
    setUpdInfo(oldInfo => ({...oldInfo, department: e.target.value}));
  }

  function positionEntered (e) {
    setUpdInfo(oldInfo => ({...oldInfo, position: e.target.value}));
  }

  function dependantsEntered (e) {
    setUpdInfo(oldInfo => ({...oldInfo, dependants: e.target.value}));
  }

  function typeEntered (e) {
    setUpdInfo(oldInfo => ({...oldInfo, type: e.target.value}));
  }

  function streetEntered (e) {
    setUpdInfo(oldInfo => ({...oldInfo, street: e.target.value}));
  }

  function cityEntered (e) {
    setUpdInfo(oldInfo => ({...oldInfo, city: e.target.value}));
  }

  function stateEntered (e) {
    setUpdInfo(oldInfo => ({...oldInfo, state: e.target.value}));
  }

  function zipEntered (e) {
    setUpdInfo(oldInfo => ({...oldInfo, zip: e.target.value}));
  }

  function marStatusEntered (e) {
    setUpdInfo(oldInfo => ({...oldInfo, marstatus: e.target.value}));
  }


  function goBack (e) {
    props.setTerm(false);
    props.updateParent === false ? props.setUpdateParent(true) : props.setUpdateParent(false);
    props.setIsButtonActive(true);
  }

  return (
    <div>

      {/*terminate section*/}

      {props.buttonVal === 'terminatebutton' && 
      <form className='terminateForm'>
        {emptyFields === true && <p className='errorAddEmpl'>Error: All inputs required</p>}
        {error === true && <p className='errorAddEmpl'>Error occured. Please contact technical support</p>}
        {error === false && <p className='resultOfAdding'>Data has been successfully updated</p>}
        <section className = 'emplCardSect'>
          <p className='addEmplSectionheader termtext'>TERMINATION</p>
          <div className = 'emplCardInner'>
            <div className='miniSection'>
              <div className='addcarddescr'>Date of Termination:
              </div>
              <div>
                <input type="text" className="form-addEmpl" placeholder="Format: MM-DD-YYYY" onChange={dateEntered} />
              </div>
            </div>
            <div className='miniSection'>
              <div className='addcarddescr'>Reason for Termination:</div>
              <div>
                <input type="text" className="form-addEmpl" placeholder="Input required" onChange={reasonEntered}/>
              </div>
            </div>
          </div>
        </section>
        <div className='buttonContainer'>
          {error === 'notvalid' && <button type='button' className='confTermButton finalterm' id={props.id} onClick={submitTermination}>Confirm</button> }
          {error === 'notvalid' && <button type='button' className='confTermButton' onClick={cancelTermination}>Cancel</button>}
          {error !== 'notvalid' && <button type='button' className='confTermButton' onClick={goBack}>Go Back</button>}
        </div>
      </form>
      }
       
      {/*update section*/}

      {props.buttonVal === 'updatebutton' && 
      <form className='terminateForm'>
        {error === true && <p className='errorAddEmpl'>Error occured. Please contact technical support</p>}
        {error === false && <p className='resultOfAdding'>Data has been successfully updated</p>}

        <section className = 'emplCardSect'>
          <p className='addEmplSectionheader updatetext'>UPDATE INFO</p>
          <div className = 'emplCardInner'>
            <div className='miniSection'>
              <div className='addcarddescr'>Email:
              </div>
              <div>
                <input type="text" className="form-addEmpl" placeholder="Input required" onChange={emailEntered} />
              </div>
            </div>
            <div className='miniSection'>
              <div className='addcarddescr'>Street:</div>
              <div>
                <input type="text" className="form-addEmpl" placeholder="Input required" onChange={streetEntered}/>
              </div>
            </div>
            <div className='miniSection'>
              <div className='addcarddescr'>Dept:</div>
              <div>
                <input type="text" className="form-addEmpl" placeholder="Input required" onChange={deptEntered}/>
              </div>
            </div>
            <div className='miniSection'>
              <div className='addcarddescr'>City:</div>
              <div>
                <input type="text" className="form-addEmpl" placeholder="Input required" onChange={cityEntered}/>
              </div>
            </div>
            <div className='miniSection'>
              <div className='addcarddescr'>Position:</div>
              <div>
                <input type="text" className="form-addEmpl" placeholder="Input required" onChange={positionEntered}/>
              </div>
            </div>
            <div className='miniSection'>
              <div className='addcarddescr'>State:</div>
              <div>
                <input type="text" className="form-addEmpl" placeholder="Input required" onChange={stateEntered}/>
              </div>
            </div>
            <div className='miniSection'>
              <div className='addcarddescr'>Zip:</div>
              <div>
                <input type="text" className="form-addEmpl" placeholder="Input required" onChange={zipEntered}/>
              </div>
            </div>
            <div className='miniSection'>
              <div className='addcarddescr'>Dependants:</div>
              <div>
                <input type="text" className="form-addEmpl" placeholder="Input required" onChange={dependantsEntered}/>
              </div>
            </div>
            <div className='miniSection'>
              <div className='addcarddescr'>Type:</div>
              <div>
                <input type="text" className="form-addEmpl" placeholder="Input required" onChange={typeEntered}/>
              </div>
            </div>
            <div className='miniSection'>
              <div className='addcarddescr'>Marital Status:</div>
              <div>
                <input type="text" className="form-addEmpl" placeholder="Input required" onChange={marStatusEntered}/>
              </div>
            </div>
          </div>
        </section>
        <div className='buttonContainer'>
          {error === 'notvalid' && <button type='button' className='confTermButton' id={props.id} onClick={submitTermination}>Confirm</button> }
          {error === 'notvalid' && <button type='button' className='confTermButton' onClick={cancelTermination}>Cancel</button>}
          {error !== 'notvalid' && <button type='button' className='confTermButton' onClick={goBack}>Go Back</button>}
        </div>
      </form>
      }
    </div>
  );
};

export default Terminator;