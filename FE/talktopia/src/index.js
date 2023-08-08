import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import { CookiesProvider } from 'react-cookie';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import 'bootstrap/dist/css/bootstrap.css';
// import { AnimatePresence } from "framer-motion";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <CookiesProvider>
        <BrowserRouter>
        {/* <AnimatePresence> */}
        <GoogleOAuthProvider clientId='301972417169-6t0f0ic0ojkaqa97pv0am6g45qv6rlqs.apps.googleusercontent.com'>
          <App />
          </GoogleOAuthProvider>
          {/* </AnimatePresence> */}
        </BrowserRouter>
      </CookiesProvider>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
