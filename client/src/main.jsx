import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


// BOTSRAP CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// REACT ROUTER DOM 
import { BrowserRouter } from 'react-router-dom';

// CONTEXT API
import UserContext from './Context/UserContext.jsx';
// TASK API
import TaskContext from './Context/TaskContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>

    <UserContext>
      
        <TaskContext>
            <App />
        </TaskContext>

    </UserContext>
  
  </BrowserRouter>

)
