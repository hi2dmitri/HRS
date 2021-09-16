import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

/*
  Renders a table of interviews with names as buttons. 
  OnClick changes view and renders candidate info. 
  Button id is candidate id. 
 */

const InterviewDeptListTable = (props) => {

  const displayCard = (e) => {
    props.setCurrView('candidate');
    props.setCandidateId(e.target.id);
  };
    
  const interviews = props.interviews;

  return (
    <div>
      <div className='theadintdept'>
        <div className='throw1-intdept'>
              NAME
        </div>
        <div className='throw2-intdept'>
              POSITION
        </div>
        <div className='throw3-intdept'>
              DATE  
        </div>
        <div className='throw4-intdept'>
              TIME   
        </div>
        <div className='throw5-intdept'>
              CONTACT    
        </div>
      </div>
      <table className='tbody-intdept'> 
        <tbody className='tbody-intdept'> 
          {interviews.map((row, i ) => (
            <TableRow key={row.id + '-' + i} className='candidate-intdept'>
              <TableCell component="th" scope="row" className='cell1'>
                <button type='button' id={row.id} className='candidatebutton' onClick = {displayCard}>
                  {row.first_name} {row.last_name}
                </button>
              </TableCell>
              <TableCell align="left" className='cell2'>{row.position}</TableCell>
              <TableCell align="left" className='cell3'>{row.date}</TableCell>
              <TableCell align="left" className='cell4'>{row.time}</TableCell>
              <TableCell align="left" className='cell5'>{row.email}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InterviewDeptListTable;