import * as actionTypes from '../actions/actionTypes';

const initialState ={
	imageURLArray: null,
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
	selectedOption: "gif%2Cjpg%2Cpng"
}

const setImages = (state,action) => {
	return {
		...state,
		dropdownOptions: {
			...state.dropdownOptions
		},
		imageURLArray: action.images
	};
}

const reducer = (state = initialState, action) => {
	switch(action.type){
		case actionTypes.SET_IMAGES: return setImages(state, action);
		default: return state;
	}
};

export default reducer;