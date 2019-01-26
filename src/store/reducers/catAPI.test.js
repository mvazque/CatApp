import reducer from './catAPI';
import * as actionTypes from '../actions/actionTypes';

describe('cat reducer', () => {
	let reducerInitialState = {
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

	let categoriesExample = [{
			id: 5,
			name: "boxes"
		},
		{
			id: 15,
			name: "clothes"
		}
	]

	let imageURLExample = [{
		rowNumber: 0,
		dataArray: [{
			url: "https://exampleimage.com/1",
			id: "imageID1"
		}]
	}]

	let imageExtensionURLExample = [{
		rowNumber: 1,
		dataArray: [{
			url: "https://exampleimage.com/2",
			id: "imageID2"
		}]
	}]

	let combinedURLArray = [{
			rowNumber: 0,
			dataArray: [{
				url: "https://exampleimage.com/1",
				id: "imageID1"
			}]
		},
		{
			rowNumber: 1,
			dataArray: [{
				url: "https://exampleimage.com/2",
				id: "imageID2"
			}]
		}
	];

	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(reducerInitialState);
	});

	it('should set the images array', () => {
		expect(reducer( reducerInitialState ,{
			type: actionTypes.SET_IMAGES,
			images: imageURLExample,
			resetPageNumber: 1,
			favoriteBoolean: false
		}
		)).toEqual({
			...reducerInitialState,
			imageURLArray: imageURLExample,
			currentHighestPage: 1,
			favoriteBoolean: false
		})
	});

	it('should set the categories list', () => {
		expect(reducer( reducerInitialState ,{
			type: actionTypes.SET_CATEGORIES,
			categories: categoriesExample
		}
		)).toEqual({
			...reducerInitialState,
			categoriesList: categoriesExample
		})
	});

	it('should set the file type', () => {
		expect(reducer( reducerInitialState ,{
			type: actionTypes.SET_FILETYPE,
			fileType: "gif"
		}
		)).toEqual({
			...reducerInitialState,
			selectedFileType: "gif"
		})
	});

	it('should set the current category', () => {
		expect(reducer( reducerInitialState ,{
			type: actionTypes.SET_CURRENT_CATEGORY,
			categoryID: 2
		}
		)).toEqual({
			...reducerInitialState,
			currentCategoryID: 2
		})
	});

	it('should set page and add to imageURL', () => {
		expect(reducer( {
				...reducerInitialState,
				imageURLArray: imageURLExample
			} ,{
			type: actionTypes.SET_NEXT_PAGE,
			images: imageExtensionURLExample,
			pageNumber: 2
		}
		)).toEqual({
			...reducerInitialState,
			imageURLArray: combinedURLArray,
			currentHighestPage: 2
		})
	});

});