import MapComponent from '../stories/MapComponent'

export default function HomePage(){
  return (
    <div className='home-page'>
      <div className="home-content">
        <div className="home-header">
          <h1>Discover Charlottetown</h1>
          <p>Explore the beautiful city of Charlottetown through our interactive map</p>
        </div>
        <div className="map-content">
          <MapComponent />
        </div>
      </div>
    </div>
  )
}