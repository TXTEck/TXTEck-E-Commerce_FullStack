import React, { Component } from "react";
import JerseyTableRow from "./JerseyTableRow";

export default class JerseyTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: null,
            sortAsc: true
        };
    }

    handleSort = (sortBy) => {
        const sortAsc = sortBy === this.state.sortBy ? !this.state.sortAsc : true;
        this.setState({
            sortBy,
            sortAsc
        });
    };

    render() {
        const { jerseys } = this.props;
        const { sortBy, sortAsc } = this.state;

        const sortedJerseys = [...jerseys].sort((a, b) => {
            if (sortBy === 'team') {
                return sortAsc ? a.team.localeCompare(b.team) : b.team.localeCompare(a.team);
            }
            if (sortBy === 'player') {
                return sortAsc ? a.player.localeCompare(b.player) : b.player.localeCompare(a.player);
            }
            if (sortBy === 'number') {
                return sortAsc ? a.number - b.number : b.number - a.number;
            }
            if (sortBy === 'price') {
                return sortAsc ? a.price - b.price : b.price - a.price;
            }
            return 0;
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th onClick={() => this.handleSort('team')}>Team {sortBy === 'team' && (sortAsc ? '▲' : '▼')}</th>
                        <th onClick={() => this.handleSort('player')}>Player {sortBy === 'player' && (sortAsc ? '▲' : '▼')}</th>
                        <th onClick={() => this.handleSort('number')}>Number {sortBy === 'number' && (sortAsc ? '▲' : '▼')}</th>
                        <th onClick={() => this.handleSort('price')}>Price {sortBy === 'price' && (sortAsc ? '▲' : '▼')}</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedJerseys.map((jersey) => (
                        <JerseyTableRow key={jersey._id} jersey={jersey} />
                    ))}
                </tbody>
            </table>
        );
    }
}
{/* <tr>
<th onClick={() => this.handleSort("Player")}>
    Player {sortColumn === "Player" && <span>{sortDirection === "asc" ? "▲" : "▼"}</span>}
</th>
<th onClick={() => this.handleSort("Number")}>
    Number {sortColumn === "Number" && <span>{sortDirection === "asc" ? "▲" : "▼"}</span>}
</th>
<th onClick={() => this.handleSort("Price")}>
    Price {sortColumn === "Price" && <span>{sortDirection === "asc" ? "▲" : "▼"}</span>}
</th>
<th onClick={() => this.handleSort("Team")}>
    Team {sortColumn === "Team" && <span>{sortDirection === "asc" ? "▲" : "▼"}</span>}
</th>
</tr>
</thead> */}