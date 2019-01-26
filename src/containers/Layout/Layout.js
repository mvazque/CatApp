import React, { Component } from 'react';
import { connect } from 'react-redux';

//import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import ImageTable from '../ImageTable/ImageTable';
import * as actions from '../../store/actions/catAPI';

class Layout extends Component {
    componentDidMount() {
        this.props.getCategoryList();
        this.props.getDefault("gif%2Cjpg%2Cpng");
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount()  {
        window.removeEventListener('scroll', this.handleScroll);
    }

    // handleScroll = () => {
    //     //https://alligator.io/react/react-infinite-scroll/
    //     console.log("scrolling");
    // }

    retrieveDefault = () => {
        this.props.getDefault(this.props.currentFileType);
    }

    retrieveFavorite = () => {
        this.props.getFavorites();
    }

    retrieveACategory = (categoryData) => {
        this.props.getByCategory(this.props.currentFileType, categoryData.id);
    }

    retrieveAFileType = (event) => {
        this.props.selectFileType(event, this.props.currentCategory);
    }

    render () {
        return (
            <>
                <Toolbar 
                    default={{
                        label: "Home",
                        handlerToUse: this.retrieveDefault}}
                    favorite={{
                        label: "Favorites",
                        handlerToUse: this.retrieveFavorite}}
                    categories={{
                        categoriesList: this.props.categoriesList,
                        handlerToUse: this.retrieveACategory}}
                 />
                <ImageTable favorited={this.props.selectFavorite} selectFileType={this.retrieveAFileType} />
            </>
        )
    }
}

const mapStateToProps = state => {
    return{
        categoriesList: state.categoriesList,
        currentFileType: state.selectedFileType,
        currentCategory: state.currentCategoryID
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDefault: (fileType) => dispatch(actions.initDefault(fileType)),
        getFavorites: () => dispatch(actions.initFavorite()),
        getCategoryList: () => dispatch(actions.retrieveCategoryList()),
        getByCategory: (fileType, categoryID) => dispatch(actions.initCategory(fileType, categoryID)),
        selectFavorite: (dataID) => dispatch(actions.selectFavorite(dataID)),
        selectFileType: (event, categoryID) => dispatch(actions.initFileType(event, categoryID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);