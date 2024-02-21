import React, { Component } from "react";
import JerseyTableRow from "./JerseyTableRow";

export default class JerseyTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: null,
            sortAsc: true,
            searchTerm: ''
        };
    }

    handleSort = (sortBy) => {
        const sortAsc = sortBy === this.state.sortBy ? !this.state.sortAsc : true;
        this.setState({
            sortBy,
            sortAsc
        });
    };

    updateSearchTerm = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    render() {
        const { jerseys } = this.props;
        const { sortBy, sortAsc, searchTerm } = this.state;

        let filteredJerseys = jerseys.filter(jersey =>
            jersey.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
            jersey.player.toLowerCase().includes(searchTerm.toLowerCase()) ||
            jersey.number.toString().includes(searchTerm) ||
            jersey.price.toString().includes(searchTerm)
        );

        const sortedJerseys = [...filteredJerseys].sort((a, b) => {
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
            <div>
                <input
                    type="text"
                    placeholder="Search jerseys..."
                    value={this.state.searchTerm}
                    onChange={this.updateSearchTerm}
                    style={{ marginBottom: "20px" }}
                />
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => this.handleSort('team')}>Team {sortBy === 'team' && (sortAsc ? '▲' : '▼')}</th>
                            <th onClick={() => this.handleSort('player')}>Player {sortBy === 'player' && (sortAsc ? '▲' : '▼')}</th>
                            <th onClick={() => this.handleSort('number')}>Number {sortBy === 'number' && (sortAsc ? '▲' : '▼')}</th>
                            <th onClick={() => this.handleSort('price')}>Price {sortBy === 'price' && (sortAsc ? '▲' : '▼')}</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedJerseys.map((jersey) => (
                            <JerseyTableRow key={jersey._id} jersey={jersey} />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
