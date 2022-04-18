import React, { Component } from 'react';

class Favorites extends Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <input type="text" placeholder="Pesquisar" />
      </div>
    );
  }
}

export default Favorites;
