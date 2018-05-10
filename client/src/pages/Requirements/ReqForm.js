import React from 'react';
// import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
// import Card, { CardActions, CardHeader, CardContent } from 'material-ui/Card';
// import AddIcon from '@material-ui/icons/Add';
import AddItem from '../../components/AddItem';
// import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
// import AccountCircle from '@material-ui/icons/AccountCircle';

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
