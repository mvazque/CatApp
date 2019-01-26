import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props ) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem clicked={props.favorite}/>
        <NavigationItem />
        <NavigationItem />
        <NavigationItem />
    </ul>
);

export default navigationItems;