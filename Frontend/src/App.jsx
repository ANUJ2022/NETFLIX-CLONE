import { Navigate, Route, Routes } from 'react-router-dom'
import './index.css'
import HomePage from './pages/home/HomePage'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Footer from './components/footer'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuthThunk } from './features/auth/authThunk'
import { Loader } from 'lucide-react'
import WatchPage from './pages/WatchPage'
import SearchPage from './pages/SearchPage'

import SearchHistoryPage from './pages/SearchHistoryPage'
import NotFoundPage from './pages/NotFoundPage'

const App = () => {


  const { user, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(checkAuthThunk())
      .unwrap()
  }, [dispatch]);

  if (loading) {
    return (
      <div className='h-screen'>
        <div className='flex justify-center items-center bg-black h-full'>
          <Loader className='animate-spin text-red-600 size-10' />
        </div>
      </div>
    )
  }


  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signUp' element={!user ? <SignUp /> : <Navigate to={"/"} />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to={"/"} />} />
        <Route path='/watch/:id' element={user ? <WatchPage /> : <Navigate to={"/login"} />} />
        <Route path='/search' element={user ? <SearchPage /> : <Navigate to={"/login"} />} />
        <Route path='/history' element={user ? <SearchHistoryPage /> : <Navigate to={"/login"} />} />
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
