import { Link } from 'react-router-dom'
import "../static/navbar.css"


const NavbarA = () => {
  
    return (
      <header className='adminheader'>
        <div className="container">
          <Link to="/admin">
            <h1 id='navbarh1'> KPOP ONLINE STORE </h1>
          </Link>
          <div className='link-container'> 
            <Link id='link-container a ' to="/admin/list">
              View List
            </Link>
            <Link id='link'to="/Login">
              Logout
            </Link>
          </div>

        </div>
       
      
      </header>
    );
};

export default NavbarA