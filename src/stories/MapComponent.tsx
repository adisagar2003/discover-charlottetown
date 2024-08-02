/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import api from '../utils/api';
import Map, { Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useSelector } from 'react-redux';
import type {MapRef} from 'react-map-gl/maplibre';


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
  const mapRef = useRef<MapRef>();
  useEffect(()=>{
    axios.get(`${api}/api/locationMap/20`).then((res)=>{
      setLocations(res.data.data);      
      console.log(userData.user.locations)
    });
  }, []); 

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const INITIAL_VIEW_STATE={
    latitude: 46.235177898487095,
    longitude: -63.12670440273208,
    zoom: 14
  }

  // load user data
  const userData = useSelector(state=>state.value);


 

  return (
    <div className='map-layout'>  
      <div className="map">
       
         <Map
          ref={mapRef}
          reuseMaps
          initialViewState={INITIAL_VIEW_STATE}
          style={{width: 600, height: 400}}
          mapStyle="https://api.maptiler.com/maps/streets/style.json?key=MOTv2gvrmXi0GVdMgKRq	"
        >
          {locations.map((location) => {
            if (!userData) return <Marker color='cyan' onClick={()=>console.log(location)} longitude={location.geometry.coordinates[0]} latitude={location.geometry.coordinates[1]} anchor='bottom' />
            if (!userData.user.locations) return <Marker color='blue' onClick={()=>console.log(location)} longitude={location.geometry.coordinates[0]} latitude={location.geometry.coordinates[1]} anchor='bottom' />
      
            
            if (userData.user.locations.includes(location.id)) return (<Marker color='green' onClick={()=>console.log(location)} longitude={location.geometry.coordinates[0]} latitude={location.geometry.coordinates[1]} anchor='bottom' />)
            
            return <Marker color='cyan' onClick={()=>console.log(location)} longitude={location.geometry.coordinates[0]} latitude={location.geometry.coordinates[1]} anchor='bottom' />
            
          })}
        </Map>
     
      </div>
    </div>
  )
}