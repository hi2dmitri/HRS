/* eslint-disable spaced-comment */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import Error from './ErrorComponent';

/*
Component renders loginForm;
EmailEntered and passwordEntered get inputs and update parent component state Login;
register updates parent component states to load Signup Form;
Error component is rendered based on props from Login component 
*/

const LoginForm = (props)  => {
  function register () {
    props.setRegistered(false);
    props.setErrorLogin(true);
  }

  function emailEntered(e) {
    props.setLogin(login => ({...login, email:e.target.value}));
  }

  function passwordEntered(e) {
    props.setLogin(login => ({...login, password:e.target.value}));
  }

  return (
    <form className='loginForm'>
      <p className='form-name'>LOGIN</p>
      <div className='enter-email'>Please enter user credentials</div>
      {props.errorLogin === false && <Error registered={props.registered}/>}
      <div className="form-group">
        <input type="email" className="form-control" placeholder="Email" onChange = {emailEntered}/>
      </div>
      <div className="form-group">
        <input type="password" className="form-control" placeholder="Password" onChange={passwordEntered} />
      </div>
    
      <button type="button" className="auth-button" onClick={props.submitInfo}>Login</button>
      <div className="forgot-password">
        Not registered? 
        <a onClick={register}> Create an account</a>
      </div>
    </form>
  );
};

export default LoginForm;