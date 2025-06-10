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
import { useInView } from 'react-intersection-observer';
import { mapService } from '../services/mapService';


export default function MapComponent() {
  // Add useInView hook
  const { ref: mapContainerRef, inView } = useInView({
    triggerOnce: true, // Only load data once when map becomes visible
    threshold: 0.1,    // Start loading when 10% of map is visible
  });

  const [locations, setLocations] = useState([]);
  const mapRef = useRef<MapRef>();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [dynamicUserData, setDynamicUserData] = useState(null);
  const [dynamicDataLoaded, setDynamicDataLoaded] = useState(false);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  

  
  // Fetch locations
  useEffect(() => {
    if (inView) {
      mapService.getLocations()
        .then(locations => {
          setLocations(locations);
        })
        .catch(error => {
          console.error('Error fetching locations:', error);
          // Handle error (show error message, etc.)
        });
    }
  }, [inView]);

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

  // user specific, user visits location.
  const visitLocation = async (location) => {
    try {
      await mapService.visitLocation(location.id);
      window.location.reload();
    } catch (error) {
      if (error.message === 'Already visited location') {
        alert('Already visited location');
      }
      updateDynamicUserData();
    }
  }

  function updateDynamicUserData() {
    if (!userData?.user?.id) return;
    
    mapService.getUserData(userData.user.id)
      .then(userData => {
        setDynamicUserData(userData);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        // Handle error
      });
  }
  
  // rerender the component everytime the userData visits location or changes 
  useEffect(()=>{
    if (userData) {
      updateDynamicUserData();
      forceUpdate();
      setDynamicDataLoaded(true);
    }
  }, []);

  // Add this at the top of the component
  useEffect(() => {
    // Set the app element for ReactModal
    ReactModal.setAppElement('#root');
  }, []);

  function DynamicMapComponent() {
    return (
    <Map
          ref={mapRef}
          reuseMaps
          initialViewState={INITIAL_VIEW_STATE}
          style={{width: '100%', height: '100%'}}
          mapStyle="https://api.maptiler.com/maps/streets/style.json?key=MOTv2gvrmXi0GVdMgKRq"
        >
        {selectedMarker && (
          <ReactModal
            isOpen={modalOpen}
            className="place-modal"
            overlayClassName="modal-overlay"
            onRequestClose={() => setModalOpen(false)}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
          >
            <div className='modal-contents'>
              <div>
                {selectedMarker.properties.name}
              </div>
              <div className='modal-category'>
                {selectedMarker.properties.category}
              </div>
            </div>
            <div className="modal-buttons">
              <button className='modal-button close' onClick={()=>setModalOpen(false)}>Close</button>
              {userData && <button className='modal-button' onClick={()=>visitLocation(selectedMarker)}>Mark as visited</button>}
            </div>
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
          style={{width: '100%', height: '100%'}}
          mapStyle="https://api.maptiler.com/maps/streets/style.json?key=MOTv2gvrmXi0GVdMgKRq"
        >
        {selectedMarker && (
          <ReactModal
            isOpen={modalOpen}
            className="place-modal"
            overlayClassName="modal-overlay"
            onRequestClose={() => setModalOpen(false)}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
          >
            <div className='modal-contents'>
              <div>
                {selectedMarker.properties.name}
              </div>
              <div className='modal-category'>
                {selectedMarker.properties.category}
              </div>
            </div>
            <div className="modal-buttons">
              <button className='modal-button close' onClick={()=>setModalOpen(false)}>Close</button>
              {userData && <button className='modal-button' onClick={()=>visitLocation(selectedMarker)}>Mark as visited</button>}
            </div>
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
      <div className="map" ref={mapContainerRef}>
        {dynamicUserData ? (
          <DynamicMapComponent />
        ) : (
          <NonDynamicMapComponent />
        )}
      </div>
    </div>
  )
}