import { BrowserRouter, Routes, Route } from 'react-router-dom'

// COMPONENTS AND PAGES
import Home from './pages/Home'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
    <div className="App">
      
      <Navbar />

      <div className="pages">
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

        </Routes>
      </div>
      
      
    
    </div>
    </Router>
  );
}

export default App;
