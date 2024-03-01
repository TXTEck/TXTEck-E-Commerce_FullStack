import React, { Component } from "react"
import { Link } from "react-router-dom"
import { ACCESS_LEVEL_ADMIN } from "../config/global_constants"
import "../css/NavBar.css"

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartCount: JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')).length : 0
  };
  
}
  render() {
    return (
      <nav>
        <ul>
          <li>
        <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN && (
            <li>
              <Link to="/ViewUsers">View Users</Link>
            </li>
          )}
          <li>
          <Link to="/cart">Cart ({this.state.cartCount})</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

