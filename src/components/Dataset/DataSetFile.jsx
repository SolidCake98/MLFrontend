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
      }
    }
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
        console.log(response.data)
      }
    )
  }

  componentDidUpdate(prevProps) {
    if(this.props.pathToFile !== prevProps.pathToFile) { 
      this.updateFileInfo();
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
        <div className="file-block">
            {comp}
        </div>
      </>
    )
  }
}