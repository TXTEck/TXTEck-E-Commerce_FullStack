import React, {Component} from "react"
import {Link} from "react-router-dom"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN} from "../config/global_constants"


export default class JerseyTableRow extends Component 
{    
    render() 
    {
        console.log(this.props.jersey)
        return (
            <tr>
                <td>{this.props.jersey.team}</td>
                <td>{this.props.jersey.player}</td>
                <td>{this.props.jersey.number}</td>
                <td>{this.props.jersey.size}</td>
                <td>{this.props.jersey.colour}</td>
                <td>{this.props.jersey.price}</td>
                <td>
                    {localStorage.accessLevel > ACCESS_LEVEL_GUEST ? <Link className="green-button" to={"/EditCar/" + this.props.car._id}>Edit</Link> : null}
                    
                    {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link className="red-button" to={"/DeleteCar/" + this.props.car._id}>Delete</Link> : null}

                </td>
            </tr>
        )
    }
}