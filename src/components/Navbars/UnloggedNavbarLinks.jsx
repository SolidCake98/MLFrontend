import React, { Component } from "react";
import { NavItem, Nav } from "react-bootstrap";
import { Link } from "react-router-dom"

class UnloggedNavbarLinks extends Component {


  render() {
    return (
        <Nav className="ml-auto">
          <NavItem>
            <Link to={"/login"} className="nav-link">Sign In</Link>
          </NavItem>
          <NavItem>
            <Link to={"/register"} className="nav-link">Register</Link>
          </NavItem>
        </Nav>
    )
  }
}

export default UnloggedNavbarLinks;