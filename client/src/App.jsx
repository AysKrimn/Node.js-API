import { Route, Routes } from 'react-router-dom'
import './App.css'




// Pages
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'

// layouts
import SiteLayout from './Layouts/SiteLayout'
import UpdateTask from './Pages/UpdateTask'




function App() {


  return (
    <>

          <Routes>

                {/* genel site şablonu */}
                <Route element={<SiteLayout></SiteLayout>}>

                        <Route path='/' element={<HomePage></HomePage>}></Route>
                        <Route path='/task/:taskId/edit' element={<UpdateTask></UpdateTask>}></Route>
                        <Route path='/login' element={<LoginPage></LoginPage>}></Route>
                        <Route path='/register' element={<RegisterPage></RegisterPage>}></Route>
                </Route>
               
          </Routes>
    </>
  )
}

export default App
