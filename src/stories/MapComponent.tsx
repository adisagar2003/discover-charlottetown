/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Map, useMap } from '@vis.gl/react-google-maps'
import { useEffect, useMemo, useState } from 'react';
import {GoogleMapsOverlay as DeckOverlay} from "@deck.gl/google-maps";
import {  GeoJsonLayer } from 'deck.gl';
import TownData from "../data/places.json";

export default function MapComponent() {

  const [, setIsLoading] = useState(true);

  // Problem, doesn't populate
  // Solution: Reload the map after a timer
  useEffect(()=>{
    setTimeout( () => {
      setIsLoading(false);
    }, 1000);
  },[]);

  function DeckGLOverlay(props) {
    const map = useMap();
    const overlay = useMemo(() => new DeckOverlay(props),[]);
    useEffect(() => {
      overlay.setMap(map);
      return () => overlay.setMap(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map]);
  
    overlay.setProps(props);
    return null;
  }

  const LOCATIONS = TownData;

  const layers = [
    new GeoJsonLayer({
      id: 'airports',
      data: LOCATIONS,
      // Styles
      filled: true,
      pointRadiusMinPixels: 2,
      pointRadiusScale: 6,
      getPointRadius: f => 11 - f.properties.scalerank,
      getFillColor: [200, 0, 80, 200],
      // Interactive props
      pickable: true,
      autoHighlight: true,
    })
  ];

  return (
    <div className='map-layout'>
        <div className='map'>
          <Map
              style={{width: '900px', height: '500px'}}
              defaultCenter={{lat: 46.23472677168374, lng: -63.134519289778176}}
              defaultZoom={8}
              >
                <DeckGLOverlay  layers={layers}  />
            </Map>
            
        </div>
    </div>
  )
}