import React, { Component } from "react";
import UploadService from "../../services/UploadService";
import {Form, Modal, Button} from "react-bootstrap";
import AuthService from "../../services/AuthService";
import { withRouter } from 'react-router-dom';



class UploadFiles extends Component {

  constructor(props) {
    super(props);

    this.upload = this.upload.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeName = this.onChangeName.bind(this);

    this.state = {
      title: "",
      name: "",

      selectedFiles: undefined,
      currentFile: undefined,

      progress: 0,
      message: "",
    };
  }


  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onSelectFile = (event) => {
    this.setState({
      selectedFiles: event.target.files[0],
    });
  }

  upload() {
    const currentFile = this.state.selectedFiles;

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    const callback = (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    } 


    const info = {
      name : this.state.name,
      title : this.state.title
    };

    UploadService.upload(currentFile, info, callback)
    .then((response) => {

      this.setState({
        message: response.data.message,
      });

      setTimeout(() => {
        const curUser = AuthService.getCurrentUser();
        this.props.history.push(`/${curUser.username}/${this.state.name}`);
      }, 1000);
    },
    (error) => {
      console.log(error.response);
    })
    
    // .catch(() => {
    //   this.setState({
    //     progress: 0,
    //       message: "Could not upload the file!",
    //       currentFile: undefined,
    //   });
    // });

    this.setState({
      selectedFiles: undefined,
    });
  }

  render() {
    const {
      selectedFiles,
      currentFile,
      progress,
      message,
    } = this.state;

    return (
      <Modal
        show={this.props.show}
        onHide={() => {this.props.onClose()}}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Here you can upload your dataset</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control placeholder="Enter name for URI to your data" onChange={this.onChangeName}/>
            </Form.Group>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control placeholder="Enter title for your data set" onChange={this.onChangeTitle}/>
            </Form.Group>
          </Form>


          <label className="btn btn-default">
            <input type="file" onChange={this.onSelectFile} />
          </label>

          <button className="btn btn-success"
            disabled={!selectedFiles}
            onClick={this.upload}
          >
            Upload
          </button>

          {currentFile && (
            <div className="progress">
              <div
                className="progress-bar progress-bar-info progress-bar-stripped"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{width: progress + "%"}}
              >
                {progress}%
              </div>
            </div>
          )}

          <div className="alert alert-light" role="alert" disabled={!message}>
            {message}
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

export default withRouter(UploadFiles);