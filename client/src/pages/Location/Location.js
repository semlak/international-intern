import React from 'react';
// import API from '../../utils/API';
import Map from './Map';
import Weather from './Weather';
import Currency from './Currency';
import Timezones from './Timezones';
import News from './News';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
});

// TODO - get lat/lng into the props
const Location = (props) => {
  if (props.currentUser && props.currentUser.username) {
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper>
            <Map {...props} />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={props.classes.paper} style={{ height: 170 }}>
            <Weather {...props} />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={props.classes.paper} style={{ height: 170 }}>
            <Currency {...props} />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={props.classes.paper} style={{ height: 170 }}>
            <Timezones {...props} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={props.classes.paper}>
            <News {...props} />
          </Paper>
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <h1>Location</h1>
        <p>Loading...</p>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Location);
