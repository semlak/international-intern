import React from 'react';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';

const ChapterContent = props => (
  <Card>
    <CardMedia
      style={{ height: 0, paddingTop: '56.25%' }}
      image={props.chapImg}
      src="image"
    />
    <CardContent>
      <p>{props.chapDate.slice(0,10)}</p>
      <p>{props.chapTitle}</p>
      <p>{props.chapNote}</p>
      <p>Requirement: {props.reqNum}</p>
      <Button variant="raised" accessKey={props._id} onClick={props.deleteChapter} color="secondary"  id="deleteButton">
        Delete
      </Button>
    </CardContent>
  </Card>
);

export default ChapterContent;