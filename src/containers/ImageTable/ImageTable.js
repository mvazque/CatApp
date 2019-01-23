import React, { Component } from 'react';

//import classes from './ImageTable.css';
import MediaComponent from '../../components/MediaComponent/MediaComponent';

class ImageTable extends Component {
	render() {
		return (
			<div>
				<MediaComponent source="https://vignette.wikia.nocookie.net/destinypedia/images/a/ab/Ghost.png/revision/latest?cb=20140824204738" />
				<MediaComponent source="https://vignette.wikia.nocookie.net/destinypedia/images/a/ab/Ghost.png/revision/latest?cb=20140824204738" />
				<MediaComponent source="https://vignette.wikia.nocookie.net/destinypedia/images/a/ab/Ghost.png/revision/latest?cb=20140824204738" />
			</div>
		);
	}
}

export default ImageTable;