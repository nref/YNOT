import React from "react";
import PropTypes from "prop-types";
import TransactionRow from "./TransactionRow.jsx";

const TransactionTable = ({handleMemoChanged, rows}) => {
    return <table>
        <thead>
            <tr>
                <td>Category</td>
                <td>Budgeted</td>
                <td>Memo</td>
                <td>Modified</td>
            </tr>
        </thead>

        <tbody>
        {rows.map((row) =>
            <TransactionRow key={row.id}
                            handleMemoChanged={handleMemoChanged}
                            {...row}/>
        )}</tbody>

    </table>
};

TransactionTable.propTypes = {
    handleMemoChanged: PropTypes.func.isRequired,
    rows: PropTypes.array.isRequired,
};

export default TransactionTable;
