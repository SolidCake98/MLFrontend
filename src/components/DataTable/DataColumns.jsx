import React, { Component } from "react";
import DataColTableRow from "./DataColTableRow";

import "./DataTable.css";


export default class DataColumns extends Component {

  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      changedCols: Object()
    }

    this.ref = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ 
      width: this.ref.current.offsetWidth
    });
  }

  updateDimensions = () => {
    this.setState({ 
      width: this.ref.current.offsetWidth
    });
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  onChangeColTitle(i, value) {
    const cols = this.props.cols;

    let changedCols = this.state.changedCols;

    changedCols[i] = changedCols[i] ? changedCols[i] : Object();
    changedCols[i]["name"] = value;
    changedCols[i]["changed"] = cols[i].tittle !== value;

    this.setState({
      changedCols: changedCols
    });
  }


  render() {
    const {width} = this.state;
    return (
      <div className="dataset__panels">
        <div className="split-panel">

          <div className="dataset__content-panel">
            <div className="data-table-sticky" ref={this.ref}>
              <table className="data-table__table"  style={{width: width}}>
                <colgroup>
                  <col style={{width: 50}}/>
                  <col style={{width: width/5}}/>
                  <col style={{width: width/5+50}}/>
                  <col style={{width: width/5-50}}/>
                  <col style={{width: width/5}}/>
                  <col style={{width: width/5}}/>
                </colgroup>
                <thead>
                  <tr className="data-table__head-row">
                    <th className="dataset-table__column data-table__th data-table__th"
                    data-index="0"
                    colSpan={1}
                    rowSpan={1}>
                      <div className="data-table__head-cell data-table__head-cell__padding">
                        <div className="dataset-table__header-icon-table-count">
                          &#35;
                        </div>
                      </div>
                    </th>

                    <th className="dataset-table__column data-table__th data-table__th">
                      <div className="data-table__head-cell">
                        <div className="dataset-table__header">
                          Name
                        </div>
                      </div>
                    </th>

                    <th className="dataset-table__column data-table__th data-table__th">
                      <div className="data-table__head-cell">
                        <div className="dataset-table__header">
                          Source
                        </div>
                      </div>
                    </th>

                    <th className="dataset-table__column data-table__th data-table__th">
                      <div className="data-table__head-cell">
                        <div className="dataset-table__header">
                          Type
                        </div>
                      </div>
                    </th>

                    <th className="dataset-table__column data-table__th data-table__th">
                      <div className="data-table__head-cell">
                        <div className="dataset-table__header">
                          Aggregation
                        </div>
                      </div>
                    </th>


                    <th className="dataset-table__column data-table__th data-table__th">
                      <div className="data-table__head-cell">
                        <div className="dataset-table__header">
                          Description
                        </div>
                      </div>
                    </th>

                  </tr>
                </thead>
              </table>
            </div>

            <div className="data-table__box data-table__box_sticky-head">
              <div style={{position: "relative"}} >
              <table className="data-table__table" style={{width: width}}>
                <colgroup>
                  <col style={{width: 50}}/>
                  <col style={{width: width/5}}/>
                  <col style={{width: width/5+50}}/>
                  <col style={{width: width/5-50}}/>
                  <col style={{width: width/5}}/>
                  <col style={{width: width/5}}/>
                </colgroup>

                <tbody>
                  {this.props.cols.map((el, i) => (
                    <DataColTableRow
                      el = {el}
                      key={i}
                      onChangeColTitle = {(value) => (this.onChangeColTitle(i, value))}
                      types = {this.props.types}
                    />
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}