import React from "react";
import { Nav } from "react-bootstrap";
import "./Sidebar.css";
import logo from "../../logo640.png";
import {Menu} from "@material-ui/icons";
import SideBarItems from "./SideBarItems"


export default class SideBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isHowerOpen: false,
      isClickOpen: false,
    }
  }

  handleClick() {
    this.setState({
      isHowerOpen: !this.state.isClickOpen,
      isClickOpen: !this.state.isClickOpen,
    })
  }

  handleHower(state) {
    this.setState({
      isHowerOpen: state,
    })
  }


  render() {

    return (
      <>
       <Nav ref={this.sidebarRef} 
        className={this.state.isClickOpen || this.state.isHowerOpen ? "flex-column sidebar isopen" : "flex-column sidebar"}
        onMouseEnter={() => this.handleHower(true)}
        onMouseLeave={() => this.handleHower(false)}>

         <div className="header">
           <button className="toggle" onClick={() => this.handleClick()}>
            <Menu />
           </button>

          <div className="logo">
            <div className="logo-image">
              <img src={logo} className="img-fluid" alt="Logo" />
            </div>
            <div className="logo-text"> MLearning </div>
          </div>

        </div>
        <SideBarItems />  
       </Nav>
       </>
      )
  }
}