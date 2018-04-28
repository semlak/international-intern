import React from 'react';

const CreateForm = (props) => {



	return (<div style = {{marginLeft: 100}}>
				<h3>Add New Expense</h3>
				<form>
					<p>Description</p>
					<input name="expenseDescription" type="text" value={props.expenseDescription} onChange={props.handleInputChange} />
					<p>Amount</p>
					<input name="usdAmount" type="number" step='0.01' value={props.usdAmount} placeholder='0.00' onChange={props.handleInputChange} />

					<p>Date</p>
					<input name="date" type="date" step='' value={props.date} placeholder={Date.now()} onChange={props.handleInputChange} />
					<p>Currency</p>
					<input name="currencyCode" type="text" value={props.currencyCode} onChange={props.handleInputChange} />
					<br/>
					<button onClick={props.submitForm}>Submit Expense</button>
				</form>
			</div>
		)
	
}

export default CreateForm;