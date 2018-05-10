import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
// import util from '../../utils/util';

export default class extends Component {
  state = {
    homeTZName: '',
    internTZName: '',
    tzDiff: '',
  };

  componentDidMount() {
    if (this.props.currentUser && typeof this.props.currentUser === 'object') {
      this.deconstructTZData(this.props);
    }
  }

  componentWillReceiveProps(props) {
    // Sample Timezone data
    // {
    //    "dstOffset" : 3600,
    //    "rawOffset" : -18000,
    //    "status" : "OK",
    //    "timeZoneId" : "America/New_York",
    //    "timeZoneName" : "Eastern Daylight Time"
    // }
    if (props.currentUser && typeof props.currentUser === 'object') {
      this.deconstructTZData(props);
    }
  }

  deconstructTZData(props) {
    if (!props.currentUser.homeLocationTimezone ||
        !props.currentUser.internLocationTimezone) {
      console.error('Unable to retrieve all required props from currentUser. You may need to ensure that the fields \'homeLocationCity\' and \'internLocationCity\' are populated.');
      return;
    }
    const homeTZ = JSON.parse(props.currentUser.homeLocationTimezone);
    const internTZ = JSON.parse(props.currentUser.internLocationTimezone);
    const homeTime = parseInt(homeTZ.dstOffset, 10) + parseInt(homeTZ.rawOffset, 10);
    const internTime = parseInt(internTZ.dstOffset, 10) + parseInt(internTZ.rawOffset, 10);
    // console.log('homeTZ:', homeTZ, 'internTZ:', internTZ);
    // console.log('homeTime:', homeTime, 'internTime:', internTime);
    this.setState({
      homeTZName: homeTZ.timeZoneName,
      internTZName: internTZ.timeZoneName,
      tzDiff: ((homeTime - internTime) / 3600),
    });
  }

  render() {
    return (
      <div>
        <Typography variant="headline">Timezone</Typography>
        <Typography variant="body2">Home:</Typography>
        <Typography variant="subheading">{this.state.homeTZName}</Typography>
        <Typography variant="body2">Internship:</Typography>
        <Typography variant="subheading">{this.state.internTZName}</Typography>
        <Typography variant="body2">Difference to Home: {this.state.tzDiff} hours</Typography>
      </div>
    );
  }
}
