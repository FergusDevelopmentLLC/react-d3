import React from "react";
export const AxisLeft = ({ 
    yScale, 
    chartHeight, 
    chartWidth, 
    tickWidth 
  }) => {
    return (
      <g>
        <g>
          <line
            x1="0"
            y1="0"
            x2="0"
            y2={chartHeight}
            stroke="#000000"
          />
        </g>
        {yScale.ticks().map(tickValue => (
          <g className="tick" transform={`translate(0,${yScale(tickValue)})`} key={`g${tickValue}`}>
            <line
              key={`line${tickValue}`}
              x1={-tickWidth}
              y1={0}
              x2={0}
              y2={0}
              stroke="#000000"
            />
            <text
              key={tickValue}
              style={{ textAnchor: 'end' }}
              x={-tickWidth}
              dy="4"
              dx="-3"
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
  