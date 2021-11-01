import React, {useState} from 'react';

/*
  Finds a person by filtering all applicants received in props object from parent component;
  Confirm on Click send http request to delete candidate and either displays error or success 
  based on response;
  handleclick closes popup and changes parents state where new http req is sent and data is updated based on response.
 */

const PopUpDecl = (props) =>  {

  const [isReady, setIsReady] = useState(true);
  const [error, setError] = useState(false);
  const person = props.applicants.filter(applicant => applicant.id == props.personId)[0];
  const position = person.position;
  const id = props.personId;
  const status = person.status;
  
  const handleClick = () => {
    props.seenDecl === true ? props.setSeenDecl(false) : props.setSeenDecl(true);
    setIsReady(true);
    setError(false);
    props.updateParent === true ? props.setUpdateParent(false) : props.setUpdateParent(true);
  };

  const declineAction = async (e) => {
    try{
      const result = await fetch('/recruitment/declinecandidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'id': id, 'position': position, 'status': status})
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
                <div><span className='markupinfo'>{person.first_name} {person.last_name}</span> has not been selected for <span className='markupinfo'>{position}</span> position. </div>  
                <button type='button' className='appldeclbutton' id={person.id} onClick={declineAction}>Confirm</button> 
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

export default PopUpDecl;