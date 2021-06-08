import React, { Component } from "react";
import {ArrowForward  } from "@material-ui/icons";
import DataChartScatter from "./DataChartScatter";
import {Dropdown} from "react-bootstrap";

import DataBarChart from "./DataBarChart";
import DataLineChart from "./DataLineChart";
import DataLineAreaChart from "./DataLineAreaChart";
import DataPieChart from "./DataPieChart";


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
      aggAxes : null,
      selectedType: this.props.types[0],
      showTypes: false,
      pickedRow: null,
      data: null,
      uploading: false,
      updated: false
    }

    this.CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
      <span
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {children}
      </span>
    ));
  }

  componentDidUpdate() {
    const {axes, updated, selectedType} = this.state;

    if((axes["X"] && axes["Y"] && updated) || (selectedType.id === 5 && updated) || (selectedType.id === 6 && axes["X"] && updated)) {
      
      this.setState({
        uploading: true,
        updated: false
      });
      let x = 0;
      let y = 0;

      if(selectedType.id !== 5 && selectedType.id !== 6) {
        x = axes["X"].id;
        y = axes["Y"].id;
      } else if (selectedType.id === 6) {
        x = axes["X"].id;
      }

      DataSetChartService.getData(this.props.path, selectedType.id, x, y).then(
        response => {
          if (response.data) {
            this.setState({
              data: response.data,
              uploading: false,
              aggAxes: response.data.agg
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

  onSelectType(type) {
    this.setState({
      data: null,
      updated: true,
      selectedType: type,
      showTypes: false
    });
  }

  selectTypeChart(data) {
    
    switch(this.state.selectedType.id){
      case 2:
        return <DataChartScatter data={data} />
      case 1:
        return <DataBarChart data={data} />
      case 3:
        return <DataLineChart data={data} />
      case 7:
        return <DataLineAreaChart data={data} />
      case 4:
        return <DataPieChart data={data} />
      case 5:
        return <DataChartScatter data={data} />
      case 6:
        return <DataChartScatter data={data} />
      default:
        return <> Something goes wrong </>
    }
  }

  render() {
    const {cols, axes, data, uploading,  showTypes, selectedType, aggAxes} = this.state;

    const processAxesTitle = (agg, name) => {
      if (agg === "none" || !agg)  {
        return <div className="aggregation-select control-green control">{name}</div>
      } else {
        return <div className="aggregation-select aggregation-select-measure control"> {agg + "(" + name + ")"} </div>
      }
    }

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
                          <span
                            style={{
                              color: el.data_type_aggregation.aggregation.name === "none" ? "rgba(59,201,53,1)" : "rgba(2, 123, 243, 1)",
                              marginRight: 5,
                              fontWeight: 700
                            }}
                          > {el.data_type_aggregation.data_type.name === "string" ? "A" : "#"} 
                          </span>
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

                <div className="actions-container datasets-action-container"
                  style={{
                    overflowY:"unset"
                  }}
                >
                  <div className="dataset-select">
                    <div className="datachart-select-item">
                      <div style={{
                        marginLeft: 20,
                        display: "flex"
                      }}>
                        <span style={{textAlign: "center", lineHeight: "28px"}}>
                          Chart type:
                        </span>

                        <Dropdown.Toggle as={this.CustomToggle} onClick={
                          () => this.setState({showTypes: !this.state.showTypes})
                        }>
                          <div className="select-control">
                            {selectedType.name}
                          </div>
                        </Dropdown.Toggle>  
                      </div>
                    </div>
                  </div>
                </div>
                
                <Dropdown.Menu  id="type" show={showTypes} className="dropdown-m chart-type">
                  { 
                    this.props.types.map((tel, i) => (
                      <div key={i} className={tel === selectedType ? "select-item selected-item" : "select-item"} onClick={() => this.onSelectType(tel)}>
                        {tel.name}
                      </div>
                    ))
                  } 
                </Dropdown.Menu>

                <div className="datachart-wrapper">
                  
                  <div>
                    {(selectedType.id !== 5 && selectedType.id !== 6) && (
                      <>
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
                            processAxesTitle("none", axes['X'].tittle) 
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
                          {(axes['Y'] && aggAxes) &&(
                            processAxesTitle(aggAxes, axes['Y'].tittle)
                          )}
                        </div>
                      </div>
                      </>
                    )}

                    {(selectedType.id === 6) && (
                      <div className="subcontainer">
                        <div className="subheader">
                          <div className="placeholder-icon">
                            <ArrowForward />
                          </div>
                          <span> Class </span>
                        </div>

                        <div 
                          className="drop-container"
                          onDragLeave={(e) => this.dragLeaveHandler(e)} 
                          onDragEnd={(e) => this.dragEndHandler(e)}
                          onDragOver={(e) => this.dragOverHandler(e)}
                          onDrop={(e) => this.dropHandler(e, 'X')}
                        >
                          {axes['X'] && (
                            processAxesTitle("none", axes['X'].tittle) 
                          )}
                        </div>
                      </div>
                    )}

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
                    this.selectTypeChart(data)
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