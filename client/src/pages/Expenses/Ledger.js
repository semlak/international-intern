import React from "react";

import ExpenseLedgerItem from "./ExpenseLedgerItem";

const Ledger = (props) => (
  <div className="expenseLedger" style={{marginLeft: 100 + 'px'}}>
    <hr></hr>
    <h1>Ledger</h1>
    <table>
      <thead>
        <tr><th>Date</th><th> </th><th>Description</th><th>Amount USD</th><th>Amount XXX</th></tr>
      </thead>
      <tbody>
        {props.expenses.map(expense => <ExpenseLedgerItem key={expense._id} {...expense}/>)}
      </tbody>
    </table>
    <hr></hr>
  </div>
);

export default Ledger;
