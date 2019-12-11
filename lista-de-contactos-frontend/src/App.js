import './App.css';
import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";

import Login from "./components/AuthPages/Login";
import Contacts from "./components/Contacts";

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/contacts" component={Contacts} />
      </Switch>
    )
  }
}
