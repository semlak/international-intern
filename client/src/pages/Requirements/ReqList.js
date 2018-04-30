import React from 'react';
import ReqListItem from './ReqListItem';

const ReqList = props => (
  <div>
    {props.needs.map(need => <ReqListItem key={need._id} {...need}/>)}
  </div>
);

export default ReqList;
