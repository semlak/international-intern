import React, { Component } from 'react';
import CreateForm from './CreateForm';
import Ledger from './Ledger';
import Graph from './Graph';
import API from '../../utils/API';

// const expenseData = [
//   { "_id" : ("5ade8e43e0d4991f98664483"), "expDesc" : "cat food", "expAmount" : 12, "expDate" : ("2017-12-31T00:00:00Z"), "__v" : 0 },
//   { "_id" : ("5ade8e8ce0d4991f98664484"), "expDesc" : "pizza", "expAmount" : 15, "expDate" : ("2016-11-30T00:00:00Z"), "__v" : 0},
//   { "_id" : ("5ade8ecde0d4991f98664485"), "expDesc" : "pizza", "expAmount" : 15, "expDate" : ("2016-11-30T00:00:00Z"), "__v" : 0 },
//   { "_id" : ("5ade8f6ee0d4991f98664486"), "expDesc" : "soup", "expAmount" : 144, "expDate" : ("2018-12-30T00:00:00Z"), "__v" : 0 }
// ]

export default class extends Component {
  state = {
    expenseDescription: '',
    date: Date.now(),
    usdAmount: '0.00',
    currencyCode: 'KRW',
    expenseData: [],
  };

  componentDidMount() {
    API.getCurrentUser().then((response) => {
      console.log('response: ', response);
      const currentUser = response.data.user;
      console.log('currentUser is: ', currentUser);
      this.setState({
        currentUser,
      });
    });
    API.getExpenses().then((response) => {
      console.log('API expense response: ', response);
      this.setState({
        expenseData: response.data,
      });
    });
  }

  handleInputChange = event => this.setState({
    [event.target.name]: event.target.value,
  })


  submitForm = (event) => {
    event.preventDefault();
    console.log('current state', this.state);

    if (this.state.expenseDescription &&
      this.state.date &&
      this.state.usdAmount && this.state.currencyCode) {
      const data = {
        expDesc: this.state.expenseDescription,
        expAmount: this.state.usdAmount,
        expDate: this.state.date,
      };

      API.newExpense(data)
        .then((response) => {
          console.log('Response from submitting expense: ', response);
          this.setState({
            expenseDescription: '',
            usdAmount: '0.00',
            date: '',

          });
          API.getExpenses().then((response) => {
            console.log('API expense response: ', response);
            this.setState({
              expenseData: response.data,
            });
          });
        })
        .catch((err) => {
          console.log('Error while submitting expense: ', err);
        });
    } else {
      console.log('Unable to submit ');
    }
  }

  render() {
    return (
      <div>
        <h1>Expenses</h1>
        <CreateForm
          handleInputChange={this.handleInputChange}
          submitForm={this.submitForm}
          {...this.state}
        />
        <Ledger expenses={this.state.expenseData} />
        <Graph expenses={this.state.expenseData} />
      </div>
    );
  }
}
