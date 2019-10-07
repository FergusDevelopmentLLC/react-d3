import React, { useState } from 'react';
import { BarPlot } from '../BarPlot/BarPlot';
import { get_oregon_county_pop } from '../../Data/data';
import { get_oregon_county_pop_geo } from '../../Data/data';
import MapboxGLMap from '../Map/MapboxGLMap';

export const App = () => {

  const alpha = 0.6;
  const colorBreaks = [
    {'rgb':[229,245,224,alpha],'break': 0},
    {'rgb':[199,233,192,alpha],'break': 25},
    {'rgb':[161,217,155,alpha],'break': 90},
    {'rgb':[116,196,118,alpha],'break': 150},
    {'rgb':[65,171,93,alpha],'break': 300},
    {'rgb':[35,139,69,alpha],'break': 850}
  ]

  const [selectedBarId, setSelectedBarId] = useState(null)
  
  return (
    <div>
      <div>
        <MapboxGLMap 
          data={get_oregon_county_pop_geo()}
          selectedBarId={selectedBarId}
          colorBreaks={colorBreaks}
        />
      </div>
      <div>
        <BarPlot
          data={get_oregon_county_pop()}
          svgWidth={400}
          svgHeight={275}
          fireDelay={50}
          onBarSelect={setSelectedBarId}
          colorBreaks={colorBreaks}
          tiltXLabels={true}
        />
      </div>
    </div>
  )
}