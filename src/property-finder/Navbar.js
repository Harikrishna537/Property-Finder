import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css'

export default function Navbar(props) {
  const navigate = useNavigate();

  const handleLogin = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/userlogin');
    } else {
      props.setLogin(false);
      localStorage.removeItem('token');
      navigate('/userlogin');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-lg-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">PropFind</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/confirm">Sell Property</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/buyprop">Buy Property</Link>
            </li>
          </ul>

          <button className="btn btn-danger" onClick={handleLogin}>
            {props.login ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>
    </nav>
  );
}
