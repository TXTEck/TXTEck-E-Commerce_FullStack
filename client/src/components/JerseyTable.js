import React, { Component } from "react";
import JerseyTableRow from "./JerseyTableRow";

export default class JerseyTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: null,
            sortAsc: true,
            searchTerm: '',
            teamFilter: '',
            sizeFilter: '',
            numberFilter: '',
            minPriceFilter: 0,
            maxPriceFilter: 500,
        };
    }

    handleSort = (sortBy) => {
        const sortAsc = sortBy === this.state.sortBy ? !this.state.sortAsc : true;
        this.setState({ sortBy, sortAsc });
    };

    updateSearchTerm = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    updateFilter = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    applyFilters = (jerseys) => {
        return jerseys.filter(jersey => {
            const searchTermMatch = this.state.searchTerm ? (
                jersey.team.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                jersey.player.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                jersey.number.toString().includes(this.state.searchTerm) ||
                jersey.price.toString().includes(this.state.searchTerm)
            ) : true;
            const matchesTeam = this.state.teamFilter ? jersey.team === this.state.teamFilter : true;
            const matchesSize = this.state.sizeFilter ? jersey.size === this.state.sizeFilter : true;
            const matchesNumber = this.state.numberFilter ? jersey.number.toString().includes(this.state.numberFilter) : true;
            const matchesMinPrice = this.state.minPriceFilter ? jersey.price >= parseFloat(this.state.minPriceFilter) : true;
            const matchesMaxPrice = this.state.maxPriceFilter ? jersey.price <= parseFloat(this.state.maxPriceFilter) : true;
            return searchTermMatch && matchesTeam && matchesSize && matchesNumber && matchesMinPrice && matchesMaxPrice;
        });
    };

    sortJerseys = (jerseys) => {
        const { sortBy, sortAsc } = this.state;
        const sizeOrder = { 'XS': 1, 'S': 2, 'M': 3, 'L': 4, 'XL': 5 };

        return jerseys.sort((a, b) => {
            if (sortBy === 'size') {
                const aValue = sizeOrder[a.size] || 0;
                const bValue = sizeOrder[b.size] || 0;
                return sortAsc ? aValue - bValue : bValue - aValue;
            } else if (sortBy === 'team') {
                return sortAsc ? a.team.localeCompare(b.team) : b.team.localeCompare(a.team);
            } else if (sortBy === 'player') {
                return sortAsc ? a.player.localeCompare(b.player) : b.player.localeCompare(a.player);
            } else if (sortBy === 'number') {
                return sortAsc ? a.number - b.number : b.number - a.number;
            } else if (sortBy === 'price') {
                return sortAsc ? a.price - b.price : b.price - a.price;
            }
            return 0;
        });
    };

    render() {
        const { jerseys } = this.props;
        const filteredAndSortedJerseys = this.sortJerseys(this.applyFilters(jerseys));

        return (
            <div>
                <div style={{ marginBottom: "20px" }}>
                    <input
                        type="text"
                        placeholder="Search jerseys..."
                        value={this.state.searchTerm}
                        onChange={this.updateSearchTerm}
                    />
                    <select
                        name="teamFilter"
                        value={this.state.teamFilter}
                        onChange={this.updateFilter}>
                        <option value="">All Teams</option>
                        {['Atlanta Hawks', 'Boston Celtics', 'Brooklyn Nets', 'Charlotte Hornets', 'Chicago Bulls', 'Cleveland Cavaliers', 'Dallas Mavericks', 'Denver Nuggets', 'Detroit Pistons', 'Golden State Warriors', 'Houston Rockets', 'Indiana Pacers', 'LA Clippers', 'Los Angeles Lakers', 'Memphis Grizzlies', 'Miami Heat', 'Milwaukee Bucks', 'Minnesota Timberwolves', 'New Orleans Pelicans', 'New York Knicks', 'Oklahoma City Thunder', 'Orlando Magic', 'Philadelphia 76ers', 'Phoenix Suns', 'Portland Trail Blazers', 'Sacramento Kings', 'San Antonio Spurs', 'Toronto Raptors', 'Utah Jazz', 'Washington Wizards'].map(team => (
                            <option key={team} value={team}>{team}</option>
                        ))}
                    </select>
                    <select
                        name="sizeFilter"
                        value={this.state.sizeFilter}
                        onChange={this.updateFilter}>
                        <option value="">All Sizes</option>
                        {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        name="numberFilter"
                        placeholder="Filter by number..."
                        value={this.state.numberFilter}
                        onChange={this.updateFilter}
                    />
                    Min Price: <input
                        type="range"
                        name="minPriceFilter"
                        min="0"
                        max="500" value={this.state.minPriceFilter}
                        onChange={this.updateFilter}
                    /> ${this.state.minPriceFilter}
                    Max Price: <input
                        type="range"
                        name="maxPriceFilter"
                        min="0"
                        max="500"
                        value={this.state.maxPriceFilter}
                        onChange={this.updateFilter}
                    /> ${this.state.maxPriceFilter}
                </div>
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => this.handleSort('team')}>Team {this.state.sortBy === 'team' && (this.state.sortAsc ? '▲' : '▼')}</th>
                            <th onClick={() => this.handleSort('player')}>Player {this.state.sortBy === 'player' && (this.state.sortAsc ? '▲' : '▼')}</th>
                            <th onClick={() => this.handleSort('number')}>Number {this.state.sortBy === 'number' && (this.state.sortAsc ? '▲' : '▼')}</th>
                            <th onClick={() => this.handleSort('size')}>Size {this.state.sortBy === 'size' && (this.state.sortAsc ? '▲' : '▼')}</th>
                            <th onClick={() => this.handleSort('colour')}>Colour {this.state.sortBy === 'colour' && (this.state.sortAsc ? '▲' : '▼')}</th>
                            <th onClick={() => this.handleSort('price')}>Price {this.state.sortBy === 'price' && (this.state.sortAsc ? '▲' : '▼')}</th>
                            <th>    </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedJerseys.map((jersey) => (
                            <JerseyTableRow key={jersey._id} jersey={jersey} />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
