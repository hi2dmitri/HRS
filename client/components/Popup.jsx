import React, {useState} from 'react';

/*
  Finds a person by filtering applicants from props object;
  finds other applicants for same position by filtering same array;
  assigns a value of all names concatinated together to variable stringOfNames;
  handleClick changes state of parent and anmounts this component;
  updates parent to send a new request and unmount deleted applicants;
  sends http request to server on click to accept candidate. 
  This will delete all other interviews for same position, 
  change status of applicants for same position and delete job.
 */

const PopUp = (props) =>  {
  const [isReady, setIsReady] = useState(true);
  const [error, setError] = useState(false);

  const person = props.applicants.filter(applicant => applicant.id == props.personId)[0];
  
  const otherApplicants = props.applicants.filter(applicant => applicant.position === person.position && applicant.id !== person.id);
  let stringOfNames = '';

  otherApplicants.forEach(other => stringOfNames += `${other.first_name} ${other.last_name}, `);
  if (stringOfNames.length > 0) {stringOfNames = stringOfNames.slice(0, -2);}

  const handleClick = () => {
    props.seen === true ? props.setSeen(false) : props.setSeen(true);
    setIsReady(true);
    setError(false);
    props.updateParent === true ? props.setUpdateParent(false) : props.setUpdateParent(true);
  };

  const acceptanceAction = async (e) => {
    try{
      const result = await fetch('/recruitment/acceptcandidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'id': person.id, 'position': person.position})
      });
      const data = await result.json();
      if (data === false) {
        setError(true);
      }
    }
    finally {
      setIsReady(false);
    }
  };
  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close" onClick={handleClick}>
            &times;
        </span>
        <div className='innerModal'>
          <div>
            { isReady && 
              <div className ='innerModal'> 
                <div><span className='markupinfo'>{person.first_name} {person.last_name}</span> has been accepted for position. </div>  
                {stringOfNames.length > 0  && <div>Interviews with <span className='markupinfo'>{stringOfNames}</span> will be cancelled automatically.</div>}
                <div><span className='markupinfo'>{person.position}</span> position will be deleted from system.</div>
                <button type='button' className='applacceptbutton' id={person.id} onClick={acceptanceAction}>Confirm</button> 
              </div>
            }
            {(!isReady && !error) && 
              <div>Operation Successfull</div>}
            {(!isReady && error) &&
                <div>Something went wrong. Please contact technical support</div>}
          </div>
        </div>  
      </div>
    </div>
  );
};

export default PopUp;