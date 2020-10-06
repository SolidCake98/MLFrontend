import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


import Login from "./components/Auth/Login";
import Register from "./components/Auth/Logup";
import Home from "./components/Main/Home";
import MainLayout from "./layouts/LayoutMain";

class App extends Component {
  render() {
    return (
      <div>
        <MainLayout />
        <div className=" marg">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </div>
      </div>
    );
  }
  
}

export default App;
