import React, { Component } from "react";
import DataSetService from "../../services/DataSetService";
import { Button } from "react-bootstrap";
import DataSetDirList from "./DataSetDirList";
import "./DataSet.css";
import DataSetFile from "./DataSetFile";


const API_URL = "http://192.168.0.105:5000/api/v1/dataset/download/"

export default class DataSet extends Component {

  constructor(props) {
    super(props);

    const args = this.props.match.params;
    this.state = {
      username: args.user,
      datasetName: args.dataset,
      pathToFile: "",
      filename: "",
      dataset: null,
      error: null,
    };
  }

  componentDidMount() {
    const args = this.props.match.params;
    DataSetService.getDataset(args.user, args.dataset).then(
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

  clickOnFile = (filename, pathToFile) => {
    this.setState({
      pathToFile: pathToFile,
      filename: filename,
    })
  }

  render() {
    const{ dataset, datasetName, username, pathToFile, filename } = this.state;
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

          <div style={{marginTop: "20px", position: "relative", overflowX: "hidden"}}>
            <div style={{display: "flex"}}>
              <div className="block">
                <DataSetDirList path= {`${username}/${datasetName}`} className="first-ul" clickOnFile={this.clickOnFile}/>
              </div>
    
              <div className="sub-block">
                <div className="file-reader-block">
                  <div className="header-block">
                    <h5>
                      { pathToFile ? (<>{filename}</>) : (<>Select file to preview</>)}
                    </h5>
                  </div>
                  
                  { pathToFile &&
                    (<DataSetFile pathToFile={pathToFile} />) 
                  }
                </div>
              </div>
            </div>
          </div>
          

        </div>
      ) : (<div/>)}
      </>
    )
  }
}