import React from 'react';

const ExpenseLedgerItem = props => <tr><td style = {{paddingRight: 30}}>{props.expDate.slice(0, 10)}</td><td> </td><td>{props.expDesc}</td><td align="right">{props.expAmount.toFixed(2)}</td></tr>

export default ExpenseLedgerItem;
