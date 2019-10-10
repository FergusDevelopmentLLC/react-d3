import React, { useState } from "react";
import { MapboxGLMap } from "./Components/Map/MapboxGLMap";
import { BarPlot } from "./Components/BarPlot/BarPlot";
import { oregon_county_pop_data } from "./Data/data";
import { oregon_county_pop_geo_data } from "./Data/data";
import { color_breaks } from "./Data/data";

export const App = () => {

  const [selectedId, setSelectedId] = useState(null);
  
  console.log('selectedId', selectedId)

  return (
    <div>
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
        <MapboxGLMap
          data={oregon_county_pop_geo_data()}
          selectedId={selectedId}
          colorBreaks={color_breaks()}
        />
      </div>
    </div>
  )
}