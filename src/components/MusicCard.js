import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      load: false,
    };
  }

  componentDidMount() {
    const { favorites, trackId } = this.props;
    if (favorites.some((music) => music.trackId === trackId)) {
      this.setState({ checked: true });
    } else {
      this.setState({ checked: false });
    }
  }

  componentDidUpdate() {
    getFavoriteSongs();
  }

  handleChecker = (event, checked) => {
    this.setState({ checked: event.target.checked, load: true },
      async () => {
        const { trackName, previewUrl, trackId } = this.props;
        if (!checked) {
          await addSong({ trackName, previewUrl, trackId });
          this.setState({ load: false });
        } else {
          await removeSong({ trackName, previewUrl, trackId });
          this.setState({ load: false });
        }
      });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { load, checked } = this.state;
    return (load
      ? <Loading />
      : (
        <div>
          <p>{ trackName }</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          <label
            htmlFor="favorite"
          >
            Favorita
            <input
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              checked={ checked }
              onChange={ (event) => { this.handleChecker(event, checked); } }
            />
          </label>
        </div>
      )
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;
