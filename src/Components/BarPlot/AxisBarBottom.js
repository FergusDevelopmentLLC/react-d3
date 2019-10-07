import React from "react";
export const AxisBarBottom = ({
    xScale,
    chartHeight,
    chartWidth,
    types,
    tiltXLabels = false,
    xAxisTitle = "title"
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
                  transform="rotate(45, -5, 10)"
                  style={{ textAnchor: 'start' }}
                  y={10}
                  x={-5}
                  fontFamily="Arial, Helvetica, sans-serif"
                  fontSize={chartWidth * .03}
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
      <g>
        <text
          style={{ textAnchor: 'middle' }}
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize={chartWidth * .035}
          x={(chartWidth / 2)}
          y={(chartHeight + 55)}
          >
            {xAxisTitle}
          </text>
      </g>
      </g>
      
    );
  };
  