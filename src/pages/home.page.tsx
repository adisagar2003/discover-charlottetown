import Sidebar from '../stories/Sidebar'
import MapComponent from '../stories/MapComponent'

export default function HomePage(){
  return (
        <div className="main">
            <Sidebar notificationCount={4} isLoggedIn={true} userProfile={{username: 'John', profilePicture:'https://assets.pokemon.com/assets/cms2/img/pokedex/full//610.png', email: 'john@gmail.com', progress:12}}/>
            <div className="map-content">
              <MapComponent />
            </div>
          </div>

  )
}