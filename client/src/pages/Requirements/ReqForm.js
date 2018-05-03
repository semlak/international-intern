import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import Card, { CardActions, CardHeader, CardContent } from 'material-ui/Card';
import AddIcon from '@material-ui/icons/Add';

const ReqForm = props => (
  <Card>   
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
    <CardContent>
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
    </CardContent>
    <CardActions>
      <Button variant="fab" mini style={{marginLeft: 'auto'}} variant="fab" color="primary" aria-label="add" onClick={props.submitForm} disabled={props.formDisabled}>
        <AddIcon />
      </Button>
    </CardActions>
  </Card>
);

export default ReqForm;
