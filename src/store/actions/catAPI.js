import * as actionTypes from './actionTypes';
import axios from '../../axios-cat';

//These are values that had been hardcoded for the sake of this assignment
//columnsPerRow indicates the number of images in each row. CSS was made around there being 3
//userID was a value made for favoriting values
//apiKey was the key given by the api. This would be better placed in an environment variable. However it was placed
//here to allow for other parties to easily try out this application
const columnsPerRow = 3;
const userID = 'p_128513';
const apiKey = "49cd4b53-9242-48a9-80e3-dc4917418abe"
//devID = 'p_1285'
export const setCategories = (categories) =>{
	return{
		type: actionTypes.SET_CATEGORIES,
		categories: categories
	};
}

//This function is meant to retrieve the different categories offered by the API
export const retrieveCategoryList = () =>{
	return dispatch => {
		let url = "categories";
		axios({
		  "async": true,
	      "crossDomain": true,
	      'url': url,
		  'method': 'get',
		  "headers": {
		    "x-api-key": apiKey
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

//This code uses the userID and places the selected image in their favorites
export const selectFavorite = (dataID) => {
	return dispatch => {

		axios({
		  "async": true,
	      "crossDomain": true,
	      'url': 'favourites',
		  'method': 'post',
		  "headers": {
		    "content-type": "application/json",
		    "x-api-key": apiKey
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

//This code is meant to initialize the Favorites page.
//Favorites receives data in a slightly different manner and requires a different
//setup from the rest.
export const initFavorite = () => {
	return dispatch => {
		let url = 'favourites?sub_id=' + userID;
		axios({
		  "async": true,
	      "crossDomain": true,
	      'url': url,
		  'method': 'get',
		  "headers": {
		    "x-api-key": apiKey
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

//This function retrieves images for a change in filetype, or category.
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
		    "x-api-key": apiKey
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

//This function is meant to work with the scrolling effect and needs to be able
//to change page number. It also requires a different reducer as it will not
//replace the imageURLArray but rather add to it.
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
		axios({
		  "async": true,
	      "crossDomain": true,
	      'url': url,
		  'method': 'get',
		  "headers": {
		    "x-api-key": apiKey
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

