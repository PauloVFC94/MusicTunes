import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

class NotFound extends Component {
  render() {
    return (
      <div data-testid="page-not-found" className="not-found">
        <img
          src="https://c.tenor.com/oogtfsQRHkgAAAAM/lost-john-travolta.gif"
          alt="erro 404"
        />
        <h1>Erro 404: Página não encontrada</h1>
        <Link to="/">
          <p>Voltar para a página Inicial</p>
        </Link>
      </div>
    );
  }
}

export default NotFound;
