import React, { useState } from "react";
import { BarPlot } from "../BarPlot/BarPlot";
import { ScatterPlot } from "../ScatterPlot/ScatterPlot";
import { oregon_county_pop_data } from "../../Data/data";
import { oregon_county_pop_geo_data } from "../../Data/data";
import { test_scatter_data } from "../../Data/data";
import MapboxGLMap from "../Map/MapboxGLMap";

export const App = () => {
  
  const alpha = 0.65;
  
  const colorBreaks = [
    { rgb: [255, 255, 255, 0], break: 0 },
    { rgb: [161, 217, 155, alpha], break: 25 },
    { rgb: [116, 196, 118, alpha], break: 90 },
    { rgb: [65, 171, 93, alpha], break: 150 },
    { rgb: [35, 139, 69, alpha], break: 300 },
    { rgb: [0, 90, 50, alpha], break: 850 }
  ];

  const [selectedId, setSelectedId] = useState(null);
  
  //console.log('selectedId', selectedId)

  return (
    <div>
      <div>
        <MapboxGLMap
          data={oregon_county_pop_geo_data()}
          selectedId={selectedId}
          colorBreaks={colorBreaks}
        />
      </div>
      <div>
        <BarPlot
          data={oregon_county_pop_data()}
          svgWidth={450}
          svgHeight={275}
          fireDelay={150}
          onBarSelect={setSelectedId}
          colorBreaks={colorBreaks}
          tiltXLabels={true}
        />
      </div>
      <div>
        <ScatterPlot
          data={test_scatter_data()}
          svgWidth={450}
          svgHeight={275}
          itemDelay={5}
          dotRadius={1}
          onSelectItem={setSelectedId}
          tiltXLabels={false}
          visualizationTitle="ScatterPlot Test"
          leftAxisTitle="Custom Left Axis Label"
          bottomAxisTitle="Custom Bottom Axis Label"
        />
      </div>
    </div>
  );
};
