import React from 'react';
// import API from '../../utils/API';
import Map from './Map';
import Weather from './Weather';
import Currency from './Currency';
import News from './News';

// move to registration page
// const googleMapsClient = require('@google/maps').createClient({
//   key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//   Promise,
// });

// export default class extends Component {
//   state = {
//     currentUser: {},
//     place_id: '',
//     lat: '',
//     lng: '',
//     country_code: '',
//   };

//   componentDidMount() {
//     API.getCurrentUser().then((response) => {
//       const currentUser = response.data.user;
//       this.setState({ currentUser });
//     }).catch((err) => {
//       console.log('Error while getting current user: ', err);
//     });

//     // TODO - move this location loookup to the registration/profile page(s)
//     googleMapsClient.geocode({ address: `${this.state.currentUser.internLocationCity}, ${this.state.currentUser.internLocationCountry}` }).asPromise().then((geo) => {
//       const place_obj = {
//         place_id: geo.results[0].place_id,
//         lat: geo.results[0].geometry.location.lat,
//         lng: geo.results[0].geometry.location.lng,
//       };
//       for (let i = 0; i < geo.data.results[0].address_components.length; i++) {
//         if (geo.data.results[0].address_components[i].types[0] === 'country') {
//           place_obj.country_code = geo.data.results[0].address_components[i].short_name;
//           // TODO - the updateUser route and functions
//           // API.updateUser();
//           break;
//         }
//       }
//       this.setState(place_obj);
//     }).catch((err) => {
//       console.log(err);
//     });
//   }

//   render() {
//     return (
//       <div>
//         <h1>Location</h1>
//         <Map _state={this.state} />
//         <hr />
//         <Weather _state={this.state} />
//         <hr />
//         <Currency _state={this.state} />
//         <hr />
//         <News _state={this.state} />
//       </div>
//     );
//   }
// }

// in the call below, I'm hardcoding lat/lng for now
// TODO - get lat/lng into the props
const Location = props => (
  <div>
    <h1>Location</h1>
    <hr />
    <Map {...props} />
    <hr />
    <Weather {...props} />
    <hr />
    <Currency {...props} />
    <hr />
    <News {...props} />
  </div>
);

export default Location;
