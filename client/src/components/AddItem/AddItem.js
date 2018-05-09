import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import AddIcon from '@material-ui/icons/Add';
import Button from 'material-ui/Button';

const styles = theme => ({
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
  fab: {
    margin: 'auto',
    // float: 'right',
  },
});

const AddItem = (props) => {
  return (
    <Paper className={props.classes.paper}>
      <Typography variant="title" gutterBottom>{props.title}</Typography>

      {props.children}

      <Button
        mini
        variant="fab"
        color="secondary"
        aria-label="add"
        onClick={props.onClick}
        className={props.classes.fab}
        // disabled={props.formDisabled}
      >
        <AddIcon />
      </Button>
    </Paper>

  );
};

export default withStyles(styles)(AddItem);
