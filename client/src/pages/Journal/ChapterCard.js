import React, {Component} from 'react';
import API from "../../utils/API";
import "./ChapterCard.css";

export default class extends Component {
	state= {
	}

	render() {
		return(
			<div className="card">
				<div className="img-container">
				</div>
				<p>"Title"</p>
				<p>"Description"</p>
				<p>"Date"</p>
			</div>
		)
	}
}