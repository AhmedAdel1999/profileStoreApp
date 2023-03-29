import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToastProvider } from 'react-toast-notifications';
import { AuthProvider } from './components/context/authContext';
import { ContextProvider } from './components/context/contactContext';
import { LightModeProvider } from './components/context/lightModeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider  placement="bottom-center" >
      <AuthProvider>
        <ContextProvider>
          <LightModeProvider>
          <App />
          </LightModeProvider>
        </ContextProvider>
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
