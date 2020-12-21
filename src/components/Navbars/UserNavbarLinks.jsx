import React, { Component } from "react";
import { NavItem, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";


class UserNavbarLinks extends Component {
 

  render() {
    return (
      <Nav className="ml-auto">
          <NavItem>
            <Link to={"/"} className="nav-link">Account</Link>
          </NavItem>
       
          <NavItem >
            <div className="nav-link" onClick={(response) => {
              AuthService.logout();
              this.props.func(AuthService.getCurrentUser());
              document.location.reload();
            } }>Log Out</div>
          </NavItem>
      </Nav>
    )
  }
}

export default UserNavbarLinks;