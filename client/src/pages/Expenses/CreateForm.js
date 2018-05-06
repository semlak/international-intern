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
      <p>Enter Expense</p>
      <label>
        <input type="radio" 
        id="usd" 
        name="selectCurrency" 
        
        value={1}
        onClick={props.handleDivChange}
        />
          USD
      </label> 
      <label>
        <input type="radio" 
        id="other" 
        name="selectCurrency" 
        value={2}
        onClick={props.handleDivChange}
        /> 
          KRW
      </label>
      <br />

      {(props.selectCurrency==="usd") ? (
      <TextField
        label="USD Amount"
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
      ):(

      <TextField
        label="KRW Amount"
        name="locationAmount"
        type="number"
        placeholder="0"
        value={props.locationAmount}
        onChange={props.handleInputChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      )}
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
          label="Exchange Rate"
          name="exchangerate"
          type="number"
          placeholder={props.exchangeRate}
          // value={props.currencyCode}
          // onChange={props.handleInputChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      <br />
      <br />
      <Button variant="raised" onClick={props.submitForm} color="primary">
        Submit
      </Button>
    </form>
  </div>
);

export default CreateForm;