import React from 'react';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';


const styles = theme => ({
  root: {
    width: '100%',
  },
  avatar: {
    fontSize: theme.typography.pxToRem(15),
    marginTop: 5,
    marginBottom: 5,
    marginRight: 8,
    height: 24,
    width: 24,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    paddingTop: 8,
    paddingBottom: 8,
  },
  panel: {
    width: 239,
  },
  details: {
    paddingBottom: 20,
    paddingTop: 0,
  },
  summary: {
    padding: 10,
    height: 40,
  },
});

class SidebarReqs extends React.Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        <ExpansionPanel className={classes.panel} expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary className={classes.summary}>
            <Avatar className={classes.avatar}>{this.props.number}</Avatar>
            <Typography className={classes.secondaryHeading} >{this.props.title}</Typography> 
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <Typography>
              {this.props.text}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(SidebarReqs);
