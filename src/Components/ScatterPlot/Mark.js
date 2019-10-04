import React, { Component } from "react";
import * as d3 from "d3";

class Mark extends Component {

  constructor(props) {
    super();
    this.circleRef = React.createRef();
  }

  componentDidMount() {
    let el = d3.select(this.circleRef.current);
    el.attr("cy", this.props.firePositionY)
      .attr("cx", this.props.firePositionX)
      .transition()
      .delay(this.props.delay)
      .attr("cy", this.props.cy)
      .attr("cx", this.props.cx)
  }

  render() {
    return <circle r={this.props.r} ref={this.circleRef} fill={this.props.color} />;
  }
}

export default Mark;