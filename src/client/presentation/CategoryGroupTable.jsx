import React from "react";
import PropTypes from "prop-types";
import CategoryGroup from "./CategoryGroup.jsx";

const CategoryGroupTable = ({handleBudgetedChanged, category_groups}) => {
    return category_groups
        .filter(category_group => category_group.name !== "Internal Master Category")
        .filter(category_group => category_group.categories.length !== 0)
        .map(category_group =>
            <CategoryGroup key={category_group.id}
                           category_group={category_group}
                           handleBudgetedChanged={handleBudgetedChanged}
            />
    )
};

CategoryGroupTable.propTypes = {
    handleBudgetedChanged: PropTypes.func.isRequired,
    category_groups: PropTypes.array.isRequired,
};

export default CategoryGroupTable;
