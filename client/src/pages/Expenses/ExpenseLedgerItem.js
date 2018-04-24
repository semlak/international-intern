import React from 'react';

const ExpenseLedgerItem = props => <tr><td>{props.expDate}</td><td>{props.expDesc}</td><td>{props.expAmount}</td></tr>

export default ExpenseLedgerItem;
