import React, { Component } from "react";
import "./DataSet.css";


export default class HeaderButton extends Component {

  render() {
    const style = this.props.selected ? "text-inside-button selected-button" : "text-inside-button";
    return (
      <>
        <button className="button-header" onClick={() => this.props.onSelect()}>
          <div className="inside-button">
            <span className={style}>
              {this.props.name}
            </span>
              {this.props.selected && (
                <span className="line-button"/>
              )}
          </div>
        </button>
      </>
    );
  }


}