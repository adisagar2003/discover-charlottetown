/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Map, useMap } from '@vis.gl/react-google-maps'
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import api from '../utils/api';
import { DeckProps } from '@deck.gl/core';
import {GoogleMapsOverlay} from "@deck.gl/google-maps";
import { GeoJsonLayer } from 'deck.gl';

function DeckGLOverlay(props: DeckProps) {
  const map = useMap();
  const overlay = useMemo(() => new GoogleMapsOverlay(props));

  // set the overlays
  useEffect(() => {
    if (!overlay) return null;
    overlay.setMap(map);    
    overlay.setProps(props);  
  }, [map]);

  return null;
}


export default function MapComponent() {

  const [locations, setLocations] = useState([]);
  
  useEffect(()=>{
    axios.get(`${api}/api/locationMap/20`).then((res)=>{
      setLocations(res.data.data);
    });
  }, []); 

  
  const layers = [
    new GeoJsonLayer({
      id: 'GeoJsonLayer ',
      data: locations,
      stroked: true,
      filled: true,
      pointType: 'circle',
      pickable: true,
  
      getFillColor: [160, 160, 180, 200],
      getLineColor: (f: Feature<Geometry, PropertiesType>) => {
        const hex = f.properties.color;
        // convert to RGB
        return hex ? hex.match(/[0-9a-f]{2}/g).map(x => parseInt(x, 16)) : [0, 0, 0];
      },
      getText: (f: Feature<Geometry, PropertiesType>) => f.properties.name,
      getLineWidth: 1,
      getPointRadius: 10,
      getTextSize: 12

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
              <DeckGLOverlay interleaved={false} layers={layers} />
          </Map>
        </div>
    </div>
  )
}