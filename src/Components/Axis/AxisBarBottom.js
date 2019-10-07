import React from "react";
export const AxisBarBottom = ({
    xScale,
    chartHeight,
    chartWidth,
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
                y2={chartWidth * .012}
                stroke="#000000"
              />
              {
                tiltXLabels
                ?
                <text
                  transform="rotate(45)"
                  style={{ textAnchor: 'start' }}
                  y={12}
                  x={0}
                  fontFamily="Arial, Helvetica, sans-serif"
                  fontSize={chartWidth * .023}
                >
                  {type}
                </text>
                :
                <text
                  style={{ textAnchor: 'middle' }}
                  y={(chartWidth * .04)}
                  fontFamily="Arial, Helvetica, sans-serif"
                  fontSize={chartWidth * .025}
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
  