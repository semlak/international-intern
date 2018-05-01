import React from 'react';

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';


const ChapterContent = props => (
  <Card>
    <CardMedia
      style={{ height: 0, paddingTop: '56.25%' }}
      image="https://upload.wikimedia.org/wikipedia/commons/2/21/Adams_The_Tetons_and_the_Snake_River.jpg"
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
