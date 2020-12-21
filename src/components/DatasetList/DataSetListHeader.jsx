import React, { Component, useState } from "react";
import "./DataSet.css";
import {Dropdown} from "react-bootstrap";
import HeaderButton from "./HeaderButton";
import DataSetService from "../../services/DataSetService";


export default class DataSetListHeader extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedOrder: null,
      selectsOrder: [
        "New",
        "Most popular"
      ],

      selectsTypes: [
        {
          name: "Public",
        }, 
        {
          name: "Your Datasets",
        },
        {
          name: "Favourites",
        }
      ],
      selectedType: null,
    }

    this.onSelectOrder = this.onSelectOrder.bind(this);

    this.CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
      <div
        ref={ref}
        className="button-toggle"
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {children}
        <span className="custom-toggle">
          &#x25bc;
        </span>
      </div>
    ));
    
    // forwardRef again here!
    // Dropdown needs access to the DOM of the Menu to measure it
    this.CustomMenu = React.forwardRef(
      ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        const [value] = useState('');
    
        return (
          <div
            ref={ref}
            style={style}
            className={className}
            aria-labelledby={labeledBy}
          >
            <ul className="list-unstyled">
              {React.Children.toArray(children).filter(
                (child) =>
                  !value || child.props.children.toLowerCase().startsWith(value),
              )}
            </ul>
          </div>
        );
      },
    );
  }

  componentDidMount(){
    this.setState({
      selectedOrder: this.props.orderType,
      selectedType: this.props.selectType,
    })

    DataSetService.getNewDatasets().then(
      response => {
      if (response.data.length) {
        this.props.onSortSelect(response.data, 'New', 0);
      }
    });
  }

  componentDidUpdate(){

    if (this.props.orderType !== this.state.selectedOrder)
      this.setState({
        selectedOrder: this.props.orderType,
      })

    if (this.props.selectType !== this.state.selectedType)
      this.setState({
        selectedType: this.props.selectType,
      })
      
  }

  onSelectOrder = (order) => {
    
    if(order !== this.state.selectedOrder){

      this.props.onChangeOrder(order);

      // this.setState({
      //   selectedOrder: order,
      //   selectedType: 0
      // });

      var sort;

      if(order === "New")
        sort =  DataSetService.getNewDatasets()

      else if(order === "Most popular")
        sort =  DataSetService.getPopularDatasets()

      sort.then(
        response => {
          if (response.data.length) {
            this.props.onSortSelect(response.data, order, 0);
          }
        }
      );
    }
  }

  onSelectType = (type) => {

    if(type !== this.state.selectedType) {

      this.props.onChangeSelect(type);


      // this.setState({
      //   selectedType: type,
      //   selectedOrder: "New"
      // });

      var sort = DataSetService.getNewDatasets;

      if(this.state.selectsTypes[type].name === "Your Datasets")
        sort =  DataSetService.getYourDatasets

      sort().then(
        response => {
          if (response.data.length) {
            this.props.onSortSelect(response.data, 'New', type);
          }

        },
        error => {
          console.log(error);
        }
      );
    } 
    
  }

  render() {
    const {selectedOrder, selectsOrder, selectsTypes, selectedType} = this.state;
    return (
      <>
        <div className="list-header">
          <div className="list-header-sets">
            {
              selectsTypes.map((item, index) => (
                <HeaderButton name={item.name} selected={index === selectedType} onSelect={() => this.onSelectType(index)} key={index}/>
              ))
            }
          </div>
          <div className="sort-dropdown">
            <Dropdown className="el">
              <Dropdown.Toggle as={this.CustomToggle} id="dropdown-basic">
                {selectedOrder}
              </Dropdown.Toggle>
              <Dropdown.Menu as={this.CustomMenu} className="">
                {
                  selectsOrder.map((item, index) => ( 
                    <Dropdown.Item onClick={() => this.onSelectOrder(item)} key={index}
                     > 
                      {item}
                    </Dropdown.Item>
                  ))
                }
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </>
    );
  }


}