import React, { Component } from 'react';
import "../css/ShoppingCart.css";

export default class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: JSON.parse(localStorage.getItem('cart')) || []
        };
    }

    removeFromCart = (index) => {
        let { cartItems } = this.state;
        cartItems.splice(index, 1);
        this.setState({ cartItems });
        localStorage.setItem('cart', JSON.stringify(cartItems));
        window.location.reload();
    }

    render() {
        return (
            <div>
                <h2>Shopping Cart</h2>
                <div id="cart-container">

                    {this.state.cartItems.map((item, index) => (
                        <div className="card" key={index}>
                            <div className="imageContainer">
                                <img src={item.image} alt={`${item.player}'s Jersey`} className="image" />
                            </div>
                            <div className="details">
                                <h2 className="team">{item.team}</h2>
                                <h3 className="player">{item.player}</h3>
                                <div className="price">{`$${item.price}`}</div>
                                <div className="size">{`Size: ${item.size}`}</div>
                            </div>
                            <div className="actions">
                                <button onClick={() => this.removeFromCart(index)} className="remove-from-cart-button">Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}    
