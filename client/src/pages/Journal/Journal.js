import React, { Component } from 'react';
import firebase from 'firebase';
import AddChapter from './AddChapter';
import ChapterCard from './ChapterCard';
import API from '../../utils/API';
import Grid from 'material-ui/Grid';
import {Button, Typography,} from 'material-ui';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
// import Paper from 'material-ui/Paper';
// import AddItem from '../../components/AddItem';

var config = {
	apiKey: process.env.REACT_APP_FIREBASE_apikey,
	authDomain: process.env.REACT_APP_FIREBASE_authDomain,
	databaseURL: process.env.REACT_APP_FIREBASE_databaseURL,
	projectId: process.env.REACT_APP_FIREBASE_projectId,
	storageBucket: "intern-project-4b679.appspot.com",
	// storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
	messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
};

firebase.initializeApp(config);

export default class extends Component {
  
	state= {
		chapterTitle: "",
		description: "",
		image:"",
		date: "",
		requireNum: 0,
		chapterData:[],
    needsData: [],
    open: false,
	};

	componentDidMount() {
		API.getCurrentUser().then(response=> {
			let currentUser = response.data.user
			this.setState({currentUser: currentUser});
		}).catch(err =>{
			console.log("Error while getting current user: ", err)
		})

		API.getChapters().then(response=> {
			this.setState({
				chapterData: response.data
			})
		}).catch(err =>{
			console.log("Error while getting chapters: ", err)
		})

		API.getNeeds().then(res => {
			this.setState({
			  needsData:res.data
			})
		}).catch(err=>{
			console.log("Error while getting needs: ", err)
		});
	}

	// open err modal
  	errDialogOpen = () => { this.setState({ open: true }); };
  	// close err modal
  	errDialogClose = () => { this.setState({ open: false }); };

	handleInputChange = (event) => this.setState({
    	[event.target.name]: event.target.value,
 	})

	handleFormSubmit = (event) => {
	  event.preventDefault();
	  if (this.state.chapterTitle && this.state.description && this.state.date !== "") {
	    console.log('current state', this.state);
	    let fileButton = document.getElementById("fileButton");
	    let file = fileButton.files[0];
        console.log("THIS: ", this)
	    if (this.state.image !== ""){
	      let image = "";
	      //create storage ref
	      let storageRef = firebase.storage().ref("chapImg/" + Date.now() + file.name);
	      //upload file
	      let task = storageRef.put(file);	
		    task.on('state_changed', 
			  (snapshot) => {
			    console.log("SNAPSHOT:", snapshot);
			  }, 
			  (err) => {
			  },
			  () => {
			    console.log("COMPLETE");
			    storageRef.getDownloadURL().then((url) => {
				  image = url;
				  let data = {
				  	chapTitle: this.state.chapterTitle,
				  	chapNote: this.state.description,
				  	chapImg: image,
				  	reqNum: this.state.requireNum,
				  	chapDate: this.state.date,
				  };

				  API.addChapter(data).then((response) => {
				  	console.log("Response from adding chapter: ", response);
				  	this.setState({
				  	  chapterTitle:"",
				  	  description: "",
				  	  image:"",
				  	  date: "",
					});
				  })
				  .catch((err) => {
			  	  	console.log('Error while adding chapter: ', err);
			  	  	this.setState({ error: "Error while adding chapter."});
			  	  	//launch error dialog
			  	  	this.errDialogOpen();
			  	  	console.error(this.setSate.error, err);
				  })

				  API.getChapters().then((response) => {
					this.setState({
				  	  chapterData:response.data
					});
			  	  });
		  	    });
		      }
		    )
		} else{
		  let data = {
		  	chapTitle: this.state.chapterTitle,
		  	chapNote: this.state.description,
		  	reqNum: this.state.requireNum,
		  	chapDate: this.state.date,
		  };

		  API.addChapter(data).then((response) => {
		  	console.log("Response from adding chapter: ", response);
		  	this.setState({
		  	  chapterTitle:"",
		  	  description: "",
		  	  date: "",
		  	  requireNum:"",
			});
		  })
		  .catch((err) => {
	  	  	console.log('Error while adding chapter: ', err);
	  	  	this.setState({ error: "Error while adding chapter."});
			//launch error dialog
			this.errDialogOpen();
			console.error(this.setSate.error, err);
		  })

		  API.getChapters().then((response) => {
			this.setState({
		  	  chapterData:response.data
			});
	  	  });
		};
	  } else {
		console.log("Unable to add chapter.")
		this.setState({ error: "Incomplete data entered. Chapters require a title, description and date to be added."});
			//launch error dialog
			this.errDialogOpen();
	  }
	}

	deleteChapter = (event) => {
	  console.log("deleting chapter");
	  let deleteButton= document.getElementById("deleteButton");
	  let chapterId = deleteButton.accessKey;

	  //This will delete from database- need to figure out how to get i
	  API.deleteChapter(chapterId).then((response) => {
		console.log("Response from deleting chapter: ", response);
		API.getChapters().then((response) => {
	  	  this.setState({
	  	    chapterData:response.data
	  	  });
		});
	  })
	}


	render() {
		return (
			<div>
		        <Grid container spacing={24}>
		          <Grid item xs={4}>
		           
		            <AddChapter 
		              needs={this.state.needsData}
		              handleInputChange={this.handleInputChange} 
		              handleFormSubmit={this.handleFormSubmit} 
		              {...this.state}
		            />
				  </Grid>
				
	          	  <Grid item xs={4}>
	                <ChapterCard 
	              	  chapters={this.state.chapterData} 
	              	  deleteChapter={this.deleteChapter}
	              	/>
	          	  </Grid>
		        </Grid>

	
				
		        <Dialog
		          open={this.state.open}
		          onClose={this.errDialogClose}
		          aria-labelledby="alert-dialog-title"
		          aria-describedby="alert-dialog-description"
		        >
		          <DialogTitle id="alert-dialog-title">Error</DialogTitle>
		          <DialogContent>
		            <Typography variant="headline">{this.state.error}</Typography>
		          </DialogContent>
		          <DialogActions>
		            <Button onClick={this.errDialogClose} color="primary">
		              OK
		            </Button>
		          </DialogActions>
		        </Dialog>

		  	</div>
		);
	}
}