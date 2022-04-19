import React, { Component } from 'react';
import Header from '../components/Header';

class Album extends Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <input type="text" placeholder="Pesquisar" />
      </div>
    );
  }
}

export default Album;
