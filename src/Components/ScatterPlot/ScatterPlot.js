import React from "react";
import * as d3 from "d3";
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Mark } from './Mark';

const styles = {
  position: "absolute",
  zIndex: 2000,
  backgroundColor: "white",
  top: "calc(100vh - 620px)",
  right: "20px",
  border: "1px solid gray"
};

export const ScatterPlot = ({ 
  data, 
  svgWidth, 
  svgHeight, 
  itemDelay, 
  dotRadius,
  tiltXLabels = false,
  visualizationTitle = "Visualization Title",
  leftAxisTitle = "Left Axis Title",
  bottomAxisTitle = "Bottom Axis Title",
  onSelectItem
}) => {

  if (!data) {
    return <pre>Loading...</pre>
  }

  const margin = { 
    left: `${svgWidth * 0.12}`,
    right: `${svgWidth * 0.06}`, 
    top: `${svgHeight * 0.12}`, 
    bottom: `${tiltXLabels ? svgHeight * 0.20 : svgHeight * 0.15}`
  }

  const chartWidth = svgWidth - margin.left - margin.right
  const chartHeight = svgHeight - margin.top - margin.bottom

  const xScale = d3.scaleLinear().range([0, chartWidth]).domain([0, d3.max(data, d => +d.x)]).nice();
  const yScale = d3.scaleLinear().range([chartHeight, 0]).domain([0, d3.max(data, d => +d.y)]).nice();
  
  return (
    <svg width={svgWidth} height={svgHeight} style={styles}>
      <g>
        <text
          style={{ textAnchor: "middle" }}
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize={chartWidth * 0.035}
          x={svgWidth / 2}
          y={svgHeight * 0.08}
        >
          {visualizationTitle}
        </text>
      </g>
      
      <g transform={`translate(${margin.left},${margin.top})`}>
        
        {data.map((d, i) => (
          <React.Fragment key={`frag${i}`}>
            <Mark
              firePositionX={0}
              firePositionY={chartHeight}
              cx={xScale(d.x)}
              cy={yScale(d.y)}
              itemDelay={i * itemDelay}
              r={dotRadius}
              onSelectItem={onSelectItem}
            />
          </React.Fragment>
        ))}

        <AxisLeft
          yScale={yScale}
          chartHeight={chartHeight}
          chartWidth={chartWidth}
          yAxisTitle={leftAxisTitle}
        />

        <AxisBottom
          xScale={xScale}
          chartHeight={chartHeight}
          chartWidth={chartWidth}
          tiltXLabels={tiltXLabels}
          xAxisTitle={bottomAxisTitle}
        />
      </g>
    </svg>
  );
};
