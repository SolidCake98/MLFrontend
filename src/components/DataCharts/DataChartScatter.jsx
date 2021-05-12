import React, { Component } from "react";
import { ScatterChart, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Scatter } from 'recharts';
// import * as d3 from 'd3';




export default class DataColumns extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data.x.data.map((el, i) => ({
        'x': el,
        'y': this.props.data.y.data[i]
      }))
    }
    this.ref = React.createRef();
  }


  render() {
    const {data} = this.state;
    return (
        <ResponsiveContainer width="100%" height="100%" >
          <ScatterChart
            width={1200}
            height={700}
          >
            <CartesianGrid strokeDasharray="3 3" />
            
            <XAxis
              style={{fontSize: 12}}
              // interval={0}
              tickCount={10}
              type="number"
              name={this.props.data.x.field}
              fill="white"
              textAnchor="end"
              angle={-45}
              dataKey="x" 
              domain={['dataMin', 'dataMax']}
            />

            <YAxis 
            fill="white"
            name={this.props.data.y.field}
            dataKey="y"/>
            <ZAxis range={[100,100]} />
            <Tooltip />
            <Scatter  data={data} fill="rgb(77, 162, 241)" isAnimationActive={false}/>
          </ScatterChart>
        </ResponsiveContainer>
    )
  }
}