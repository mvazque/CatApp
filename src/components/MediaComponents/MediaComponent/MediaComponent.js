import React from 'react';

import classes from './MediaComponent.module.css';

const mediaComponent = (props) => (
	<img
		className={classes.MediaComponent} 
		src={props.source} alt="MediaComponent" />
);

export default mediaComponent;