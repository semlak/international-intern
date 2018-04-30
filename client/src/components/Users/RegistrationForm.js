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
    homeLocationCity: "", 
    homeLocationCountry: "", 
    internLocationCity: "",
    internLocationCountry: "",
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
			homeLocationCity: this.state.homeLocationCity,
			homeLocationCountry: this.state.homeLocationCountry,
			internLocationCity: this.state.internLocationCity,
			internLocationCountry: this.state.internLocationCountry,
		}
		API.registerUser(data)
			.then(response => {
				let newUser = response.data.user;
				//console.log("newUser: ", newUser);
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
			//console.log("response: ", response);
			let currentUser = response.data.user
			//console.log("currentUser is: " , currentUser);
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
          <p>Home Location City</p>
          <input name="homeLocationCity" type="text" value={this.state.homeLocationCity} onChange={this.handleInputChange} />
          <p>Home Location Country</p>
          <input name="homeLocationCountry" type="text" value={this.state.homeLocationCountry} onChange={this.handleInputChange} />
          <p>Internship Location City</p>
          <input name="internLocationCity" type="text" value={this.state.internLocationCity} onChange={this.handleInputChange} />
          <p>Internship Location Country</p>
          <input name="internLocationCountry" type="text" value={this.state.internLocationCountry} onChange={this.handleInputChange} />
          <br/>
          <button onClick={this.submitForm}>Register</button>
        </form>
        {/* <Link to="/login">Login</Link>  */}
      </div>
    )
  }
}