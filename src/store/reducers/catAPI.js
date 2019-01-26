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
	selectedFileType: "gif%2Cjpg%2Cpng"
}

const setImages = (state,action) => {
	return {
		...state,
		// dropdownOptions: {
		// 	...state.dropdownOptions
		// },
		imageURLArray: action.images
	};
}

const setCategories = (state,action) => {
	return {
		...state,
		// dropdownOptions: {
		// 	...state.dropdownOptions
		// },
		categoriesList: action.categories
	};
}

const setFileType = (state,action) => {
	return {
		...state,
		// dropdownOptions: {
		// 	...state.dropdownOptions
		// },
		selectedFileType: action.fileType
	};
}

const reducer = (state = initialState, action) => {
	switch(action.type){
		case actionTypes.SET_IMAGES: return setImages(state, action);
		case actionTypes.SET_CATEGORIES: return setCategories(state, action);
		case actionTypes.SET_FILETYPE: return setFileType(state, action);
		default: return state;
	}
};

export default reducer;