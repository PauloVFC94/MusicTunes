import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import './Profile.css';

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
            <section className="profile-container">
              <div className="info-foto-div">
                <div className="profile-image-div">
                  <img
                    src={ imgUrl }
                    data-testid="profile-image"
                    alt={ username }
                    className="userfoto-profile"
                  />
                </div>
                <div className="info-profile-div">
                  <h2 className="username-profile">{username}</h2>
                  <h4 className="useremail-profile">{useremail}</h4>
                  <p className="userdesc-profile">{userdescription}</p>
                </div>
              </div>
              <Link to="/profile/edit" className="edit-profile-link">
                Editar perfil
              </Link>
            </section>
          )}
      </div>
    );
  }
}

export default Profile;
