import React, { Component } from "react";
import {Button} from "react-bootstrap";
import Upload from "./Upload";
import DataSetListComponent from "./DataSetListComponent";
import DataSetListHeader from "./DataSetListHeader";
import SearchHead from "./SearchHead";



export default class DataSetList extends Component {

  constructor(props) {
    super(props);

    this.onCloseModal = this.onCloseModal.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this)

    this.state = {
      showModal: false,
      datasets: null,
      orderType: 'New',
      selectType: 0,
      error: null,
    };
  }

  onOpenModal() {
    this.setState({
      showModal: true,
    });
  }

  onCloseModal() {
    this.setState({
      showModal: false,
    });
  }

  onChangeSort = (sort) => {
    this.setState({
      datasets: sort,
    })
  }

  onChangeOrder = (order) => {
    this.setState({
      orderType: order,
    })
  }

  onChangeSelect = (select) => {
    this.setState({
      selectType: select,
    })
  }

  onSearch = (searchDataset) => {
    this.setState({
      datasets: searchDataset,
      orderType: 'New',
      selectType: 0,
    })
  }

  render() {
    const { showModal, orderType, selectType } = this.state;
    return (
      <>
      <div className="container">
        <Upload show={showModal} onClose={() => this.onCloseModal()}/>
        <Button variant="primary" onClick={this.onOpenModal} className="m-b">
          + New dataset
        </Button>

        <h3>Datasets</h3>
        <SearchHead onSearch={(searchDataset) => this.onSearch(searchDataset)}/>
        <DataSetListHeader onSortSelect={(sort) => this.onChangeSort(sort)} 
          orderType={orderType} 
          selectType={selectType} 
          onChangeOrder={(order) => this.onChangeOrder(order)}
          onChangeSelect={(select) => this.onChangeSelect(select)}
        />
        <DataSetListComponent datasets={this.state.datasets} />

      </div>
      </>
    );
  }

}