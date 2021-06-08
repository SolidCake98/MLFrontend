import React, { Component } from "react";
import {Dropdown} from "react-bootstrap";

export default class DataColTableRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.el.tittle,
      selectedType: this.props.el.data_type_aggregation.data_type.name,
      selectedAgg: this.props.el.data_type_aggregation.aggregation.name,
      el: this.props.el,
      i: this.props.i,
      showTypes: false,
      showAggregations: false,
    };

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    
    this.wrapperRefAgg = React.createRef();
    this.handleClickOutsideRef = this.handleClickOutsideRef.bind(this);

    this.onTitleChange = this.onTitleChange.bind(this);
    this.CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
      <div
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {children}
      </div>
    ));

  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    document.addEventListener('mousedown', this.handleClickOutsideRef);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    document.removeEventListener('mousedown', this.handleClickOutsideRef);
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({
        showTypes: false,
      })
    }
  }

  handleClickOutsideRef(event) {
    if (this.wrapperRefAgg && !this.wrapperRefAgg.current.contains(event.target)) {
      this.setState({
        showAggregations: false,
      })
    }
  }

  onSelectType(type) {

    if(!this.props.types[type].includes(this.state.selectedAgg)){
      this.setState({
        selectedType: type,
        selectedAgg: this.props.types[type][0],
      });
    } else {
      this.setState({
        selectedType: type,
        showTypes: false
      });
    }
    this.props.onChangeCol(type, "data_type");
  }

  onSelectAgg(agg) {
    this.setState({
      selectedAgg: agg,
      showAggregations: false,
    });
    this.props.onChangeCol(agg, "aggregation");
  }

  onTitleChange(e) {
    this.setState({
      value: e.target.value,
    });
    this.props.onChangeCol(e.target.value, "tittle");
  }

  render() {
    const {value, el, showTypes, showAggregations, selectedType, selectedAgg} = this.state;

    return (
      <tr className="dataset-table__row">
                      
        <td className="data-table__td data-table__td_align_center clear">
          {el.index + 1}
        </td>

        <td className="data-table__td clear">
          <span className="textinput_normal" >
            <input type="text" value={value} className="textinput__control" onChange={this.onTitleChange}/>
          </span>
        </td>

        <td className="data-table__td clear">
          {el.dataset_column_sources.tittle}
        </td>

        <td className="data-table__td clear" ref={this.wrapperRef}>
          
            <Dropdown show={showTypes}>
              <Dropdown.Toggle as={this.CustomToggle} id="dropdown-basic_t" onClick={
                () => this.setState({showTypes: !this.state.showTypes})
              }>
                <div className="select-control">
                  {selectedType}
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu id="type" className="dropdown-m">
                { 
                  Object.keys(this.props.types).map((tel, i) => (
                    <div key={i} className={tel === selectedType ? "select-item selected-item" : "select-item"} onClick={() => this.onSelectType(tel)}>
                      {tel}
                    </div>
                  ))
                }
              </Dropdown.Menu>
                
            </Dropdown>
        </td>

        <td className="data-table__td clear" ref={this.wrapperRefAgg}>
          <div className={selectedAgg === "none" ? "aggregation-select": "aggregation-select aggregation-select-measure"}>
            <Dropdown show={showAggregations} drop={'down'}>
              <Dropdown.Toggle as={this.CustomToggle} id="dropdown-basic_agg" onClick={
                () => this.setState({showAggregations: !this.state.showAggregations})
              }>
                
                  <div className={selectedAgg === "none" ? "select-control aggregation-select select-control-green" : "select-control aggregation-select aggregation-select-measure"} style={{width: 144}}>
                    {selectedAgg}
                  </div>
              </Dropdown.Toggle>

              <Dropdown.Menu id="agg" className="dropdown-m" drop={'down'}>
                { 
                  this.props.types[selectedType].map((tel, i) => (
                    <div key={i} className={tel === selectedAgg ? "select-item selected-item" : "select-item"} onClick={() => this.onSelectAgg(tel)}>
                      {tel}
                    </div>
                  ))
                }
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </td>
      </tr>
    )
  }
}