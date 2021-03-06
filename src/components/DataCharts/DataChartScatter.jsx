import React, { Component } from "react";
import { ScatterChart, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Scatter } from 'recharts';
// import * as d3 from 'd3';




export default class DataColumns extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data.x.data.map((el, i) => ({
        'x': el,
        'x_label' : this.props.data.x.label[i],
        'y': this.props.data.y.data[i],
        'y_label' : this.props.data.y.label[i]
      })),
    }
    this.ref = React.createRef();
  }

  indFormatter(el) {
    let str = el.toString();
    if(str.length > 20)
      return str.slice(0, 20) + "...";
    return str;
  }

  render() {
    const {data} = this.state;

    let getValX = (x) => {
      return this.props.data.x.categorical ? x.x : x.x_label;
    }

    let getValY = (y) => {
      return this.props.data.y.categorical ? y.y : y.y_label;
    }

    let lenT = (this.props.data.x.max - this.props.data.x.min) > 12 ? 12 : (this.props.data.x.max - this.props.data.x.min);
    
    let lenInt = (this.props.data.x.max - this.props.data.x.min) / lenT; 

    let xTicks = Array(lenT + 1).fill().map((i, index) => {      
      return index !== (lenT) ? this.props.data.x.min + parseInt(lenInt) * index : this.props.data.x.max
    });

    return (
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            width={1200}
            height={700}
          >
            <CartesianGrid  />
            
            <XAxis
              style={{fontSize: 12, fill: "#666"}}
              tickCount={lenT + 1}
              ticks={xTicks}
              type="number"
              label={<CustomXLabel
                label={this.props.data.x.field}
              />}
              height={80}
              fill="white"
              dataKey={getValX}
              tick={
                <CustomXAxisTick
                  d        = {data}
                  category = {this.props.data.x.categorical}
                  indFormatter = {this.indFormatter}
                />
              }
              domain={['dataMin', 'dataMax']}
            />

            <YAxis 
              fill="white"
              type="number"
              label={<CustomYLabel
                label={this.props.data.y.field}
                />}
              
              dataKey={getValY}
              domain={['dataMin', 'dataMax']}
            />
            
            <ZAxis range={[60,60]}/>

            <Tooltip content={
            <CustomizedTooltip
              labels = {[this.props.data.x.field, this.props.data.y.field]} 
            />} />
            <Scatter  data={data} fill="rgb(77, 162, 241)" isAnimationActive={false}/>

          </ScatterChart>
        </ResponsiveContainer>
    )
  }
}

const CustomizedTooltip = ({ active, payload, labels }) => {
  if (active) {
    return (
      <div className="chart-tooltip">
        <div className="">
          <div> {labels[0]}: {payload[0].payload.x_label} </div>
          <div> {labels[1]}: {payload[0].payload.y_label} </div>
        </div>
      </div>
    );
  }

  return null;
};

const CustomXAxisTick = props => {
  return (
    <text transform={`rotate(-45, ${props.x}, ${props.y})`} x={props.x} y={props.y} textAnchor="end" width={props.width} style={props.style}>
       <tspan dy="0.71em" > {props.indFormatter(props.category ? props.d[props.d.findIndex((el) => (el.x === props.payload.value))].x_label : props.payload.value)} </tspan>
    </text>
  )
};

const CustomXLabel = props => {
  return (
    <text x={props.viewBox.width/2 + props.viewBox.x} y={props.viewBox.y+30} textAnchor="end" width={props.viewBox.width} style={props.style}>
       <tspan > {props.label} </tspan>
    </text>
  )};

const CustomYLabel = props => {
  return (
    <text  transform={`rotate(-90, ${props.viewBox.x+10 }, ${props.viewBox.height/2 + props.viewBox.y})`} x={props.viewBox.x+30} y={props.viewBox.height/2 + props.viewBox.y} textAnchor="end" width={props.viewBox.width} >
        <tspan > {props.label} </tspan>
    </text>
  )};
