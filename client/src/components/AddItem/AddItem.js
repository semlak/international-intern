import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import AddIcon from '@material-ui/icons/Add';
import Button from 'material-ui/Button';
// import Grid from 'material-ui/Grid';

const styles = theme => ({
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
  fab: {
    display:'flex',
    marginLeft:'auto',
  }
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
