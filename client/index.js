import React from 'react';
import { render } from 'react-dom';
import App from './App';
import {AuthProvider} from './context/authContext';


render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('app'),
);