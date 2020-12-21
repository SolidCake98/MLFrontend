import React, { Component } from "react";
import DataSetService from "../../services/DataSetService";
import DataSetHeader from "./DataSetHeader";
import DataSetTable from "./DataSetTable";
import "./DataSet.css";

export default class DataSet extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fileInfo: null,
      isUpdating: false,
      type: {
        'img': (data) => <img className="img-w-h text-in-block" alt="" src={data.data}/>,
        'csv': (data) => 
        <div className="table">
          <DataSetHeader header={data.header} />
          <DataSetTable data={data.data.data} />
        </div>,
        'text': (data) =>
        <xmp className="text-in-block">
          {data.data}
        </xmp>,
        'json': (data) =>
        <xmp className="text-in-block">
          {JSON.stringify(data.data)}
        </xmp>,
      }
    }

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
   this.updateFileInfo();
  }

  updateFileInfo(){
    DataSetService.readDataSetFile(this.props.pathToFile, 0)
    .then(  
      response => {
        this.setState({
          fileInfo: response.data,
        });
      }
    )
  }

  componentDidUpdate(prevProps) {
    if(this.props.pathToFile !== prevProps.pathToFile) { 
      this.updateFileInfo();
    }
  } 

  handleScroll = e => {
    const bottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 300;

    if(bottom && this.state.fileInfo.type === 'csv' && !this.state.isUpdating){
      this.setState({
        isUpdating: true,
      })
      DataSetService.readDataSetFile(this.props.pathToFile, this.state.fileInfo.data.next_pos)
      .then(  
        response => {
          const newData = this.state.fileInfo.data.data.concat(response.data.data.data);
          const newFileInfo = {
            'type': this.state.fileInfo.type,
            'data': {
              'next_pos' : response.data.data.next_pos,
              data: newData
            },
            'header': this.state.fileInfo.header,
          }
          this.setState({
            fileInfo: newFileInfo,
            isUpdating: false
          });
        }
      )
    }
  }

  render() {
    const {fileInfo} = this.state;

    let comp;
    if(fileInfo){

      try {
        comp = this.state.type[fileInfo.type](fileInfo);
      } catch {
        comp = <> Can't prewiew this type of file</>
      }
      
    }
    else {
      comp = <div></div>
    }

    return (
      <>
        <div className="line"/>
        <div className="file-block" onScroll={this.handleScroll}>
            {comp}
        </div>
      </>
    )
  }
}