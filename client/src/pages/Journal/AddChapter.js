import React from 'react';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
// import firebase from '../../utils/firebase';

const AddChapter = (props) => {

	return (
		<div>
			<h3> Add New Chapter</h3>
			<form>
				<TextField
					floatingLabelText="Title"
					floatingLabelFixed
					name="chapterTitle"
					type="text"
					value={props.chapterTitle}
					onChange={props.handleInputChange}
				/>
				<br />
				<TextField
					floatingLabelText="Description"
					floatingLabelFixed
					name="description"
					type="text"
					value={props.description}
					onChange={props.handleInputChange}
				/>
				<br />
				<input name="date" type="date" step='' value={props.date} placeholder={Date.now()} onChange={props.handleInputChange} />
				<br />
		        <RaisedButton
		          containerElement='label' label='My Label'>
		          <input type="file" onChange={props.handleInputChange} />
		        </RaisedButton>

		        <br />
				<p>Requirement</p>
				<DropDownMenu 
					value={props.reqNum} onChange={props.handleInputChange}>
      				<MenuItem value={1} primaryText="1" />
      				<MenuItem value={2} primaryText="2" />
      				<MenuItem value={3} primaryText="3" />
      				<MenuItem value={4} primaryText="4" />
      				<MenuItem value={5} primaryText="5" />
    			</DropDownMenu>
				<br />
				<RaisedButton 
					label="Add Chapter" 
					primary={true} 
					onClick={props.handleFormSubmit} 
				/>
			</form>
		</div>
	)
}
export default AddChapter;