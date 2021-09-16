import React, {useState, useEffect} from 'react';

/*
  Renders job card with delete button.
  When delete clicked sends http request to delete job in database and unmounts it with isActive state update.
  props.num defines if there are active apps and renders error instead of deleting if number of apps in more than 0.
 */


const JobCard = (props) => {

  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState(false);
  const id = props.id;

  const deleteButton = async (e) => {
    if (props.num !== 0) {
      setError(true);
    }
    else{
      try{
        const bodyObj = {id: id};
        const result = await fetch('/recruitment/deletejob', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bodyObj)
        });
        const received = await result.json();
      }
      finally{
        setIsActive(false);
        props.setIsSuccess(true);
        setError(false);
      }
    }
  };

  useEffect(()=> {
    setTimeout(() => {
      setError(false);}, 3000);
  }, [error]);

  return (<div>
    {isActive && 
    <div className='memberCard jobCard'> 
      {error && 
    <div className = 'errorDeleteJob'>
        Action denied. You have active applications for this listing. 
    </div>
      }
      <div className='jobTitle'>{props.title}</div>
      <div className='jobId'>{props.id}</div>
      <div className='jobDepartment'>{props.department}</div>
      <div className='jobOpen'> {props.open}</div>
      <div className='jobNum'>{props.num}</div>
      <button type='button' className='appldeclbutton jobdeptdelete' id={props.id} onClick ={deleteButton}>
        Delete
      </button>
    </div>
    }
  </div>
  );
};


export default JobCard;