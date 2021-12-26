/* eslint-disable react/jsx-indent */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import Error from './ErrorComponent';

/*
  Component renders SignupForm;
  EmailEntered, passwordEntered and tokenEntered get inputs and update parent component state Login;
  backToLogin updates parent component states to load Login Form;
  Error component is rendered based on props from Login component 
*/

const SignupForm = (props)  => {
  function backToLogin() {
    props.setRegistered(true);
    props.setErrorLogin(true);
  }

  function emailEntered(e) {
    props.setLogin(login => ({...login, email:e.target.value}));
  }

  function passwordEntered(e) {
    props.setLogin(login => ({...login, password:e.target.value}));
  }

  function tokenEntered(e) {
    props.setLogin(login => ({...login, token:e.target.value}));
  }

  return (
    <form className = 'signupForm'>
      <p className='form-name'>SIGNUP</p>
      <div className='enter-email'>Please enter user credentials. Token must be obtained from authorizing party</div>
      {props.errorLogin === false && <Error registered={props.registered}/>}
      {props.errorLogin === 'emailfailed' && <div className='errordiv'>
        <p>Incorrect email format. Please try again 
        </p>
      </div>}
      <div className="form-group">
        <input type="email" className="form-control" placeholder="Email" onChange={emailEntered}/>
      </div>
      <div className="form-group">
        <input type="password" className="form-control" placeholder="Password" onChange={passwordEntered} />
      </div>
      <div className="form-group">
        <input type="token" className="form-control" placeholder="Token" onChange={tokenEntered}/>
      </div>
      <button type="button" className="auth-button" onClick={props.submitInfo}>Signup</button>
      <div className="forgot-password text-right">
        <a onClick={backToLogin}> Back to Login</a>
      </div>
    </form>
  );
};

export default SignupForm;