import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import HomePage from './pages/home.page';
import {APIProvider} from '@vis.gl/react-google-maps';
import ProgressPage from './pages/progress.page';
import Sidebar from './stories/Sidebar';
import BrowsePage from './pages/browse.page';
import NotificationPage from './pages/notification.page';
import LoginPage from './pages/login.page';
import RegisterPage from './pages/register.page';
import { Provider } from 'react-redux'
import store from './context/store';

function App() : JSX.Element {

  return (
    <>
      <Provider store={store}> 
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
              <BrowserRouter>
                <div className="main">
                  <Sidebar />
                  <Routes
                  >
                      <Route element={<HomePage />} path='/' />
                      <Route element={<ProgressPage />} path='/progress' />
                      <Route element={<BrowsePage />} path='/search' />
                      <Route element={<NotificationPage />} path='/notifications' />
                      <Route element={<LoginPage />} path='/login' />
                      <Route element={<RegisterPage />} path='/register' />
                  </Routes>
                </div>
              </BrowserRouter>
          </APIProvider>
      </Provider>
    </>
  )
}

export default App
