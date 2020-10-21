import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


import Login from "./components/Auth/Login";
import Register from "./components/Auth/Logup";
import Home from "./components/Main/Home";
import MainLayout from "./layouts/LayoutMain";
import DataSetList from "./components/DatasetList/DataSetList";
import DataSet from "./components/Dataset/DataSet";

class App extends Component {
  render() {
    return (
      <div>
        <MainLayout />
        <div style={{paddingTop: 40, paddingLeft: 36}}>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path={["/datasets"]} component={DataSetList} />
            <Route exact path="/:user/:dataset" component={DataSet} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </div>
      </div>
    );
  }
  
}

export default App;
