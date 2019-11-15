import React, { Component } from "react";
import TransactionTable from "../presentation/TransactionTable.jsx";
import config from "../config.js";

export default class TransactionTableContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFirstLoad: true,
            transactions: []
        };

        this.url = `http://${config.serviceHost}:${config.servicePort}/transactions`;
        this.handleMemoChanged = this.handleMemoChanged.bind(this);
    }

    fetchData (url) {
        console.log(`GET ${this.url}`);

        fetch(url)
            .then(response => response.json())
            .then(transactions => transactions.sort((a, b) => a.created < b.created ? 1 : -1))
            .then(transactions => this.setState({transactions, isFirstLoad: false}));
    }

    componentDidMount() {
        this.fetchData(this.url);
    }

    add(data) {
        console.log(`POST ${this.url} ${JSON.stringify(data)}`);

        fetch(this.url, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            console.log(response.status);

            if (response.status === 200){
                this.fetchData(this.url);
            }
        });
    }

    handleMemoChanged(newValue, transaction_id, category_name) {

        console.log(`Transaction for '${category_name}' memo changed to ${newValue}`);

        const data = {
            transaction_id,
            memo: newValue
        };

        console.log(`PUT ${this.url} ${JSON.stringify(data)}`);

        fetch(this.url, {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            console.log(response.status);
        });
    };

    render() {

        if (this.state.isLoading) {
            return <p>Loading…</p>;
        }

        return <TransactionTable handleMemoChanged={this.handleMemoChanged}
                                 rows={this.state.transactions}/>;
    }
}