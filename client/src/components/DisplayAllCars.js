import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import CarTable from "./CarTable"
import Logout from "./Logout"
import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"
import JerseyTable from './JerseyTable'; 


export default class DisplayAllCars extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            cars:[],
            jerseys: []
        }
    }
    
    
    componentDidMount() 
    {
        axios.get(`${SERVER_HOST}/jerseys`)
        .then(res =>
        {
            if(res.data) 
            {
                if (res.data.errorMessage) 
                {
                    console.log(res.data.errorMessage)    
                } 
                else 
                {             
                    this.setState({ jerseys: res.data }) 
                }   
            } else {
                console.log("Jerseys record not found")
            }
        });
        axios.get(`${SERVER_HOST}/cars`)
        .then(res => 
        {
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else
                {             
                    this.setState({cars: res.data}) 
                }   
            }
            else
            {
                console.log("Record not found")
            }
        })

    
    }

  
    render() 
    {  
        
        return (           
            <div className="form-container">
                {
                    localStorage.accessLevel > ACCESS_LEVEL_GUEST 
                    ? <div className="logout">
                        {
                            localStorage.profilePhoto !== "null" 
                            ? <img id="profilePhoto" src={`data:;base64,${localStorage.profilePhoto}`} alt=""/>
                            : null
                        }   
                        <Logout/>
                      </div>
                    :
                      <div>
                        <Link className="green-button" to={"/Login"}>Login</Link>
                        <Link className="blue-button" to={"/Register"}>Register</Link>  
                        <Link className="red-button" to={"/ResetDatabase"}>Reset Database</Link>  <br/><br/><br/>
                      </div>
                }
                <div className="table-container">
                    <JerseyTable jerseys={this.state.jerseys} />   
                    {
                        localStorage.accessLevel >= ACCESS_LEVEL_ADMIN 
                        ?
                          <div className="add-new-car">
                            <Link className="blue-button" to={"/AddJersey"}>Add New Jersey</Link> 
                          </div>
                        :
                          null
                    }                      
                </div>
            </div> 
            
        )
    }
}