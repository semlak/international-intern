import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import firebase from '../../utils/firebase';

const AddChapter = (props) => {

	return (
		<div>
			<h3> Add New Chapter</h3>
			<form>
				<p>Title</p>
				<input name="chapterTitle" type="text" defaultValue={props.chapterTitle} onChange={this.handleInputChange} />
				<p>Description</p>
				<input namme="description" tyoe="text" defaultValue={props.description} onChange={this.handleInputChange} />
				<p>Date</p>
				<input name="date" type="date" defaultValue={props.date} placeholder={Date.now()} onChange={this.handleInputChange} />
				<p>Image</p>
		        <RaisedButton
		          containerElement='label' label='My Label'>
		          <input type="file" onChange={this.handleInputChange} />
		        </RaisedButton>

				<p>Requirement</p>
				<DropDownMenu defaultValue={props.numReq} onChange={this.handleInputChange}>
      				<MenuItem value={1} primaryText="1" />
      				<MenuItem value={2} primaryText="2" />
      				<MenuItem value={3} primaryText="3" />
      				<MenuItem value={4} primaryText="4" />
      				<MenuItem value={5} primaryText="5" />
    			</DropDownMenu>
				<br />
				<button className="btn btn-primary mt-2" onClick={this.submitForm}>Add Chapter</button>
			</form>
		</div>
	)

}
export default AddChapter;