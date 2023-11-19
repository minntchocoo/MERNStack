import { Link } from 'react-router-dom'

const Navbar = () => {

    return(
        <header>
            <div className="container">
                <Link to="/">
                    <h1> KPOP ONLINE STORE </h1>
                </Link>
            </div>
            <div className="dgwt-wcas-sf-wrapp">
                
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
                    style={{ paddingRight: '48px' }}
                    />
                    <div className="dgwt-wcas-preholder"></div>
                </div>
            </div>
        </header>
    )
}

export default Navbar