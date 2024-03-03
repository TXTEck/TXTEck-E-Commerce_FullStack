import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { SERVER_HOST, ACCESS_LEVEL_ADMIN } from '../config/global_constants';
import '../css/userlist.css';

export default class ViewUsers extends Component {
    constructor(props) {
        super(props);
        this.state = { users: [] };
    }

    componentDidMount() {
        if (localStorage.accessLevel >= ACCESS_LEVEL_ADMIN) {
            axios.get(`${SERVER_HOST}/users`, {
                headers: { "authorization": localStorage.token }
            })
                .then(response => {
                    if (response.data) {
                        this.setState({ users: response.data });
                    } else {
                        console.log("No data received");
                    }
                })
                .catch(error => {
                    console.error("Error fetching users:", error);
                });
        }
    }


    render() {
        return (
            <div>
                <h2>Users List</h2>
                <div id="users-container">
                    {this.state.users.map(user => (
                        <div key={user._id} id="user-card">
                             <img className="profilePhoto" src={`${SERVER_HOST}/uploads/${user.profilePhotoFilename}`} alt="User Profile" />
                            <div className="info">
                                <p className="name">{user.name}</p>
                                <p className="email">Email: {user.email}</p>
                                <p className="address">Address: {user.address}</p>
                            </div>
                            {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link className="red-button" to={"/DeleteUser/" + user._id}>Delete</Link> : null}
                        </div>
                    ))}
                </div>
                <Link className= "back-button" to="/">Back</Link>
            </div>
        );
    }
}