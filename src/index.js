import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './frontend/App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app';
import 'firebase/analytics';
import { BrowserRouter } from 'react-router-dom';
import dotenv from "dotenv";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJ_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MSID,
  appId: process.env.REACT_APP_AID,
  databaseURL: process.env.REACT_APP_DB_URL,
  measurementId: process.env.REACT_APP_MEASURE_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
