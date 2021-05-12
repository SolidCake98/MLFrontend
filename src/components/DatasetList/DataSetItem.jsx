import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "./DataSet.css";

import {Person, CalendarToday, Storage} from "@material-ui/icons";
import { Container, Row, Col } from 'react-bootstrap';

export default class DataSetItem extends Component {

  render() {
    return( 

      <ListGroup.Item className="disp">
        <Link to={{pathname: "/data/" + this.props.link}} className="link">

          <Container >
            <h4>{this.props.title}</h4>
            <div className="c m">
              <Person/> {this.props.username} 
            </div>

            <Row className="c">

              <Col xs="2">
                <CalendarToday /> {this.props.date}
              </Col>

              <Col xs="2">
               {this.props.file_types}
              </Col>

              <Col xs="2">
                <Storage /> {this.props.size} {this.props.size_name}
              </Col>

            </Row>
          </Container>
        </Link>
      </ListGroup.Item>
    )
  }
}