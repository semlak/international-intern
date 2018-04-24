import React from "react";
import CreateForm from "./CreateForm";
import Ledger from "./Ledger"

const expenseData = [
  { "_id" : ("5ade8e43e0d4991f98664483"), "expDesc" : "cat food", "expAmount" : 12, "expDate" : ("2017-12-31T00:00:00Z"), "__v" : 0 },
  { "_id" : ("5ade8e8ce0d4991f98664484"), "expDesc" : "pizza", "expAmount" : 15, "expDate" : ("2016-11-30T00:00:00Z"), "__v" : 0},
  { "_id" : ("5ade8ecde0d4991f98664485"), "expDesc" : "pizza", "expAmount" : 15, "expDate" : ("2016-11-30T00:00:00Z"), "__v" : 0 },
  { "_id" : ("5ade8f6ee0d4991f98664486"), "expDesc" : "soup", "expAmount" : 144, "expDate" : ("2018-12-30T00:00:00Z"), "__v" : 0 }
]

const Expenses = () => (
  <div style={{marginLeft: 256 + 'px'}}>
    <h1>Expenses</h1>
      <CreateForm />
      <Ledger expenses={expenseData}/>
  </div>
);

export default Expenses;
