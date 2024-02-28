import React, {Component} from "react"
import {Link} from "react-router-dom"
import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN} from "../config/global_constants"

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Home</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
          {/* Other navigation links here */}
          {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN && (
            <li className="nav-item">
              <Link className="nav-link" to="/ViewUsers">View Users</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;