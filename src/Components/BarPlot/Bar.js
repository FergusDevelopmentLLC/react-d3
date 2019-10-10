import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const setHighlight = (el, highlighted) => {
    
  if(highlighted) {
    el.style('stroke-width','5');
    el.style('stroke-dasharray','5 2');
    el.style('stroke','rgba(255,102,0,1)');
    el.style('cursor','pointer');
  }
  else {
    el.style('stroke-width',"0");
  }

}

export const Bar = ({
  id,
  x,
  y,
  chartHeight,
  width,
  height,
  color,
  itemDelay,
  onSelectItem
}) => {

  const barRef = useRef(null)
  
  useEffect(() => {

    let el = d3.select(barRef.current)

    if(itemDelay > 0) {
      el.transition()
        .delay(itemDelay)
          .duration(500)
            .attr('y', y)
            .attr('height', height)
    }
    
    el.on('mouseover', () => {
      onSelectItem(id)
      setHighlight(el, true)
    })

    el.on('click', () => {
      onSelectItem(id)
      setHighlight(el, true)
    })
    
    el.on('mouseout', () => {
      onSelectItem(null)
      setHighlight(el, false)
    })

  }, []);

  return (
    <rect x={x} y={itemDelay > 0 ? chartHeight : y} width={width} height={itemDelay > 0 ? 0 : height} fill={color} ref={barRef} />
  )
}