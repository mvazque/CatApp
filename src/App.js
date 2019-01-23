import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ImageTable from './containers/ImageTable/ImageTable';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ImageTable />
      </div>
    );
  }
}

export default App;
