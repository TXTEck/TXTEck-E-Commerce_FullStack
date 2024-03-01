import React, {Component} from "react"
import {Link} from "react-router-dom"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN} from "../config/global_constants"


export default class JerseyTableRow extends Component {
    addToCart = (jersey) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(jersey);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Added to cart!');
    }

    render() {
        const { jersey } = this.props;
        const imagePath = process.env.PUBLIC_URL + jersey.jerseyPictureFilename;

        return (
            <tr>
                <td><img src={imagePath} alt={`${jersey.player}'s Jersey`} id="jersey-pic" /></td>
                <td>{jersey.team}</td>
                <td>{jersey.player}</td>
                <td>{jersey.number}</td>
                <td>{jersey.size}</td>
                <td>{jersey.colour}</td>
                <td>{jersey.price}</td>
                <td>
                    {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link className="green-button" to={"/EditJersey/" + jersey._id}>Edit</Link> : null}
                    {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link className="red-button" to={"/DeleteJersey/" + jersey._id}>Delete</Link> : null}
                    <button onClick={() => this.addToCart(jersey)}></button>
                </td>
            </tr>
        );
    }
}

