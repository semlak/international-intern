import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import Card, { CardHeader } from 'material-ui/Card';
import AddIcon from '@material-ui/icons/Add';

const CreateForm = props => (
  <Card>
    <CardHeader
      avatar={<Avatar>{props.requirementNumber}</Avatar>}
      title={
        <TextField
          label="Requirement"
          disabled={props.formDisabled}
          name="requirementTitle"
          type="text"
          value={props.requirementTitle}
          onChange={props.handleInputChange}
        />
      }
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
    <Button variant="fab" color="primary" aria-label="add" onClick={props.submitForm} disabled={props.formDisabled}>
      <AddIcon />
    </Button>
  </Card>
);

export default CreateForm;
