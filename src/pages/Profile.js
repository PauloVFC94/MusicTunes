import React, { Component } from 'react';
import Header from '../components/Header';

class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <input type="text" placeholder="Pesquisar" />
      </div>
    );
  }
}

export default Profile;
