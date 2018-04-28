import React, { Component } from 'react';
import AddChapter from './AddChapter';
import ChapterCard from './ChapterCard';
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

	  if (this.state.chapterTitle &&
			this.state.description &&
			this.state.date) {

			const data = {
				chapTitle: this.state.chapterTitle,
				chapNote: this.state.description,
				chapDate: this.state.date,
				reqNum: this.state.requireNum
			};
			API.addChapter(data)
				.then((response) => {
					console.log("Response from adding chapter: ", response)
					this.setState({
						chapterTitle:"",
						description: "",
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
