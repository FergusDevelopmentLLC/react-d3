import React, { useState } from 'react';
import { BarPlot } from '../BarPlot/BarPlot';
import { get_oregon_county_pop } from '../../Data/data';
import { get_oregon_county_pop_geo } from '../../Data/data';
import MapboxGLMap from '../Map/MapboxGLMap';

export const App = () => {

  const [selectedBarId, setSelectedBarId] = useState(null);

  return (
    <div>
      <div>
        <BarPlot
          data={get_oregon_county_pop()}
          svgWidth={960/2}
          svgHeight={460/1.75}
          fireDelay={25}
          onBarSelect={setSelectedBarId}
          tiltXLabels={true}
        />
        <MapboxGLMap 
          data={get_oregon_county_pop_geo()}
          selectedBarId={selectedBarId}
        />
      </div>
    </div>
  )
}