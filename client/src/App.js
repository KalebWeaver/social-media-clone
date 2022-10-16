import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

//----Auth----//
import {AuthProvider} from './context/auth'
import {AuthRoute, NoAuthRoute} from './utils/Routes'

//----CSS----//
import 'semantic-ui-css/semantic.min.css'
import './App.css'

//----Pages----//
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import SinglePost from './pages/SinglePost'

//----Components----//
import MenuBar from './components/MenuBar'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Routes>
            {/*----UnProtected----*/}
            <Route element={<NoAuthRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            {/*----Protected----*/}
            <Route element={<AuthRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/posts/:postId" element={<SinglePost />} />
            </Route>
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  )
}

export default App
