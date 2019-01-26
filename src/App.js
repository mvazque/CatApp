import React, { Component } from 'react';
import './App.css';

import Toolbar from './components/Navigation/Toolbar/Toolbar';
import ImageTable from './containers/ImageTable/ImageTable';
import Layout from './containers/Layout/Layout';

class App extends Component {
  render() {
    return (
      <div className="App">
      	<Layout />
      </div>
    );
  }
}

export default App;
