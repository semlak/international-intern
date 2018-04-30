import React from 'react';
import Avatar from 'material-ui/Avatar';
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const NeedListItem = props => (
  <Card>
    <CardHeader
      avatar={<Avatar>{props.needNumber}</Avatar>}
      title={props.needTitle}
    />
    <CardContent>
      <Typography component="p">
        {props.needDesc}
      </Typography>
    </CardContent>
  </Card>
);

export default NeedListItem;
