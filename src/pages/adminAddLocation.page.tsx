import React from 'react';
import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { INITIAL_VIEW_STATE } from '../utils/mapData';

const AdminAddLocation = () => {
  return (
    <div>
        hi
      <div className="map-container">
        <Map
          reuseMaps
          initialViewState={INITIAL_VIEW_STATE}
          style={{ width: '100%', height: '100%' }}
          mapStyle="https://api.maptiler.com/maps/streets/style.json?key=MOTv2gvrmXi0GVdMgKRq"
        />
      </div>
      <div className="toolbar">{/* map icon goes here */}</div>
    </div>
  );
};

export default AdminAddLocation;
