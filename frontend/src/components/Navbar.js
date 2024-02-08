import { Link } from 'react-router-dom'
import "../static/navbar.css"



const Navbar = () => {
  const registerBtnStyle = {
    
    backgroundColor:'#FD5A46',
    color: '#68fdc4cf',
    fontFamily: 'Archivo Black, sans-serif',
    padding: '10px 20px',
    borderRadius: '4px',
    textDecoration: 'none',
    fontWeight: 'bold',
    right:'96px',
    position:'absolute'
   
  };
  const loginBtnStyle = {
    backgroundColor:'#FFC567',
    color: '#261f1f',
    fontFamily: 'Archivo Black, sans-serif',
    padding: '10px 20px',
    borderRadius: '4px',
    textDecoration: 'none',
    fontWeight: 'bold',
    right:'4px',
    position:'absolute',
   
  };

  
    return (
      <header>
        <div className="container">
          <Link to="/">
            <h1 id='navbarh1'> KPOP ONLINE STORE </h1>
          </Link>
        </div>
        <div className="navbar">
          {/* Other navbar content */}
          
          <Link to="/register" style={registerBtnStyle}>
            Register
            </Link>
          <Link to="/login" style={loginBtnStyle}>
            Login
            </Link>
        </div>
        <div className="dgwt-wcas-sf-wrapp">
          <label className="screen-reader-text" htmlFor="dgwt-wcas-search-input-2"></label>
          <div className="search-bar-container">
            <svg
              className="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M15.5 14h-.79l-.28-.27c1.09-1.32 1.75-3.03 1.75-4.88 0-4.42-3.58-8-8-8S0 4.7 0 9.12s3.58 8 8 8c1.85 0 3.56-.66 4.88-1.75l.27.28v.79L22 23.01l.99-.99L15.5 14zm-6 0A5.5 5.5 0 1 1 9 8.5a5.51 5.51 0 0 1 0 11z"
              />
            </svg>
            <input
              id="dgwt-wcas-search-input-2"
              type="search"
              className="dgwt-wcas-search-input"
              name="s"
              value=""
              placeholder=" ENHYPEN"
              autoComplete="off"
              style={{ paddingLeft: '45px', marginBottom: '10px', color: '#fff'}}
            
              
            />
            <div className="dgwt-wcas-preholder"></div>
          </div>
        </div>
      </header>
    );
};

export default Navbar