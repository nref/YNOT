import React from "react";
import PropTypes from "prop-types";
import {RIEInput} from "riek";

const TransactionRow = ({handleMemoChanged, id, category_name, value, memo, created }) => {

    const memoSafe = memo !== null ? memo : "(Empty)";

    const style = memo !== null ? null : { style: { fontStyle: 'italic'}};

    return (
        <tr>
            <td>{category_name}</td>
            <td>${value/1000}</td>
            <td>
                <RIEInput
                    value={memoSafe}
                    change={({newValue}) => handleMemoChanged(newValue, id, category_name)}
                    propName="newValue"
                    // https://github.com/kaivi/riek/issues/47
                    editProps={{ disabled: false }}
                    defaultProps={style}
                />
            </td>
            <td>{created}</td>
        </tr>
    );
};

TransactionRow.propTypes = {
    handleMemoChanged: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    category_name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    // Memo can be null
    memo: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
    created: PropTypes.string.isRequired,
};

export default TransactionRow;