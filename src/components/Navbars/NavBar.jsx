import React, { Component } from 'react';
import '../../App.css';

import AuthService from "../../services/AuthService";
import UserNavbarLinks from "./UserNavbarLinks";
import UnloggedNavbarLinks from "./UnloggedNavbarLinks";
import { Navbar } from 'react-bootstrap';

class NavLayout extends Component {

  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    }

  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    
    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  logOut(response) {
    this.setState({currentUser: response});
  }

  render() {
    const { currentUser } = this.state;
    return (
      <Navbar bg="light" variant="light" expand="lg" className="pad">
        {currentUser ? (
          <UserNavbarLinks func={this.logOut} />
        ) : (
            <UnloggedNavbarLinks />
          )}
      </Navbar>
    )
  }
}

export default NavLayout;