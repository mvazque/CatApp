import React from 'react';

import classes from './NavigationItem.module.css';

const navigationItem = ( props ) => (
    <li className={classes.NavigationItem}>
        <button>{props.clicked ? props.clicked.label : null}</button>
    </li>
);

export default navigationItem;