import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import CreateForm from './CreateForm';
import Ledger from './Ledger';
import Graph from './Graph';
import API from '../../utils/API';
import Util from '../../utils/util';

const style = {
  height: 350,
};


export default class extends Component {
  state = {
    expenseDescription: '',
    date: '', // '', Date.now(), now working currenlty
    usdAmount: '0.00',
    locationAmount: '0',
    currencyCode: 'KRW',
    expenseData: [],
    selectCurrency: 'usd',
    exchangeRate: '1000',
  };

  componentDidMount() {
    this.updateExpenses(this.props);
    if (this.props.currentUser) {
      const { homeLocationCurrencyCode, internLocationCurrencyCode } = this.props.currentUser;
      Util.getExchangeRate(homeLocationCurrencyCode, internLocationCurrencyCode)
        .then(result => {
          console.log("result from getExchangeRate:", result);
          this.setState({ exchangeRate: result.quote.toFixed(2) });
        })
        .catch(err => console.log("err getting exchangeRate", err));
    }
  }

  componentWillReceiveProps(props) {
    this.updateExpenses(props);
    
  }

  handleDivChange = (event) => {
    console.log("ID from Radio Button: ", event.target.id);
    console.log(event.target.name);
    this.setState({selectCurrency: event.target.id});
  }

  handleInputChange = event => {
     console.log('in handleInputChange, event:', event.target.name, event.target.value);
    this.setState({
    [event.target.name]: event.target.value,
  })
  }

 
  handleInputChangeForNumberFormatField = values => {
    console.log('values', values);
    this.setState({ exchangeRate: values.value });
    return values.floatValue;
  }


  updateExpenses(props) {
    if (props.currentUser) {
      // console.log("in componentWillReceiveProps. New props are: " , props);
      // this is signaling that user is now logged in. so, use the expenses if provided,
      // otherwise retrieve via api
      if (props.currentUser.expRef && props.currentUser.expRef[0] && props.currentUser.expRef[0].expDesc) {
        // console.log("using expenses provided in user");
        this.setState({ expenseData: props.currentUser.expRef });
      } else {
        // console.log("using API to retrieve expenses");
        API.getExpenses().then(response => this.setState({ expenseData: response.data }));
      }
    }
  }

  submitForm = (event) => {
    event.preventDefault();
    // console.log('current state', this.state);


    if (this.state.expenseDescription &&
      this.state.date &&
      (this.state.usdAmount || this.state.locationAmount)) {

        (this.state.usdAmount>0) ? 
          (
            this.state.locationAmount=this.state.usdAmount*this.state.exchangeRate
            // console.log("AMOUNT USD given: ", this.state.locationAmount)
          ):(
            this.state.usdAmount=this.state.locationAmount/this.state.exchangeRate
            // console.log("AMOUNT KRW given: ", this.state.usdAmount)
          );
        

      const data = {
        expDesc: this.state.expenseDescription,
        expAmount: this.state.usdAmount,
        expDate: this.state.date,
        expAmountLocalCurrency: this.state.locationAmount,
      };

      API.newExpense(data)
        .then(() => {
          // console.log('Response from submitting expense: ', response);
          this.setState({
            expenseDescription: '',
            usdAmount: '0.00',
            date: '',
            locationAmount: '0',

          });
          API.getExpenses().then((res) => {
            // console.log('API expense response: ', res);
            this.setState({
              expenseData: res.data,
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
      this.props.currentUser && this.props.currentUser.username ?
        <div>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={4}>
              <Paper style={style}>
                <CreateForm
                  handleDivChange={this.handleDivChange}
                  handleInputChange={this.handleInputChange}
                  handleInputChangeForNumberFormatField={this.handleInputChangeForNumberFormatField}  
                  submitForm={this.submitForm}
                  {...this.state}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Paper style={style}>
                <Graph expenses={this.state.expenseData} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper>
                <Ledger expenses={this.state.expenseData} />
              </Paper>
            </Grid>
          </Grid>
        </div>
        :
        <div><p>Please Loading data...</p></div>
    );
  }
}
