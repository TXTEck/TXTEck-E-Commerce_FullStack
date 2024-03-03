import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css"
import "./css/App.css"

import Register from "./components/Register"
import ResetDatabase from "./components/ResetDatabase"
import Login from "./components/Login"
import Logout from "./components/Logout"
import DisplayAllJerseys from "./components/DisplayAllJerseys"
import LoggedInRoute from "./components/LoggedInRoute"
import Checkout from "./components/Checkout"
import PayPalMessage from "./components/PayPalMessage"
import EditJersey from "./components/EditJersey"
import DeleteJersey from "./components/DeleteJersey"
import AddJersey from "./components/AddJersey"
import ViewUsers from "./components/ViewUsers"
import NavBar from "./components/NavBar"
import ShoppingCart from './components/ShoppingCart'
import DeleteUser from "./components/DeleteUser"

import {ACCESS_LEVEL_GUEST} from "./config/global_constants"


if (typeof localStorage.accessLevel === "undefined")
{
    localStorage.name = "GUEST"
    localStorage.accessLevel = ACCESS_LEVEL_GUEST
    localStorage.token = null
    localStorage.profilePhoto = null
}

    
export default class App extends Component 
{
    render() 
    {
        return (
            <BrowserRouter>
                <NavBar />
                <Switch>
                    <Route exact path="/Register" component={Register} />
                    <Route exact path="/ResetDatabase" component={ResetDatabase} />                    
                    <Route exact path="/" component={DisplayAllJerseys} />
                    <Route exact path="/Login" component={Login} />
                    <Route exact path="/Checkout/:id" component={Checkout} />
                    <Route exact path="/PayPalMessage/:messageType/:payPalPaymentID" component={PayPalMessage}/>  
                    <LoggedInRoute exact path="/Logout" component={Logout} />
                    <Route path="/cart" component={ShoppingCart} />

                    <LoggedInRoute exact path="/EditJersey/:id" component={EditJersey} /> 
                    <LoggedInRoute exact path="/DeleteJersey/:id" component={DeleteJersey} />
                    <LoggedInRoute exact path="/AddJersey" component={AddJersey} />
                    <LoggedInRoute exact path="/ViewUsers" component={ViewUsers} />
                    <LoggedInRoute exact path="/DeleteUser/:id" component={DeleteUser} />
                    <Route exact path="/DisplayAllJerseys" component={DisplayAllJerseys}/> 
                    <Route path="*" component={DisplayAllJerseys}/>   
                                       
                </Switch>
            </BrowserRouter>
        )
    }
}