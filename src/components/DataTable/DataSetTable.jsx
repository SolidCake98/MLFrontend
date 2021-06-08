import React, { Component } from "react";
import DataSetTableService from "../../services/DataSetTableService";
import DataHead from "../Dataset/Header/DataHead";
import DataColumns from "./DataColumns";
import "../Dataset/DataSet.css";

export default class DataSetTable extends Component {

  constructor(props) {
    super(props);
    const args = this.props.match.params;

    this.state = {
      id: args.id,
      dataTable: null,
      types: null,
    };
  }


  componentDidMount() {
    const args = this.props.match.params;

    DataSetTableService.getDatasetTable(args.id).then(
      response => {
        if (response.data) {
          this.setState({
            dataTable: response.data,
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

    DataSetTableService.getAllTypes().then(
      response => {
        this.setState({
          types: response.data
        });
      }
    )

  }


  render() {
    const {dataTable, types} = this.state;
    return (
      <>
      { dataTable && types ? (
        <div className="container">

          <DataHead 
            tittle={dataTable.table.name}
            helpInfo={[dataTable.table.user.username]} 
            
            date_load={dataTable.table.date_load} 
            since_create={dataTable.table.since_created}

            hrefs={{
              'Field': {
                'active' : true,
                'href' : "/"
              }
            }}

            buttons={{
              'Add field': 
                <button className="white-apply-button " style={{marginRight: 8}} onClick={() => (console.log('create chart'))} key={0}>
                  <span className="text-in-white-apply-button">
                    Add field
                  </span>
                </button>,

              'Create chart': 
                <button className="white-apply-button " style={{marginRight: 8}} onClick={() => (console.log('create chart'))} key={1}>
                  <span className="text-in-white-apply-button">
                    Create chart
                  </span>
                </button>
              ,
              'Save': 
                <button className="apply-button" onClick={() => (console.log('save'))} key={2}>
                  <span className="text-in-apply-button">
                    Save
                  </span>
                </button>
            }}
          />

          <DataColumns 
            cols = {dataTable.cols}
            types = {types}
          />
    
        </div>
      ) : (<div/>)}
      </>
    )
  }
}