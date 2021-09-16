/* eslint-disable indent */
import React, {useState, useEffect} from 'react';
import logo from '../images/logo.jpg';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

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
    if (e.target.className === 'login-button') {
      url = '/login';
    }
    else if (e.target.className === 'signup-button') {
      url = '/signup';
    }
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
      } 
      else if (resp.status === true) {
        const rightCookie = findCookie(document.cookie);
        if(rightCookie) {
          localStorage.setItem('token', rightCookie);
          localStorage.setItem('name', `${resp.name.firstName} ${resp.name.lastName}`);
        }
      }
      props.setAuth(resp.status);

    })
    .catch(err => console.log(err));
  }

  return ( 
  <div className='Login'>
    <section className="intro">
      <img alt='intro' className='logoImg' src={logo} />
      <div className ='textInImage'>
        <h3>HRS</h3>
      </div>
      <div className='motto'>
        <p>AUTOMATED PAPERLESS EMPLOYEE MANAGEMENT SYSTEM</p>
      </div>
    </section>
    <section className='signin'>
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