import React,{useContext} from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import Card from '../UI/Card';
import './Auth.css';
 import {AuthContext} from '../Context/Context-auth';

const Auth = props => {
  const authContext=useContext(AuthContext);

  const loginHandler = () => {
    authContext.login();
  };

  const firebaseConfig = {
    apiKey: "AIzaSyDlveNtgwR5lT3soXQVQ-ZtubTs4cwm1Vs",
    authDomain: "auth-18660.firebaseapp.com",
    databaseURL: "https://auth-18660.firebaseio.com",
    projectId: "auth-18660",
    storageBucket: "auth-18660.appspot.com",
    messagingSenderId: "169770474681",
    appId: "1:169770474681:web:d21db497b3b3b0500c4f68"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  return (
    <div className="auth">
      <Card>
        <h2>You are not authenticated!</h2>
        <p>Please log in to continue.</p>
        <input type="email" placeholder="Email"/> 
        <br/>     <br/>   
        <input type="password" placeholder="password" />
        <br/> 
        <button onClick={loginHandler}>Log In</button>
      </Card>
    </div>
  );
};

export default Auth;
