import React from 'react';

/*
  Filters all applicants by id received from parent component and set in ApplicantsViewList;
  Renders all info. 
  OnClick changes parent's state currView.
 */

const ApplicantsViewCard = (props) => {
  
  const {setCurrView, applicants, applicantId} = props;
  const applicantInfo = applicants.filter(applicant => applicant.id == applicantId)[0];
  const goBack = () => {
    setCurrView('brief');
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
            <div className='candidateField'>{applicantInfo.first_name}</div>
          </div>
        </div>
        <div className = 'candidateDescr-intdept'> 
          <div className='tag'>Id</div>
          <div className = 'descrInternal'>
            <div className='candidateField'>{applicantInfo.id}</div>
          </div>
        </div>
        <div className = 'candidateDescr-intdept'> 
          <div className='tag'>Last Name</div>
          <div className = 'descrInternal'>
            <div className='candidateField'>{applicantInfo.last_name}</div>
          </div>
        </div>
        <div className = 'candidateDescr-intdept'> 
          <div className='tag'>Email</div>
          <div className = 'descrInternal'>
            <div className='candidateField'>{applicantInfo.email}</div>
          </div>
        </div>
        <div className = 'candidateDescr-intdept'> 
          <div className='tag'>Phone</div>
          <div className = 'descrInternal'>
            <div className='candidateField'>{applicantInfo.phone}</div>
          </div>
        </div>
        <div className = 'candidateDescr-intdept'> 
          <div className='tag'>Position</div>
          <div className = 'descrInternal'>
            <div className='candidateField'>{applicantInfo.position}</div>
          </div>
        </div>
        <div className = 'candidateDescr-intdept'> 
          <div className='tag'>Experience</div>
          <div className = 'descrInternal'>
            <div className='candidateField'>{applicantInfo.experience}</div>
          </div>
        </div>
        <div className = 'candidateDescr-intdept'> 
          <div className='tag'>Education</div>
          <div className = 'descrInternal'>
            <div className='candidateField'>{applicantInfo.education}</div>
          </div>
        </div>
        <div className = 'candidateDescr-intdept'> 
          <div className='tag'>Notes</div>
          <div className = 'descrInternal'>
            <div className='candidateField'>{applicantInfo.notes}</div>
          </div>
        </div>
        <div className='buttoncontainer-intdept'>
          <button type='button' className='updatebutton' onClick={goBack}>Return</button>
        </div>
      </div>
    </div>
  );
};

export default ApplicantsViewCard;