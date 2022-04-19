import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      artistName: '',
    };
  }

  handleChangeSearch = ({ target }) => {
    this.setState({ [target.name]: target.value },
      () => { this.btnEnabler(this.state); });
  };

  btnEnabler = (state) => {
    const minChar = 2;
    if (state.artistName.length >= minChar) {
      return this.setState({ disabled: false });
    }
    return this.setState({ disabled: true });
  }

  render() {
    const { disabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          name="artistName"
          placeholder="Nome do Artista"
          data-testid="search-artist-input"
          onChange={ this.handleChangeSearch }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          name="btn-search"
          disabled={ disabled }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
