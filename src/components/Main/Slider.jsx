import React from 'react';
import { Carousel } from 'react-bootstrap';
import graph from '../../graph2.jpg';

export default class Home extends React.Component {

  render() {
    return (
      <Carousel>
        <Carousel.Item style={{'height': '600px'}}>
          <img 
            className="d-block w-100"
            src={graph} 
            alt="First slide"
          />
          <Carousel.Caption>
            <h2>Machine learning service</h2>
            <p> Тууттутутут</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    )
  }
}