import * as actionTypes from './actionTypes';
import axios from '../../axios-cat';

const columnsPerRow = 3;
const userID = 'p_1285';
//devID = 'p_1285'
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


export const setImages = (images, favoriteBoolean) =>{
	return{
		type: actionTypes.SET_IMAGES,
		images: images,
		resetPageNumber: 1,
		favoriteBoolean: favoriteBoolean
	};
}

export const selectFavorite = (dataID) => {
	return dispatch => {

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
		});
	}
}

// export const removeFavorite = (dataID) => {
// 	console.log(dataID);	
// 	return dispatch => {
// 		let url = "favourites/" + dataID
// 		axios({	
// 		  "async": true,
// 	      "crossDomain": true,
// 	      'url': url,
// 		  'method': 'delete',
// 		  "headers": {
// 		  	"content-type": "application/json",
// 		    "x-api-key": "49cd4b53-9242-48a9-80e3-dc4917418abe"
// 		  },
// 		  'data': ''
// 		});
// 	}
// }

export const initFavorite = () => {
	return dispatch => {
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
			let imageURLArray = [];
			const data = response.data;
			const dataLength = data.length;
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
			dispatch(setImages(imageURLArray, true));
		});
	};
};

export const initDefault = (fileType) => {
	return dispatch => {
		dispatch(setCategory(""));	
		dispatch(retrieveImages(fileType, ""));
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
		dispatch(setCategory(categoryID));	
		dispatch(retrieveImages(fileType, categoryID));
	};
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
		dispatch(retrieveImages(newlySelectedOption, categoryID))
	}
}

export const retrieveImages = (fileType, categoryID) => {
	return dispatch => {
		let fileTypeURL = "mime_types=" + fileType

		let categoryURL = "";
		if(categoryID !== ""){
			categoryURL = "&category_ids=" + categoryID
		}
		let url = "images/search?"+ fileTypeURL +"&order=DESC&limit=24&page=1" + categoryURL;

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
			let imageURLArray = [];
			const data = response.data;
			const dataLength = data.length;
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
			dispatch(setImages(imageURLArray, false));
		});
	};


}

export const setNextPage = (images, pageNumber) =>{
	return{
		type: actionTypes.SET_NEXT_PAGE,
		images: images,
		pageNumber: pageNumber
	};
}

export const retrieveMoreImages = (fileType, categoryID, currentHighestPage) => {
	return dispatch => {
		let fileTypeURL = "mime_types=" + fileType

		let categoryURL = "";
		if(categoryID !== ""){
			categoryURL = "&category_ids=" + categoryID
		}
		let newPageNumber = currentHighestPage + 1;
		let pageURL = "&page=" + newPageNumber
		let url = "images/search?"+ fileTypeURL +"&order=DESC&limit=24" +  pageURL + categoryURL;
		console.log(url);
		console.log('https://api.thecatapi.com/v1/images/search?mime_types=gif%2Cjpg%2Cpng&order=DESC&limit=24&page=2&category_ids=2')
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
			let imageURLArray = [];
			const data = response.data;
			const dataLength = data.length;
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
						rowNumber: row + "page_" + newPageNumber,
						dataArray: [{
							url: imageData.url,
							id: imageData.id
						}]
					}
				}
				
			}
			dispatch(setNextPage(imageURLArray,newPageNumber));
		});
	};
}

