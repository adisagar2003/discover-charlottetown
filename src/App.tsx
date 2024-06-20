import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import HomePage from './pages/home.page';
import {APIProvider} from '@vis.gl/react-google-maps';
import ProgressPage from './pages/progress.page';
import Sidebar from './stories/Sidebar';
import BrowsePage from './pages/browse.page';

function App() : JSX.Element {

  let apiKey : (string|undefined) = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (apiKey === undefined) {
    apiKey="";
  }

  return (
    <>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <BrowserRouter>
            <div className="main">
              <Sidebar notificationCount={4} isLoggedIn={true} userProfile={{username: 'John', profilePicture:'https://assets.pokemon.com/assets/cms2/img/pokedex/full//610.png', email: 'john@gmail.com', progress:12}}/>
              <Routes
              >
                  <Route element={<HomePage />} path='/' />
                  <Route element={<ProgressPage />} path='/progress' />
                  <Route element={<BrowsePage />} path='/search' />
              </Routes>
            </div>
          </BrowserRouter>
      </APIProvider>
    </>
  )
}

export default App
