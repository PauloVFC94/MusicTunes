import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import './Login.css';
import trybetunes from './trybetunes.png';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
      username: '',
      isLoading: false,
      logged: false,
    };
  }

  handleChanger = ({ target }) => {
    this.setState({ [target.name]: target.value },
      () => { this.btnEnabler(this.state); });
  }

  btnEnabler = (state) => {
    const minChar = 3;
    if (state.username.length >= minChar) {
      return this.setState({ buttonDisabled: false });
    }
    return this.setState({ buttonDisabled: true });
  }

  btnLogin = async () => {
    const { username } = this.state;

    this.setState({
      isLoading: true,
    });

    await createUser({ name: username });

    this.setState({
      isLoading: false,
      logged: true,
    });
  }

  render() {
    const { name, buttonDisabled, logged, isLoading } = this.state;
    if (isLoading) return <Loading />;

    if (logged) return <Redirect to="/search" />;

    return (
      <div data-testid="page-login" className="center">
        <img
          src={ trybetunes }
          alt="trybetunes"
          className="login-img"
        />
        <div className="login-container">
          <input
            data-testid="login-name-input"
            className="login-input"
            type="text"
            name="username"
            placeholder="Login"
            onChange={ this.handleChanger }
            value={ name }
          />
          <button
            data-testid="login-submit-button"
            type="submit"
            className="login-btn"
            name="button-login"
            disabled={ buttonDisabled }
            onClick={ this.btnLogin }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
