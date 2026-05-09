import {Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import ProtectedRoute from "./middleware/ProtectedRoutes.js";
import Home from "swagger-jsdoc/docusaurus/src/pages/index.js";

function App() {
  const [count, setCount] = useState(0)

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
