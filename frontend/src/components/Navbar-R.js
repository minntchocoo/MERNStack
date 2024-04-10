import { Link } from 'react-router-dom'
import "../static/navbar.css"


const NavbarR = () => {
  
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
        <br></br>
        <br></br>
      </header>
    );
};

export default NavbarR