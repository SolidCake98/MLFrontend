import React, { Component } from "react";
import {ArrowForward  } from "@material-ui/icons";
import DataChartScatter from "./DataChartScatter";
import DataSetChartService from "../../services/DataSetChartService";

import "./DataChart.css";


export default class DataColumns extends Component {

  constructor(props) {
    super(props);

    this.state = {
      //   width: 0,
      cols: this.props.cols,
      axes: {
        'X': null,
        'Y': null,
      },
      pickedRow: null,
      data: null,
      uploading: false,
      updated: false
    }
  }

  componentDidUpdate() {
    const {axes, data, uploading, updated} = this.state;


    if((axes["X"] && axes["Y"] && !data && !uploading) || (axes["X"] && axes["Y"] && updated)) {
      
      this.setState({
        uploading: true,
        updated: false
      });

      DataSetChartService.getData(this.props.path, 2, axes["X"].id, axes["Y"].id).then(
        response => {
          if (response.data) {
            this.setState({
              data: response.data,
              uploading: false
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
  }

  dragStartHandler(e, row) {
    this.setState({
      pickedRow: row
    })
  }

  dragLeaveHandler(e) {
    e.target.classList.remove('over-drop');
  }

  dragEndHandler(e) {
    e.target.classList.remove('over-drop');
    this.setState({
      pickedRow: null
    })
  }

  dragOverHandler(e) {
    e.preventDefault();
    e.target.classList.add('over-drop');
  }

  dropHandler(e, ax) {
    e.preventDefault();
    e.target.classList.remove('over-drop');

    let axes = this.state.axes;
    axes[ax] = this.state.pickedRow;
    this.setState({
      axes: axes,
      updated: true
    });
  }

  render() {
    const {cols, axes, data, uploading} = this.state;
    return (
      <div className="columns">
        <div className="panel__chart">
          
          <div className="v-panel" style={{width: 220}}>
            <div className="chart-column">
              <div className="data-columns-container">

                <div className="actions-container datasets-action-container">
                  <div className="dataset-select">
                    <div className="datachart-select-item">
                      <div style={{marginLeft: 20}}>
                        Dataset:
                      </div>
                    </div>
                  </div>
                </div>

                <div className="datachart-wrapper">
                  <div className="datachart-subcontainer">
                    <div className="dimension-subheader">
                      <span> Dimensions </span>
                    </div>

                    <div className="dnd-container">
                      { cols.map((el, i) => (
                        <div
                          onDragStart={(e) => this.dragStartHandler(e, el)}

                          key={i}
                          className="dimension-item"
                          draggable={true}>
                          {el.tittle}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
          
          <span className="dl-resizer ch-vertical"/>
          <div className="v-panel" style={{width: 220}}>
            <div className="chart-column">
              <div className="data-columns-container">

                <div className="actions-container datasets-action-container">
                  <div className="dataset-select">
                    <div className="datachart-select-item">
                      <div style={{marginLeft: 20}}>
                        Chart type:
                      </div>
                    </div>
                  </div>
                </div>

                <div className="datachart-wrapper">
                  <div>
                    <div className="subcontainer">
                      <div className="subheader">
                        <div className="placeholder-icon">
                          <ArrowForward />
                        </div>
                        <span> X </span>
                      </div>

                      <div 
                        className="drop-container"
                        onDragLeave={(e) => this.dragLeaveHandler(e)} 
                        onDragEnd={(e) => this.dragEndHandler(e)}
                        onDragOver={(e) => this.dragOverHandler(e)}
                        onDrop={(e) => this.dropHandler(e, 'X')}
                      >
                        {axes['X'] && (
                          axes['X'].tittle
                        )}
                      </div>

                    </div>

                    <div className="subcontainer">
                      <div className="subheader">
                        <div className="placeholder-icon">
                          <ArrowForward style={{transform: "rotate(-90deg)"}}/>
                        </div>
                        <span> Y </span>
                      </div>

                      <div 
                        className="drop-container"
                        onDragLeave={(e) => this.dragLeaveHandler(e)} 
                        onDragEnd={(e) => this.dragEndHandler(e)}
                        onDragOver={(e) => this.dragOverHandler(e)}
                        onDrop={(e) => this.dropHandler(e, 'Y')}
                      >
                        {axes['Y'] && (
                          axes['Y'].tittle
                        )}
                      </div>
                    </div>

                    <div className="subcontainer">
                    </div>

                    <div className="subcontainer">
                    </div>

                    <div className="subcontainer">
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <span className="dl-resizer ch-vertical"/>

          <div className="v-panel" style={{width: "100%", flex: "1 1 0%"}}>
            <div className="chart-column">
              <div className="data-columns-container" style={{padding: 20}}>
                {uploading && (
                  <div>
                    Loading...
                  </div>
                )}
                {
                  data && !uploading && (
                    <DataChartScatter 
                      data = {data}
                    />
                  )
                }
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}