import React from "react";
import * as d3 from "d3";
import { AxisBarBottom } from './AxisBarBottom';
import { AxisLeft } from './AxisLeft';
import Bar from './Bar';

const margin = { top: 20, right: 20, bottom: 20, left: 50 }

export const BarPlot = ({ data, svgWidth, svgHeight, fireDelay }) => {

    if (!data) {
      return <pre>Loading...</pre>
    }

    let dataset = data
  
    const chartWidth = svgWidth - margin.right - margin.left
    const chartHeight = svgHeight - margin.top - margin.bottom
  
    const countMax = dataset.reduce((max, p) => (p.count > max ? p.count : max),dataset[0].count)
    const x1 = d3.scaleBand().rangeRound([0, chartWidth]).padding(0.2)
    const y1 = d3.scaleLinear().rangeRound([chartHeight, 0])

    x1.domain(dataset.map((d) => d.type))
    y1.domain([0, countMax])

    const yScale = d3.scaleLinear().range([0, chartHeight]).domain([countMax, 0]);
    const colorScale = d3.scaleLinear().domain([0, countMax]).range(['#e5f5f9', '#006d2c'])

    return (
      <svg width={svgWidth} height={svgHeight}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {data.map((d, i) => (
            <React.Fragment key={`barFrag${d.type}`}>
              <Bar
                x={x1(d.type)}
                y={yScale(d.count)}
                delay={i * fireDelay}
                width={x1.bandwidth()}
                height={chartHeight - yScale(d.count)}
                color={colorScale(d.count)}
                chartHeight={chartHeight}
              />
            </React.Fragment>
          ))}
          
          <AxisLeft
            yScale={yScale}
            chartHeight={chartHeight}
            chartWidth={chartWidth}
            tickWidth={5}
          />
  
          <AxisBarBottom
            chartHeight={chartHeight}
            chartWidth={chartWidth}
            tickWidth={5}
            xScale={x1}
            types = {data.map(a => a.type)}
          />
        </g>
      </svg>
    );
  };
  