import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      load: true,
      username: '',
      useremail: '',
      userdescription: '',
      imgUrl: '',
    };
  }

  async componentDidMount() {
    const { name, email, description, image } = await getUser();
    this.setState({
      load: false,
      username: name,
      useremail: email,
      userdescription: description,
      imgUrl: image,
    });
  }

  render() {
    const { load, username, useremail, userdescription, imgUrl } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { load
          ? (<Loading />)
          : (
            <section>
              <Link to="/profile/edit">
                Editar perfil
              </Link>
              <h2>{username}</h2>
              <h4>{useremail}</h4>
              <p>{userdescription}</p>
              <img
                src={ imgUrl }
                data-testid="profile-image"
                alt={ username }
              />
            </section>
          )}
      </div>
    );
  }
}

export default Profile;
