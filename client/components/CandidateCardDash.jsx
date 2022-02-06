import React from 'react';
import Title from './Title';

/*
  Renders candidate info, on click changes parent state view to display table of interviews.
 */

const CandidateCardDash = (props) => {
  
  const {setCurrView, interviews, candidateId} = props;
  const candidateInfo = interviews.filter(interview => interview.id == candidateId)[0];
  console.log('candidinfo', candidateInfo);

  const goBack = () => {
    console.log('hi');
    setCurrView('interviews');
  };

  return( 
    <div>
      <div className='headerChart'>
        <Title title='CANDIDATE INFO' />      </div>
      <div className='candidateInnerContainer'>
        <div className = 'candidateDescr'> 
          <div className='tag'>First Name</div>
          <div className = 'descrInternal'>
            <div className='candidateField'>{candidateInfo.first_name}</div>
          </div>
        </div>
        <div className = 'candidateDescr'> 
          <div className='tag'>Email</div>
          <div className = 'descrInternal'>
            <div className='candidateField'>{candidateInfo.email}</div>
          </div>
        </div>
        <div className = 'candidateDescr'> 
          <div className='tag'>Last Name</div>
          <div className = 'descrInternal'>
            <div className='candidateField'>{candidateInfo.last_name}</div>
          </div>
        </div>
        <div className = 'candidateDescr'> 
          <div className='tag'>Phone</div>
          <div className = 'descrInternal'>
            <div className='candidateField'>{candidateInfo.phone}</div>
          </div>
        </div>
        <div className = 'candidateDescr'> 
          <div className='tag'>Position</div>
          <div className = 'descrInternal'>
            <div className='candidateField'>{candidateInfo.position}</div>
          </div>
        </div>
        <div className = 'candidateDescr'> 
          <div className='tag'>Experience</div>
          <div className = 'descrInternal'>
            <div className='candidateField'>{candidateInfo.experience}</div>
          </div>
        </div>
        <div className = 'candidateDescr'> 
          <div className='tag'>Education</div>
          <div className = 'descrInternal'>
            <div className='candidateField'>{candidateInfo.education}</div>
          </div>
        </div>
        <div className = 'candidateDescr'> 
          <div className='tag'>Notes</div>
          <div className = 'descrInternal'>
            <div className='candidateField'>{candidateInfo.notes}</div>
          </div>
        </div>
      </div>
      <div className='buttoncontainer'>
        <button type='button' className='updatebutton' onClick={goBack}>Return</button>
      </div>
    </div>
  );
};

export default CandidateCardDash;