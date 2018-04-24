import React from "react";

import ExpenseLedgerItem from "./ExpenseLedgerItem";

const Ledger = (props) => (
  <div className="expenseLedger">
    <table>
      <thead>
        <tr><th>Date</th><th>Description</th><th>Amount</th></tr>
      </thead>
      <tbody>
        {props.expenses.map(expense => <ExpenseLedgerItem key={expense._id} {...expense}/>)}
      </tbody>
    </table>
  </div>
);

export default Ledger;
