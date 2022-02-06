/* eslint-disable no-dupe-keys */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './dashboard.css';
import { faCogs, faUsers, faHome, faUserShield, faSearch, faCircle} from '@fortawesome/free-solid-svg-icons';
import MembersDept from '../components/MembersDept';
import EmployeesDept from '../components/EmployeesDept';
import Intro from '../components/Intro';
import JobsDept from '../components/JobsDept';
import ApplicantsDept from '../components/ApplicantsDept';
import InterviewsDept from '../components/InterviewsDept';
import Settings from '../components/Settings';
import DropMenu from '../components/DropMenu';


/*
  Checks props passed from App and redirects to homepage if not authorized.
  Gets name from local storage.
  Holds states for all buttons.
  Renders different components based on button clicks. 
*/

const Dashboard = (props)  => {
  // if (props.auth === false) {
  //   return <Redirect to='/' />;
  // }

  const nwN = localStorage.getItem('name');
  const[name, setName] = useState(nwN);
  const[currentComponent, setCurrentComponent] = useState({type: 'DASHBOARD'});
  const[dashButtonStyle, setDashButtonStyle] = useState({background1:'rgb(3,40,71)', background2: 'linear-gradient(156deg, rgba(3,40,71,1) 35%, rgb(15, 55, 92) 56%, rgba(31,74,120,1) 93%)'});
  const[empButtonStyle, setEmpButtonStyle] = useState({background1:'transparent', background2: 'transparent'});
  const[tooButtonStyle, setTooButtonStyle] = useState({background1:'transparent', background2: 'transparent'});
  const[interviewButtonStyle, setInterviewButtonStyle] = useState({background1:'transparent', background2: 'transparent'});
  const[candidatesButtonStyle, setCandidatesButtonStyle] = useState({background1:'transparent', background2: 'transparent'});
  const[memButtonStyle, setMemButtonStyle] = useState({background1:'transparent', background2: 'transparent'});
  const[setButtonStyle, setSetButtonStyle] = useState({background1:'transparent', background2: 'transparent'});

  const buttonClicked = (e) => {

    if (e.target.className === 'dashButton') {
      setCurrentComponent({type: 'DASHBOARD'});
      setDashButtonStyle({background1:'rgb(3,40,71)', background2: 'linear-gradient(156deg, rgba(3,40,71,1) 35%, rgb(15, 55, 92) 56%, rgba(31,74,120,1) 93%)'});
      setEmpButtonStyle({background1:'transparent', background2: 'transparent'});
      setTooButtonStyle({background1:'transparent', background2: 'transparent'});
      setInterviewButtonStyle({background1:'transparent', background2: 'transparent'});
      setCandidatesButtonStyle({background1:'transparent', background2: 'transparent'});
      setMemButtonStyle({background1:'transparent', background2: 'transparent'});
      setSetButtonStyle({background1:'transparent', background2: 'transparent'});
    }
    else if (e.target.className === 'memButton') {
      setCurrentComponent({type: 'USERS'});
      setDashButtonStyle({background1:'transparent', background2: 'transparent'});
      setEmpButtonStyle({background1:'transparent', background2: 'transparent'});
      setTooButtonStyle({background1:'transparent', background2: 'transparent'});
      setInterviewButtonStyle({background1:'transparent', background2: 'transparent'});
      setCandidatesButtonStyle({background1:'transparent', background2: 'transparent'});
      setMemButtonStyle({background1:'rgb(3,40,71)', background2: 'linear-gradient(156deg, rgba(3,40,71,1) 35%, rgb(15, 55, 92) 56%, rgba(31,74,120,1) 93%)'});
      setSetButtonStyle({background1:'transparent', background2: 'transparent'});
    }
    else if (e.target.className === 'empButton') {
      setCurrentComponent({type: 'EMPLOYMENT'});
      setDashButtonStyle({background1:'transparent', background2: 'transparent'});
      setEmpButtonStyle({background1:'rgb(3,40,71)', background2: 'linear-gradient(156deg, rgba(3,40,71,1) 35%, rgb(15, 55, 92) 56%, rgba(31,74,120,1) 93%)'});
      setTooButtonStyle({background1:'transparent', background2: 'transparent'});
      setInterviewButtonStyle({background1:'transparent', background2: 'transparent'});
      setCandidatesButtonStyle({background1:'transparent', background2: 'transparent'});
      setMemButtonStyle({background1:'transparent', background2: 'transparent'});
      setSetButtonStyle({background1:'transparent', background2: 'transparent'});
    }
    else if (e.target.className === 'tooButton') {
      setCurrentComponent({type: 'RECRUITMENT: jobs'});
      setDashButtonStyle({background1:'transparent', background2: 'transparent'});
      setEmpButtonStyle({background1:'transparent', background2: 'transparent'});
      setTooButtonStyle({background1:'rgb(3,40,71)', background2: 'linear-gradient(156deg, rgba(3,40,71,1) 35%, rgb(15, 55, 92) 56%, rgba(31,74,120,1) 93%)'});
      setInterviewButtonStyle({background1:'transparent', background2: 'transparent'});
      setCandidatesButtonStyle({background1:'transparent', background2: 'transparent'});
      setMemButtonStyle({background1:'transparent', background2: 'transparent'});
      setSetButtonStyle({background1:'transparent', background2: 'transparent'});
    }
    else if (e.target.className === 'setButton') {
      setCurrentComponent({type: 'SETTINGS'});
      setDashButtonStyle({background1:'transparent', background2: 'transparent'});
      setEmpButtonStyle({background1:'transparent', background2: 'transparent'});
      setTooButtonStyle({background1:'transparent', background2: 'transparent'});
      setInterviewButtonStyle({background1:'transparent', background2: 'transparent'});
      setCandidatesButtonStyle({background1:'transparent', background2: 'transparent'});
      setMemButtonStyle({background1:'transparent', background2: 'transparent'});
      setSetButtonStyle({background1:'rgb(3,40,71)', background2: 'linear-gradient(156deg, rgba(3,40,71,1) 35%, rgb(15, 55, 92) 56%, rgba(31,74,120,1) 93%)'});
    }
    else if (e.target.className === 'interviewbutton') {
      setCurrentComponent({type: 'RECRUITMENT: interviews'});
      setDashButtonStyle({background1:'transparent', background2: 'transparent'});
      setEmpButtonStyle({background1:'transparent', background2: 'transparent'});
      setTooButtonStyle({background1:'transparent', background2: 'transparent'});
      setInterviewButtonStyle({background1:'rgb(3,40,71)', background2: 'linear-gradient(156deg, rgba(3,40,71,1) 35%, rgb(15, 55, 92) 56%, rgba(31,74,120,1) 93%)'});
      setCandidatesButtonStyle({background1:'transparent', background2: 'transparent'});
      setMemButtonStyle({background1:'transparent', background2: 'transparent'});
      setSetButtonStyle({background1:'transparent', background2: 'transparent'});
    }
    else if (e.target.className === 'candidatesbutton') {
      setCurrentComponent({type: 'RECRUITMENT: applicants'});
      setDashButtonStyle({background1:'transparent', background2: 'transparent'});
      setEmpButtonStyle({background1:'transparent', background2: 'transparent'});
      setTooButtonStyle({background1:'transparent', background2: 'transparent'});
      setInterviewButtonStyle({background1:'transparent', background2: 'transparent'});
      setCandidatesButtonStyle({background1:'rgb(3,40,71)', background2: 'linear-gradient(156deg, rgba(3,40,71,1) 35%, rgb(15, 55, 92) 56%, rgba(31,74,120,1) 93%)'});
      setMemButtonStyle({background1:'transparent', background2: 'transparent'});
      setSetButtonStyle({background1:'transparent', background2: 'transparent'});
    }
  };

  return ( 
    <div className='dashboard'>     
      <div className='navigation'>
        <h1 className="logoText">HRS</h1>
        <p className='welcomeMessage'>USER: {name}</p>
        <DropMenu setCurrentComponent={setCurrentComponent}/>
        <button className='logout-mob'onClick={ (e) => {localStorage.removeItem('token'); localStorage.removeItem('name'); props.setAuth(false); }}>
          LOGOUT
        </button>
        <div className="navigationButtonContainer">
          <button type='button' className='dashButton' style={{background: dashButtonStyle.background1, background: dashButtonStyle.background2}} onClick={(e) => buttonClicked(e)}> 
            <FontAwesomeIcon className="navIcons" icon={faHome}/>
            Dashboard</button>
          <button type='button' className='empButton' style={{background: empButtonStyle.background1, background: empButtonStyle.background2}} onClick={(e) => buttonClicked(e)}>
            <FontAwesomeIcon className="navIcons" icon={faUsers}/>
            Employment</button>
          <button type='button' className='tooButton' style={{background: tooButtonStyle.background1, background: tooButtonStyle.background2}} onClick={(e) => buttonClicked(e)}>
            <FontAwesomeIcon className="navIcons" icon={faSearch}/>
             Recruitment</button>
          <button type='button' className='interviewbutton' style={{background: interviewButtonStyle.background1, background: interviewButtonStyle.background2}} onClick={(e) => buttonClicked(e)}>
            <FontAwesomeIcon className="navIcons" size='xs' icon={faCircle}/>
            Interviews</button>
          <button type='button' className='candidatesbutton' style={{background: candidatesButtonStyle.background1, background: candidatesButtonStyle.background2}} onClick={(e) => buttonClicked(e)}>
            <FontAwesomeIcon className="navIcons" size='xs' icon={faCircle}/>
            Applicants</button>
          <button type='button' className='memButton' style={{background: memButtonStyle.background1, background: memButtonStyle.background2}} onClick={(e) => buttonClicked(e)}>
            <FontAwesomeIcon className="navIcons" icon={faUserShield}/>
            Users</button>
          <button type='button' className='setButton' style={{background: setButtonStyle.background1, background: setButtonStyle.background2}} onClick={(e) => buttonClicked(e)}>
            <FontAwesomeIcon className="navIcons" icon={faCogs}/>
            Settings</button>
        </div>
      </div>
      <div className='displayDashboard'>
        <div className='header'>
          <p>{currentComponent.type}</p>
          <button className='logout-main'onClick={ (e) => {localStorage.removeItem('token'); localStorage.removeItem('name'); props.setAuth(false); }}>
          LOGOUT
          </button>
        </div>
        <div className='workingArea'>
          {currentComponent.type === 'USERS' && <MembersDept />}
          {currentComponent.type === 'EMPLOYMENT' && <EmployeesDept />}
          {currentComponent.type === 'DASHBOARD' && <Intro />}
          {currentComponent.type === 'RECRUITMENT: jobs' && <JobsDept />}
          {currentComponent.type === 'RECRUITMENT: applicants' && <ApplicantsDept />}
          {currentComponent.type === 'RECRUITMENT: interviews' && <InterviewsDept />}
          {currentComponent.type === 'SETTINGS' && <Settings />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;