import React from 'react';
import ChapterContent from './ChapterContent';
import './ChapterCard.css';
import Typography from 'material-ui/Typography';

const ChapterCard = props => (
  <div className="chapters">
     <Typography variant="title" gutterBottom>Chapters</Typography>
    {props.chapters.map(chapter =>
      <ChapterContent key={chapter._id} {...chapter} deleteChapter={props.deleteChapter} />)}
  </div>
);

export default ChapterCard;