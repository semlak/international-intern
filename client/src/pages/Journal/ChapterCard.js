import React from 'react';
import ChapterContent from './ChapterContent';
import './ChapterCard.css';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
	chapter: {
		
	}

})

const ChapterCard = props => (
  <div className={props.classes.chapters}>
     <Typography variant="title" gutterBottom>Chapters</Typography>
    {props.chapters.map(chapter =>
      <ChapterContent key={chapter._id} {...chapter} deleteChapter={props.deleteChapter} />)}
  </div>
);

export default withStyles(styles)(ChapterCard);