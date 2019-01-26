import * as actionTypes from './actionTypes';
import axios from '../../axios-cat';

const columnsPerRow = 3;

export const setCategories = (categories) =>{
	return{
		type: actionTypes.SET_CATEGORIES,
		categories: categories
	};
}


export const retrieveCategoryList = () =>{
	return dispatch => {
		let url = "categories";
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
			dispatch(setCategories(response.data));
		});
	};
}


export const setImages = (images) =>{
	return{
		type: actionTypes.SET_IMAGES,
		images: images
	};
}

export const selectFavorite = (dataID) => {
	return dispatch => {
		let userID = 'p_1285';

		axios({
		  "async": true,
	      "crossDomain": true,
	      'url': 'favourites',
		  'method': 'post',
		  "headers": {
		    "content-type": "application/json",
		    "x-api-key": "49cd4b53-9242-48a9-80e3-dc4917418abe"
		  },
		  "processData": false,
		  'data': '{"image_id":"' + dataID + '","sub_id":"' + userID + '"}'
		})
		.then(response => {
			console.log(response)
		});
	}
}

export const initFavorite = () => {
	return dispatch => {
		let userID = 'p_1285';
		let url = 'favourites?sub_id=' + userID;
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
				let row = Math.floor(i/columnsPerRow);
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

export const initDefault = (fileType) => {
	return dispatch => {
		console.log(fileType);
		dispatch(setCategory(""));	
		dispatch(retreiveImages(fileType, ""));
		// axios.get('images/search?limit=24&page=1&order=DESC')
		// .then(response => {
		// 	let imageURLArray = [];
		// 	const data = response.data;
		// 	const dataLength = data.length;
		// 	for(let i = 0; i < dataLength; i++){
		// 		let row = Math.floor(i/columnsPerRow);
		// 		if(imageURLArray[row]){
		// 			imageURLArray[row].dataArray.push({
		// 				url: data[i].url,
		// 				id: data[i].id
		// 			});
		// 		}
		// 		else{
		// 			imageURLArray[row] = {
		// 				rowNumber: row,
		// 				dataArray: [{
		// 					url: data[i].url,
		// 					id: data[i].id
		// 				}]
		// 			}
		// 		}
				
		// 	}
			
		// 	dispatch(setImages(imageURLArray));
		// });
	};
};

export const setCategory = (categoryID) =>{
	return{
		type: actionTypes.SET_CURRENT_CATEGORY,
		categoryID: categoryID
	};
}

export const initCategory = (fileType, categoryID) => {
	return dispatch => {
		console.log(categoryID)
		dispatch(setCategory(categoryID));	
		dispatch(retreiveImages(fileType, categoryID));
	};

	// return dispatch => {
	// 	let url = "images/search?mime_types=gif%2Cjpg%2Cpng&order=DESC&limit=24&page=1&category_ids=" + categoryID
	// 	axios({
	// 	  "async": true,
	//       "crossDomain": true,
	//       'url': url,
	// 	  'method': 'get',
	// 	  "headers": {
	// 	    "x-api-key": "49cd4b53-9242-48a9-80e3-dc4917418abe"
	// 	  },
	// 	})
	// 	.then(response => {
	// 		console.log(response);
	// 		let imageURLArray = [];
	// 		const data = response.data;
	// 		const dataLength = data.length;
	// 		for(let i = 0; i < dataLength; i++){
	// 			let row = Math.floor(i/columnsPerRow);
	// 			let imageData = data[i];
	// 			if(imageURLArray[row]){
	// 				imageURLArray[row].dataArray.push({
	// 					url: imageData.url,
	// 					id: imageData.id
	// 				});
	// 			}
	// 			else{
	// 				imageURLArray[row] = {
	// 					rowNumber: row,
	// 					dataArray: [{
	// 						url: imageData.url,
	// 						id: imageData.id
	// 					}]
	// 				}
	// 			}
				
	// 		}
	// 		dispatch(setImages(imageURLArray));
	// 	});
	// };
};

export const setFileType = (fileType) =>{
	return{
		type: actionTypes.SET_FILETYPE,
		fileType: fileType
	};
}

export const initFileType = (event, categoryID) => {
	return dispatch => {
		let newlySelectedOption = event.target.value;
		dispatch(setFileType(newlySelectedOption));
		dispatch(retreiveImages(newlySelectedOption, categoryID))
		

		// let fileTypeURL = "mime_types=" + newlySelectedOption
		// console.log(fileTypeURL);

		// let categoryURL = "";
		// if(categoryID !== ""){
		// 	categoryURL = "&category_ids=" + categoryID
		// }
		// console.log(categoryURL);
		// let url = "images/search?"+ fileTypeURL +"&order=DESC&limit=24&page=1" + categoryURL;
		// console.log(url);




		// axios({
		//   "async": true,
  //         "crossDomain": true,
  //         'url': url,
		//   'method': 'get',
		//   "headers": {
		//     "x-api-key": "49cd4b53-9242-48a9-80e3-dc4917418abe"
		//   },
		// })
		// .then(response => {
		// 	let imageURLArray = [];
		// 	const data = response.data;
		// 	const dataLength = data.length;
		// 	//console.log(response);
		// 	for(let i = 0; i < dataLength; i++){
		// 		let row = Math.floor(i/columnsPerRow);
		// 		if(imageURLArray[row]){
		// 			imageURLArray[row].dataArray.push({
		// 				url: data[i].url,
		// 				id: data[i].id
		// 			});
		// 		}
		// 		else{
		// 			imageURLArray[row] = {
		// 				rowNumber: row,
		// 				dataArray: [{
		// 					url: data[i].url,
		// 					id: data[i].id
		// 				}]
		// 			}
		// 		}
				
		// 	}
			
		// 	dispatch(setImages(imageURLArray));
		// })
		// .then(() =>{
		// 	dispatch(setFileType(newlySelectedOption));
		// });
	}
}

export const retreiveImages = (fileType, categoryID) => {
	console.log(fileType, categoryID);

	return dispatch => {
		let fileTypeURL = "mime_types=" + fileType
		console.log(fileTypeURL);

		let categoryURL = "";
		if(categoryID !== ""){
			categoryURL = "&category_ids=" + categoryID
		}
		console.log(categoryURL);
		let url = "images/search?"+ fileTypeURL +"&order=DESC&limit=24&page=1" + categoryURL;
		console.log(url);

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
				let row = Math.floor(i/columnsPerRow);
				let imageData = data[i];
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


}

