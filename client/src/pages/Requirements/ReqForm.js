import React from 'react';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import AddItem from '../../components/AddItem';

const ReqForm = props => (
  <div>
    <AddItem
      title="Add Requirement"
      onClick={props.submitForm}
    >
      <TextField
        fullWidth
        label="Requirement"
        name="requirementTitle"
        value={props.requirementTitle}
        onChange={props.handleInputChange}
        InputProps={{
          startAdornment: (
            <Avatar style={{width: 30, height: 30, margin: 5}}>{props.requirementNumber}</Avatar>
          ),
        }}
      />
      <TextField
        label="Description"
        multiline
        rows="4"
        fullWidth
        margin="normal"
        name="requirementDesc"
        type="text"
        value={props.requirementDesc}
        onChange={props.handleInputChange}
      />
    </AddItem>
  </div>
);

export default ReqForm;
