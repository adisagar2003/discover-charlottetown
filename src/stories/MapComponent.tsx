/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../utils/api';
import DeckGL from '@deck.gl/react';
import {MapboxOverlay} from '@deck.gl/mapbox';
import {  Deck, GeoJsonLayer, log } from 'deck.gl';
import Map, { useControl } from 'react-map-gl/maplibre';

// function DeckGLOverlay(props: DeckProps) {
//   const map = useMap();
//   const overlay = useMemo(() => new GoogleMapsOverlay(props));

//   // set the overlays
//   useEffect(() => {
//     if (!overlay) return null;
//     overlay.setMap(map);    
//     overlay.setProps(props);  
//   }, [map]);

//   return null;
// }


export default function MapComponent() {

  const [locations, setLocations] = useState([]);
  const [hoverInfo, setHoverInfo] = useState({});

  useEffect(()=>{
    axios.get(`${api}/api/locationMap/20`).then((res)=>{
      setLocations(res.data.data);      
    });
  }, []); 

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const INITIAL_VIEW_STATE={
    latitude: 46.235177898487095,
    longitude: -63.12670440273208,
    zoom: 14
  }

  function DeckGLOverlay(props: DeckProps) {
    const overlay = useControl(() => new MapboxOverlay(props));
    overlay.setProps(props);
    return null;
  }

  const LAYERS = [
    new GeoJsonLayer<BlockProperties>({
      id: 'GeoJsonLayer',
    data: locations,

    stroked: false,
    filled: true,
    pointType: 'circle+text',
    pickable: true,

    getFillColor: [160, 160, 180, 200],
    getLineColor: (f: Feature<Geometry, PropertiesType>) => {
      const hex = f.properties.color;
      // convert to RGB
      return hex ? hex.match(/[0-9a-f]{2}/g).map(x => parseInt(x, 16)) : [0, 0, 0];
    },
    getText: (f: Feature<Geometry, PropertiesType>) => f.properties.name,
    getLineWidth: 20,
    getPointRadius: 4,
    getTextSize: 12
    })
  ];

 

  return (
    <div className='map-layout'>  
      <div className="map">
       
         <Map 
          reuseMaps
          initialViewState={INITIAL_VIEW_STATE}
          style={{width: 600, height: 400}}
          mapStyle="https://api.maptiler.com/maps/streets/style.json?key=MOTv2gvrmXi0GVdMgKRq	"
        >
          <DeckGLOverlay layers={LAYERS} interleaved={false} />
        </Map>
     
      </div>
    </div>
  )
}