import React, { Component } from "react";
import DataSetItem from "./DataSetItem";
import { ListGroup } from "react-bootstrap";



export default class DataSetListComponent extends Component {
  render() {

    return (
      <>

        <ListGroup variant="flush">
          {this.props.datasets ? (this.props.datasets.map((item) => (
            <DataSetItem
              key={item.id}
              id={item.id}
              title={item.title}
              username={item.user.username}
              date={item.since_created}
              size={item.dataset_meta.size}
              size_name={item.dataset_meta.size_name}
              link={item.dataset_meta.path}
              file_types={item.file_types.map((item) => item.file_type.type_name).toString()}
            />
          ))) : (<div />)}
        </ListGroup>
      </>
    );
  }


}