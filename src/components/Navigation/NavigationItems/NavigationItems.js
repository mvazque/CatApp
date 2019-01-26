import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props ) => (
    <ul className={classes.NavigationItems}>
    	<NavigationItem clicked={props.default}/>
		<NavigationItem clicked={props.favorite}/>
        {props.categories && props.categories.categoriesList ? 
        	props.categories.categoriesList.map(category => (
				<NavigationItem 
					key={category.id}
					categoryData={category}
					clicked={{
						label: category.name,
						handlerToUse: props.categories.handlerToUse
					}}
					
				 />	
			))
    		:null
    	}
        
    </ul>
);

export default navigationItems;