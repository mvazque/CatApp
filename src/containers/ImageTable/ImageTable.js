import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './ImageTable.module.css';
import axios from 'axios';
import * as actions from '../../store/actions/catAPI';
//import * as actionTypes from '../../store/actions/actionTypes'; 

import MediaComponents from '../../components/MediaComponents/MediaComponents';
import Dropdown from '../../components/UI/Dropdown/Dropdown';

class ImageTable extends Component {
	// state ={
	// 	rowLength: 3,
	// 	dropdownOptions: [{
	// 			value: "gif",
	// 			label: "gif"
	// 		}, 
	// 		{
	// 			value: "jpg%2Cpng",
	// 			label: "jpg,png"
	// 		}, 
	// 		{
	// 			value: "gif%2Cjpg%2Cpng",
	// 			label: "gif,jpg,png"
	// 		}],
	// 	selectedOption: "gif%2Cjpg%2Cpng"
	// }
	componentDidMount() {
		this.props.setImages();
	}

	// selectHandler = (event) => {
	// 	let newlySelectedOption = event.target.value;
	// 	this.setState({selectedOption: newlySelectedOption})

	// 	console.log(this.state.selectedOption);
	// 	let url = "https://api.thecatapi.com/v1/images/search?mime_types=" + newlySelectedOption + "&order=DESC&limit=24&page=1"
	// 	axios({
	// 	  "async": true,
 //          "crossDomain": true,
 //          'url': url,
	// 	  'method': 'get',
	// 	  "headers": {
	// 	    "x-api-key": "49cd4b53-9242-48a9-80e3-dc4917418abe"
	// 	  },
	// 	})
	// 	.then(response => {
	// 		let imageURLArray = [];
	// 		const data = response.data;
	// 		const dataLength = data.length;
	// 		//console.log(response);
	// 		for(let i = 0; i < dataLength; i++){
	// 			let row = Math.floor(i/this.state.rowLength);
	// 			if(imageURLArray[row]){
	// 				imageURLArray[row].dataArray.push({
	// 					url: data[i].url,
	// 					id: data[i].id
	// 				});
	// 			}
	// 			else{
	// 				imageURLArray[row] = {
	// 					rowNumber: row,
	// 					dataArray: [{
	// 						url: data[i].url,
	// 						id: data[i].id
	// 					}]
	// 				}
	// 			}
				
	// 		}
			
	// 		this.setState({imageURLArray: imageURLArray});
	// 	});


	// }

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
								favoriteSelected={this.props.favorited} />
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

const mapDispatchToProps = dispatch => {
	return {
		setImages: () => dispatch(actions.initDefault())
	}
}

export default connect(mapstateToProps, mapDispatchToProps)(ImageTable);

//this.props.favorited