import React from 'react';

import MediaComponent from './MediaComponent/MediaComponent';

//These are the rows in the ImageTable. It takes an array from ImageTable
//and dynamically makes columns of MediaComponent based on that.
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