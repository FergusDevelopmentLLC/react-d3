import React from "react";
export const MarkFunc = ({ firePositionY, firePositionX, cy, cx, r, delay, color }) => {

    //   let circleRef = React.createRef();
    //   let el = d3.select(circleRef.current);
    // 		el.attr("cy", firePositionY)
    //     	.attr("cx", firePositionX)
    //     .transition()
    //     	.delay(delay)
    //       	.attr("cy", cy)
    //       	.attr("cx", cx)
    
      return (
        <circle r={r} cx={cx} cy={cy} fill={color} key={cx}/>
        // <circle r={r} cx={cx} cy={cy} ref={el} />
      );
    }