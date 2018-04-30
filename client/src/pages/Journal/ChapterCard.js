import React from 'react';
import ChapterContent from './ChapterContent';
import './ChapterCard.css';

const ChapterCard = (props) => (
	<div className="chapters">
		<h1>Chapters</h1>
		{props.chapters.map(chapter=>
		<div className="card">
			<div className="img-container">
			</div>
			<div className="chapterContent">
				<ChapterContent key={chapter._id} {...chapter}/>	
			</div>	
		</div>)}
	</div>
);

export default ChapterCard;
