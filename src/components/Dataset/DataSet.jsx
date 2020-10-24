import React, { Component } from "react";
import UserService from "../../services/UserService";
import { Button } from "react-bootstrap";
import DataSetDirList from "./DataSetDirList";
import "./DataSet.css";


const API_URL = "http://0.0.0.0:5000/api/v1/dataset/download/"

export default class DataSet extends Component {

  constructor(props) {
    super(props);

    const args = this.props.match.params;
    this.state = {
      username: args.user,
      datasetName: args.dataset,
      dataset: null,
      error: null,
    };
  }

  componentDidMount() {
    const args = this.props.match.params;
    UserService.getDataset(args.user, args.dataset).then(
      response => {
        if (response.data) {
          this.setState({
            dataset: response.data,
          });
        }
      },
      error => {
        this.setState({
          error:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    const{ dataset, datasetName, username } = this.state;
    return (
      <>
      { dataset ? (
        <div className="container">
          <h4>{dataset.title}</h4>
          <div> {dataset.description} </div>
          <a href={API_URL + dataset.user.username + "/" + dataset.name} download>
            <Button>
              Download
            </Button>
          </a>

          <div style={{marginTop: "20px"}} className="block">
            <DataSetDirList path= {`${username}/${datasetName}`} className="first-ul"/>
          </div>

        </div>
      ) : (<div/>)}
      </>
    )
  }
}