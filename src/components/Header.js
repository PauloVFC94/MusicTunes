import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import trybetunes from './trybetunes.png';
import usericon from './user-icon.png';
import './Header.css';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      load: false,
    };
  }

  componentDidMount() {
    this.setState({
      load: true,
    }, async () => {
      const user = await getUser();
      this.setState({
        load: false,
        username: user.name,
        foto: usericon,
      });
    });
  }

  render() {
    const { username, load, foto } = this.state;
    return (
      <div>
        {load
          ? <Loading />
          : (
            <header data-testid="header-component">
              <div className="container-top">
                <img src={ trybetunes } alt="trybetunes" />
                <div className="username">
                  <img src={ foto } alt={ username } className="foto" />
                  <span data-testid="header-user-name">{username}</span>
                </div>
              </div>
              <div className="container-bot">
                <Link
                  to="/search"
                  data-testid="link-to-search"
                  className="link"
                >
                  Pesquisa
                </Link>
                <Link
                  to="/favorites"
                  data-testid="link-to-favorites"
                  className="link"
                >
                  Favoritos
                </Link>
                <Link
                  to="/profile"
                  data-testid="link-to-profile"
                  className="link"
                >
                  Perfil
                </Link>
              </div>
            </header>) }
      </div>
    );
  }
}

export default Header;
