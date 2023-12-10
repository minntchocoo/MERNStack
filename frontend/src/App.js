import { BrowserRouter, Routes, Route } from 'react-router-dom'

// COMPONENTS AND PAGES
import Home from './pages/Home'
import Register from './pages/Register';
import Login from './pages/Login';
import HomeUser from './pages/Home-user';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      

      <div className="pages">
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
           <Route
            path="/Register"
            element={<Register />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/home"
            element={<HomeUser />}
          />


        </Routes>
      </div>
      
      
      </BrowserRouter>
    
    </div>
  );
}

export default App;
