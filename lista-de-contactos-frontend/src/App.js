import './App.css';
import React, { useState, useEffect } from 'react';
import { Switch } from "react-router-dom";


import PrivateRoute from "./components/Routes/PrivateRoute.js";
import AnonRoute from "./components/Routes/AnonRoute.js";

import Login from "./components/Login/Login";
import Contacts from "./components/Contacts";
import { AuthContext } from './services/authContext';
import axiosRequestFunctions from "./services/Services";


export default function App() {

  let foundToken = localStorage.getItem("contactsAppToken")
  if(!foundToken){
    foundToken = ""
  }
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState(foundToken);
  
  useEffect(function(){
    
    async function verifyToken (token){
      const response = await axiosRequestFunctions.getAuth(token);
  
      if(response.isLoggedIn){
          setAuth(true)
      }
      else{
          setAuth(false)
      }
    }

    if(!auth && token){
        verifyToken(foundToken)
    }
  }, [])
  
  return (
    <div>
      <Switch>
        <AuthContext.Provider value={{ auth, setAuth, token, setToken }}>
          <AnonRoute exact path="/" component={Login} />
          <PrivateRoute exact path="/contacts" component={Contacts} />
        </AuthContext.Provider>
      </Switch>
    </div>
  )
}
