import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  // TableRowColumn,
} from 'material-ui/Table';
import Card from 'material-ui/Card';


import ExpenseLedgerItem from './ExpenseLedgerItem';

const Ledger = props => (
// <h1>Ledger</h1>
<Card>
  <Table>
    <TableHeader
      displaySelectAll={false}
      adjustForCheckboxes={false}
    >
      <TableRow>
        <TableHeaderColumn>Date</TableHeaderColumn>
        <TableHeaderColumn>Description</TableHeaderColumn>
        <TableHeaderColumn>Amount USD</TableHeaderColumn>
        <TableHeaderColumn>Amount XXX</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody
      //displaySelectAll={false}
     // adjustForCheckboxes={false}
    >
      {props.expenses.map(expense => <ExpenseLedgerItem key={expense._id} {...expense} />)}
    </TableBody>
  </Table>
  </Card>
);

// const Ledger = (props) => (
//   <div className="expenseLedger" style={{marginLeft: 100 + 'px'}}>
//     <hr></hr>
//     <h1>Ledger</h1>
//     <table>
//       <thead>
//         <tr><th>Date</th><th> </th><th>Description</th><th>Amount USD</th><th>Amount XXX</th></tr>
//       </thead>
//       <tbody>
//         {props.expenses.map(expense => <ExpenseLedgerItem key={expense._id} {...expense}/>)}
//       </tbody>
//     </table>
//     <hr></hr>
//   </div>
// );


export default Ledger;
