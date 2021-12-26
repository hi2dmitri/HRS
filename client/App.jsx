/* eslint-disable no-trailing-spaces */
import React, { useState, useEffect } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import './stylesheets/global.css';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/NotFound';
import { CircularProgress } from '@material-ui/core';

/* 
  Getting token from storage and if it exists - sending to backend to verify. 
  If verified - redirect to dashboard, else to login.
  404 page for all other paths.
*/


function App(props){

  const [auth, setAuth] = useState(false);
  const [registered, setRegistered] = useState(true);
  const tokenFromStorage = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(true);
  console.log(tokenFromStorage);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async() => {
    try {
      if (tokenFromStorage) {
        const isToken = await fetch('login/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({'token': tokenFromStorage})
        });
        const token = await isToken.json();
        if (token) {
          setAuth(true);
        } else {
          localStorage.removeItem('token');
          setAuth(false);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };
  console.log('auth', auth);
  return (
    <div className='app-container'>
      {isLoading && 
      <div className = "loading">
        < CircularProgress />
      </div>
      }
      {!isLoading && (
        <Switch>
          <Route exact path="/main" >
            {auth ? 
              <Dashboard auth ={auth} setAuth={setAuth}/> :
              <Redirect to='/' />
            }
          </Route>
          <Route exact path = "/">
            { auth ? <Redirect to="/main" /> : <LandingPage 
              auth={auth} 
              setAuth={setAuth} 
              registered={registered} 
              setRegistered={setRegistered}
            />}
          </Route>
          <Route path="/404" component={ErrorPage} />
          <Redirect to="/404" />
        </Switch>
      )}
    </div>
  );
}

export default App;
