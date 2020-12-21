import React, { Component } from "react";
import UserService from "../../services/UserService";
import { Modal, Button, DropdownButton, Dropdown } from "react-bootstrap";
import "./ModalGroup.css";


class AddToGroupModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      group: null,
      groups: null,
      message: null,
      loaded: false
    }
    this.addGroup = this.addGroup.bind(this);
  }
  
  //TODO add check of admin role
  componentDidUpdate() {
    if (this.props.id && !this.state.loaded) {
      UserService.getNotUserGroups(this.props.id).then((response) => {
        this.setState({
          groups: response.data,
          loaded: true,
        });
      });
    }
  } 


  onSelectGroup = (group) => {
    this.setState({
      group: group,
    });
  }

  addGroup() {
    const currentGroup = this.state.group;

    UserService.addToGroup(this.props.username, currentGroup)
      .then((response) => {

        this.setState({
          message: response.data.message,
          group: null,
          groups: null,
          loaded: false
        });
      },
      (error) => ({
        message: error.data.error,
      }));
  }

  render() {
    const {
      groups,
      group,
      message,
    } = this.state;

    return (

      <Modal
        show={this.props.show}
        onHide={() => { 
          this.props.onClose();
          this.setState({
            loaded: false,
            message: null,
            group: null})
          }
        }
        backdrop="static"
        keyboard={false}
      >

        <Modal.Header closeButton>
          <Modal.Title>Add user {this.props.username} to group</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="column-flex">
            <div className="flex">
              <DropdownButton title="Select group" className="el">
                {groups &&( 
                  <>
                    {groups.length !== 0 ? (groups.map((item) => 
                      <Dropdown.Item eventKey={item.id} onClick={() => this.onSelectGroup(item.name)}> 
                        {item.name} 
                      </Dropdown.Item>)
                    ):( <Dropdown.Item eventKey={0}>There is no available groups</Dropdown.Item>)}
                  </>
                )}
              </DropdownButton>
              


              {group ? (
                <div className="el tex">{group}</div>
              ) : (
                <div className="el tex"> Add user to {group} group</div>
              )}
            </div>
            <div className="flex">

              <button className="btn btn-success el"
                disabled={!group}
                onClick={this.addGroup}
              >
                Add to group
              </button>

              <div className="el tex" role="alert" disabled={!message}>
                {message}
              </div>

            </div>
            
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => { 
          this.props.onClose();
          this.setState({
            loaded: false, 
            message: null,
            group: null})  
            }
          }>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

}

export default AddToGroupModal;