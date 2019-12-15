import './App.css';
import React, { useState, useContext, useMemo } from 'react';
import { Switch, Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import AnonRoute from "./components/AnonRoute";

import Login from "./components/AuthPages/Login";
import Contacts from "./components/Contacts";
import { AuthContext } from './services/authContext';


export default function App() {

  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState("")

  return (
    <div>
      <Switch>
        <AuthContext.Provider value={{ auth, setAuth, token, setToken }}>
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/contacts" component={Contacts} />
        </AuthContext.Provider>
      </Switch>
    </div>
  )
}
