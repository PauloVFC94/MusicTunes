import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      load: false,
    };
  }

  handleChecker = ({ target }) => {
    this.setState({ checked: target.checked, load: true },
      async () => {
        const { trackName, previewUrl, trackId } = this.props;
        const { checked } = this.state;
        if (checked === true) {
          await addSong({ trackName, previewUrl, trackId });
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
              name="favorite"
              checked={ checked }
              value={ trackId }
              onChange={ this.handleChecker }
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
};

export default MusicCard;
