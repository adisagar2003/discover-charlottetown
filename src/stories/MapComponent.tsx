/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import api from '../utils/api';
import Map, { Marker, Popup } from 'react-map-gl/maplibre';
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
  const [showPopup, setShowPopup] = useState<boolean>(true);
  const [popupLatitude, setPopupLocation] = useState([46.235177898487095,-63.12670440273208]);
  const mapRef = useRef<MapRef>();
  const popupRef = useRef();
  // const currentMap = useMap();
  useEffect(()=>{
    axios.get(`${api}/api/locationMap/20`).then((res)=>{
      setLocations(res.data.data);      
      console.log(userData.user.locations);
    });
  }, []); 

  useEffect(()=>{
    console.log(popupLatitude);
    console.log(popupRef);
  },[popupLatitude]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const INITIAL_VIEW_STATE={
    latitude: 46.235177898487095,
    longitude: -63.12670440273208,
    zoom: 14
  }

  // load user data
  const userData = useSelector(state=>state.value);
  
  // clicking marker 

  const onClickMarker = useCallback((location) =>{
      setPopupLocation([location.geometry.coordinates[1],location.geometry.coordinates[0]]);
  },[]);

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
            if (!userData) return <Marker color='cyan' onClick={()=>onClickMarker(location)} longitude={location.geometry.coordinates[0]} latitude={location.geometry.coordinates[1]} anchor='bottom' />
            if (!userData.user.locations) return <Marker color='blue' onClick={()=>onClickMarker(location)} longitude={location.geometry.coordinates[0]} latitude={location.geometry.coordinates[1]} anchor='bottom' />
            if (userData.user.locations.includes(location.id)) return (<Marker color='green' onClick={()=>onClickMarker(location)} longitude={location.geometry.coordinates[0]} latitude={location.geometry.coordinates[1]} anchor='bottom' />)
            return <Marker color='cyan' onClick={()=>onClickMarker(location)} longitude={location.geometry.coordinates[0]} latitude={location.geometry.coordinates[1]} anchor='bottom' />
          })}        
          {showPopup && <Popup ref={popupRef} longitude={popupLatitude[1]} latitude={popupLatitude[0]}
            anchor="top"
            onClose={() => setShowPopup(true)}>
            You are here
          </Popup>}
        </Map>
     
      </div>
    </div>
  )
}