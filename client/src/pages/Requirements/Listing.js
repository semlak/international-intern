import React from 'react';
import NeedListItem from './NeedListItem';

const Listing = (props) => (
  <div className="" style={{marginLeft: 100 + 'px'}}>
    <br></br>
    <br></br>
    <h1>Requirement Summary</h1>
      <hr></hr>
      <div>
        {props.needs.map(need => <NeedListItem key={need._id} {...need}/>)}
      </div>
  
  </div>
);

export default Listing;