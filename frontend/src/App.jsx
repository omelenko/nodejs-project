import {Routes, Route, useLocation} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Explore from './components/Explore'
import MyLibrary from './components/MyLibrary'
import './App.css'
import ProtectedRoute from "./middleware/ProtectedRoutes.jsx";
import Playlist from "./components/Playlist.jsx";
import Header from "./components/Header.jsx";

function App() {

    const location = useLocation();
    const hideHeaderPaths = ['/login', '/register'];
    const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

  return (
      <div className="min-h-screen bg-[#1A1A2E]">
          {!shouldHideHeader && <Header />}
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route element={<ProtectedRoute/>}>
                  <Route path="/" element={<Explore /> } />
                  <Route path="/library" element={<MyLibrary />} />
                  <Route path="/playlist/:id" element={<Playlist />} />
              </Route>

              <Route exact path="*" element={<div>Not found.</div>} />
          </Routes>
      </div>
  )
}

export default App
