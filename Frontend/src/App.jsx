import { Route, Routes } from 'react-router-dom'
import './index.css'
import HomePage from './pages/home/HomePage'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Footer from './components/footer'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
