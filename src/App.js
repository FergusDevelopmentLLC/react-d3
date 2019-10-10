import React, { useState } from "react";
import { MapboxGLMap } from "./Components/Map/MapboxGLMap";
import { BarPlot } from "./Components/BarPlot/BarPlot";
import { ScatterPlot } from "./Components/ScatterPlot/ScatterPlot";
import { oregon_county_pop_data } from "./Data/data";
import { oregon_county_pop_geo_data } from "./Data/data";
import { test_scatter_data } from "./Data/data";

const color_breaks = () => {
  
  const alpha = 0.65;
  
  const colorBreaks = [
    { rgb: [255, 255, 255, 0], break: 0 },
    { rgb: [161, 217, 155, alpha], break: 25 },
    { rgb: [116, 196, 118, alpha], break: 90 },
    { rgb: [65, 171, 93, alpha], break: 150 },
    { rgb: [35, 139, 69, alpha], break: 300 },
    { rgb: [0, 90, 50, alpha], break: 850 }
  ];

  return colorBreaks;

}

export const App = () => {
  
  const [selectedId, setSelectedId] = useState(null);
  
  console.log('selectedId', selectedId)

  return (
    <div>
      <div>
        <MapboxGLMap
          data={oregon_county_pop_geo_data()}
          selectedId={selectedId}
          colorBreaks={color_breaks()}
        />
      </div>
      <div>
        <BarPlot
          data={oregon_county_pop_data()}
          svgWidth={450}
          svgHeight={275}
          itemDelay={150}
          onSelectItem={setSelectedId}
          colorBreaks={color_breaks()}
          tiltXLabels={true}
          visualizationTitle="Oregon Counties Population Density"
          leftAxisTitle="Persons Per Square Mile"
          bottomAxisTitle="County"
        />
      </div>
      <div>
        <ScatterPlot
          data={test_scatter_data()}
          svgWidth={450}
          svgHeight={275}
          itemDelay={5}
          dotRadius={2}
          dotColor={'rgba(0,0,0,1)'}
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
