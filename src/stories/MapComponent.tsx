import { Map, Marker, useMap } from '@vis.gl/react-google-maps'
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react'
import api from '../utils/api';
import { Location } from '../models/location.model.ts';
import  DeckGL  from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import {GoogleMapsOverlay as DeckOverlay} from '@deck.gl/google-maps';


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

  function DeckGLOverlay(props) {
    const map = useMap();
    const overlay = useMemo(() => new DeckOverlay(props),[]);
  
    useEffect(() => {
      overlay.setMap(map);
      console.log({map});
      return () => overlay.setMap(null);
    }, [map, overlay]);
  
    overlay.setProps(props);
    return null;
  }

  useEffect(()=> {
    fetchLocationList();
  }, [fetchLocationList]);

  const layers = [
    new ScatterplotLayer({
      id: '',
      data: [
        {position: [46.23465818393165,  -63.129953284633473 ]}
      ],
      getPosition: d => d.position,
      getFillColor: [255, 0, 0, 100],
      getRadius: 1000
    })
  ];

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
                <DeckGLOverlay layers={layers} />
                {locations.map((location:Location)=> {
                  return (<Marker title={location.title} onMouseOver={(e)=>console.log(e)}  position={{lat:location.latitude, lng:location.longitude}} />)
                })}
              </Map>
          
         
        </div>
    </div>
  )
}