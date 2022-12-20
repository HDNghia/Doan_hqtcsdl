import './App.scss'

import Admin from './Admin/Admin.tsx'
import Login from './Login/Login'

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/admin' element={<PrivateRouterAdmin />} />
        <Route path='/' element={<Login />} />
      </Routes>
    </Router>
  )
}

function PrivateRouterAdmin() {
  return localStorage.getItem('accessToken') === 'admin' ? <Admin /> : <Navigate to='/Login' />
}
export default App
