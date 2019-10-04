import React from "react";
import * as d3 from "d3";
import { AxisBarBottom } from '../Axis/AxisBarBottom';
import { AxisLeft } from '../Axis/AxisLeft';
import Bar from './Bar';

export const BarPlot = ({ 
  data, 
  svgWidth, 
  svgHeight, 
  fireDelay,
  onBarSelect,
  tiltXLabels = false
}) => {

  if (!data) {
    return <pre>Loading...</pre>
  }

  let bottomMargin = 20
  if(tiltXLabels) bottomMargin = 50
  const margin = { top: 20, right: 20, bottom: bottomMargin, left: 50 }

  let dataset = data

  const chartWidth = svgWidth - margin.right - margin.left
  const chartHeight = svgHeight - margin.top - margin.bottom

  const countMax = dataset.reduce((max, p) => (p.count > max ? p.count : max), dataset[0].count)

  const xScale = d3.scaleBand().range([0, chartWidth]).padding(0.1).domain(dataset.map((d) => d.type))
  const yScale = d3.scaleLinear().range([chartHeight, 0]).domain([0, countMax])
  const colorScale = d3.scaleLinear().domain([0, countMax]).range(['#e5f5f9', '#006d2c'])

  return (
    <svg width={svgWidth} height={svgHeight}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {data.map((d, i) => (
          <React.Fragment key={`barFrag${d.type}`}>
            <Bar
              id={d.id}
              x={xScale(d.type)}
              y={yScale(d.count)}
              delay={i * fireDelay}
              width={xScale.bandwidth()}
              height={chartHeight - yScale(d.count)}
              color={colorScale(d.count)}
              chartHeight={chartHeight}
              onBarSelect={onBarSelect}
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
          xScale={xScale}
          types={data.map(a => a.type)}
          tiltXLabels={tiltXLabels}
        />
      </g>
    </svg>
  );
};
