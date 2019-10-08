import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

//width: "calc(100vw - 500px)",
const styles = {
  width: "100vw",
  height: "100vh",
  top:0,
  left:"0",
  position: "absolute"
};

const MapboxGLMap = ({
  data,
  selectedBarId,
  colorBreaks
}
) => {

  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  
  useEffect(() => {
    
    const initializeMap = ({ setMap, mapContainer }) => {

      mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsbGNhcnRlciIsImEiOiJjamV4b2g3Z2ExOGF4MzFwN3R1dHJ3d2J4In0.Ti-hnuBH8W4bHn7k6GCpGw';
      
      // let basemap = 'basic';
      // let basemap = 'streets';
      // let basemap = 'bright';
      let basemap = 'light';
      //let basemap = 'dark';
      // let basemap = 'satellite';

      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: `mapbox://styles/mapbox/${basemap}-v9`,
        center: [-120.39680257156749, 44.11448794998742],
        zoom: 6.40730998826903
      });

      map.on("load", () => {

        setMap(map);
        
        map.resize();

        map.addSource('counties', {
          type: 'geojson',
          data
        });

        let fc = []
        fc.push('step')
        fc.push(['get', 'popsqmi'])
        fc.push('rgba(0,0,0,0)')
        for(let colorBreak of colorBreaks) {
          fc.push(colorBreak.break)
          fc.push(`rgba(${colorBreak.rgb[0]}, ${colorBreak.rgb[1]}, ${colorBreak.rgb[2]},${colorBreak.rgb[3]})`)
        }
        
        map.addLayer({
          id: 'counties-solid-fill',
          source: 'counties',
          type: 'fill',
          paint: {
            'fill-color': fc
          }
        });

        // layout: {
        //   'line-join': 'round',
        //   'line-round-limit': 5,
        //   'line-miter-limit': 0
        // },

        map.addLayer({
          id: 'counties',
          source: 'counties',
          type: 'line',
          paint: {
            'line-color': '#92887f',
          }
        });

        map.addLayer({
          id: 'county-highlight',
          source: 'counties',
          type: 'line',
          paint: {
            'line-color': 'rgba(255,102,0,0)',
            'line-width': 4,
            'line-dasharray': [1,1]
          }
        });
        
        // map.on('moveend', () => {
        //   console.log(map.getZoom())
        //   console.log(map.getCenter())
        // })

      });
    };

    if (!map) {
      initializeMap({ setMap, mapContainer });
    }

    if(map) {
      if(selectedBarId) {
        map.setPaintProperty('county-highlight', 'line-color', [
          'case',
          ['==', ['get', 'geoid'], selectedBarId],
          'rgba(255,102,0,1)',
          'rgba(0,0,0,0)'
        ]);
      }
      else {
        map.setPaintProperty('county-highlight', 'line-color', 'rgba(0,0,0,0)');
      }
    }

  }, [map, selectedBarId]);

  return <div ref={el => (mapContainer.current = el)} style={styles} />;
};


export default MapboxGLMap;
