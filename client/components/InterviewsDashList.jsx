import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Title from './Title';

/*
  Filters interviews to render only upcoming interviews.
  Renders interview cards in table.
  On name click changes view state in parent component and renders card of a candidate.
*/

const InterviewsDashList = (props) => {

  const displayCard = (e) => {
    props.setCurrView('candidate');
    props.setCandidateId(e.target.id);
  };

  function filterInterviews (array) {
    const dateObj = new Date();
    const nowMonth = dateObj.getUTCMonth() + 1;
    const nowDay = dateObj.getUTCDate();
    const nowYear = dateObj.getUTCFullYear();
    const filtered = [];
    array.forEach((arr) => {
      const newdate = arr.date.split('-');
      if(newdate[2] > nowYear) {filtered.push(arr);}
      else if (newdate[2] == nowYear && newdate[0] > nowMonth) {
        filtered.push(arr);
      }
      else if(newdate[2] == nowYear && newdate[0] == nowMonth && newdate[1] >= nowDay) {
        filtered.push(arr);
      }
    });
    filtered.sort((a,b) => parseInt(a.id) - parseInt(b.id));
    return filtered;
  }
    
  const interviews = filterInterviews (props.interviews);

  return (
    <div> 
      <div className='headerChart'>
        <Title title='UPCOMING INTERVIEWS '/>      
      </div>
      <div className='thead'>
        <div className='throw1'>
              Candidate Name
        </div>
        <div className='throw2'>
              Position
        </div>
        <div className='throw3'>
              Date  
        </div>
        <div className='throw4'>
              Time   
        </div>
        <div className='throw5'>
              Contact    
        </div>
      </div>
      <TableContainer component={Paper} >
        <Table className="someTable" aria-label="simple table">
          <TableBody>
            {interviews.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row" className='cell1main'>
                  <button type='button' id={row.id} className='candidatebutton' onClick = {displayCard}>
                    {row.first_name} {row.last_name}
                  </button>
                </TableCell>
                <TableCell className='cell2main' align="left">{row.position}</TableCell>
                <TableCell className='cell3main' align="left">{row.date}</TableCell>
                <TableCell className='cell4main' align="left">{row.time}</TableCell>
                <TableCell className='cell5main' align="left">{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default InterviewsDashList;