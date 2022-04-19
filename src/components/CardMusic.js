import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CardMusic extends Component {
  render() {
    const {
      artistName,
      collectionId,
      collectionName,
      artworkUrl100,
    } = this.props;
    return (
      <div>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <img src={ artworkUrl100 } alt={ `${artistName} ${collectionName}` } />
          <span>{ collectionName }</span>
          <span>{ artistName }</span>
        </Link>
      </div>
    );
  }
}

CardMusic.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
};

export default CardMusic;
