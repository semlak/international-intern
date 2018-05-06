import React from 'react';
import ChapterContent from './ChapterContent';
import './ChapterCard.css';

const ChapterCard = props => (
  <div className="chapters">
    <h1>Chapters</h1>
    {props.chapters.map(chapter =>
      <ChapterContent key={chapter._id} {...chapter} deleteChapter={props.deleteChapter} />)}
  </div>
);

export default ChapterCard;