import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './ImageTable.module.css';

import MediaComponents from '../../components/MediaComponents/MediaComponents';
import Dropdown from '../../components/UI/Dropdown/Dropdown';

class ImageTable extends Component {

	render() {
		let images = null;
		if(this.props.imageURLArray){
			images = (
				<table>
					<tbody>
						{this.props.imageURLArray.map(urlArray => (
							<MediaComponents 
								key={'Row_' + urlArray.rowNumber}
								rowNumber={urlArray.rowNumber}
								urls={urlArray.dataArray} 
								favoriteSelected={this.props.favorited} 
								favorites={this.props.favorites}/>
						))}
					</tbody>
				</table>
			)	
		} 	
		return (
			<div className={classes.ImageTable}>
				<Dropdown 
					handleSelect={this.props.selectFileType} 
					options={this.props.dropdownOptions} 
					selectedOption={this.props.selectedFileType}/>
				{images}

			</div>
		);
	}
}

const mapstateToProps = state => {
	return {
		imageURLArray: state.imageURLArray,
		selectedFileType: state.selectedFileType,
		dropdownOptions: state.dropdownOptions
	};
}

export default connect(mapstateToProps)(ImageTable);