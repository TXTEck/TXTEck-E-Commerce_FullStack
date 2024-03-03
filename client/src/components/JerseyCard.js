import React from "react";
import {Link} from "react-router-dom";
import {ACCESS_LEVEL_ADMIN} from "../config/global_constants";

import "../css/jerseyCard.css";

export default class JerseyCard extends React.Component {
  addToCart = () => {
    const jersey = this.props.jersey;
    const imagePath = process.env.PUBLIC_URL + jersey.jerseyPictureFilename; 
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({
        id: jersey.id,
        team: jersey.team,
        player: jersey.player,
        price: jersey.price,
        size: jersey.size,
        image: imagePath 
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${this.props.jersey.player} jersey added to cart!`);
    window.location.reload();
}
    render() {
        const imagePath = process.env.PUBLIC_URL + this.props.jersey.jerseyPictureFilename;

        return (
            <div className="card">
                <div className="imageContainer">
                    <img src={imagePath} alt={`${this.props.jersey.player}'s Jersey`} className="image" />
                </div>
                <div className="details">
                    <h2 className="team">{this.props.jersey.team}</h2>
                    <h3 className="player">{this.props.jersey.player} &#40;{this.props.jersey.size}&#41;</h3>
                    <div className="price">{`$${this.props.jersey.price}`}</div>
                </div>
                <div className="actions">
                    {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link className="green-button" to={"/EditJersey/" + this.props.jersey._id}>Edit</Link> : null}
                    {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link className="red-button" to={"/DeleteJersey/" + this.props.jersey._id}>Delete</Link> : null}
                    <button onClick={this.addToCart} className="add-to-cart-button">
                        <img src="cart.jpg" alt ="cart"></img>
                    </button>
                </div>
            </div>
        );
    }
}
