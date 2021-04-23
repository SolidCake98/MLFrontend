import React, { Component } from "react";
// import UploadService from "../../../services/UploadService";
import DataSetDirList from "../Folders/DataSetDirList";
import {Modal, Button} from "react-bootstrap";
import AuthService from "../../../services/AuthService";
import { withRouter } from 'react-router-dom';
import "./DataHead.css";


class ModalDatasetCreate extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: null,
      pathToFile: "",
      filename: "",
    };
  }

  componentDidMount(){
    const user = AuthService.getCurrentUser();
    if(user)
      this.setState({
        username: user.username,
      })
  }

  clickOnFile = (filename, pathToFile) => {
    console.log(pathToFile);
    this.setState({
      pathToFile: pathToFile,
      filename: filename,
    });
  }


  render() {

    return (

      <Modal
        show={this.props.show}
        onHide={() => {this.props.onClose()}}
        backdrop="static"
        keyboard={false}
      >
        {this.props.show && !this.state.username && (
          this.props.history.push("/login")        
        )}
        <Modal.Header closeButton>
          <Modal.Title>Create new dataset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="block_m">
            <DataSetDirList path= {this.props.path} className="first-ul" clickOnFile={this.clickOnFile} filter="csv"/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {this.props.onClose()}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

}

export default withRouter(ModalDatasetCreate);