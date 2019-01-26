import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

//This is what sends the call to make the buttons for navigation.
//The top two buttons will always be the same but the ones following
//will be created dynamically based on the categories sent by the api
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