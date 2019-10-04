import React from "react";
export const AxisBarBottom = ({
    xScale,
    chartHeight,
    chartWidth,
    tickWidth,
    types,
    tiltXLabels = false
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
        <g>
          <line
            x1={chartWidth}
            y1={chartHeight}
            x2={chartWidth}
            y2={chartHeight + tickWidth}
            stroke="#000000"
          />
        </g>
        {
          types.map(type => (
            <g
              className="tick"
              key={type}
              transform={`translate(${xScale(type) + (xScale.bandwidth() / 2)},${chartHeight})`}
            >
              <line
                key={`line${type}`}
                x1={0}
                y1={0}
                x2={0}
                y2={tickWidth}
                stroke="#000000"
              />
              {
                tiltXLabels
                ?
                <text
                  transform="rotate(50)"
                  style={{ textAnchor: 'start' }}
                  y={tickWidth + 7}
                  x={tickWidth - 1}
                  fontFamily="Arial, Helvetica, sans-serif"
                  fontSize="10"
                >
                  {type.toLocaleString()}
                </text>
                :
                <text
                  style={{ textAnchor: 'middle' }}
                  y={tickWidth + 10}
                  fontFamily="Arial, Helvetica, sans-serif"
                  fontSize="10"
                >
                  {type.toLocaleString()}
                </text>

              }
            </g>
          ))
        }
      </g>
    );
  };
  