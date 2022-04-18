import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

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
      <div data-testid="page-login">
        <img src="https://w7.pngwing.com/pngs/445/167/png-transparent-spotify-computer-icons-music-leather-logo-hand-logo-music-download-thumbnail.png" alt="xab" />
        <input
          data-testid="login-name-input"
          type="text"
          name="username"
          placeholder="Login"
          onChange={ this.handleChanger }
          value={ name }
        />
        <button
          data-testid="login-submit-button"
          type="submit"
          name="button-login"
          disabled={ buttonDisabled }
          onClick={ this.btnLogin }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
