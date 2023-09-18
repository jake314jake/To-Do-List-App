import React from 'react';
import Avatar from 'react-avatar';

function NavBar({ userName, handleLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto align-items-center">
            <li className="nav-item">
              <span className="nav-link">
                <Avatar name={userName} size={40} round={true} />
                <strong className="fs-5"> {userName}</strong>
              </span>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-outline-danger my-2 my-sm-0"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right mr-1" /> Logout {/* Bootstrap icon */}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
