import React, { Component } from "react";
import CategoryGroupTable from "../presentation/CategoryGroupTable.jsx";

export default class CategoryTableContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            category_groups: []
        };

        this.handleBudgetedChanged = props.handleBudgetedChanged;
    }

    fetchData(url) {
        this.setState({ isLoading: true });

        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({category_groups: data.data.category_groups, isLoading: false}))
    }

    componentDidMount() {
        this.fetchData('http://localhost:3000/categories');
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