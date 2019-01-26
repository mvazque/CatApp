import React, { Component } from 'react';
import { connect } from 'react-redux';

//import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import ImageTable from '../ImageTable/ImageTable';
import * as actions from '../../store/actions/catAPI';

class Layout extends Component {
    retrieveFavorite = () => {
        this.props.getFavorites();
    }

    render () {
        return (
            <>
                <Toolbar 
                    default={{
                        label: "Home",
                        handlerToUse: this.retrieveFavorite}}
                    favorite={{
                        label: "Favorites",
                        handlerToUse: this.retrieveFavorite}}

                 />
                <ImageTable/>
            </>
        )
    }
}

// const mapStateToProps = state => {
//     return{
        
//     };
// };

const mapDispatchToProps = dispatch => {
    return {
        getFavorites: () => dispatch(actions.initFavorite())
    }
}

export default connect(null, mapDispatchToProps)(Layout);