import { Route, Routes } from 'react-router-dom'
import './App.css'




// Pages
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'

// layouts
import SiteLayout from './Layouts/SiteLayout'
import EditTaskPage from './Pages/EditTaskPage'




function App() {


  return (
    <>

          <Routes>

                {/* genel site şablonu */}
                <Route element={<SiteLayout></SiteLayout>}>

                        <Route path='/' element={<HomePage></HomePage>}></Route>
                        <Route path='/task/:taskId' element={<EditTaskPage></EditTaskPage>}></Route>
                        <Route path='/login' element={<LoginPage></LoginPage>}></Route>
                        <Route path='/register' element={<RegisterPage></RegisterPage>}></Route>
                </Route>
               
          </Routes>
    </>
  )
}

export default App
