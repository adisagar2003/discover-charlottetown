import './App.css'
import Header from './stories/Header'
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
     <APIProvider apiKey={apiKey} onLoad={() => console.log('Maps API has loaded.')}>
        <Header isLoggedIn={true} userProfileData={{username: "ad", profilePicture: "", progress: 32}} />
        <div className="sidebar-container">
            <Sidebar />     
        </div>
        <Map
        style={{width: '100vw', height: '100vh'}}
        defaultCenter={{lat: 22.54992, lng: 0}}
        defaultZoom={3}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        />
      </APIProvider>
    </>
  )
}

export default App
