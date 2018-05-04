import React from 'react';

const DropDownContent = props => (
  <option value= {props.needNumber}>
    {props.needNumber} {props.needTitle}
  </option>
);

export default DropDownContent;