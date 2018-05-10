import React from 'react';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  deleteBtn: {
    margin: 'auto',
    float: 'right',
    marginBottom: 10,
  },
}); 

const ChapterContent = props => (
  <Card>
    <CardMedia
      style={{ height: 0, paddingTop: '56.25%' }}
      image={props.chapImg}
      src="image"
    />
    <CardContent>
      <Typography variant="title" gutterBottom>{props.chapTitle}</Typography>
      <Typography variant="subheading" gutterBottom>{props.chapDate.slice(0,10)}</Typography>
    
      <Typography variant="subheading" gutterBottom>{props.chapNote}</Typography>
      <Typography variant="subheading" gutterBottom>{<Avatar>{props.reqNum}</Avatar>}</Typography>
      <Button className={props.classes.deleteBtn} variant="raised" accessKey={props._id} onClick={props.deleteChapter} color="secondary"  id="deleteButton">
        Delete
      </Button>
    </CardContent>
  </Card>
);

export default withStyles(styles)(ChapterContent);