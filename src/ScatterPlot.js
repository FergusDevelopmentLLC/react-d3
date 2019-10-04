import React from "react";
import * as d3 from "d3";
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import Mark from './Mark';
import { MarkFunc } from './MarkFunc';

const margin = { top: 20, right: 20, bottom: 20, left: 50 }

export const ScatterPlot = ({ data, svgWidth, svgHeight, fireDelay, dotRadius }) => {

  if (!data) {
    return <pre>Loading...</pre>
  }

  const chartWidth = svgWidth - margin.left - margin.right
  const chartHeight = svgHeight - margin.top - margin.bottom

  const yScale = d3.scaleLinear().range([chartHeight, 0]).domain([0, d3.max(data, d => +d.a)])
  const xScale = d3.scaleLinear().range([0, chartWidth]).domain([0, d3.max(data, d => +d.n)])

  return (
    <svg width={svgWidth} height={svgHeight}>
      <g transform={`translate(${margin.left},${margin.top})`}>

        <AxisLeft
          yScale={yScale}
          chartHeight={chartHeight}
          chartWidth={chartWidth}
          tickWidth={5}
        />

        <AxisBottom
          xScale={xScale}
          chartHeight={chartHeight}
          chartWidth={chartWidth}
          tickWidth={5}
        />

        {data.map((d, i) => (
          <React.Fragment key={`frag${d.n}`}>
            <MarkFunc
              key={`markFunc${d.n}`}
              firePositionX={xScale(d3.max(data, d => +d.n) / 2)}
              firePositionY={yScale(d3.max(data, d => +d.a) / 2)}
              cx={xScale(d.n)}
              cy={yScale(d.a)}
              delay={i * fireDelay}
              r={dotRadius}
              color={'red'}
            />
            <Mark
              key={`mark${d.n}`}
              firePositionX={xScale(d3.max(data, d => +d.n) / 2)}
              firePositionY={yScale(d3.max(data, d => +d.a) / 2)}
              cx={xScale(d.n)}
              cy={yScale(d.a)}
              delay={i * fireDelay}
              r={dotRadius}
              color={'blue'}
            />
          </React.Fragment>
        ))}
      </g>
    </svg>
  );
};
