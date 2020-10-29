import React, { Component } from "react";
import "./DataSet.css";

export default class DataSetTable extends Component {

  render() {
    let i = 0;
    let j = 0;
    return (
      (this.props.data.map(row => (
        <div className="table-row" key={i++}>
          {row.map((column) => (
            <div className="table-cell" key={j++}>
              {column}
            </div>
          ))}
      </div>
      )))
      
    )
  }
}