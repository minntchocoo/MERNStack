import { Link } from 'react-router-dom'
import "../static/navbar.css"


const NavbarR = () => {
  const registerBtnStyle = {
    backgroundColor:'#f50057',
    color: '#fff',
    padding: '4px 20px',
    borderRadius: '4px',
    textDecoration: 'none',
    fontWeight: 'bold',
    right:'96px',
    position:'absolute'
   
  };
  const loginBtnStyle = {
    backgroundColor:'#de7272',
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
        </div>
        <div className="navbar">
          {/* Other navbar content */}
         
        </div>
        
      </header>
    );
};

export default NavbarR