import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import ReqForm from './ReqForm';
import ReqList from './ReqList';
import API from '../../utils/API';
import AddItem from '../../components/AddItem';

export default class extends Component {
  state = {
    requirementNumber: null,
    requirementTitle: '',
    requirementDesc: '',
    formDisabled: true,
    // date: Date.now(),
    needsData: []
  };

  componentDidMount() {
    API.getCurrentUser().then((response) => {
      // console.log('response: ', response);
      const currentUser = response.data.user;
      // console.log('currentUser is: ', currentUser);
      this.setState({ currentUser });
    });
    API.getNeeds().then((response) => {
      // console.log('API needs response: ', response);
      this.setState({
        needsData: response.data,
        requirementNumber: response.data.length + 1,
        formDisabled: false
      });
    });
  }

  submitForm = (event) => {
    event.preventDefault();
    // console.log('current state', this.state);

    if (this.state.requirementNumber &&
      this.state.requirementTitle && this.state.requirementDesc) {
      const data = {
        needNumber: this.state.requirementNumber,
        needTitle: this.state.requirementTitle,
        needDesc: this.state.requirementDesc
      };

      API.createNeed(data)
        .then((response) => {
          // console.log('Response from submitting need: ', response);
          this.setState({
            requirementNumber: this.state.needsData.length + 1,
            requirementTitle: '',
            requirementDesc: ''
          });

          API.getNeeds().then((response) => {
            // console.log('API needs response: ', response);
            this.setState({
              needsData: response.data,
              requirementNumber: response.data.length + 1,
              formDisabled: false
            });
          });
        })
        .catch((err) => {
          console.log('Error while submitting needs: ', err);
        });
    } else {
      console.log('Unable to submit ');
    }
  }


  handleInputChange = event => this.setState({ [event.target.name]: event.target.value })

  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={6} sm={6}>
            <ReqForm
              handleInputChange={this.handleInputChange}
              submitForm={this.submitForm}
              {...this.state}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography variant="title" gutterBottom>Requirements</Typography>
            <ReqList needs={this.state.needsData} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

