import './App.css'
import MapComponent from './stories/MapComponent';
import Sidebar from './stories/Sidebar'
import {APIProvider} from '@vis.gl/react-google-maps';

function App() : JSX.Element {

  let apiKey : (string|undefined) = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (apiKey === undefined) {
    apiKey="";
  }

  return (
    <>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <div className="main">
            <Sidebar isLoggedIn={true} userProfile={{username: 'John', profilePicture:'https://assets.pokemon.com/assets/cms2/img/pokedex/full//610.png', email: 'john@gmail.com', progress:12}}/>
            <div className="map-content">
              <MapComponent />
            </div>
          </div>
          
      </APIProvider>
    </>
  )
}

export default App
