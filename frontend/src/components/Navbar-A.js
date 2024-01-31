import { Link } from 'react-router-dom'
import "../static/navbar.css"


const NavbarA = () => {
  
    return (
      <header>
        <div className="container">
          <Link to="/">
            <h1 id='navbarh1'> KPOP ONLINE STORE </h1>
          </Link>
          <div className="navbar">
          {/* Other navbar content */}
          <div className='link-container'> 
            <Link id='link-container a ' to="/admin/list">
              View List
            </Link>
            <Link id='link'to="/Login">
              Logout
            </Link>
          </div>
        
        </div>
        </div>
       
      
      </header>
    );
};

export default NavbarA