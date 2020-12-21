import React, { Component } from "react";
import UserItem from "./UserItem";
import { ListGroup } from "react-bootstrap";
import AddToGroupModal from "./AddToGroupModal";

export default class AdminPanelUserList extends Component {

  constructor(props) {
    super(props);

    this.onCloseModal = this.onCloseModal.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this)

    this.state = {
      showModal: false,
      datasets: null,
      error: null,
      curUserId: null,
      curUserName: null,
    };
  }

  onOpenModal(id, username) {
    this.setState({
      showModal: true,
      curUserId: id,
      curUserName: username,
    });
  }

  onCloseModal() {
    this.setState({
      showModal: false,
      curUserId: null,
      curUserName: null,
    });
  }

  render() {
    const { showModal, curUserId, curUserName } = this.state;
    return (
      //TODO move modal panel to the next layer
      <>
        
          <AddToGroupModal show={showModal} username={curUserName} id={curUserId} onClose={() => this.onCloseModal()}/>
          <ListGroup variant="flush">
          {this.props.users ? (this.props.users.map((item) => (
            <UserItem
              key={item.user.id}
              id={item.user.id}
              username={item.user.username}
              dateJoin={item.user.since_join}
              avgRating={item.stats.avg}
              count={item.stats.count}
              groups={item.groups.map((i) => i.group.name).toString()}
              onOpen={() => this.onOpenModal(item.user.id, item.user.username)}
            />
          ))) : (<div />)}
        </ListGroup>
      </>
    );
  }


}