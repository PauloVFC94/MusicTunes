import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './CardMusic.css';

class CardMusic extends Component {
  render() {
    const {
      artistName,
      collectionId,
      collectionName,
      artworkUrl100,
    } = this.props;
    return (
      <div className="card-container">
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
          className="link1"
        >
          <div className="div-image-card">
            <img src={ artworkUrl100 } alt={ `${artistName} ${collectionName}` } />
          </div>
          <div className="div-info-card">
            <p>{ `Álbum: ${collectionName}` }</p>
            <p>{ ` Artista: ${artistName}` }</p>
          </div>
        </Link>
      </div>
    );
  }
}

CardMusic.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
};

export default CardMusic;
