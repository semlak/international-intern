import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import API from "../../utils/API";

export default class extends Component {
	state = {
		currentUser: "",
		username: "",
		password: "", 
	}

	handleInputChange = event => this.setState({[event.target.name]: event.target.value})

	submitForm = event => {
		event.preventDefault();
		if (this.state.password.length < 1 && this.state.username.length < 1 ) {
				throw new Error("Bad login info. This is a crappy error message")
		}
		const data = {
			username: this.state.username,
			password: this.state.password,
		}
		API.loginUser(data)
			.then(response => {
				console.log("response: ", response);
				let user = response.data.user;
				console.log("User: ", user);
				this.setState({currentUser: user, username: "", password: ""});

			})
			.catch(err => console.log("error on login", err));
	}
	logoff = event => {
		event.preventDefault();
		API.logoutUser().then(response => this.setState({currentUser: null}))
	}

	componentDidMount() {
		API.getCurrentUser().then(response=> {
			console.log("response: ", response);
			let currentUser = response.data.user
			console.log("currentUser is: " , currentUser);
			this.setState({currentUser: currentUser});
		})
		API.getNeeds()
			.then(needs => console.log("needs: ", needs))
			.catch(err => console.log("error while retreiving needs: ", err))


	}

	render() {
		return (
			<div>
				<h1>Example Login Form</h1>
				<h2>{this.state.currentUser && this.state.currentUser.email ? 
					"User: " + this.state.currentUser.email : 
					"No User Logged in"}
				</h2>
				<form>
					<p>Username</p>
					<input name="username" type="text" value={this.state.username} onChange={this.handleInputChange} />
					<p>Password</p>
					<input name="password" type="password" value={this.state.password} onChange={this.handleInputChange} />
					<br/>
					<button className="btn btn-primary" onClick={this.submitForm}>Login</button>
					<button className="btn btn-warning" onClick={this.logoff}>Logoff</button>

				</form>
				<br/>
				<Link className="btn btn-link" to="/register">Register</Link> 
				<Link className="btn btn-link" to="/newNeed">New Need</Link> 
			</div>
		)
	}
}