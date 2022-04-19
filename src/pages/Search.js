import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import CardMusic from '../components/CardMusic';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      artistName: '',
      load: false,
      artistLoad: false,
      musicList: [],
      show: false,
      artistStorage: '',
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

  btnFunc = async () => {
    const { artistName } = this.state;
    const keySearch = artistName;
    this.setState({
      load: true,
      show: true,
      artistStorage: artistName,
    });
    const results = await searchAlbumsAPI(keySearch);
    this.setState({
      artistName: '',
      disabled: true,
      load: false,
      artistLoad: true,
      musicList: results,
    });
  }

  render() {
    const { disabled, load, musicList, show, artistStorage, artistLoad } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {load
          ? <Loading />
          : (
            <div>
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
                onClick={ this.btnFunc }
              >
                Pesquisar
              </button>
            </div>
          )}
        {show
          ? <span>{`Resultado de álbuns de: ${artistStorage}`}</span>
          : <span> </span>}
        {musicList.length === 0 && artistLoad
          ? (
            <span>Nenhum álbum foi encontrado</span>
          ) : (
            <div>
              {musicList.map((album) => (
                <section key={ album.collectionId }>
                  <CardMusic
                    collectionId={ album.collectionId }
                    artworkUrl100={ album.artworkUrl100 }
                    collectionName={ album.collectionName }
                    artistName={ album.artistName }
                  />
                </section>
              ))}
            </div>
          )}
      </div>
    );
  }
}

export default Search;
