import React, { Component } from "react";
import Upload from "../DatasetList/Upload"

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  // componentDidMount() {
  //   UserService.getAllUsers().then(
  //     response => {
  //       if (response.data.length) {
  //         this.setState({
  //           content: response.data[0].username
  //         });
  //       }
  //     },
  //     error => {
  //       this.setState({
  //         content:
  //           (error.response && error.response.data) ||
  //           error.message ||
  //           error.toString()
  //       });
  //     }
  //   );
  // }

  render() {
    return (
      <>
      <div className="container">
        <header className="jumbotron">
          <h3>Контент</h3>
        </header>
      </div>
      </>
    );
  }
}

