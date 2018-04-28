import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

const CreateForm = (props) => {
  return (
    <Card>
      <CardHeader
        title="Add Expense"
      />

      <form>
        <TextField
          floatingLabelText="Description"
          floatingLabelFixed
          name="expenseDescription"
          type="text"
          value={props.expenseDescription}
          onChange={props.handleInputChange}
        />
        <TextField
          floatingLabelText="Amount"
          floatingLabelFixed
          name="usdAmount"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={props.usdAmount}
          onChange={props.handleInputChange}
        />
        {/* <DatePicker
          floatingLabelText="Date"
          name="date"

        /> */}
        <input name="date" type="date" step='' value={props.date} placeholder={Date.now()} onChange={props.handleInputChange} />
        <TextField
          floatingLabelText="Currency Code"
          floatingLabelFixed
          name="currencyCode"
          type="text"
          value={props.currencyCode}
          onChange={props.handleInputChange}
        />
        <RaisedButton
          label="Submit"
          primary={true}
          onClick={props.submitForm} 
        />
      </form>
    </Card>
  );
};

export default CreateForm;
