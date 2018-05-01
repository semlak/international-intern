import React, { Component } from 'react';
import firebase from 'firebase';
import AddChapter from './AddChapter';
import ChapterCard from './ChapterCard';
import API from '../../utils/API';

var config = {
	apiKey: process.env.REACT_APP_FIREBASE_apikey,
	authDomain: process.env.REACT_APP_FIREBASE_authDomain,
	databaseURL: process.env.REACT_APP_FIREBASE_databaseURL,
	projectId: process.env.EACT_APP_FIREBASE_projectId,
	storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
	messagingSenderId: process.envREACT_APP_FIREBASE_messagingSenderId
};

firebase.initializeApp(config);

export default class extends Component {
  
	state= {
		chapterTitle: "",
		description: "",
		image:"",
		date: Date.now(),
		requireNum: '0',
		chapterData:[]
	};

	componentDidMount() {
		API.getCurrentUser().then(response=> {
			// console.log("response: ", response);
			let currentUser = response.data.user
			// console.log("currentUser is: " , currentUser);
			this.setState({currentUser: currentUser});
		}).catch(err =>{
			console.log("Error while getting current user: ", err)
		})
		API.getChapters().then(response=> {
			// console.log("API chapter response: " , response);
			console.log('response is: ', response)
			this.setState({
				chapterData: response.data
			})
		}).catch(err =>{
			console.log("Error while getting chapters: ", err)
		})
	}

	handleInputChange = (event) => this.setState({
    	[event.target.name]: event.target.value,
 	})

	handleFormSubmit = (event) => {
	  event.preventDefault();
	  console.log('current state', this.state);

	  let file = this.state.image;
      let image = "";

	  //get file
	  // let file = fileButton.files[0];
	  // console.log(file);

	  //create storage ref
    try {
	  let storageRef = firebase.storage().ref("chapter_pics/" + Date.now() + file.name);

	  //upload file
	  let task = storageRef.put(file);

	  // image = "";

	  //update progress bar
	  task.on('state_changed', 
		function progress(snapshot) {
			console.log(snapshot);
		}, 
		function error (err) {
		}, 

		function complete() {
			console.log("COMPLETE");

			storageRef.getDownloadURL().then(function(url) {
				image = url;
				// localSotrage.setItem('chapUrl', image);
				console.log(image);
		            });

    	});
    } catch (err) {
      console.log("error setting local storage")
    }


	  if (this.state.chapterTitle &&
			this.state.description &&
			this.state.date) {

			const data = {
				chapTitle: this.state.chapterTitle,
				chapNote: this.state.description,
				chapImage: image,
				chapDate: this.state.date,
				reqNum: this.state.requireNum
			};
			API.addChapter(data)
				.then((response) => {
					console.log("Response from adding chapter: ", response)
					this.setState({
						chapterTitle:"",
						description: "",
						image:"",
						date: "",
						requireNum: 0
					});
					API.getChapters().then((response) => {
						this.setState({
							chapterData: response.data,
						});
					});
				})
				.catch((err) => {
					console.log('Error while adding chapter: ', err);
				});
		} else {
			console.log("Unable to add chapter.")
		}
	}

	render() {
		return (
			<div>
		    	<h1>Journal</h1>
		    	<AddChapter handleInputChange={this.handleInputChange} handleFormSubmit={this.handleFormSubmit} {...this.state}/>
		    	<ChapterCard chapters={this.state.chapterData} />
		  	</div>
		);
	}
}
