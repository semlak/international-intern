import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import API from "../../utils/API";

export default class extends Component {
	state = {
		currentUser: null,
		needTitle: "",
		needNote: "",
	}

	handleInputChange = event => this.setState({[event.target.name]: event.target.value})

	submitForm = event => {
		event.preventDefault();
		if (this.state.needTitle.length < 1 || this.state.needNote.length < 1 ) {
				throw new Error("Bad requirement info. This is a crappy error message")
		}
		const data = {
			needTitle: this.state.needTitle,
			needNote: this.state.needNote,
		}
		API.createNeed(data)
			.then(response => {
				console.log("response: ", response);
				this.setState({
					needTitle: "",
					needNote: ""
				});
			})
			.catch(err => console.log("error on need creation", err));
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
			<div>
				<h2>{this.state.currentUser && this.state.currentUser.email ? 
					"User: " + this.state.currentUser.email : 
					"No User Logged in"}
				</h2>
				<form>
					<p>Need Title</p>
					<input name="needTitle" type="text" value={this.state.needTitle} onChange={this.handleInputChange} />
					<p>Requirement Text:</p>
					<textarea name="needNote" type="text" value={this.state.needNote} onChange={this.handleInputChange} />
					<br/>
					<button className="btn btn-primary" onClick={this.submitForm}>Submit</button>

				</form>
				<br/>
				<Link className="btn btn-link" to="/login">Login</Link> 
				<Link className="btn btn-link" to="/register">Register</Link> 
			</div>
		)
	}
}
