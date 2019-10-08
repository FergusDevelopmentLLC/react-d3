import React, { Component } from "react";
import * as d3 from "d3";

class Bar extends Component {

    constructor(props) {
      super();
      this.barRef = React.createRef();
    }
  
    componentDidMount() {

      let el = d3.select(this.barRef.current);
      
      el.on('click', () => {
        this.props.onBarSelect(this.props.id)
        el.style('stroke-width','5');
        el.style('stroke-dasharray','5 2');
        el.style('stroke','rgba(255,102,0,1)');
        el.style('cursor','pointer');
      })

      el.on('mouseover', () => {
        this.props.onBarSelect(this.props.id)
        el.style('stroke-width','5');
        el.style('stroke-dasharray','5 2');
        el.style('stroke','rgba(255,102,0,1)');
        el.style('cursor','pointer');
      })

      el.on('mouseout', () => {
        this.props.onBarSelect(null)
        el.style('stroke-width',"0");
      })
      
      el.transition()
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
                height={0} 
                fill={this.props.color} 
                ref={this.barRef} />
    }
  }
  
  export default Bar;
