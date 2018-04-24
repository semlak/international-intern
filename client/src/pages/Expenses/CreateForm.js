import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import API from "../../utils/API";

export default class extends Component {
	state = {
		expenseDescription: "",
		date: Date.now(),
		usdAmount: '0.00',
		currencyCode: "KRW"
	}

	handleInputChange = event => this.setState({[event.target.name]: event.target.value})

	submitForm = event => {
		event.preventDefault();
		console.log("current state", this.state)

		if (this.state.expenseDescription && 
			this.state.date && 
			this.state.usdAmount && this.state.currencyCode) {

			const data = {
				expDesc:this.state.expenseDescription,
				expAmount: this.state.usdAmount,
				expDate: this.state.date

			}
			API.newExpense(data)
				.then(response => {
					console.log("Response from submitting expense: ", response)
					this.setState({
						expenseDescription: "",
						useAmount: '0.00', 
		
					})
				})
				.catch(err => {
					console.log("Error while submitting expense: ", err)
				})
			}

		else {
			console.log("Unable to submit ")
		}
	}

	componentDidMount() {
		API.getCurrentUser().then(response=> {
			console.log("response: ", response);
			let currentUser = response.data.user
			console.log("currentUser is: " , currentUser);
			this.setState({currentUser: currentUser});
		})
	}

	render() {
		return (
			<div style={{marginLeft: 256 + 'px'}}>
				<h1>Add New Expense</h1>
				<form>
					<p>Description</p>
					<input name="expenseDescription" type="text" value={this.state.expenseDescription} onChange={this.handleInputChange} />
					<p>Amount</p>
					<input name="usdAmount" type="number" step='0.01' value={this.state.usdAmount} placeholder='0.00' onChange={this.handleInputChange} />

					<p>Date</p>
					<input name="date" type="date" step='' value={this.state.date} placeholder={Date.now()} onChange={this.handleInputChange} />
					<p>Currency</p>
					<input name="currencyCode" type="text" value={this.state.currencyCode} onChange={this.handleInputChange} />
					<br/>
					<button className="btn btn-primary" onClick={this.submitForm}>Submit Expense</button>
				</form>
			</div>
		)
	}
}