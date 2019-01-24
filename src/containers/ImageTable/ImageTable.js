import React, { Component } from 'react';

import classes from './ImageTable.module.css';
import axios from 'axios';

import MediaComponents from '../../components/MediaComponents/MediaComponents';

class ImageTable extends Component {
	state ={
		imageURLArray: null,
		rowLength: 3
	}
	componentDidMount() {
		axios.get('https://api.thecatapi.com/v1/images/search?limit=24&page=1&order=DESC',{
			params: {
				'x-api-key': '49cd4b53-9242-48a9-80e3-dc4917418abe'
			}
		})
			.then(response => {
				let imageURLArray = [];
				const data = response.data;
				const dataLength = data.length;
				console.log(imageURLArray);
				for(let i = 0; i < dataLength; i++){
					let row = Math.floor(i/this.state.rowLength);
					if(imageURLArray[row]){
						imageURLArray[row].push(data[i].url);
					}
					else{
						imageURLArray[row] = [data[i].url];
					}
					
					
				}
				
				this.setState({imageURLArray: imageURLArray});
				console.log(imageURLArray);
			});
	}

	render() {
		let images = null;
		if(this.state.imageURLArray){
			images = (
				<table>
					<tbody>
						{this.state.imageURLArray.map(urlArray => (
							<MediaComponents urls={urlArray} />
						))}
					</tbody>
				</table>
			)	
		} 	
		return (
			<div className={classes.ImageTable}>
				{images}

			</div>
		);
	}
}

export default ImageTable;