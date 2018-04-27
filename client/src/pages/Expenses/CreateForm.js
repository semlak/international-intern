import React, {Component} from 'react';
import {Link} from 'react-router-dom';
// import API from "../../utils/API";

const CreateForm = (props) => {
	// state = {
	// 	expenseDescription: "",
	// 	date: Date.now(),
	// 	usdAmount: '0.00',
	// 	currencyCode: "KRW"
	// }

	// handleInputChange = event => this.setState({[event.target.name]: event.target.value})

	// submitForm = event => {
	// 	event.preventDefault();
	// 	console.log("current state", this.state)

	// 	if (this.state.expenseDescription && 
	// 		this.state.date && 
	// 		this.state.usdAmount && this.state.currencyCode) {

	// 		const data = {
	// 			expDesc:this.state.expenseDescription,
	// 			expAmount: this.state.usdAmount,
	// 			expDate: this.state.date

	// 		}
	// 		API.newExpense(data)
	// 			.then(response => {
	// 				console.log("Response from submitting expense: ", response)
	// 				this.setState({
	// 					expenseDescription: "",
	// 					usdAmount: '0.00',
	// 					date: "" 
		
	// 				})
	// 			})
	// 			.catch(err => {
	// 				console.log("Error while submitting expense: ", err)
	// 			})
	// 		}

	// 	else {
	// 		console.log("Unable to submit ")
	// 	}
	// }

	// componentDidMount() {
	// 	API.getCurrentUser().then(response=> {
	// 		console.log("response: ", response);
	// 		let currentUser = response.data.user
	// 		console.log("currentUser is: " , currentUser);
	// 		this.setState({currentUser: currentUser});
	// 	})
	// }


	return (<div>
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