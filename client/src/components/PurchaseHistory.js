import React, { Component } from 'react';
import axios from 'axios';
import { SERVER_HOST, ACCESS_LEVEL_ADMIN } from '../config/global_constants';


export default class PurchaseHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchases: []
        };
    }

    componentDidMount() {
        if (localStorage.accessLevel >= ACCESS_LEVEL_ADMIN) {
            axios.get(`${SERVER_HOST}/sales`, {
                headers: { "authorization": localStorage.token }
            })
                .then(res => {
                    if (res.data){
                    this.setState({ purchases: res.data });
                    }
                    else{
                        console.log("No data received");
                    }
                })
                .catch(error => {
                    console.error("Error fetching purchase history", error);
                });
        }
    }

    renderItemsTable = (items) => {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Size</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.player}</td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>{item.size}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    render() {
        console.log(this.state.purchases);
        const { purchases } = this.state;

        return (
            <div>
                <h2>Purchase History</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Payment ID</th>
                            <th>Total Price</th>
                            <th>Items</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchases.map((purchase, index) => (
                            <tr key={index}>
                                <td>{purchase.customerName}</td>
                                <td>{purchase.paypalPaymentID}</td>
                                <td>${purchase.price.toFixed(2)}</td>
                                <td>{this.renderItemsTable(purchase.items)}</td>
                                <td>{new Date(purchase.purchaseDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

