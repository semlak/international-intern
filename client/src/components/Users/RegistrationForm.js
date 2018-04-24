import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import API from "../../utils/API";

export default class extends Component {
	state = {
		currentUser: "",
		username: "",
		email: "",
		password: "", 
		passwordConfirm: "",
		fullname: "",
		homeLocation: "", 
		internLocation: ""
	}

	handleInputChange = event => this.setState({[event.target.name]: event.target.value})

	submitForm = event => {
		event.preventDefault();
		if (this.state.password !== this.state.passwordConfirm && 
			this.state.password.length < 1 &&
			this.state.username.length < 1 && 
			this.state.email.length < 1) {
				throw new Error("Bad login info. This is a crappy error message")
		}
		const data = {
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
			fullname: this.state.fullname,
			homeLocation: this.state.homeLocation,
			internLocation: this.state.internLocation
		}
		API.registerUser(data)
			.then(response => {
				let newUser = response.data.user;
				console.log("newUser: ", newUser);
				this.setState({
					currentUser: newUser,
					email: "", password: "", passwordConfirm: "",
					fullname: "", homeLocation: "", internLocation: ""
				});
			})
			.catch(err => console.log("error on registration", err));
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
				<h1>Example Registration Form</h1>
				<h2>{this.state.currentUser && this.state.currentUser.email ? 
					"User: " + this.state.currentUser.email : 
					"No User Logged in"}
				</h2>
				<form>
					<p>Username</p>
					<input name="username" type="text" value={this.state.username} onChange={this.handleInputChange} />
					<p>Email</p>
					<input name="email" type="text" value={this.state.email} onChange={this.handleInputChange} />
					<p>Enter Password</p>
					<input name="password" type="password" value={this.state.password} onChange={this.handleInputChange} />
					<p>Confirm Password</p>
					<input name="passwordConfirm" type="password" value={this.state.passwordConfirm} onChange={this.handleInputChange} />
					<p>Full Name</p>
					<input name="fullname" type="text" value={this.state.fullname} onChange={this.handleInputChange} />
					<p>Home Location</p>
					<input name="homeLocation" type="text" value={this.state.homeLocation} onChange={this.handleInputChange} />
					<p>Internship Location</p>
					<input name="internLocation" type="text" value={this.state.internLocation} onChange={this.handleInputChange} />
					<br/>
					<button className="btn btn-primary" onClick={this.submitForm}>Register</button>

				</form>
				<Link className="btn btn-link" to="/login">Login</Link> 
			</div>
		)
	}
}