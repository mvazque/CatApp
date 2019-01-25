import * as actionTypes from './actionTypes';
import axios from 'axios';


export const setImages = (images) =>{
	return{
		type: actionTypes.SET_IMAGES,
		images: images
	};
}

export const initDefault = () => {
	let columnsPerRow = 3
	console.log("BLARGH")
	return dispatch => {
		axios.get('https://api.thecatapi.com/v1/images/search?limit=24&page=1&order=DESC')
		.then(response => {
			let imageURLArray = [];
			const data = response.data;
			const dataLength = data.length;
			//console.log(response);
			for(let i = 0; i < dataLength; i++){
				let row = Math.floor(i/columnsPerRow);
				if(imageURLArray[row]){
					imageURLArray[row].dataArray.push({
						url: data[i].url,
						id: data[i].id
					});
				}
				else{
					imageURLArray[row] = {
						rowNumber: row,
						dataArray: [{
							url: data[i].url,
							id: data[i].id
						}]
					}
				}
				
			}
			
			dispatch(setImages(imageURLArray));
		});
	};
};