import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
// import firebase from '../../utils/firebase';

const AddChapter = (props) => {

	return (
		<div>
			<h3> Add New Chapter</h3>
			<form>
				<p>Title</p>
				<input name="chapterTitle" type="text" value={props.chapterTitle} onChange={props.handleInputChange} />
				<p>Description</p>
				<input namme="description" tyoe="text" defaultValue={props.description} onChange={props.handleInputChange} />
				<p>Date</p>
				<input name="date" type="date" value={props.date} placeholder={Date.now()} onChange={props.handleInputChange} />
				<p>Image</p>
		        <RaisedButton
		          containerElement='label' label='My Label'>
		          <input type="file" onChange={props.handleInputChange} />
		        </RaisedButton>

				<p>Requirement</p>
				<DropDownMenu value={props.numReq} onChange={props.handleInputChange}>
      				<MenuItem value={1} primaryText="1" />
      				<MenuItem value={2} primaryText="2" />
      				<MenuItem value={3} primaryText="3" />
      				<MenuItem value={4} primaryText="4" />
      				<MenuItem value={5} primaryText="5" />
    			</DropDownMenu>
				<br />
				<button className="btn btn-primary mt-2" onClick={props.handleFormSubmit}>Add Chapter</button>
			</form>
		</div>
	)
}
export default AddChapter;