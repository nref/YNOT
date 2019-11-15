import React from "react";
import PropTypes from "prop-types";
import { RIENumber } from 'riek'


const Category = ({handleBudgetedChanged, category }) => (
    <tr>

        <td className="categoryName">
            {category.name}
        </td>

        <td className="categoryBalance">
            Balance: $<span className="categoryBalanceValue">{category.balance/1000}</span>
        </td>

        <td className="categoryBudgeted">
            Budgeted: $<RIENumber
                value={category.budgeted/1000}
                change={({value}) => handleBudgetedChanged(value*1000, category.id, category.name)}
                propName="value"
            />
        </td>

    </tr>
);

Category.propTypes = {
    handleBudgetedChanged: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired
};

export default Category;