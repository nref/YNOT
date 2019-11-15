import React from "react";
import PropTypes from "prop-types";
import Category from "./Category.jsx";

const CategoryGroup = ({handleBudgetedChanged, category_group}) => {

    const mappedCategory =
        <table>
            <tbody>
                {category_group.categories.map(category =>
                    <Category key={category.id}
                              category={category}
                              handleBudgetedChanged={handleBudgetedChanged}
                    />
                )}
            </tbody>
        </table>;

    return <div>
        <h3>{category_group.name}</h3>
        {mappedCategory}
    </div>;
};

CategoryGroup.propTypes = {
    handleBudgetedChanged: PropTypes.func.isRequired,
    category_group: PropTypes.object.isRequired,
};

export default CategoryGroup;