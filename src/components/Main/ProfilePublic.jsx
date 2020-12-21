import React, { Component } from "react";
import Profile from "./Profile";

export default class ProfilePublic extends Component {


  render() {
    const args = this.props.match.params;
    return (
      <>
        <div className="container">
          <h2>User profile</h2>

          {args.id && (
            <Profile id={args.id} />
          )}
        </div>
      </>
    );
  }
}

