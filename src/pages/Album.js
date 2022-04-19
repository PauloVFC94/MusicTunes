import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      load: false,
      musicas: [],
      artista: '',
      album: '',
      img: '',
      favorites: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState(
      { load: true },
      async () => {
        const musics = await getMusics(id);
        const favMusics = await getFavoriteSongs();
        this.setState({
          load: false,
          musicas: musics,
          artista: musics[0].artistName,
          album: musics[0].collectionName,
          img: musics[0].artworkUrl100,
          favorites: [...favMusics],
        });
      },
    );
  }

  render() {
    const { load, musicas, artista, album, img, favorites } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {load
          ? <Loading />
          : (
            <div>
              <img src={ img } alt={ album } />
              <p data-testid="album-name">{ album }</p>
              <p data-testid="artist-name">{ artista }</p>
              {musicas.slice(1).map((faixas) => (
                <section key={ faixas.trackId }>
                  <MusicCard
                    trackName={ faixas.trackName }
                    previewUrl={ faixas.previewUrl }
                    trackId={ faixas.trackId }
                    favorites={ favorites }
                  />
                </section>
              ))}
            </div>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
};

export default Album;
