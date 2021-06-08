import React, { Component } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
// import * as d3 from 'd3';

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Value ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};


export default class DataPieChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data.x.label.map((el, i) => ({
        'name': el,
        'value': this.props.data.y.label[i],
      })),
    }
    this.ref = React.createRef();
    console.log("pie");
  }

  indFormatter(el) {
    let str = el.toString();
    if(str.length > 20)
      return str.slice(0, 20) + "...";
    return str;
  }

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const {data} = this.state;

    return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart
            width={1200}
            height={800}
          >
            <Pie
              activeIndex={this.state.activeIndex}
              activeShape={renderActiveShape} 
              data={data} 
              cx="50%" 
              cy="50%" 
              outerRadius={250} 
              innerRadius={200}
              dataKey="value"
              fill="rgb(77, 162, 241)" 
              onMouseEnter={this.onPieEnter}
              isAnimationActive={false}/>
          </PieChart>
        </ResponsiveContainer>
    )
  }
}