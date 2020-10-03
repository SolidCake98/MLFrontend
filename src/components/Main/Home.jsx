import React, { Component } from "react";

import UserService from "../../services/UserService";

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getAllUsers().then(
      response => {
        if (response.data.length) {
          this.setState({
            content: response.data[0].username
          });
        }
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
      </div>
    );
  }
}

