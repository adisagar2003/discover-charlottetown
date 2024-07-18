import { Map, Marker } from '@vis.gl/react-google-maps'
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react'
import api from '../utils/api';
import { Location } from '../models/location.model.ts';

export default function MapComponent() {
  // fetch all the locations
  const [locations, setLocation] = useState([]);
  // define a memoized function for fetching the location list
  const fetchLocationList = useMemo(() => async ()=> {
    try {
      const response = await axios.get(`${api}/api/location/10000`);
      console.log(response);
      setLocation(response.data.data);
    }
    catch (error) {
      console.error('Error fetching product list: ', error);
    }
  }, []);

  useEffect(()=> {
    fetchLocationList();
  }, [fetchLocationList]);

  return (
    <div className='map-layout'>
        <div className='map'>
        <Map
          style={{width: '900px', height: '500px'}}
          defaultCenter={{lat: 46.23472677168374, lng: -63.134519289778176}}
          defaultZoom={15}
          gestureHandling={'greedy'}
          disableDefaultUI={false}
          >
            {locations.map((location:Location)=> {
              return (<Marker title={location.title} onMouseOver={(e)=>console.log(e)}  position={{lat:location.latitude, lng:location.longitude}} />)
            })}
          </Map>
        </div>
    </div>
  )
}