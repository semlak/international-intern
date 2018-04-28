// import React from 'react';

// const Requirements = () => (
//   <div>
//     <h1>Requirements and Needs</h1>
//     <p>
//       Nunc pharetra finibus est at efficitur. Praesent sed congue diam. Integer gravida dui mauris,
//       ut interdum nunc egestas sed. Aenean sed mollis diam. Nunc aliquet risus ac finibus porta. Nam
//       quis arcu non lectus tincidunt fermentum. Suspendisse aliquet orci porta quam semper
//       imperdiet. Praesent euismod mi justo, faucibus scelerisque risus cursus in. Sed rhoncus mollis
//       diam, sit amet facilisis lectus blandit at.
//     </p>
//   </div>
// );

// export default Requirements;

import React, {Component} from "react";
import CreateForm from "./CreateForm";
import Listing from "./Listing";
import API from "../../utils/API";


export default class extends Component {

  state = {
    requirementNumber: null,
    requirementTitle: "",
    requirementDesc: "",
    formDisabled: true,
    // date: Date.now(),
    needsData: []
  };

  handleInputChange = event => this.setState({[event.target.name]: event.target.value})

  submitForm = event => {
    event.preventDefault();
    console.log("current state", this.state)

    if (this.state.requirementNumber && 
      this.state.requirementTitle && this.state.requirementDesc) {

      const data = {
        needNumber:this.state.requirementNumber,
        needTitle: this.state.requirementTitle,
        needDesc: this.state.requirementDesc
      }

      API.createNeed(data)
        .then(response => {
          console.log("Response from submitting need: ", response)
          this.setState({
            requirementNumber: this.state.needsData.length + 1,
            requirementTitle: "",
            requirementDesc: ""
          })

          API.getNeeds().then(response => {
            console.log("API needs response: ", response);
            this.setState({
            needsData: response.data,
            requirementNumber: response.data.length + 1,
            formDisabled: false
            })
          })
        })
        .catch(err => {
          console.log("Error while submitting needs: ", err)
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
    API.getNeeds().then(response => {
      console.log("API needs response: ", response);
      this.setState({
        needsData: response.data,
        requirementNumber: response.data.length + 1,
        formDisabled: false
      })
    })
  }

  render() {

    return <div>
      <h1 style = {{marginLeft: 100}}>Requirements</h1>

        <CreateForm handleInputChange={this.handleInputChange} submitForm={this.submitForm} {...this.state}/>
        <Listing needs={this.state.needsData}/>
    </div>
  }
};




