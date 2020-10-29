import React, { Component } from "react";
import DataSetService from "../../services/DataSetService";
import DataSetItem from "./DataSetItem";
import {ListGroup, Button} from "react-bootstrap";
import Upload from "./Upload";



export default class DataSetList extends Component {

  constructor(props) {
    super(props);

    this.onCloseModal = this.onCloseModal.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this)


    this.state = {
      showModal: false,
      datasets: null,
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

  componentDidMount() {

    DataSetService.getAllDatasets().then(
      response => {
        if (response.data.length) {
          this.setState({
            datasets: response.data,
          });
          console.log(this.state.datasets);
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
    const { showModal } = this.state;
    return (
      <>
      <div className="container">
        <Upload show={showModal} onClose={() => this.onCloseModal()}/>
        <Button variant="primary" onClick={this.onOpenModal} className="m-b">
          + New dataset
        </Button>

          
        <h3>Datasets</h3>
        <ListGroup variant="flush">
          { this.state.datasets ? ( this.state.datasets.map((item) => ( 
            <DataSetItem 
              key={item.id}
              id={item.id}
              title={item.title} 
              username={item.user.username}  
              date={item.since_created} 
              size={item.dataset_meta.size}
              size_name={item.dataset_meta.size_name}
              link={item.dataset_meta.path} 
            />
          ))) : (<div/>)}
        </ListGroup>

      </div>
      </>
    );
  }

}