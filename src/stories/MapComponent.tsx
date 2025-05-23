/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useEffect, useState, useRef, useReducer } from 'react';
import axios from 'axios';
import api from '../utils/api';
import Map, { Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useSelector } from 'react-redux';
import type {MapRef} from 'react-map-gl/maplibre';
import ReactModal from "react-modal";

export default function MapComponent() {

  const [locations, setLocations] = useState([]);
  const mapRef = useRef<MapRef>();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [dynamicUserData, setDynamicUserData] = useState(null);
  const [dynamicDataLoaded, setDynamicDataLoaded] = useState(false);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  
  useEffect(()=>{
    axios.get(`${api}/api/locationMap/20`).then((res)=>{
      if (res.data.data) {
        setLocations(res.data.data);      
      }
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

  const markerClickEvent = (location) => {
    setModalOpen(true);
    setSelectedMarker({latitude: location.geometry.coordinates[0], longitude: location.geometry.coordinates[1], properties: location.properties, id: location.id })
  }

  const visitLocation = async (location) => {
    try {
      await axios.post(`${api}/api/visitLocation`,{
        id: location.id
      }, {withCredentials:true});    
      window.location.reload();
    }
    catch(err) {
      updateDynamicUserData();
      console.log(err)  ;
      
      if (err.response.status == 300) {
        alert('Already visited location');
      } 
    }

  }

  function updateDynamicUserData() {
    axios.get(`${api}/api/user/${userData.user.id}`).then((response)=>{
      setDynamicUserData(response.data.response);
      console.log(response.data.response);
      
    })
  }
  
  // rerender the component everytime the dynamic userData changes 
  useEffect(()=>{
    if (userData) {
      updateDynamicUserData();
      forceUpdate();
      setDynamicDataLoaded(true);
    }
  }, []);

  function DynamicMapComponent() {
    return (
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

        {locations && locations.map((location) => {   
          // markers should paint themselves when dynamic data is loaded.

            if (!userData) return <Marker  id={location} color='cyan' onClick={()=>markerClickEvent(location)} longitude={location.geometry.coordinates[0]} latitude={location.geometry.coordinates[1]} anchor='bottom' />
            if (dynamicDataLoaded) {
              if (!dynamicUserData?.locations) return <Marker  id={location} color='blue' onClick={()=>markerClickEvent(location)} longitude={location.geometry.coordinates[0]} latitude={location.geometry.coordinates[1]} anchor='bottom' />
              if (dynamicUserData?.locations.includes(location.id)) return (<Marker  id={location} color='green' onClick={()=>markerClickEvent(location)} longitude={location.geometry.coordinates[0]} latitude={location.geometry.coordinates[1]} anchor='bottom' />)
              return <Marker id={location}  color='cyan' onClick={()=>markerClickEvent(location)} longitude={location.geometry.coordinates[0]} latitude={location.geometry.coordinates[1]} anchor='top' >
              </Marker>
            }   
          })}      
        </Map>
    )
  }

  function NonDynamicMapComponent() {
    return (
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

        {locations && locations.map((location) => {   
          // markers should paint themselves when dynamic data is loaded.
          return <Marker  id={location} color='cyan' onClick={()=>markerClickEvent(location)} longitude={location.geometry.coordinates[0]} latitude={location.geometry.coordinates[1]} anchor='bottom' />
          })}      
        </Map>
    )
  }

  return (
    <div className='map-layout'>  
      <div className="map">
        {
          dynamicUserData ?

          <DynamicMapComponent />
          :
          <NonDynamicMapComponent />
        }
         {/* <Map
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
                {JSON.stringify(selectedMarker)}
              </div>
            </div>
            <button className='modal-button close' onClick={()=>setModalOpen(false)}>Close Modal</button>
            {userData && <button className='modal-button' onClick={()=>visitLocation(selectedMarker)}>Mark as visited</button>}
          </ReactModal>
        )}

        {locations && locations.map((location) => {   
          // markers should paint themselves when dynamic data is loaded.

            if (!userData) return <Marker  id={location} color='cyan' onClick={()=>markerClickEvent(location)} longitude={location.geometry.coordinates[0]} latitude={location.geometry.coordinates[1]} anchor='bottom' />
            if (dynamicDataLoaded) {
              if (!dynamicUserData?.locations) return <Marker  id={location} color='blue' onClick={()=>markerClickEvent(location)} longitude={location.geometry.coordinates[0]} latitude={location.geometry.coordinates[1]} anchor='bottom' />
              if (dynamicUserData?.locations.includes(location.id)) return (<Marker  id={location} color='green' onClick={()=>markerClickEvent(location)} longitude={location.geometry.coordinates[0]} latitude={location.geometry.coordinates[1]} anchor='bottom' />)
              return <Marker id={location}  color='cyan' onClick={()=>markerClickEvent(location)} longitude={location.geometry.coordinates[0]} latitude={location.geometry.coordinates[1]} anchor='top' >
              </Marker>
            }   
          })}      
        </Map> */}
     
      </div>
    </div>
  )
}