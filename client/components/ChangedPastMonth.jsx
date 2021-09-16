import React, {useState, useEffect} from 'react';
import { CircularProgress } from '@material-ui/core';


/*
  Sends different requests based on parent div. 
  If server fails to deliver requested info renders error.
  else renders recently hired or fired based on parent div
*/

const ChangedPastMonth = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [number, setNumber] = useState(0);
  const [names, setNames] = useState([]);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async() => {
    try {
      let url = '';
      if(props.parent === 'bottomleft1') {
        url = '/employees/latesthired';
      }
      else if(props.parent === 'bottomleft2') {
        url = '/employees/latestfired';
      }
      const result = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const jsonres = await result.json();
      if(jsonres === true) {
        setError(true);
      } else {
        setNumber(jsonres.number);
        setNames(jsonres.names);
      }
    }
    finally {setIsLoading(false);}
  };

  return(
    <div className='toinherit'>
      {isLoading && 
        <div className = "loadinginComponent">
          < CircularProgress />
        </div>
      }
      {!isLoading && <div className = 'toinherit'>
        {error && <p >Error occured. Please contact technical support</p>}
        {!error && <div className='changedpastmonthstats'>
          <section className='numberchanged'>
            <div className='innernumberchanged'>{number}</div>
          </section>
          <section className='listchanged'>
            {names.map((name,i) => {
              return <p key={i}>{name.first_name} {name.last_name}</p>;
            })}
          </section>
          {props.parent === 'bottomleft1' && 
          <div className = 'descrrecent'>
            Recently Hired
          </div>}
          {props.parent === 'bottomleft2' && 
          <div className = 'descrrecent'>
            Recently Terminated
          </div>}
        </div>
        }
      </div> 
      }
    </div>
  );
};



export default ChangedPastMonth;