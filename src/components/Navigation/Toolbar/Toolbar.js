import React from 'react';

import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = ( props ) => (
    <header className={classes.Toolbar}>
        <nav>
            <NavigationItems favorite={props.favorite} />
        </nav>
    </header>
);

export default toolbar;