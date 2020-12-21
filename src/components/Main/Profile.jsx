import React, { Component } from "react";
import UserService from "../../services/UserService";
import DataSetListComponenet from "../DatasetList/DataSetListComponent"
import "./Profile.css";

export default class Profile extends Component {

    constructor(props) {
      super(props);

      this.state = {
        userProfile: null,
      }
    }

    componentDidMount(){
      if(!this.state.userProfile){
        UserService.getUserProfile(this.props.id).then((response) => {
          this.setState({
            userProfile: response.data,
          });
        })
      }
    }

    render() {
      const {userProfile} = this.state
      return (
        <>
        <div className="container">
          {userProfile && (
          <>
            <div className="profile-header">
              <div className="avatar-profile">
                <img className="img" src={userProfile.avatar} alt="Avatar" />
              </div>
              <div className="profile-user-content">
                <div>
                  <span className="profile-header-title" >{userProfile.user.username}</span>
                </div>
                <div>
                  <div className="flex">
                    <span className="margin-bot"> Joined {userProfile.user.since_join} ago </span>
                    <span className="margin-bot"> Last login was {userProfile.user.since_login} ago</span>
                  </div>
                  <div className="flex">
                    <span className="margin-bot"> {userProfile.stats.count} datasets </span>
                    <span className="margin-bot"> {userProfile.stats.avg} average rating</span>
                  </div>
                </div>
                <div>
                  <span>{userProfile.groups.map((i)=> i.group.name).toString()}</span>
                </div>
                
              </div>
            </div>

            <h4>Your datasets:</h4>
            <DataSetListComponenet datasets={userProfile.datasets} />
          </>
          )}

        </div>
        </>
      );
    }
}