import * as actionTypes from './actionTypes';
import axios from 'axios';


export const setImages = (images) =>{
	return{
		type: actionTypes.SET_IMAGES,
		images: images
	};
}

export const initFavorite = () => {
	return dispatch => {
		let userID = 'p_1285';
		let url = 'https://api.thecatapi.com/v1/favourites?sub_id=' + userID;
		axios({
		  "async": true,
	      "crossDomain": true,
	      'url': url,
		  'method': 'get',
		  "headers": {
		    "x-api-key": "49cd4b53-9242-48a9-80e3-dc4917418abe"
		  },
		})
		.then(response => {
			console.log(response);
			let imageURLArray = [];
			const data = response.data;
			const dataLength = data.length;
			//console.log(response);
			for(let i = 0; i < dataLength; i++){
				let row = Math.floor(i/3);
				let imageData = data[i].image;
				if(imageURLArray[row]){
					imageURLArray[row].dataArray.push({
						url: imageData.url,
						id: imageData.id
					});
				}
				else{
					imageURLArray[row] = {
						rowNumber: row,
						dataArray: [{
							url: imageData.url,
							id: imageData.id
						}]
					}
				}
				
			}
			dispatch(setImages(imageURLArray));
		});
	};
};

export const initDefault = () => {
	let columnsPerRow = 3
	console.log("BLARGH")
	return dispatch => {
		axios.get('https://api.thecatapi.com/v1/images/search?limit=24&page=1&order=DESC')
		.then(response => {
			let imageURLArray = [];
			const data = response.data;
			const dataLength = data.length;
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