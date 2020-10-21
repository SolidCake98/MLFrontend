import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "./DataSet.css";

export default class DataSetItem extends Component {

  render() {
    return( 

      <ListGroup.Item>
        <Link to={{pathname: "/" + this.props.link}} className="link">
          <h4>{this.props.title}</h4>
          <div className="disp">{this.props.username}</div>
          <div className="disp">{this.props.date}</div>
          <div className="disp">{this.props.size}</div>
          <div className="disp">{this.props.size_name}</div>
        </Link>
      </ListGroup.Item>


    )
  }
}