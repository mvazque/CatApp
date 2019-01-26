import React from 'react';

//import classes from './MediaComponents.module.css';
import MediaComponent from './MediaComponent/MediaComponent';

const mediaComponents = (props) => (
	<tr>
		{props.urls.map((dataArray, index) => (
			<td>
				<MediaComponent 
					key={'Element_' + dataArray.id}
					dataArray={dataArray} 
					favorited={props.favoriteSelected} 
					favoritesBoolean={props.favorites}
					/>
			</td>
		))}
	</tr>
);

export default mediaComponents;