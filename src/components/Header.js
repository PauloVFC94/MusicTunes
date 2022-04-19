import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
      });
    });
  }

  render() {
    const { username, load } = this.state;
    return (
      <div>
        {load
          ? <Loading />
          : (
            <header data-testid="header-component">
              <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
              <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
              <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
              <span data-testid="header-user-name">{`Bem-vindo, ${username}`}</span>
            </header>) }
      </div>
    );
  }
}

export default Header;
