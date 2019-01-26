import React from 'react';

import classes from './NavigationItem.module.css';

const navigationItem = ( props ) => (
    <li className={classes.NavigationItem}>
        <button onClick={props.categoryData ? () => props.clicked.handlerToUse(props.categoryData) : props.clicked.handlerToUse}>{props.clicked ?  props.clicked.label.charAt(0).toUpperCase() + props.clicked.label.slice(1) : null}</button>
    </li>
);

export default navigationItem;