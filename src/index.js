import React from 'react';
import ReactDOM from 'react-dom';
import { ScatterPlot } from './ScatterPlot';
import { BarPlot } from './BarPlot';

import { scatterData } from './Data';
import { barData } from './Data';

const App = () => {
  return (
    <div>
      <div>
        <ScatterPlot
          data={scatterData()}
          svgWidth={960 / 2}
          svgHeight={460 / 2}
          fireDelay={1}
          dotRadius={1}
        />
      </div>
      
      <div>
        <BarPlot
          data={barData()}
          svgWidth={960 / 2}
          svgHeight={460 / 2}
          fireDelay={25}
        />
      </div>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)