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
  
  let colorBreaks = [
    {
      'rgb':[153,216,201],
      'break': 0
    },
    {
      'rgb':[102,194,164],
      'break': 90
    },
    {
      'rgb':[65,174,118],
      'break': 150
    },
    {
      'rgb':[35,139,69],
      'break': 300
    },
    {
      'rgb':[0,109,44],
      'break': 850
    }
  ]

  let barColors = []
  for(let color of colorBreaks) {
    barColors.push(`rgb(${color.rgb[0]},${color.rgb[1]},${color.rgb[2]})`)
  }
  
  const colorScale = d3.scaleThreshold().domain(colorBreaks.map(b => b.break)).range(barColors)
  const xScale = d3.scaleBand().range([0, chartWidth]).padding(0.1).domain(dataset.map((d) => d.type))
  const yScale = d3.scaleLinear().range([chartHeight, 0]).domain([0, countMax]).nice()
  
  const minHeight = 2.5

  return (
    <svg width={svgWidth} height={svgHeight}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {data.map((d, i) => (
          <React.Fragment key={`barFrag${d.type}`}>
            <Bar
              id={d.id}
              x={xScale(d.type)}
              y={(chartHeight - yScale(d.count)) > minHeight ? yScale(d.count) : chartHeight - minHeight}
              delay={i * fireDelay}
              width={xScale.bandwidth()}
              height={(chartHeight - yScale(d.count)) > minHeight ? chartHeight - yScale(d.count) : minHeight}
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
