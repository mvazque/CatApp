import React from 'react';

import classes from './MediaComponent.module.css';

const mediaComponent = (props) => (
	<div className={classes.MediaComponent}>
		<img src={props.dataArray.url} alt="MediaComponent" />
		<div className={(props.favoritesBoolean ? classes.active : classes.inactive)}
			onClick={() => props.favorited(props.dataArray.id)}></div>
	</div>
);

export default mediaComponent;