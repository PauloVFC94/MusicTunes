import React, { Component } from 'react';
import Header from '../components/Header';

class ProfileEdit extends Component {
  render() {
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <input type="text" placeholder="Pesquisar" />
      </div>
    );
  }
}

export default ProfileEdit;
