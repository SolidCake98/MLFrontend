import React, { Component } from "react";
import DataSetService from "../../services/DataSetService";
import DataSetDirList from "./Folders/DataSetDirList";
import DataSetFile from "./Preview/DataSetFile";
import DataHead from "./Header/DataHead";
import DataSetInfo from "./Header/DataSetInfo";
import DataSetRating from "./DataSetRating";
import "./DataSet.css";


const API_URL = "http://localhost:5000/api/v1/dataset/download/"

export default class DataSet extends Component {

  constructor(props) {
    super(props);
    const args = this.props.match.params;
    this.myRef = React.createRef();

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
          console.log(response.data);
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

          <DataHead tittle={dataset.title} username={username} size={dataset.dataset_meta.size} size_name={dataset.dataset_meta.size_name} 
          date_load={dataset.date_load} since_create={dataset.since_created}
          url_download={API_URL + dataset.user.username + "/" + dataset.name} 
          path= {`${username}/${datasetName}`}/>
      
          <div> {dataset.description} </div>
        
          <DataSetInfo rating={dataset.rating ? dataset.rating : "None"} 
            tags={dataset.tags}
            size={dataset.dataset_meta.size} size_name={dataset.dataset_meta.size_name} dId={dataset.id} duId={dataset.user.id} />

          <div style={{marginTop: "20px", position: "relative", overflowX: "hidden"}}>
            <div style={{display: "flex"}}>
              <div className="block">
                <DataSetDirList path= {`${username}/${datasetName}`} className="first-ul" clickOnFile={this.clickOnFile} filter="none"/>
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

          <DataSetRating ratings={dataset.user_ratings} duId={dataset.user.id} dId={dataset.id}/>
          <div ref={this.myRef}>
          </div>
        </div>
      ) : (<div/>)}
      </>
    )
  }
}