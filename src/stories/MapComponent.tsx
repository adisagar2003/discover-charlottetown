import { Map } from '@vis.gl/react-google-maps'

export default function MapComponent() {
  return (
    <div className='map-layout'>
        <div className='map'>
          <Map
          style={{width: '800px', height: '400px'}}
          defaultCenter={{lat: 46.23472677168374, lng: -63.134519289778176}}
          defaultZoom={15}
          gestureHandling={'greedy'}
          disableDefaultUI={false}
          />
        </div>
    </div>
  )
}