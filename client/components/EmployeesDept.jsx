import React, {useState, useEffect} from 'react';
import EmployeeCard from './EmployeeCard';
import AddEmployee from './AddEmployee';
import { CircularProgress } from '@material-ui/core';


/*
  allEmployees State holds all empl, received from fetch;
  http request is sent when clicking on current or past employees button 
  what causes change in statusOfEmpl state
  or when we trigger updateParent in Terminator
  view State helps to switch between employees and add employees
  renders current, former and add employees components
*/


const EmployeesDept = (props) => {
  //state to expand Accordion
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [allEmployees, setAllEmployees] = useState([]);
  const [statusOfEmpl, setStatusOfEmpl] = useState('active');
  const [view, setView] = useState('empl');
  const [updateParent, setUpdateParent] = useState(false);
  const [term, setTerm] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [activeEmplSstyle, setActiveEmplStyle] = useState({backgroundColor: 'white', color: '#3d79b9'});
  const [formerEmplSstyle, setFormerEmplStyle] = useState({backgroundColor: '#3d79b9', color: 'white'});
  const [addEmplSstyle, setAddEmplStyle] = useState({backgroundColor: '#3d79b9', color: 'white'});


  const active = () => {
    setStatusOfEmpl('active');
    setIsButtonActive(true);

    setView('empl');
    setActiveEmplStyle(oldStyle => ({...oldStyle, backgroundColor: 'white', color: '#3d79b9'}));
    setFormerEmplStyle(oldStyle => ({...oldStyle, backgroundColor: '#3d79b9', color: 'white'}));
    setAddEmplStyle(oldStyle => ({...oldStyle, backgroundColor: '#3d79b9', color: 'white'}));
  };

  const inactive = () => {
    setStatusOfEmpl('inactive');
    setIsButtonActive(false);
    setTerm(false);
    setView('empl');
    setActiveEmplStyle(oldStyle => ({...oldStyle, backgroundColor: '#3d79b9', color: 'white'}));
    setFormerEmplStyle(oldStyle => ({...oldStyle, backgroundColor: 'white', color: '#3d79b9'}));
    setAddEmplStyle(oldStyle => ({...oldStyle, backgroundColor: '#3d79b9', color: 'white'}));
  };
  const addEmpl = () => {
    setView('addEmpl');
    setTerm(false);
    setActiveEmplStyle(oldStyle => ({...oldStyle, backgroundColor: '#3d79b9', color: 'white'}));
    setFormerEmplStyle(oldStyle => ({...oldStyle, backgroundColor: '#3d79b9', color: 'white'}));
    setAddEmplStyle(oldStyle => ({...oldStyle, backgroundColor: 'white', color: '#3d79b9'}));
  };

  useEffect(() => {
    fetchData();
  }, [statusOfEmpl, updateParent, view]);


  const fetchData = async() => {
    try {
      let url = '';
      if (statusOfEmpl === 'active') {url = '/employees';}
      else if (statusOfEmpl === 'inactive') {url = '/employees/past';}
      const result = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const jsonres = await result.json();
      setAllEmployees(jsonres);
    } catch (err) {console.log(err);}
    finally {setIsLoading(false);}
  };
  
  return (<div>
    {isLoading && 
      <div className = "loading">
        < CircularProgress />
      </div>
    }
    <div className='emplButtonNav'>
      <button type='button' className='statusButton activeemplbutton' style = {{backgroundColor: activeEmplSstyle.backgroundColor, color: activeEmplSstyle.color}} onClick={active}> Current Employees </button>
      <button type='button' className='statusButton formeremplbutton' style = {{backgroundColor: formerEmplSstyle.backgroundColor, color: formerEmplSstyle.color}} onClick={inactive}> Former Employees </button>
      <button type='button' className='statusButton addemplbutton' style = {{backgroundColor: addEmplSstyle.backgroundColor, color: addEmplSstyle.color}}onClick={addEmpl}> Add Employee </button>
    </div>
    {!isLoading && <div>
      {view === 'empl'  &&
    <div className = 'employeesInner'>
      <div className='navForAccordion'>
        <div>NAME</div>
        <div>DEPARTMENT</div>
        <div>POSITION</div>
      </div>
      {allEmployees.map((employee,i) => 
        <EmployeeCard 
          key={i + 'empl'} 
          id={employee.id}
          expanded={expanded} 
          setExpanded={setExpanded} 
          handleChange={handleChange} 
          city={employee.city}
          current={employee.current} 
          dateofhire={employee.dateofhire}
          termindate={employee.termindate}
          department={employee.department}
          dependants={employee.dependants}
          dob={employee.dob}
          email={employee.email}
          first_name={employee.first_name}
          gender={employee.gender}
          last_name={employee.last_name}
          marstatus={employee.marstatus}
          position={employee.position}
          state={employee.state}
          street={employee.street}
          type={employee.type}
          terminreason={employee.terminreason}
          zip={employee.zip}
          statusOfEmpl={statusOfEmpl}
          setStatusOfEmpl={setStatusOfEmpl}
          setUpdateParent={setUpdateParent}
          updateParent = {updateParent}
          term = {term}
          setTerm = {setTerm}
          isButtonActive={isButtonActive}
          setIsButtonActive={setIsButtonActive}
        />
      )}
    </div>
      }
      {view === 'addEmpl'  && 
      <AddEmployee />
      }
    </div>
    }
  </div>
  );
};

export default EmployeesDept;