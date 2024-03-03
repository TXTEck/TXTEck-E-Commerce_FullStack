import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import Form from "react-bootstrap/Form"
import axios from "axios"
import LinkInClass from "../components/LinkInClass"
import "../css/AddJersey.css"

import {ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"


export default class AddCar extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            team: ``,
            player: ``,
            number: ``,
            price: ``,
            colour:``,
            size: ``,
            redirectToDisplayAllJerseys:localStorage.accessLevel < ACCESS_LEVEL_ADMIN
        }
    }


    componentDidMount() 
    {     
        this.inputToFocus.focus()        
    }
 
 
    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }


    handleSubmit = (e) => 
    {
        e.preventDefault()

        const jerseyObject = {
            team: this.state.team,
            number: this.state.number,
            player: this.state.player,
            price: this.state.price,
            colour: this.state.colour,
            size: this.state.size
        }

        axios.post(`${SERVER_HOST}/jerseys`, jerseyObject, {headers:{"authorization":localStorage.token}})
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
                    console.log("Record added")
                    this.setState({redirectToDisplayAllJerseys:true})
                } 
            }
            else
            {
                console.log("Record not added")
            } 
        })
    }


    render()
    {        
        return (
            <div className="addj-container"> 
                {this.state.redirectToDisplayAllJerseys ? <Redirect to="/redirectToDisplayAllJerseys"/> : null}                                            
                    
                <Form>
                    <Form.Group controlId="team">
                        <Form.Label>Team</Form.Label>
                        <Form.Control ref = {(input) => { this.inputToFocus = input }} type="text" name="team" value={this.state.team} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="player">
                        <Form.Label>Player</Form.Label>
                        <Form.Control type="text" name="player" value={this.state.player} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="number">
                        <Form.Label>Number</Form.Label>
                        <Form.Control type="text" name="number" value={this.state.number} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="colour">
                        <Form.Label>Colour</Form.Label>
                        <Form.Control type="text" name="colour" value={this.state.colour} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="size">
                        <Form.Label>Size</Form.Label>
                        <Form.Control type="text" name="size" value={this.state.size} onChange={this.handleChange} />
                    </Form.Group>
        
                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name="price" value={this.state.price} onChange={this.handleChange} />
                    </Form.Group>
  
                    <LinkInClass value="Add" className="green-button" onClick={this.handleSubmit}/>  
    
                    <Link className="red-button" to={"/DisplayAllJerseys"}>Cancel</Link>
                </Form>
            </div>
        )
    }
}