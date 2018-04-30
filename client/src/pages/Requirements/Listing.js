import React from 'react';
import ReqListItem from './ReqListItem';

const Listing = props => (
  <div>
    {props.needs.map(need => <ReqListItem key={need._id} {...need}/>)}
  </div>
);

export default Listing;
