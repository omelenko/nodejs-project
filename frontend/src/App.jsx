import {Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Explore from './components/Explore'
import MyLibrary from './components/MyLibrary'
import './App.css'
import ProtectedRoute from "./middleware/ProtectedRoutes.jsx";

function App() {

  return (
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute/>}>
              <Route path="/" element={<Explore /> } />
              <Route path="/library" element={<MyLibrary />} />
          </Route>

          <Route exact path="*" element={<div>Not found.</div>} />
      </Routes>
  )
}

export default App
