import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"


export default class DeleteJersey extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            redirectToDisplayAllJerseys:false
        }
    }
    
    
    componentDidMount() 
    {   
        axios.delete(`${SERVER_HOST}/jerseys/${this.props.match.params.id}`, {headers:{"authorization":localStorage.token}})
        .then(res => 
        {
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else // success
                { 
                    console.log("Record deleted")
                }
                this.setState({redirectToDisplayAllJerseys:true})
            }
            else 
            {
                console.log("Record not deleted")
            }
        })
    }
  
  
    render() 
    {
        return (
            <div>   
                {this.state.redirectToDisplayAllJerseys ? <Redirect to="/redirectToDisplayAllJerseys"/> : null}                      
            </div>
        )
    }
}