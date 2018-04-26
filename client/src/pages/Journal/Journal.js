import React, { Component } from 'react';
import AddChapter from './AddChapter';
import ChapterCard from './ChapterCard';
import API from '../../utils/API';

export default class extends Component {
  state = {
    chapterTitle: '',
    description: '',
    date: Date.now(),
    image: '',
    reqNum: '0',
  };

  componentDidMount() {
    API.getCurrentUser().then((response) => {
      console.log('response: ', response);
      const currentUser = response.data.user;
      console.log('currentUser is: ', currentUser);
      this.setState({ currentUser });
    });
    // API.getChapters().then(response=> {
    // 	console.log("API chapter response: " , response);
    // 	this.setState({
    // 		chapterData: response.data
    // 	})
    // })
  }


	handleFormSubmit = (event) => {
	  event.preventDefault();
	  console.log('current state', this.state);

	  if (this.state.chapterTitle &&
			this.state.description &&
			this.state.date && this.state.reqNum) {
	    const data = {
	      chapTitle: this.state.chapterTitle,
	      chapNote: this.state.description,
	      chapDate: this.state.date,
	      imgURL: this.state.image,
	      reqNum: this.state.reqNum,
	    };
	    API.addChapter(data)
	      .then((response) => {
	        console.log('Response from adding chapter: ', response);
	        this.setState({
	          chapterTitle: '',
	          description: '',
	          date: '',
	          reqNum: 0,
	        });
	      })
	      .catch((err) => {
	        console.log('Error while adding chapter: ', err);
	      });
	  } else {
	    console.log('Unable to add chapter.');
	  }
	}


  handleInputChange = event => this.setState({ [event.target.name]: event.target.value })

  render() {
    return (
      <div>
        <h1>Journal</h1>
        <AddChapter
          handleInputChange={this.handleInputChange}
          handleFormSubmit={this.handleFormSubmit}
          {...this.state}
        />
        <ChapterCard card={this.state.chapterData} />
      </div>);
  }
}
