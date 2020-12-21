import React, { Component } from "react";
import UserService from "../../services/UserService";
import AuthService from "../../services/AuthService";

import AdminPanelUserList from "../AdminPanel/AdminPanelUserList";


export default class AdminPanel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userProfiles: null,
    }
  }

  //TODO add check
  componentDidMount() {
    if(!AuthService.getCurrentUser()) {
      this.props.history.push("/")
    } else if(!AuthService.getCurrentUser().roles.includes('admin')){
      this.props.history.push("/")
    }

    if(!this.state.userProfiles){
      UserService.getAllUserProfile().then((response) => {
        this.setState({
          userProfiles: response.data,
        });
      })
    }
  }

  render() {
    const {userProfiles} = this.state
    return (
      <div className="container">
        <h4> Admin panel </h4>
        {userProfiles && (
          <AdminPanelUserList users={userProfiles} />
        )}
      </div>
    );
  }
}