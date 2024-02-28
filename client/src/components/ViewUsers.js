import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { SERVER_HOST, ACCESS_LEVEL_ADMIN } from '../config/global_constants';

export default class ViewUsers extends Component {
    constructor(props) {
        super(props);
        this.state = { users: [] };
    }

    componentDidMount() {
        if(localStorage.accessLevel >= ACCESS_LEVEL_ADMIN) {
            axios.get(`${SERVER_HOST}/users`, {
                headers: { "authorization": localStorage.token }
            })
            .then(response => {
                if(response.data) {
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
                <div>
                    {this.state.users.map(user => (
                        <div key={user._id}>
                            <h3>{user.name}</h3>
                            <p>Email: {user.email}</p>
                            <p>Access Level: {user.accessLevel}</p>
                            <p>Profile Photo: {user.profilePhoto}</p>
                        </div>
                    ))}
                </div>
                <Link to="/">Back</Link>
            </div>
        );
    }
}