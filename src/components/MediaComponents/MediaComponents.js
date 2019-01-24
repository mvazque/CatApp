import React from 'react';

//import classes from './MediaComponents.module.css';
import MediaComponent from './MediaComponent/MediaComponent';

const mediaComponents = (props) => (
	<tr>
		{props.urls.map(url => (
			<td>
				<MediaComponent source={url} />
			</td>
		))}
	</tr>
);

export default mediaComponents;