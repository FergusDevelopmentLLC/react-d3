import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const styles = {
  width: "calc(100vw - 500px)",
  height: "100vh",
  top:0,
  left:"500px",
  position: "absolute"
};

const MapboxGLMap = ({data, selectedBarId}) => {

  const hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  
  useEffect(() => {
    
    const initializeMap = ({ setMap, mapContainer }) => {

      // get bounding box: http://bboxfinder.com
      let mapBounds = [-125.211182,41.713930,-115.927734,46.5437501];//Southwest corner, Northeast corner

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
        center: [(mapBounds[0] + mapBounds[2]) / 2, (mapBounds[1] + mapBounds[3]) / 2],
        zoom: 6.6
      });

      map.on("load", () => {

        setMap(map);
        
        map.resize();

        map.addSource('counties', {
          type: 'geojson',
          data
        });
        map.addLayer({
          id: 'counties-solid-fill',
          source: 'counties',
          type: 'fill',
          paint: {
            'fill-color':  [
              "interpolate",
              ["linear"],
              ["get", "popsqmi"],
              0, `rgba(${hexToRgb('#ffffff').r},${hexToRgb('#ffffff').g},${hexToRgb('#ffffff').b},0)`,
              120, `rgba(${hexToRgb('#fa9fb5').r},${hexToRgb('#fa9fb5').g},${hexToRgb('#fa9fb5').b},.7)`,
              1883.18451322655, `rgba(${hexToRgb('#7a0177').r},${hexToRgb('#7a0177').g},${hexToRgb('#7a0177').b},.8)`
              ]
          }
        });

        map.addLayer({
          id: 'counties-fill',
          source: 'counties',
          type: 'fill',
          paint: {
            'fill-color': 'rgba(0,0,0,0)'
          }
        });
        
        map.addLayer({
          id: 'counties',
          source: 'counties',
          type: 'line',
          paint: {
            'line-color': 'gray'
          }
        });

      });
    };

    if (!map) {
      initializeMap({ setMap, mapContainer });
    }

    if(map) {
      if(selectedBarId) {
        map.setPaintProperty('counties-fill', 'fill-color', [
          'case',
          ['==', ['get', 'geoid'], selectedBarId],
          '#b84e95',
          'rgba(0,0,0,0)'
        ]);
      }
      else {
        map.setPaintProperty('counties-fill', 'fill-color', 'rgba(0,0,0,0)');
      }
    }

  }, [map, selectedBarId]);

  return <div ref={el => (mapContainer.current = el)} style={styles} />;
};

export default MapboxGLMap;
