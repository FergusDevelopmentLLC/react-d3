import React, { useState } from "react";
import { MapboxGLMap } from "./Components/Map/MapboxGLMap";
import { BarPlot } from "./Components/BarPlot/BarPlot";
import { oregon_county_pop_data } from "./Data/data";
import { oregon_county_pop_geo_data } from "./Data/data";
import { color_breaks } from "./Data/data";

export const App = () => {

  const [selectedId, setSelectedId] = useState(null)
  
  console.log('selectedId', selectedId)

  return (
    <div>
      <div>
        <BarPlot
          data={oregon_county_pop_data()}
          svgWidth={450}
          svgHeight={275}
          itemDelay={200}
          onSelectItem={setSelectedId}
          colorBreaks={color_breaks()}
          highlightLineColor={{ rgba: [255, 102, 0, 1] }}
          tiltXLabels={true}
          visualizationTitle="Oregon Counties Population Density"
          leftAxisTitle="Persons Per Square Mile"
          bottomAxisTitle="County"
        />
      </div>
      <div>
        <MapboxGLMap
          data={oregon_county_pop_geo_data()}
          colorBreaks={color_breaks()}
          highlightLineColor={{ rgba: [255, 102, 0, 1] }}
          coordinates={[-119.846, 43.862]}
          zoom={6}
          selectedId={selectedId}
        />
      </div>
    </div>
  )
}