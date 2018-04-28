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


// class Ledger extends React.Component {
//   render() {
//     return <h2>Hello</h2>;
//   }
// }

const Ledger = props => (
// <h1>Ledger</h1>
<Card>
  <Table>
  <TableHeader></TableHeader>
  <TableBody>
    <TableRow></TableRow>
  </TableBody>
    {/* <TableHeader
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
    <TableBody>
      {props.expenses.map(expense => <ExpenseLedgerItem key={expense._id} {...expense} />)}
    </TableBody> */}
  </Table>
  </Card>
);

export default Ledger;


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



