import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import './Favorites.css';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      load: false,
    };
  }

  async componentDidMount() {
    this.setState({
      load: true,
    });
    const favoriteList = await getFavoriteSongs();
    console.log(favoriteList);
    this.setState({
      list: [...favoriteList],
      load: false,
    });
    console.log(favoriteList);
  }

  async shouldComponentUpdate() {
    const fav = await getFavoriteSongs();
    this.setState({
      list: [...fav],
    });
  }

  componentDidUpdate() {
    getFavoriteSongs();
  }

  render() {
    const { load, list } = this.state;
    return (
      load
        ? <Loading />
        : (
          <div data-testid="page-favorites">
            <Header />
            <div className="favorite-list">
              {list.map((music) => (
                <section key={ music.trackId }>
                  <MusicCard
                    trackName={ music.trackName }
                    trackId={ music.trackId }
                    previewUrl={ music.previewUrl }
                    favorites={ list }
                  />
                </section>
              ))}
            </div>
          </div>
        )
    );
  }
}

export default Favorites;
