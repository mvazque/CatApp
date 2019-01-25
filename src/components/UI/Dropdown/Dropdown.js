import React from 'react';

import classes from './Dropdown.module.css';

const Dropdown = (props) => (
	<select className={classes.Dropdown} value={props.selectedOption} onChange={props.handleSelect}>
		{props.options.map(selectOption => (
			<option key={selectOption.value} value={selectOption.value}>{selectOption.label}</option>
		))}
	</select>
);

export default Dropdown;