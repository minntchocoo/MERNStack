import { Link } from 'react-router-dom'
import "../static/navbar.css"


const NavbarA = () => {
  const registerBtnStyle = {
    backgroundColor:'#6a994f',
    color: '#fff',
    padding: '4px 20px',
    borderRadius: '4px',
    textDecoration: 'none',
    fontWeight: 'bold',
    right:'96px',
    position:'absolute' 
   
  };
  const loginBtnStyle = {
    backgroundColor:'#532d3b',
    color: '#fff',
    padding: '4px 20px',
    borderRadius: '4px',
    textDecoration: 'none',
    fontWeight: 'bold',
    right:'8px',
    position:'absolute'
   
  };

  
    return (
      <header>
        <div className="container">
          <Link to="/">
            <h1 id='navbarh1'> KPOP ONLINE STORE </h1>
          </Link>
          <div className="navbar">
          {/* Other navbar content */}
          
          <Link to="/Login" style={loginBtnStyle}>
            Logout
            </Link>
            <br></br>
            <br></br>
        </div>
        </div>
       
      
      </header>
    );
};

export default NavbarA