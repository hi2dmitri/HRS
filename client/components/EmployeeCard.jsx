import React, {useEffect, useState} from 'react';
import {AccordionDetails, AccordionSummary, Accordion} from '@mui/material';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Terminator from './Terminator.jsx';

/* Terminator rendered based on prop term.  Terminator is a form to submit termination or update info;
   prop isButtonActive renders button Terminate.;
   props.statusOfEmpl -> if employee is not active (is former) terminate button is unmounted;
 */
function EmployeeCard (props) {
  
  const [buttonVal, setButtonVal] = useState(null);

  function terminate (e) {
    setButtonVal(e.target.className);
    props.setTerm (true);
    props.setIsButtonActive(false);
  }

  const {city, current, dateofhire, department, dependants, dob, email, first_name, gender, id, last_name, marstatus, position, state, street, type, zip, termindate, terminreason, statusOfEmpl} = props;
  return (
    <Accordion expanded={props.expanded === `${props.id}`} onChange={props.handleChange(`${props.id}`)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={id + 'control'}
        id={id + 'header'}
      > 
        <div className='emplName'>{first_name} {last_name}</div>
        <div className='emplDept'>{department}</div>
        <div className = 'emplPosit'>{position}</div>
      </AccordionSummary>
      <AccordionDetails>
        { props.term === false && <div>
          <section className = 'emplCardSect'>
            <p>GENERAL INFO</p>
            <div className = 'emplCardInner'>
              <div className='miniSection'>
                <div className='emplcarddescr'>First Name:</div>
                <div>{first_name}</div>
              </div>
              <div className='miniSection'>
                <div className='emplcarddescr'>EID:</div>
                <div>{id}</div>
              </div>
              <div className='miniSection'>
                <div className='emplcarddescr'>Last Name:</div>
                <div>{last_name}</div>
              </div>
              <div className='miniSection'>
                <div className='emplcarddescr'>Email:</div>
                <div>{email}</div>
              </div>
            </div>
          </section>

          <section className = 'emplCardSect'>
            <p>WORK</p>
            <div className = 'emplCardInner'>
              <div className='miniSection'>
                <div className='emplcarddescr'>Dept:</div>
                <div>{department}</div>
              </div>
              <div className='miniSection'>
                <div className='emplcarddescr'>Date of Hire:</div>
                <div>{dateofhire}</div>
              </div>
              <div className='miniSection'>
                <div className='emplcarddescr'>Position:</div>
                <div>{position}</div>
              </div>
              <div className='miniSection'>
                <div className='emplcarddescr'>Type:</div>
                <div>{type}</div>
              </div>
              {termindate &&
          <div className='miniSection'>
            <div className='emplcarddescr'>Date of Termination:</div>
            <div>{termindate}</div>
          </div>
              }
              <div className='miniSection'>
                <div className='emplcarddescr'>Dependants:</div>
                <div>{dependants}</div>
              </div>
              {
                terminreason &&
          <div className='miniSection'>
            <div className='emplcarddescr'>Reason of Termination:</div>
            <div>{terminreason}</div>
          </div>
              }
            </div>
          </section>
          <section className = 'emplCardSect'>
            <p>PERSONAL DETAILS</p>
            <div className = 'emplCardInner'>
              <div className='miniSection'>
                <div className='emplcarddescr'>Street:</div>
                <div>{street}</div>
              </div>
              <div className='miniSection'>
                <div className='emplcarddescr'>DOB:</div>
                <div>{dob}</div>
              </div>
              <div className='miniSection'>
                <div className='emplcarddescr'>City:</div>
                <div>{city}</div>
              </div>
              <div className='miniSection'>
                <div className='emplcarddescr'>Marital Status:</div>
                <div>{marstatus}</div>
              </div>
              <div className='miniSection'>
                <div className='emplcarddescr'>State:</div>
                <div>{state}</div>
              </div>
              <div className='miniSection'>
                <div className='emplcarddescr'>Gender:</div>
                <div>{gender}</div>
              </div>
              <div className='miniSection'>
                <div className='emplcarddescr'>Zip:</div>
                <div>{zip}</div>
              </div>
            </div>
          </section>
        </div> }
        {props.term === true  && 
        <Terminator 
          setIsButtonActive={props.setIsButtonActive} 
          setTerm={props.setTerm} 
          id={id} 
          setUpdateParent={props.setUpdateParent}
          updateParent={props.updateParent}
          buttonVal={buttonVal}
        />
        }
        <div className='buttonContainer'>
          {(statusOfEmpl === 'active' && props.isButtonActive === true) && <button type='button' className='terminatebutton' onClick={terminate}>Terminate</button> }
          {(statusOfEmpl === 'active' && props.isButtonActive === true) && <button type='button' className='updatebutton' onClick={terminate}>Update</button> }
        </div>
      </AccordionDetails>
    </Accordion>
  );
}


export default EmployeeCard;