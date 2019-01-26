import * as actionTypes from '../actions/actionTypes';

const initialState ={
	imageURLArray: null,
	categoriesList: null,
	rowLength: 3,
	dropdownOptions: [{
			value: "gif",
			label: "gif"
		}, 
		{
			value: "jpg%2Cpng",
			label: "jpg,png"
		}, 
		{
			value: "gif%2Cjpg%2Cpng",
			label: "gif,jpg,png"
		}],
	selectedFileType: "gif%2Cjpg%2Cpng",
	currentCategoryID: "",
	currentHighestPage: 1,
	favoriteBoolean: false
}

const setImages = (state,action) => {
	return {
		...state,
		imageURLArray: action.images,
		currentHighestPage: action.resetPageNumber,
		favoriteBoolean: action.favoriteBoolean
	};
}

const setCategories = (state,action) => {
	return {
		...state,
		categoriesList: action.categories
	};
}

const setFileType = (state,action) => {
	return {
		...state,
		selectedFileType: action.fileType
	};
}

const setCurrentCategory = (state,action) => {
	return {
		...state,
		currentCategoryID: action.categoryID
	};
}

const setNextPage = (state,action) => {
	return {
		...state,
		imageURLArray: state.imageURLArray.concat(action.images),
		currentHighestPage: action.pageNumber
	};
}

const reducer = (state = initialState, action) => {
	switch(action.type){
		case actionTypes.SET_IMAGES: return setImages(state, action);
		case actionTypes.SET_CATEGORIES: return setCategories(state, action);
		case actionTypes.SET_FILETYPE: return setFileType(state, action);
		case actionTypes.SET_CURRENT_CATEGORY: return setCurrentCategory(state, action);
		case actionTypes.SET_NEXT_PAGE: return setNextPage(state, action);
		default: return state;
	}
};

export default reducer;


// arr: [...state.arr, action.newItem]
