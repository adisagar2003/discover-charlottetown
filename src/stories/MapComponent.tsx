/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Map, useMap } from '@vis.gl/react-google-maps'
import { useEffect, useMemo } from 'react';
import {GoogleMapsOverlay as DeckOverlay} from "@deck.gl/google-maps";
import { ArcLayer, GeoJsonLayer } from 'deck.gl';

export default function MapComponent() {

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
  const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';
  const layers = [
    new GeoJsonLayer({
      id: 'airports',
      data: AIR_PORTS,
      // Styles
      filled: true,
      pointRadiusMinPixels: 2,
      pointRadiusScale: 20,
      getPointRadius: f => 11 - f.properties.scalerank,
      getFillColor: [200, 0, 80, 200],
      // Interactive props
      pickable: true,
      autoHighlight: true,
    }),
    new ArcLayer({
      id: 'arcs',
      data: AIR_PORTS,
      dataTransform: d => d.features.filter(f => f.properties.scalerank < 4),
      // Styles
      getSourcePosition: () => [-0.4531566, 51.4709959], // London
      getTargetPosition: f => f.geometry.coordinates,
      getSourceColor: [0, 128, 200],
      getTargetColor: [200, 0, 80],
      getWidth: 1
    })
  ];

  return (
    <div className='map-layout'>
        <div className='map'>
            <Map
              style={{width: '900px', height: '500px'}}
              defaultCenter={{lat: 46.23472677168374, lng: -63.134519289778176}}
              defaultZoom={15}
              >
                <DeckGLOverlay layers={layers}  />
            </Map>
        </div>
    </div>
  )
}