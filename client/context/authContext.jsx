
import { CircularProgress } from '@mui/material';
import React, {createContext, useState, useLayoutEffect} from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';



const AuthContext = createContext();

function AuthProvider({children}) {
  // Could do a request to auth/isAuth or something and store the result in state
  const [isAuth, setAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async() => {
    try {
      const response = await fetch('/verify');
      const status = await response.json();
      if (status.auth) {
        setAuth(true);
      }
    } finally {
      setIsLoading(false);    
    }
  };

  const globalData = {
    isLoading,
    isAuth,
    setAuth
  };
  


  return (<>
    <AuthContext.Provider value={globalData}>
      {children}
    </AuthContext.Provider>
  </>
  );
}

export { AuthContext, AuthProvider };