import React, { Component } from "react";
import UploadService from "../../services/UploadService";

const info = {
  'title': 'Test 6',
  'name': 'Test6',
  'description': 'This is a test'
}

export default class UploadFiles extends Component {

  constructor(props) {
    super(props);
    this.upload = this.upload.bind(this);

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
    };
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

    UploadService.upload(currentFile, info, callback)
    .then((response) => {
      this.setState({
        message: response.data.message,
      });
    },
    (error) => {
      console.log(error.response);
    })
    
    .catch(() => {
      this.setState({
        progress: 0,
          message: "Could not upload the file!",
          currentFile: undefined,
      });
    });

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
      <div>
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
        <label className="btn btn-default">
          <input type="file" onChange={this.onSelectFile} />
        </label>

        <button className="btn btn-success"
          disabled={!selectedFiles}
          onClick={this.upload}
        >
          Upload
        </button>

        <div className="alert alert-light" role="alert">
          {message}
        </div>
      </div>
    )
  }

}