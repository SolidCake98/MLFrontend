import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "../DatasetList/DataSet.css";
import "./ModalGroup.css"


import { Person } from "@material-ui/icons";
import { Container, Row, Col, Button } from 'react-bootstrap';

export default class DataSetItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      groups: this.props.groups
    };
  }

  render() {
    return (

      <ListGroup.Item className="disp">
        <Link to={{ pathname: "profile/" + this.props.id }} className="link">

          <Container >
            <h4>{this.props.title}</h4>
            <div className="c m">
              <Person /> {this.props.username}
            </div>

            <Row className="c">

              <Col xs="3">
                joined {this.props.dateJoin} ago
              </Col>

              <Col xs="3">
                {this.state.groups}
              </Col>

              <Col xs="3">
                {this.props.count ? this.props.count : 0} number of datasets
              </Col>

              <Col xs="3">
                {this.props.avgRating ? this.props.avgRating : 0} average rating
              </Col>

            </Row>
          </Container>
        </Link>
        <Button className="margin-top" onClick={() => this.props.onOpen()}>
          Add user to group
        </Button>
      </ListGroup.Item>
    )
  }
}