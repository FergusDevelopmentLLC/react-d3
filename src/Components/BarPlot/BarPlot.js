import React from "react";
import * as d3 from "d3";
import { AxisLeft } from "../Axis/AxisLeft";
import { AxisBarBottom } from "./AxisBarBottom";
import Bar from "./Bar";

const styles = {
  position: "absolute",
  zIndex: 1000,
  backgroundColor: "white",
  top: "calc(100vh - 320px)",
  right: "20px",
  border: "1px solid gray"
};

export const BarPlot = ({
  data,
  svgWidth,
  svgHeight,
  fireDelay,
  onBarSelect,
  colorBreaks,
  tiltXLabels = false,
  title = ""
}) => {
  if (!data) {
    return <pre>Loading...</pre>;
  }

  let bottomMargin = 50;
  if (tiltXLabels) bottomMargin = 65;
  const margin = { top: 40, right: 10, bottom: bottomMargin, left: 60 };

  let dataset = data;

  const chartWidth = svgWidth - margin.right - margin.left;
  const chartHeight = svgHeight - margin.top - margin.bottom;

  const countMax = dataset.reduce(
    (max, p) => (p.count > max ? p.count : max),
    dataset[0].count
  );

  let barColors = [];
  for (let color of colorBreaks) {
    barColors.push(`rgb(${color.rgb[0]},${color.rgb[1]},${color.rgb[2]},1)`);
  }

  colorBreaks = colorBreaks.slice(1, colorBreaks.length);

  //barColors = ['red', 'blue', 'green', 'yellow', 'purple']

  const colorScale = d3.scaleThreshold().domain(colorBreaks.map(b => b.break)).range(barColors);

  const xScale = d3.scaleBand().range([0, chartWidth]).padding(0.1).domain(dataset.map(d => d.type));

  const yScale = d3.scaleLinear().range([chartHeight, 0]).domain([0, countMax]).nice();

  const minHeight = 2.5;

  return (
    <svg width={svgWidth} height={svgHeight} style={styles}>
      <g>
        <text
          style={{ textAnchor: "middle" }}
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize={chartWidth * 0.041}
          x={svgWidth / 2}
          y={25}
        >
          {"Top Oregon Counties by Population Density"}
        </text>
      </g>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {data.map((d, i) => (
          <React.Fragment key={`barFrag${d.type}`}>
            <Bar
              id={d.id}
              x={xScale(d.type)}
              y={
                chartHeight - yScale(d.count) > minHeight
                  ? yScale(d.count)
                  : chartHeight - minHeight
              }
              delay={i * fireDelay}
              width={xScale.bandwidth()}
              height={
                chartHeight - yScale(d.count) > minHeight
                  ? chartHeight - yScale(d.count)
                  : minHeight
              }
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
          yAxisTitle={"Persons per square mile"}
        />

        <AxisBarBottom
          chartHeight={chartHeight}
          chartWidth={chartWidth}
          tickWidth={5}
          xScale={xScale}
          types={data.map(a => a.type)}
          onBarSelect={onBarSelect}
          tiltXLabels={tiltXLabels}
          xAxisTitle={"County"}
        />
      </g>
    </svg>
  );
};
