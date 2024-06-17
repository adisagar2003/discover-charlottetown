import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import HomePage from './pages/home.page';
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
          <BrowserRouter>
            <Routes>
              <Route element={<HomePage />} path="/" />
            </Routes>
          </BrowserRouter>
      </APIProvider>
    </>
  )
}

export default App
