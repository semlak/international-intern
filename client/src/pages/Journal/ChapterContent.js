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
      <p>{props.chapDate}</p>
      <p>{props.chapTitle}</p>
      <p>{props.chapNote}</p>
      <p>{props.reqNum}</p>
      <Button variant="raised" onClick={props.deleteChapter} color="secondary" id="deleteButton">
        Delete
      </Button>
    </CardContent>
  </Card>
);

export default ChapterContent;