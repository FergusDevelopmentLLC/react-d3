import React, { Component } from "react";
import * as d3 from "d3";

class Bar extends Component {

    constructor(props) {
      super();
      this.barRef = React.createRef();
    }
  
    componentDidMount() {

      let el = d3.select(this.barRef.current);
      
      el.attr('width', this.props.width)
        .attr('height', 0)
        .attr('x', this.props.x)
        .attr('y', this.props.chartHeight)
        .style('fill', this.props.color)
        .transition()
      .duration(500)
        .delay(this.props.delay)
            .attr('y', this.props.y)
            .attr('height', this.props.height)
    }
  
    render() {
        
        return <rect
                x={this.props.x} 
                y={this.props.chartHeight} 
                width={this.props.width} 
                height={this.props.height} 
                fill={this.props.color} 
                ref={this.barRef} />
    }
  }
  
  export default Bar;
