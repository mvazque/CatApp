import React, { Component } from 'react';
import { connect } from 'react-redux';

//import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import ImageTable from '../ImageTable/ImageTable';
import * as actions from '../../store/actions/catAPI';

class Layout extends Component {
    componentDidMount() {
        this.props.getCategoryList();
    }

    retrieveDefault = () => {
        this.props.getDefault();
    }

    retrieveFavorite = () => {
        this.props.getFavorites();
    }

    retrieveACategory = (categoryData) => {
        console.log(categoryData);
        console.log("CATegory");
        this.props.getByCategory(categoryData.id);
        // categoryID
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
                <ImageTable favorited={this.props.selectFavorite}/>
            </>
        )
    }
}

const mapStateToProps = state => {
    return{
        categoriesList: state.categoriesList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDefault: () => dispatch(actions.initDefault()),
        getFavorites: () => dispatch(actions.initFavorite()),
        getCategoryList: () => dispatch(actions.retrieveCategoryList()),
        getByCategory: (categoryID) => dispatch(actions.initCategory(categoryID)),
        selectFavorite: (dataID) => dispatch(actions.selectFavorite(dataID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);