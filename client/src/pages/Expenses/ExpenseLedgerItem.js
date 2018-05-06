import React from 'react';
import { TableRow, TableCell } from 'material-ui/Table';

const ExpenseLedgerItem = props =>(
  <TableRow>
    <TableCell>{props.expDate.slice(0, 10)}</TableCell>
    <TableCell>{props.expDesc}</TableCell>
    <TableCell>{props.expAmount.toFixed(2)}</TableCell>
    <TableCell>{props.expAmountLocalCurrency.toFixed(2)}</TableCell>
    <TableCell />
  </TableRow>
);

export default ExpenseLedgerItem;
