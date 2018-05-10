import React from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
// import API from '../../utils/API';
// import util from '../../utils/util';

const MapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
  >
    {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lng }} onClick={props.onMarkerClick} />}
  </GoogleMap>
));

export default class extends React.PureComponent {
  state = {
    isMarkerShown: false,
    // lat: 44.9537, // Saint Paul
    // lng: 93.0900,
  }

  componentDidMount() {
    if (this.props.currentUser && this.props.currentUser.username) {
      this.delayedShowMarker();
    }
  }

  componentWillReceiveProps(props) {
    // if (props.currentUser && props.currentUser.username) {
    //   this.setState({
    //     lat: props.currentUser.internLocationLatitude,
    //     lng: props.currentUser.internLocationLongitude,
    //   });
    // }
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  }

  render() {
    return (
      <MapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        lat={this.props.currentUser.internLocationLatitude || 44.9537}
        lng={this.props.currentUser.internLocationLongitude || 93.0900}
      />
    );
  }
}
