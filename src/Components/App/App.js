import React, { useState } from 'react';
import { ScatterPlot } from '../ScatterPlot/ScatterPlot';
import { BarPlot } from '../BarPlot/BarPlot';
import { scatterData } from '../../Data/data';
import { scatterDataNoEffect } from '../../Data/data';
import { barData } from '../../Data/data';
import { get_oregon_county_pop } from '../../Data/data';

export const App = () => {

  const [selectedBarId, setSelectedBarId] = useState(null);

  return (
    <div>
      
      {/* <div>
        <ScatterPlot
          data={scatterData()}
          svgWidth={960 / 2}
          svgHeight={460 / 2}
          fireDelay={1}
          dotRadius={1}
        />
      </div> */}

      <div>
        <BarPlot
          data={get_oregon_county_pop()}
          svgWidth={960/1.5}
          svgHeight={460/1.5}
          fireDelay={25}
          onBarSelect={setSelectedBarId}
          tiltXLabels={true}
        />
      </div>
      <div>{selectedBarId}</div>
    </div>
  )
}