import React from 'react';
import Typography from 'material-ui/Typography';
import ChapterContent from './ChapterContent';
import './ChapterCard.css';

const ChapterCard = props => (
  <div>
    <Typography variant="title" gutterBottom>Chapters</Typography>
    {props.chapters.map(chapter =>
      (<ChapterContent
        key={chapter._id}
        {...chapter}
        deleteChapter={props.deleteChapter}
      />))}
  </div>
);

export default ChapterCard;
