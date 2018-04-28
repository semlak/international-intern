import React, {Component} from 'react';
import {Link} from 'react-router-dom';
// import API from "../../utils/API";

const CreateForm = (props) => {


	return (<div style = {{marginLeft: 100}}>
				<h3>Add Requirements</h3>
				<form>
					<br/>
					<p>Requirement Number: <span style={{fontWeight: "bold"}}>{props.requirementNumber}</span> </p>
					<br/>
					<p>Requirement Title</p>
					<input disabled={props.formDisabled} size="40" placeholder="Title" name="requirementTitle" type="text" value={props.requirementTitle} onChange={props.handleInputChange} />
					<p>Requirement Notes</p>
					<textarea disabled={props.formDisabled} rows="4" cols="40" placeholder="Describe requirement here" name="requirementDesc" type="text" value={props.requirementDesc} onChange={props.handleInputChange} />
					<br/>
					<button disabled={props.formDisabled} onClick={props.submitForm}>Add Requirement</button>
				</form>
			</div>
		)
	
}

export default CreateForm;