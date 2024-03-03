import React, { Component } from "react"
import { Link } from "react-router-dom"
import { ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_GUEST } from "../config/global_constants"
import Logout from "./Logout"
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
          {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN && (
            <li>
              <Link to="/ViewUsers">View Users</Link>
            </li>
          )}
          <li>
            <Link to="/cart">Cart ({this.state.cartCount})</Link>
          </li>
          <li>
          {
                    localStorage.accessLevel > ACCESS_LEVEL_GUEST 
                    ? <div className="logout">
                        <Logout/>
                        {
                            localStorage.profilePhoto !== "null" 
                            ? <img id="profilePhoto" src={`data:;base64,${localStorage.profilePhoto}`} alt=""/>
                            : null
                        }   
                      </div>
                    :
                      <div>
                        <Link className="green-button" to={"/Login"}>Login</Link>
                        <Link className="blue-button" to={"/Register"}>Register</Link>  
                        <Link className="red-button" to={"/ResetDatabase"}>Reset Database</Link>  <br/><br/><br/>
                      </div>
                }
          </li>
        </ul>
      </nav>
    );
  }
}

