import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const styles = {
  width: "100vw",//https://itnext.io/viewport-units-the-css-you-didnt-know-about-but-should-24b104483429
  height: "100vh",
  top: 0,
  left: 0,
  position: "absolute"
}

const initializeMap = ({ setMap, mapContainer, data, colorBreaks, aoiOutlineColor, highlightColor }) => {

  mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsbGNhcnRlciIsImEiOiJjamV4b2g3Z2ExOGF4MzFwN3R1dHJ3d2J4In0.Ti-hnuBH8W4bHn7k6GCpGw'
  
  const mapboxGlMap = new mapboxgl.Map({
    container: mapContainer.current,
    style: `mapbox://styles/mapbox/light-v10`,
    center: [-119.84663447003527, 43.862206138711855],
    zoom: 5.839203767638953
  })

  mapboxGlMap.addControl(new mapboxgl.NavigationControl())
  mapboxGlMap.addControl(new mapboxgl.FullscreenControl())

  mapboxGlMap.on("load", () => {

    setMap(mapboxGlMap)
    
    mapboxGlMap.resize()

    mapboxGlMap.addSource('aoi', {
      type: 'geojson',
      data
    })

    let fc
    
    if(colorBreaks) {
      fc = []
      fc.push('step')
      fc.push(['get', 'popsqmi'])
      fc.push('rgba(0,0,0,0)')
      for(let colorBreak of colorBreaks) {
        fc.push(colorBreak.break)
        fc.push(`rgba(${colorBreak.rgba[0]}, ${colorBreak.rgba[1]}, ${colorBreak.rgba[2]},${colorBreak.rgba[3]})`)
      }  
    }
    else {
      fc = 'rgba(0,0,0,0)'
    }
    
    mapboxGlMap.addLayer({
      id: 'aoi-solid-fill',
      source: 'aoi',
      type: 'fill',
      paint: {
        'fill-color': fc
      }
    })

    mapboxGlMap.addLayer({
      id: 'aoi',
      source: 'aoi',
      type: 'line',
      paint: {
        'line-color': aoiOutlineColor,
      }
    })

    //lay down a transparent highlight line layer
    //by making alpha = 0
    mapboxGlMap.addLayer({
      id: 'aoi-highlight',
      source: 'aoi',
      type: 'line',
      paint: {
        'line-color': highlightColor.replace(',1)',',0)'),//TODO: hack
        'line-width': 4,
        'line-dasharray': [1,1]
      }
    })

  })
}

export const MapboxGLMap = ({
  data,
  selectedId,
  colorBreaks,
  aoiOutlineColor = 'rgba(175,172,151,1)',
  highlightColor = 'rgba(255,102,0,1)'
}) => {

  
  const mapContainer = useRef(null)
  const [map, setMap] = useState(null)

  useEffect(() => {
    
    if(map) {
      if (selectedId) {
        map.setPaintProperty('aoi-highlight', 'line-color', [
          'case',
          ['==', ['get', 'id'], selectedId],
          highlightColor,
          'rgba(0,0,0,0)'
        ])
      }
      else {
        map.setPaintProperty('aoi-highlight', 'line-color', 'rgba(0,0,0,0)')
      }
    }
    else {
      initializeMap({ setMap, mapContainer, data, colorBreaks, aoiOutlineColor, highlightColor })
    }

  }, [map, selectedId])

  return (
    <div style={styles} ref={mapContainer} />
  )
}  