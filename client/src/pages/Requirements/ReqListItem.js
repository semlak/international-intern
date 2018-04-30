import React from 'react';
import Avatar from 'material-ui/Avatar';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const ReqListItem = props => (
  <Card style={{marginBottom: 10}}>
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

export default ReqListItem;
