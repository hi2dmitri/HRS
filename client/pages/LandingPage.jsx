/* eslint-disable indent */
import React, {useState, useEffect} from 'react';
import './landingpage.css';
import logo from '../images/logo.jpg';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

/* 
this component is rendering login or signup form depending on props passed from parent component App
State login is updated based on input in child components - Form or SignupForm
On submittion - submitInfo is invoked.
if login or signup successful, findCookie function gets jwt from cookies and jwt gets stored in localStorage.
Authorization is set to true and all routes are accessible.
Else if failed - state Error gets updated and passed in props to child components - Form or SignupForm
where Error component renders.
*/


const Login = (props)  => {
  console.log('I was called from login component');

  const info = {
      email: null,
      password: null, 
      token:null
  };

  const [login, setLogin] = useState(info);

  const [errorLogin, setErrorLogin] = useState(true);

  function findCookie (cookies) {
      let res = cookies.split('; ');
      let rightCookie = '';
      for (let i = 0; i < res.length; i++) {
        if (res[i].includes('ssid=')) {rightCookie = res[i].trim();}
      }
      res = rightCookie.split('=')[1];
      return res;
  }

  function submitInfo(e) {
    let url = '';
    if (props.registered) {
      url = '/login';
    }
    else {
      url = '/signup';
    }
    console.log('url', url);

    const data = {
      email: login.email,
      password: login.password, 
      token: login.token
    };
    fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(data => data.json())
    .then(resp => {
      if (resp.status === false) {
        setErrorLogin(false);
        props.setAuth(resp.status);

      } 
      else if(resp.status === 'emailfailed') {
        setErrorLogin('emailfailed');
        props.setAuth(false);

      }
      else if (resp.status === true) {
        const rightCookie = findCookie(document.cookie);
        if(rightCookie) {
          localStorage.setItem('token', rightCookie);
          localStorage.setItem('name', `${resp.name.firstName} ${resp.name.lastName}`);
        }
        props.setAuth(resp.status);
      }

    })
    .catch(err => console.log(err));
  }

  useEffect(() => { if (errorLogin === false || errorLogin === 'emailfailed') {
    setTimeout(() => {
      setErrorLogin(true);
    }, 3000); }
  }, [errorLogin]);

  return ( 
  <div className='landing-page'>
    <section className="intro">
      <img alt='intro' className='logoImg' src={logo} />
      <div className ='textInImage'>
        <h3>HRS</h3>
      </div>
      <div className='motto'>
        <p>AUTOMATED PAPERLESS EMPLOYEE MANAGEMENT SYSTEM</p>
      </div>
    </section>
    <section className='auth'>
    <div className='appName-mob'>
        <div>HRS</div>
      </div>
    <p className='motto-mob'> AUTOMATED EMPLOYEE MANAGEMENT SYSTEM</p>

      {props.registered 
      && <LoginForm 
      setRegistered={props.setRegistered} 
      setErrorLogin = {setErrorLogin}
      login={login} 
      setLogin={setLogin} 
      registered = {props.registered}
      errorLogin={errorLogin}
      submitInfo = {submitInfo}
      />}
      {props.registered === false 
      && <SignupForm 
      login={login} 
      setRegistered={props.setRegistered} 
      setErrorLogin = {setErrorLogin}
      registered = {props.registered}
      setLogin={setLogin}
      errorLogin = {errorLogin}
      submitInfo = {submitInfo}
      />}
    </section>
  </div>
  );
};

export default Login;