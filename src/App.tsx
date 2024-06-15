import React from 'react';
import './App.css'
import Header from './stories/Header'
import MapComponent from './stories/MapComponent';
import Sidebar from './stories/Sidebar'
import {APIProvider} from '@vis.gl/react-google-maps';
import {Map, MapCameraChangedEvent} from '@vis.gl/react-google-maps';

function App() : JSX.Element {

  let apiKey : (string|undefined) = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (apiKey === undefined) {
    apiKey="";
  }

  return (
    <>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <div className="main">
            <Header isLoggedIn={true} />  
            <div className="sidebar">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia laboriosam cupiditate incidunt repudiandae doloremque aliquam facere! Placeat esse quo et vero vitae voluptas?
            </div>
            <div className="map-content">
              <MapComponent />
            </div>
          </div>
          
      </APIProvider>
    </>
  )
}

export default App
