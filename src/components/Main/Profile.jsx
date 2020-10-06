import React, { Component } from "react";
import AuthService from "../../services/AuthService";

export default class Profile extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        currenUser: AuthService.get
      };
    }
}