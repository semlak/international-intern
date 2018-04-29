import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const CreateForm = props => (
  <div>
    <form>
      <TextField
        label="Description"
        name="expenseDescription"
        type="text"
        value={props.expenseDescription}
        onChange={props.handleInputChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Amount"
        name="usdAmount"
        type="number"
        step="0.01"
        placeholder="0.00"
        value={props.usdAmount}
        onChange={props.handleInputChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Date"
        type="date"
        name="date"
        value={props.date}
        // placeholder={Date.now()}
        onChange={props.handleInputChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      {/* <input name="date" type="date" value={props.date} placeholder={Date.now()} onChange={props.handleInputChange} /> */}
      <TextField
          label="Currency Code"
          name="currencyCode"
          type="text"
          value={props.currencyCode}
          onChange={props.handleInputChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      <Button variant="raised" onClick={props.submitForm} color="primary">
        Submit
      </Button>
    </form>
  </div>
);

export default CreateForm;
