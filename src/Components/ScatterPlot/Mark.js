import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export const Mark = ({
  id,
  firePositionX = 0,
  firePositionY = 0,
  cx,
  cy,
  itemDelay = 0,
  r = 1,
  color,
  onSelectItem,
  highlightColor = 'rgb(255,102,0)'
}) => {

  const circleRef = useRef(null);

  useEffect(() => {
    
    let el = d3.select(circleRef.current)

    if(itemDelay > 0) {
      el.attr("cy", firePositionY)
      .attr("cx", firePositionX)
        .transition().delay(itemDelay)
        	.attr("cy", cy)
          .attr("cx", cx)
    }
    else {
      el.attr("cy", cy).attr("cx", cx)
    }

    if(onSelectItem) {
      el.on('mouseover', () => {
        onSelectItem(id)
        el.style('fill', highlightColor);
        el.style('cursor','pointer');
      })
      el.on('mouseout', () => {
        onSelectItem(null)
        el.style('fill', color);
      })
    }

  }, [])

  return (
    <circle 
      r={r} 
      fill={color} 
      ref={circleRef} 
    />
  )
}