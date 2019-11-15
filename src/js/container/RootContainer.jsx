import React, {Component} from "react";
import ReactDOM from "react-dom";

import TransactionTableContainer from "./TransactionTableContainer.jsx";
import CategoryTableContainer from "./CategoryTableContainer.jsx";

class RootContainer extends Component {

    constructor(props){
        super(props);

        this.handleBudgetedChanged = this.handleBudgetedChanged.bind(this);

        this.transactions =  React.createRef();
        this.categories = <CategoryTableContainer handleBudgetedChanged={this.handleBudgetedChanged}/>;
    }

    handleBudgetedChanged(number, id, name) {

        console.log(`Category '${name}' budgeted changed to ${number}`);

        this.transactions.current.add({
            value: number,
            category_name: name,
            category_id: id
        });
    };

    render() {
        return <div className="containerRow">

            <div className="containerColumn">
                <h2>Categories</h2>
                {this.categories}
            </div>

            <div className="containerColumn">
                <h2>Budget History</h2>
                <TransactionTableContainer ref={this.transactions}/>
            </div>

        </div>
    }
}

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<RootContainer/>, wrapper) : false;