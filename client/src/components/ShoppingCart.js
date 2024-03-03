import React, { Component } from 'react';
import Checkout from './Checkout';
import "../css/ShoppingCart.css";

export default class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: JSON.parse(localStorage.getItem('cart')) || [],
            total: 0
        };
    }

    handlePaymentSuccess = () => {
        this.setState({ cartItems: [], total: 0 });
    }

    componentDidMount() {
        this.calculateTotal();
    }

    calculateTotal = () => {
        const total = this.state.cartItems.reduce((acc, item) => acc + item.price, 0);
        this.setState({ total });
    }

    removeFromCart = (index) => {
        let { cartItems } = this.state;
        cartItems.splice(index, 1);
        this.setState({ cartItems }, () => {
            this.calculateTotal();
            localStorage.setItem('cart', JSON.stringify(cartItems));
        });
        window.location.reload();
    };


    render() {
        const customerName = localStorage.name;

        const saleData = {
            customerName: customerName,
            paypalPaymentID: "PAYPAL_PAYMENT_ID", // This should be retrieved from the PayPal transaction
            price: this.state.total,
            items: this.state.cartItems,
            purchaseDate: new Date() // This will be set automatically by Mongoose to the current date and time
        };
        console.log(saleData);
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
                    <div className="total-section">
                        <h3>Total: ${this.state.total.toFixed(2)}</h3>
                        <Checkout price = {this.state.total.toFixed(2)} saleData={saleData} onPaymentSuccess={this.handlePaymentSuccess}/>
                    </div>
                </div>
            </div>
        );
    }
}    
