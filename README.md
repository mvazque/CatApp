# CatApp
This is a web app created using the Cat API with React.

### How to use:

Once you have successfully cloned the repository, navigate to the new directory and run the following commands.

```sh
npm install
npm start
```
This should download the necessary packages for the web application and then run it on localhost:3000 by default. That's all that is required to run this application. For further documentation on the application continue reading.

### Unit Testing:
Unit testing was done using jest and enzyme. In order to run the unit tests one simply needs to run the following command after installing the packages
```sh
npm test
```

# Breakdown of parts:


# 1. components
### MediaComponents:
These components are used to create the image containers that appear within the application. It consists of MediaComponents which creates the rows made up of various MediaComponent elements.

### Navigation:
These components are used to navigate through the different filters that are available from TheCatAPI. NavigationItems dynamically creates NavigationItem elements. It will create them dynamically based on the categories available. The Toolbar is the element containing both of these.

### UI
These are elements that might be used throughout the application. One such element is Drowdown which creates a stylized dropdown selector based on the elements passed to it. It expects and array of objects with each containing label and value. Label should contain the label that will appear on the option in the dropdown and value should have its respective value.
	
# 2. containers
### ImageTable:
This is the element that will hold all the images and creates the table that they will be organized in. It is connected to the Redux state elements it needs to properly render. It will dynamically create more rows of images based on the state.

### Layout:
This is overall view of the application. It holds both the Toolbar and ImageTable. It is connected to the Redux store and passes functions and props to the two elements as needed. This element will check to see when a user has scrolled to the bottom of the page and initiate the request to retrieve more images.


# 3.store
### actions:
actionTypes: This holds a list of all the actionTypes used in actions and reducers. These are used to make things look a bit cleaner.

catAPI: This is where the API calls are made changes in state are sent to reducer to be handled. There are two main HTTP requests used for retrieving images. Favorites required a slight variation from all the other and as such has its own HTTP request compared to the rest. These functions are called by the application and make and make any additional changes needed to properly update the state.

### reducers:
catAPI: These functions are what will update the state. They take in the information sent from the actions and update the state accordingly.
