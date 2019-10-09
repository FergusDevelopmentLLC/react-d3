import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export const Bar = ({
  id,
  x,
  y,
  chartHeight,
  width,
  height,
  color,
  itemDelay = 0,
  onSelectItem
}) => {

  const barRef = useRef(null);

  useEffect(() => {

    let el = d3.select(barRef.current)

    if(itemDelay > 0) {
      el.transition()
        .duration(500)
          .delay(itemDelay)
            .attr('y', y)
            .attr('height', height)
    }
    else {
      el.attr('y', y).attr('height', height)
    }
    
    if(onSelectItem) {
      el.on('mouseover', () => {
        onSelectItem(id)
        el.style('stroke-width','5');
        el.style('stroke-dasharray','5 2');
        el.style('stroke','rgba(255,102,0,1)');
        el.style('cursor','pointer');
      })

      el.on('click', () => {
        onSelectItem(id)
        el.style('stroke-width','5');
        el.style('stroke-dasharray','5 2');
        el.style('stroke','rgba(255,102,0,1)');
        el.style('cursor','pointer');
      })
      
      el.on('mouseout', () => {
        onSelectItem(null)
        el.style('stroke-width',"0");
      })
    }

  }, []);

  return (
    <rect
      x={x}
      y={chartHeight}
      width={width}
      height={0}
      fill={color}
      ref={barRef} />
  )
}