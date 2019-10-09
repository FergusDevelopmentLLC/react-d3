import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

//width: "calc(100vw - 500px)",
const styles = {
  width: "100vw",
  height: "100vh",
  top: 0,
  left: 0,
  position: "absolute"
};

const MapboxGLMap = ({
  data,
  selectedId,
  colorBreaks,
  highlightColor = 'rgb(255,102,0)'
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
        center: [-118.00524865661339, 44.11285727537202],
        zoom: 6.095537544838289
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
            'line-color': highlightColor,
            'line-width': 4,
            'line-dasharray': [1,1]
          }
        });
        
        map.on('moveend', () => {
          console.log(map.getZoom())
          console.log(map.getCenter())
        })

      });
    };

    if (!map) {
      initializeMap({ setMap, mapContainer });
    }

    if(map) {
      if (selectedId) {
        map.setPaintProperty('county-highlight', 'line-color', [
          'case',
          ['==', ['get', 'geoid'], selectedId],
          highlightColor,
          'rgba(0,0,0,0)'
        ])
      }
      else {
        map.setPaintProperty('county-highlight', 'line-color', 'rgba(0,0,0,0)');
      }
    }

  }, [map, selectedId]);

  return <div ref={el => (mapContainer.current = el)} style={styles} />;
};


export default MapboxGLMap;
