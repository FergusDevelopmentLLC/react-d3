import React, { useState } from 'react';
import { BarPlot } from '../BarPlot/BarPlot';
import { get_oregon_county_pop } from '../../Data/data';
import { get_oregon_county_pop_geo } from '../../Data/data';
import MapboxGLMap from '../Map/MapboxGLMap';

export const App = () => {

  const colorBreaks = [
    {
      'rgb':[229,245,224,.7],
      'break': 0
    },
    {
      'rgb':[199,233,192,.7],
      'break': 25
    },
    {
      'rgb':[161,217,155,.7],
      'break': 90
    },
    {
      'rgb':[116,196,118,.7],
      'break': 150
    },
    {
      'rgb':[65,171,93,.7],
      'break': 300
    },
    {
      'rgb':[35,139,69,.7],
      'break': 850
    }
  ]

  const [selectedBarId, setSelectedBarId] = useState(null)
  
  return (
    <div>
      <div>
        <BarPlot
          data={get_oregon_county_pop()}
          svgWidth={960/2}
          svgHeight={460/1.75}
          fireDelay={25}
          onBarSelect={setSelectedBarId}
          colorBreaks={colorBreaks}
          tiltXLabels={true}
        />
        <MapboxGLMap 
          data={get_oregon_county_pop_geo()}
          selectedBarId={selectedBarId}
          colorBreaks={colorBreaks}
        />
      </div>
    </div>
  )
}