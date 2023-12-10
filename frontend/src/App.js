import { BrowserRouter, Routes, Route } from 'react-router-dom'

// COMPONENTS AND PAGES
import Home from './pages/Home'
import Register from './pages/Register';
import Login from './pages/Login';


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


        </Routes>
      </div>
      
      
      </BrowserRouter>
    
    </div>
  );
}

export default App;
