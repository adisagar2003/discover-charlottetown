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
import ReactModal from "react-modal";
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
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [dynamicUserData, setDynamicUserData] = useState(null);
  // const currentMap = useMap();

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

  // load user data
  const userData = useSelector(state=>state.value);

  // onClick marker 
  const markerClickEvent = (location) => {
    setModalOpen(true);
    setSelectedMarker({latitude: location.geometry.coordinates[0], longitude: location.geometry.coordinates[1], properties: location.properties, id: location.id })
  }

  // visit Location
  const visitLocation = async (location) => {
    await axios.post(`${api}/api/visitLocation`,{
      id: location.id
    }, {withCredentials:true});
    updateDynamicUserData();
    window.location.reload();
  }

  function updateDynamicUserData() {
    axios.get(`${api}/api/user/${userData.user.id}`).then((response)=>{
      console.log(response.data.response);
      setDynamicUserData(response.data.response);
    })
  }
  // rerender the component everytime the dynamic userData changes 
  useEffect(()=>{
    if (userData) {
      updateDynamicUserData();
    }  
  },[modalOpen]);
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
        {selectedMarker && (
          <ReactModal
            isOpen={modalOpen}
            className="place-modal"
          >
            <div className='modal-contents'>
              <div>
                {selectedMarker.properties.name}
              </div>
              <div className='modal-category'>
                {selectedMarker.properties.category}
              </div>
            </div>
            <button className='modal-button close' onClick={()=>setModalOpen(false)}>Close Modal</button>
            {userData && <button className='modal-button' onClick={()=>visitLocation(selectedMarker)}>Mark as visited</button>}
          </ReactModal>
        )}

        {locations.map((location) => {        
            if (!dynamicUserData) return <Marker  id={location} color='cyan' onClick={()=>markerClickEvent(location)} longitude={location.geometry.coordinates[0]} latitude={location.geometry.coordinates[1]} anchor='bottom' />
            if (!dynamicUserData.locations) return <Marker  id={location} color='blue' onClick={()=>markerClickEvent(location)} longitude={location.geometry.coordinates[0]} latitude={location.geometry.coordinates[1]} anchor='bottom' />
            if (dynamicUserData.locations.includes(location.id)) return (<Marker  id={location} color='green' onClick={()=>markerClickEvent(location)} longitude={location.geometry.coordinates[0]} latitude={location.geometry.coordinates[1]} anchor='bottom' />)
            return <Marker id={location}  color='cyan' onClick={()=>markerClickEvent(location)} longitude={location.geometry.coordinates[0]} latitude={location.geometry.coordinates[1]} anchor='top' >
            </Marker>
          })}      
        </Map>
     
      </div>
    </div>
  )
}