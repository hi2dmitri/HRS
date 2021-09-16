import React, {useState} from 'react';
import ApplicantsViewList from './ApplicantsViewList';
import ApplicantsViewCard from './ApplicantsViewCard';

/*
  Based on view state renders either ApplicantsViewList or ApplicantsViewCard;
  applicantId is set in ApplicantsViewList on Click and is passed to ApplicantsViewCard;
  seen and seenDecl State is used for displaying PopUpWindow;
 */

const ApplicantsView = (props) => {
  const [currView, setCurrView] = useState('brief');
  const [applicantId, setApplicantId] = useState(0);
  const [seen, setSeen] = useState(false);
  const [seenDecl, setSeenDecl] = useState(false);

  return (<div> 
    {currView === 'brief' &&
          <ApplicantsViewList 
            applicants = {props.applicants} 
            setCurrView = {setCurrView} 
            setApplicantId={setApplicantId}
            seen={seen}
            setSeen={setSeen}
            updateParent={props.updateParent} 
            setUpdateParent = {props.setUpdateParent}
            seenDecl={seenDecl}
            setSeenDecl={setSeenDecl}
          />
    }
    {currView === 'detailed' &&
        <ApplicantsViewCard setCurrView={setCurrView} applicants={props.applicants} applicantId={applicantId}/>}
  </div>
  );
};


export default ApplicantsView;