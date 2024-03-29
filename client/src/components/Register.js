import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"


import {SERVER_HOST} from "../config/global_constants"
import "../css/login_registration.css"



export default class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            address: "",
            selectedFile: null,
        }
    }


    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleFileChange = (e) => {
        this.setState({ selectedFile: e.target.files[0] })
    }

    handleSubmit = (e) => {
        e.preventDefault()
            // Password validation regex
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)/;
    if (!passwordRegex.test(this.state.password)) {
        console.error("Password must contain at least one uppercase letter and one number.");
        return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.state.email)) {
        console.error("Please enter a valid email address.");
        return;
    }

        let formData = new FormData()
        formData.append("profilePhoto", this.state.selectedFile)

        axios.post(`${SERVER_HOST}/users/register/${this.state.name}/${this.state.email}/${this.state.password}/${this.state.address}`, formData, { headers: { "Content-type": "multipart/form-data" } })
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    }
                    else // user successfully registered
                    {
                        console.log("User registered and logged in")

                        localStorage.name = res.data.name
                        localStorage.email = res.data.email
                        localStorage.address = res.data.address
                        localStorage.accessLevel = res.data.accessLevel
                        localStorage.token = res.data.token
                        localStorage.profilePhoto = res.data.profilePhoto

                        this.setState({ isRegistered: true })
                    }
                }
                else {
                    console.log("Registration failed")
                }
            })
    }


    render() {
        return (

            <form className="reg-container" noValidate = {true} id = "loginOrRegistrationForm">
           
                {this.state.isRegistered ? <Redirect to="/DisplayAllJerseys"/> : null} 
            

                <h2>New User Registration</h2>

                <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    autoComplete="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    ref={(input) => { this.inputToFocus = input }}
                /><br />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                /><br />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    autoComplete="password"
                    title="Password must be at least ten-digits long and contains at least one lowercase letter, one uppercase letter, one digit and one of the following characters (£!#€$%^&*)"
                    value={this.state.password}
                    onChange={this.handleChange}
                /><br />

                <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    autoComplete="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                /><br />


                <input
                    name="address"
                    type="text"
                    placeholder="Address"
                    autoComplete="Address"
                    value={this.state.address}
                    onChange={this.handleChange}
                /><br />

                <input
                    type="file"
                    onChange={this.handleFileChange}
                /><br /><br />

                <LinkInClass value="Register New User" className="green-button" onClick={this.handleSubmit} />
                <Link className="red-button" to={"/DisplayAllJerseys"}>Cancel</Link>
            </form>
        )
    }
}