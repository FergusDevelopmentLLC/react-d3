import React from "react";
export const AxisBottom = ({
    xScale,
    chartHeight,
    chartWidth,
    tickWidth
  }) => {
    return (
      <g>
        <g>
          <line
            x1="0"
            y1={chartHeight}
            x2={chartWidth}
            y2={chartHeight}
            stroke="#000000"
          />
        </g>
        {xScale.ticks().map(tickValue => (
          <g
            className="tick"
            key={tickValue}
            transform={`translate(${xScale(tickValue)},${chartHeight})`}
          >
            <line
              key={`line${tickValue}`}
              x1={0}
              y1={0}
              x2={0}
              y2={tickWidth}
              stroke="#000000"
            />
            <text
              style={{ textAnchor: 'middle' }}
              y={tickWidth + 10}
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="10"
            >
              {tickValue.toLocaleString()}
            </text>
          </g>
        ))}
      </g>
    );
  };
  