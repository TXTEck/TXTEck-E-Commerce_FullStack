import React, { Component } from "react"
import JerseyTableRow from "./JerseyTableRow"


export default class JerseyTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            jerseys: []
        }
    }

    render() {
        console.log(this.props.jerseys)

        return (
            <table>
                <thead>
                    <tr>
                        <th>Team</th>
                        <th>Player</th>
                        <th>Number</th>
                        <th>Price</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.jerseys.map((jersey) => <JerseyTableRow key={jersey._id} jersey={jersey} />)}
                </tbody>
            </table>
        )
    }
}