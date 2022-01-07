import React, {useState} from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Popup from './Popup';
import PopUpDecl from './PopupDecl';

/*
  Renders a list of candidates where name is a button. OnClick will change view and display card.
  Accept and Decline change parents states and render pop up windows passing personId and all applicants to it.
*/

const ApplicantsViewList = (props) => {

  const [personId, setPersonId] = useState();

  const displayCard = (e) => {
    props.setCurrView('detailed');
    props.setApplicantId(e.target.id);
  };

  const accept = e => {
    setPersonId(e.target.id);
    props.seen === true ? props.setSeen(false) : props.setSeen(true);
  };

  const decline = e => {
    setPersonId(e.target.id);
    props.seenDecl === true ? props.setSeenDecl(false) : props.setSeenDecl(true);
  };
    
  const applicants = props.applicants;
  return (
    <div>
      <div className='theadintdept'>
        <div className='throw1-apldept'>
              NAME
        </div>
        <div className='throw2-intdept'>
              POSITION
        </div>
        <div className='throw3-intdept'>
              PHONE
        </div>
        <div className='throw4-apldept'>
              EMAIL   
        </div>
        <div className='throw5-apldept'>
              STATUS    
        </div>
        <div className='throw6-intdept'>
              ACTION    
        </div>
      </div>
      {props.seen ? <Popup 
        accept={accept} 
        personId={personId} 
        applicants = {applicants} 
        seen ={props.seen} 
        updateParent={props.updateParent} setUpdateParent = {props.setUpdateParent}
        setSeen = {props.setSeen}/> : null}

      {props.seenDecl ? <PopUpDecl 
        decline={decline} 
        personId={personId} 
        applicants = {applicants} 
        seenDecl ={props.seenDecl} 
        updateParent={props.updateParent} setUpdateParent = {props.setUpdateParent}
        setSeenDecl = {props.setSeenDecl}/> : null}

      <table className='tbody-intdept'> 
        <tbody className='tbody-intdept'>
          {applicants.map((row) => (
            <TableRow key={row.id} className='candidate-intdept'>
              <TableCell component="th" scope="row" className='cell1-applview'>
                <button type='button' id={row.id} className='candidatebutton' onClick = {displayCard}>
                  {row.first_name} {row.last_name}
                </button>

              </TableCell>
              <TableCell align="left" className='cell2'>{row.position}</TableCell>
              <TableCell align="left" className='cell3'>{row.phone}</TableCell>
              <TableCell align="left" className='cell4'>{row.email}</TableCell>
              <TableCell align="left" className='cell5-applview'>{row.status}</TableCell>
              <TableCell align="left" className='cell6'>
                {row.status !== 'Cancelled'  && <button type='button' id={row.id} className='applacceptbutton' onClick = {accept}>
                Accept
                </button>}
              </TableCell>
              <TableCell align="left" className='cell7'>
                <button type='button' id={row.id} className='appldeclbutton' onClick = {decline}>
                Decline
                </button>
              </TableCell>

            </TableRow>
        
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicantsViewList;