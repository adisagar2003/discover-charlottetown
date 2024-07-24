/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Map, useMap } from '@vis.gl/react-google-maps'
import { useEffect, useMemo, useState } from 'react';
import {GoogleMapsOverlay as DeckOverlay} from "@deck.gl/google-maps";
import {  GeoJsonLayer } from 'deck.gl';
  import axios from 'axios';
import api from '../utils/api';

export default function MapComponent() {

  const [loading] = useState(true);
  const [locations, setLocations] = useState([]);
  const [geojs, setGeojs] = useState({});
  // Problem, doesn't populate
  // Solution: Reload the map after a timer
  
  // fetch locations from db.
  useEffect(()=>{

    axios.get(`${api}/api/locationMap/20`).then((res)=>{
      setLocations(res.data.data);
      console.log(locations);
    });

  }, []);

  useEffect(()=>{
    console.log(locations);
    setGeojs({
      "type": "FeatureCollection",
      "features": locations
    });
    
  },[locations]);

  // make a geojson file clone for this
  
  function DeckGLOverlay(props) {
    const map = useMap();
    const overlay = useMemo(() => new DeckOverlay(props),[]);

    useEffect(() => {
      overlay.setMap(map);
      return () => overlay.setMap(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map, loading, geojs]);
  
    overlay.setProps(props);
    return null;
  }


  const layers = [
    new GeoJsonLayer({
      id: 'locations',
      data: geojs,
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
              defaultZoom={14}
              >
                <DeckGLOverlay  layers={layers}  />
            </Map>
            
        </div>
    </div>
  )
}