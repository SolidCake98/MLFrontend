import React, { Component } from "react";
import "./DataSet.css";

export default class DataSetHeader extends Component {

  render() {

    let i = 0;
    return (
      <div className="table-header">
        <div className="table-row">
          {this.props.header.map((item) => (
            <div className="table-cell"key={i++}>
              {item}
            </div>
          ))}
        </div>
      </div>
    )
  }
}