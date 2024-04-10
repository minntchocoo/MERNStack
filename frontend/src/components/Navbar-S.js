import { Link } from 'react-router-dom'
import "../static/navbar.css"


const NavbarS = () => {
  
    return (
      <header className='adminheader'>
        <div className="container">
          <Link to="/supplier">
            <h1 id='navbarh1'> KPOP ONLINE STORE </h1>
          </Link>
          <div className='link-container'> 
            <Link id='link-container a ' to="/supplier/inventory">
              View Supplier Items 
            </Link>
            
            <Link id='link'to="/Login">
              Logout
            </Link>
          </div>

        </div>
       
      
      </header>
    );
};

export default NavbarS