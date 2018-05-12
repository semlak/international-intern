import React from 'react';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
// import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import { withStyles } from 'material-ui/styles';
import Icon from 'material-ui/Icon';

const styles = theme => ({
  deleteBtn: {
    margin: 'auto',
    float: 'right',
    marginBottom: 10,
  },

  card: {
    marginBottom: 10,
    marginRight: 10,
    display: ''
  }
});

const ChapterContent = props => (
  <Card className={props.classes.card}>
    {props.chapImg ?
      <CardMedia
        style={{ height: 0, paddingTop: '56.25%' }}
        image={props.chapImg}
        src="image"
      /> : null }
    <CardContent>
      <Typography variant="caption" align="right">{props.chapDate.slice(0, 10)}</Typography>
      <Typography variant="title" gutterBottom>{props.chapTitle}</Typography>
      <Typography variant="subheading" gutterBottom>{props.chapNote}</Typography>
      <Typography variant="subheading" gutterBottom>{<Avatar>{props.reqNum}</Avatar>}</Typography>
      <div className={props.classes.deleteBtn}>
        <Icon
          id="deleteButton"
          accessKey={props._id}
          className={props.classes.icon}
          color="secondary"
          onClick={props.deleteChapter}
        >
          close
        </Icon>
      </div>
    </CardContent>
  </Card>
);

export default withStyles(styles)(ChapterContent);
