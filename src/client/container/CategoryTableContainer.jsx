import React, { Component } from "react";
import CategoryGroupTable from "../presentation/CategoryGroupTable.jsx";
import config from "../config.js";

export default class CategoryTableContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            category_groups: []
        };

        this.url = `http://${config.serviceHost}:${config.servicePort}/categories`;
        this.handleBudgetedChanged = props.handleBudgetedChanged;
    }

    fetchData(url) {
        this.setState({ isLoading: true });

        console.log(`GET ${this.url}`);

        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({category_groups: data.data.category_groups, isLoading: false}))
    }

    componentDidMount() {
        this.fetchData(this.url);
    }

    render() {

        if (this.state.isLoading) {
            return <p>Loading…</p>;
        }

        return <CategoryGroupTable category_groups={this.state.category_groups}
                                   handleBudgetedChanged={this.handleBudgetedChanged}
        />;
    }
}