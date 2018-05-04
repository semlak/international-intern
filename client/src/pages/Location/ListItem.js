import React from 'react';

const ListItem = props => (
	<div>
	  <div style = {{marginBottom: 40}}>
	  	<img src = {props.nytimage} style = {{float: 'left', marginRight: 10}}/>
	    <a href = {props.url} target="_blank">{props.title}</a>
	    <p style = {{marginTop: 0, marginBottom: 5}}>{props.snippet}</p>
	  </div>
   </div>
);

export default ListItem;
