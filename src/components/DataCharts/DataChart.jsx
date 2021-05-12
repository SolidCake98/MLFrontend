import React, { Component } from "react";
import DataSetTableService from "../../services/DataSetTableService";
// import DataHead from "../Dataset/Header/DataHead";
import DataChartCols from "./DataChartCols";

export default class DataChart extends Component {

  constructor(props) {
    super(props);
    const args = this.props.match.params;

    this.state = {
      id: args.id,
      dataTable: null
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
          // console.log(response.data);
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
    const {dataTable} = this.state;
    return (
      <>
      { dataTable  ? (
        <div>
          {/* <div className="container">
          <DataHead 
            tittle={dataTable.table.name}
            helpInfo={[dataTable.table.user.username]} 
            
            date_load={dataTable.table.date_load} 
            since_create={dataTable.table.since_created}

            hrefs={{
              'Chart': {
                'active' : true,
                'href' : "/"
              }
            }}

            buttons={{
              'Save': 
                <button className="apply-button" onClick={() => (console.log('save'))} key={2}>
                  <span className="text-in-apply-button">
                    Save
                  </span>
                </button>
            }}
          />
          </div> */}

          <DataChartCols 
            cols = {dataTable.cols}
            path = {dataTable.table.dataset_file} />

        </div>
      ) : (<div/>)}
      </>
    )
  }
}