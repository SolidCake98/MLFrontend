import React, { Component } from "react";
// import UploadService from "../../../services/UploadService";
import DataSetDirList from "../Folders/DataSetDirList";
import {Form, Modal} from "react-bootstrap";
import AuthService from "../../../services/AuthService";
import { withRouter } from 'react-router-dom';
import {Close, TableChartOutlined} from "@material-ui/icons";
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

  onDeleteFile = () => {
    this.setState({
      pathToFile: null,
      filename: null,
    });
  }

  render() {
    const {filename} = this.state;
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

          <Form>
            <Form.Group controlId="formTableTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control placeholder="Enter title for your dataset table" onChange={this.onChangeTitle}/>
            </Form.Group>
          </Form>

          <Form.Label>Choose table</Form.Label>
          <div style={{display: "flex", marginTop: 15}}>
            <div className="block_m">
              <DataSetDirList path= {this.props.path} className="first-ul" clickOnFile={this.clickOnFile} filter="csv"/>
            </div>
            <div className="right-block-data">
              {filename && (
                <div className="added-file-to-dataset">
                  <TableChartOutlined style={{fontSize: 21, marginRight: 12}}/>
                  <span className="added-file-text">
                    {filename}
                  </span>
                  <Close style={{fontSize: 16}} onClick={() => {this.onDeleteFile()}}/>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button className="white-apply-button " style={{marginRight: 8}} onClick={this.props.onClose}>
            <span className="text-in-white-apply-button">
              Close
            </span>
          </button>

          {/* TODO добавить создание таблицы набора данных */}
          <button className="apply-button">
            <span className="text-in-apply-button">
              Create
            </span>
          </button>
        </Modal.Footer>

      </Modal>
    )
  }

}

export default withRouter(ModalDatasetCreate);