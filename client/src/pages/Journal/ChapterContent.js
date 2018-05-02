import React from 'react';

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';


const ChapterContent = props => (
  <Card>
    <CardMedia
      style={{ height: 0, paddingTop: '56.25%' }}
      image={props.chapImg}
    />
    <CardContent>
      <p>{props.chapDate}</p>
      <p>{props.chapTitle}</p>
      <p>{props.chapNote}</p>
      <p>{props.reqNum}</p>
    </CardContent>
  </Card>
);
export default ChapterContent;
