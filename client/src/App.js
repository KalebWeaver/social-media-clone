import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

//----CSS----//
import 'semantic-ui-css/semantic.min.css'
import './App.css'

//----Pages----//
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

//----Components----//
import MenuBar from './components/MenuBar'

function App() {
  return (
    <Router>
      <Container>
        <MenuBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App
