import './App.css'
import Header from './stories/Header'

function App() : JSX.Element {
  
  return (
    <>
      <Header isLoggedIn={true} userProfileData={{username: "ad", profilePicture: "", progress: 32}} />      
    </>
  )
}

export default App
