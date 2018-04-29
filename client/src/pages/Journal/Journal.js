import React, { Component } from 'react';
import AddChapter from './AddChapter';
import ChapterCard from './ChapterCard';
import firebase from 'firebase';
import API from '../../utils/API';

// const chapterData = [
//   { "_id" : ("1"), "chapDate" : "2018/04/27", "chapTitle" : "Australia Arrival", "chapNote" : "Arrived in Australia. Everything is great!", "reqNum" : 1,  "__v" : 0 },
//   { "_id" : ("2"), "chapDate" : "2018/04/28", "chapTitle" : "Snorkling", "chapNote" : "Snorkled the Great Barrier Reef! WOOOOO!", "reqNum" : 2,  "__v" : 0 },
//   { "_id" : ("3"), "chapDate" : "2018/04/29", "chapTitle" : "Shopping", "chapNote" : "Shopped at the QVB today!", "reqNum" : 3,  "__v" : 0 }
// ]

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


	  //get file
	  // let file = fileButton.files[0];
	  // console.log(file);

	  //create storage ref
	  let storageRef = firebase.storage().ref("chapter_pics/" + Date.now() + file.name);

	  //upload file
	  let task = storageRef.put(file);

	  let image = "";

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
