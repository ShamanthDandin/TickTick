import { useContext } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';

const NavBar = () => {

    let location = useLocation()
    const history = useHistory()
    const { setusername, username } = useContext(NoteContext)

    const handleLogout = () => {
        localStorage.removeItem('authToken')
        setusername("")
        history.push('/login')
    }

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <img height={50} width={50} src="/logo.svg" alt="" id='customLogo' />
                <Link className="navbar-brand name" to="/">TickTick</Link >
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item customName">
                            <Link className={`nav-link ${location.pathname === '/' ? `active` : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item customName">
                            <Link className={`nav-link ${location.pathname === '/about' ? `active` : ""}`} aria-current="page" to="/about">About</Link>
                        </li>
                        {username &&
                            <li className='nav-item customMargin navName'>
                                <Link className="nav-link" aria-current="page" to="/">{username}</Link>
                            </li>}
                    </ul>
                    {!localStorage.getItem('authToken') ? <form className="d-flex">
                        <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                    </form>

                        : <button onClick={handleLogout} className="btn btn-primary mx-1">Logout</button>
                    }
                </div>
            </div>
        </nav>
    )
}

export default NavBar;
