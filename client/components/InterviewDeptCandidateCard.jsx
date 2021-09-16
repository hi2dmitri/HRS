import React from 'react';

/*
  renders candidate info based on data rceived in props from parent component;
  filter finds right info in array of interviews.
  goBack changes parent state and displays all interviews in table again;
 */

const InterviewDeptCandidateCard = (props) => {
  
  const {setCurrView, interviews, candidateId} = props;
  const candidateInfo = interviews.filter(interview => interview.id == candidateId)[0];

  const goBack = () => {
    setCurrView('interviews');
  };

  return( 
    <div>
      <div className='headerChart'>
        <div className ='descrHeader'>CANDIDATE INFO</div>
      </div>
      <div className='candidateInnerContainer-intdept'>
        <div className = 'candidateDescr-intdept'> 
          <div className='tag'>First Name</div>
          <div className = 'descrInternal'>
            <div className='candidateField'>{candidateInfo.first_name}</div>
          </div>
        </div>
        <div className = 'candidateDescr-intdept'> 
          <div className='tag'>Email</div>
          <div className = 'descrInternal'>
            <div className='candidateField'>{candidateInfo.email}</div>
          </div>
        </div>
        <div className = 'candidateDescr-intdept'> 
          <div className='tag'>Last Name</div>
          <div className = 'descrInternal'>
            <div className='candidateField'>{candidateInfo.last_name}</div>
          </div>
        </div>
        <div className = 'candidateDescr-intdept'> 
          <div className='tag'>Phone</div>
          <div className = 'descrInternal'>
            <div className='candidateField'>{candidateInfo.phone}</div>
          </div>
        </div>
        <div className = 'candidateDescr-intdept'> 
          <div className='tag'>Position</div>
          <div className = 'descrInternal'>
            <div className='candidateField'>{candidateInfo.position}</div>
          </div>
        </div>
        <div className = 'candidateDescr-intdept'> 
          <div className='tag'>Experience</div>
          <div className = 'descrInternal'>
            <div className='candidateField'>{candidateInfo.experience}</div>
          </div>
        </div>
        <div className = 'candidateDescr-intdept'> 
          <div className='tag'>Education</div>
          <div className = 'descrInternal'>
            <div className='candidateField'>{candidateInfo.education}</div>
          </div>
        </div>
        <div className = 'candidateDescr-intdept'> 
          <div className='tag'>Notes</div>
          <div className = 'descrInternal'>
            <div className='candidateField'>{candidateInfo.notes}</div>
          </div>
        </div>
        <div className='buttoncontainer-intdept'>
          <button type='button' className='updatebutton' onClick={goBack}>Return</button>
        </div>
      </div>
    </div>
  );
};

export default InterviewDeptCandidateCard;