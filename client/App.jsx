/* eslint-disable no-trailing-spaces */
import React, { useState, useContext, useLayoutEffect } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import { AuthContext } from './context/authContext.jsx';
import './stylesheets/global.css';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/NotFound';
import { BrowserRouter as Router} from 'react-router-dom';

import { CircularProgress } from '@material-ui/core';



function App(){

  const [registered, setRegistered] = useState(true);
  const {isAuth, isLoading, setAuth} = useContext(AuthContext);
  return (
    <div className='app-container'>
      { isLoading && 
        <div className = "loading">
          < CircularProgress />
        </div>      
      }
      { !isLoading &&
      <Router>
        <Routes>
          <Route path="/main" element={
            isAuth ? 
              <Dashboard auth ={isAuth} setAuth={setAuth}/>
              : <Navigate replace to="/" />
          }
          />
          <Route path = "/"
            element= {
              isAuth ? <Navigate replace to="/main" />
                : <LandingPage 
                  auth={isAuth} 
                  setAuth={setAuth} 
                  registered={registered} 
                  setRegistered={setRegistered}
                />
            }
          />
          <Route path="/404" element={<ErrorPage/>} />
          <Route path = "*" element={<Navigate replace to="/404" />} />
        </Routes>
      )
      </Router>
      }
    </div>
      
  );
}

export default App;
