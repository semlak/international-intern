import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import Card, { CardActions, CardHeader, CardContent } from 'material-ui/Card';
import AddIcon from '@material-ui/icons/Add';
import AddItem from '../../components/AddItem';

const ReqForm = props => (
  <div>
    <AddItem
      title="Add Requirement"
      onClick={props.submitForm}
    >
      <CardHeader
        avatar={<Avatar>{props.requirementNumber}</Avatar>}
        title={
        <div>
          <TextField
            label="Requirement"
            disabled={props.formDisabled}
            name="requirementTitle"
            type="text"
            value={props.requirementTitle}
            onChange={props.handleInputChange}
            InputLabelProps={{
            shrink: true,
          }}
          />
        </div>
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
      {/* <Button variant="fab" mini style={{ marginLeft: 'auto' }} color="primary" aria-label="add" onClick={props.submitForm} disabled={props.formDisabled}>
        <AddIcon />
      </Button> */}
    </AddItem>
  </div>
);

export default ReqForm;
