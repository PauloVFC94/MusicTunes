import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div data-testid="page-login">
        <img src="https://logospng.org/wp-content/uploads/spotify.png" alt="xab" />
        <input type="text" placeholder="Login" />
        <button data-testid="login-submit-button" type="submit">Entrar</button>
      </div>
    );
  }
}

export default Login;
