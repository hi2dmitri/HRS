import React, {useState, useEffect} from 'react';
import InterviewDeptListTable from './InterviewDeptListTable';
import InterviewDeptCandidateCard from './InterviewDeptCandidateCard';

/*
  Based on local current view renders either candidate card or interviews list table.
 */

const InterviewsDeptList = (props) => {
  const [currView, setCurrView] = useState('interviews');
  const [candidateId, setCandidateId] = useState(0);
 

  return (<div> 
    
    {currView === 'interviews' &&
          <InterviewDeptListTable interviews = {props.interviews} setCurrView = {setCurrView} setCandidateId={setCandidateId}/>
    }
    {currView === 'candidate' &&
        <InterviewDeptCandidateCard setCurrView={setCurrView} interviews={props.interviews} candidateId={candidateId}/>}
  </div>
  );
};


export default InterviewsDeptList;