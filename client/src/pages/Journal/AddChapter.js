import React from 'react';
import Select from 'material-ui/Select';
import { MenuList, MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
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
		        <Button
		           label='My Label'>
		          <input type="file" onChange={props.handleInputChange} />
		        </Button>
				<p>Requirement</p>
<select>
  <option value={1}>1</option>
  <option value={2}>2</option>
  <option value={3}>3</option>
  <option value={4}>4</option>
</select>


        {/* <Select
           value={props.reqNum} 
           onChange={props.handleInputChange}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
    	  </Select> */}
				<br />
				<button className="btn btn-primary mt-2" onClick={props.handleFormSubmit}>Add Chapter</button>
			</form>
		</div>
	)
}
export default AddChapter;