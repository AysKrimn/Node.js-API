import { Route, Routes } from 'react-router-dom'
import './App.css'




// Pages
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import Todos from './Pages/Todos'

// layouts
import SiteLayout from './Layouts/SiteLayout'




function App() {


  return (
    <>

          <Routes>

                {/* genel site şablonu */}
                <Route element={<SiteLayout></SiteLayout>}>

                        <Route path='/' element={<HomePage></HomePage>}></Route>
                        <Route path='/create-todo' element={<Todos></Todos>}></Route>
                        <Route path='/login' element={<LoginPage></LoginPage>}></Route>
                        <Route path='/register' element={<RegisterPage></RegisterPage>}></Route>
                </Route>
               
          </Routes>
    </>
  )
}

export default App
