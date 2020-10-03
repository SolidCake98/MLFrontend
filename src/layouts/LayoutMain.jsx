import React from "react";
import NavLayout from "../components/Navbars/NavBar";
import SideBar from "../components/Sidebar/SideBar";


export default class MainLayout extends React.Component {

  render() {
    return (
      <div>
        <NavLayout/>
        <SideBar />
      </div>
      
    );

  }
}