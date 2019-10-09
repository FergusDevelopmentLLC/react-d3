import React from "react";
export const AxisBottom = ({
  xScale,
  chartHeight,
  chartWidth,
  xAxisTitle,
  tiltXLabels = false
}) => {
  return (
    <g>
      <g>
        <line x1="0" y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="#000000"
        />
      </g>
      {
        xScale.ticks().map(tickValue => (
          <g
            key={tickValue}
            transform={`translate(${xScale(tickValue)},${chartHeight})`}
          >
            <line
              key={`line${tickValue}`}
              x1={0}
              y1={0}
              x2={0}
              y2={5}
              stroke='#000000'
            />
            {
              tiltXLabels && tickValue > 0 
              ? 
              (
                <text
                  transform='rotate(45, -5, 12)'
                  style={{ textAnchor: 'start' }}
                  y={12}
                  x={-5}
                  fontFamily='Arial, Helvetica, sans-serif'
                  fontSize={chartWidth * 0.025}
                  >
                  {tickValue}
                </text>
              ) 
              : 
              (
                <text
                  style={{ textAnchor: 'middle' }}
                  y={15}
                  fontFamily='Arial, Helvetica, sans-serif'
                  fontSize={chartWidth * 0.0251}
                  >
                  {tickValue}
                </text>
              )
            }
          </g>
        ))
      }
      <g>
        <text
          style={{ textAnchor: 'middle' }}
          fontFamily='Arial, Helvetica, sans-serif'
          fontSize={chartWidth * 0.030}
          x={chartWidth / 2}
          y={chartHeight + (chartHeight * 0.23)}
          >
          {xAxisTitle}
        </text>
      </g>
    </g>
  );
};
