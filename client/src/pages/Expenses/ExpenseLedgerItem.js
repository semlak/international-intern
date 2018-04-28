import React from 'react';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const ExpenseLedgerItem = props =>
  <TableRow>
    <TableRowColumn>{props.expDate.slice(0, 10)}</TableRowColumn>
    <TableRowColumn>{props.expDesc}</TableRowColumn>
    <TableRowColumn>{props.expAmount.toFixed(2)}</TableRowColumn>
  </TableRow>;

// <tr>
//   <td style = {{paddingRight: 30}}>{props.expDate.slice(0, 10)}</td>
//   <td> </td>
//   <td>{props.expDesc}</td>
//   <td align="right">{props.expAmount.toFixed(2)}</td>
// </tr>

export default ExpenseLedgerItem;
