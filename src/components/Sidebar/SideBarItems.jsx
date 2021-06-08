import React from 'react';
import { Link } from 'react-router-dom';
import {Home, Assessment, Grain, SupervisorAccount} from "@material-ui/icons";
import AuthService from "../../services/AuthService";

export default class SideBarItems extends React.Component {

  constructor(props) {
    super(props);

    let tMenu = [
      {
        id: 1,
        element: <Home/>,
        text: "Home",
        link: "/",
      },
      {
        id: 2,
        element: <Assessment/>,
        text: "Data",
        link: "/datasets",
      },
      {
        id: 3,
        element: <Grain/>,
        text: "Charts",
        link: "/",
      },
    ];

    let user = AuthService.getCurrentUser();
    if (user && user['roles'].includes('admin')){
      tMenu.push({
          id: 4,
          element: <SupervisorAccount/>,
          text: "Admin Panel",
          link: "/admin",
        });
    }

    this.state = {
      selectedItem: 0,
      menu: tMenu
    };
    
  }

  handleClick(id) {
    this.setState({ selectedItem: id });
  }

  render() {
    return (
      <div>
        {this.state.menu.map((item) => (
          <Link key={item.id} to={item.link} onClick={() => this.handleClick(item.id)}>
            <li className={this.state.selectedItem === item.id ? "sidebar-element sidebar-element-chosen" : "sidebar-element"}>
                {item.element}
              <div className="sidebar-element-text">{item.text}</div>
            </li> 
          </Link>
        ))}
      </div>
    )
  }
}