import React, { Component } from "react";
import AuthService from "../../services/AuthService";
import Profile from "./Profile";

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      content: "",
      user: null
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (!user){
      this.props.history.push("/login");
    }

    if(!this.state.user) {
      this.setState({
        user: user,
      });
    }

  }

  render() {
    const { user } = this.state;
    return (
      <>
        <div className="container">
          <h2>Your profile</h2>

          {user && (
            <Profile id={user.id} />
          )}
        </div>
      </>
    );
  }
}

