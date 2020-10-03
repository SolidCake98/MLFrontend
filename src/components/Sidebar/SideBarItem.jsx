import React from 'react';
import { Link } from 'react-router-dom';
import {Home, Assessment, Grain} from "@material-ui/icons";

export default class SideBarItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedItem: 0,
      menu: [
        {
          id: 1,
          element: <Home/>,
          text: "Home"
        },
        {
          id: 2,
          element: <Assessment/>,
          text: "Data"
        },
        {
          id: 3,
          element: <Grain/>,
          text: "Model"
        },
      ]
    }
  }

  handleClick(id) {
    this.setState({ selectedItem: id });
  }

  render() {
    return (
      <div>
        {this.state.menu.map((item) => (
          <Link key={item.id} to={"/"} onClick={() => this.handleClick(item.id)}>
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