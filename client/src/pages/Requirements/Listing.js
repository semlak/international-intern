import React from 'react';
import NeedListItem from './NeedListItem';

const Listing = props => (
  <div>
    {props.needs.map(need => <NeedListItem key={need._id} {...need}/>)}
  </div>
);

export default Listing;
