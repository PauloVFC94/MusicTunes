import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      load: true,
      disabled: true,
      username: '',
      useremail: '',
      userdescription: '',
      imgUrl: '',
      conclude: false,
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
    }, () => { this.btnEnabler(this.state); });
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value },
      () => { this.btnEnabler(this.state); });
  }

  clickFun = async (event) => {
    event.preventDefault();
    this.setState({
      load: true,
    });
    const { username, useremail, userdescription, imgUrl } = this.state;
    const name = username;
    const email = useremail;
    const image = imgUrl;
    const description = userdescription;
    const objProfile = { name, email, image, description };
    await updateUser(objProfile);
    this.setState({
      conclude: true,
      load: false,
    });
  }

  btnEnabler = (state) => {
    if (state.username !== ''
      && state.useremail !== ''
      && state.userdescription !== ''
      && state.imgUrl !== '') {
      return this.setState({ disabled: false });
    }
    return this.setState({ disabled: true });
  }

  render() {
    const {
      load,
      username,
      useremail,
      userdescription,
      imgUrl,
      disabled,
      conclude } = this.state;
    if (conclude) return <Redirect to="/profile" />;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { load
          ? <Loading />
          : (
            <form>
              <input
                value={ username }
                onChange={ this.handleChange }
                data-testid="edit-input-name"
                name="username"
              />
              <input
                value={ useremail }
                onChange={ this.handleChange }
                data-testid="edit-input-email"
                name="useremail"
              />
              <input
                value={ userdescription }
                onChange={ this.handleChange }
                data-testid="edit-input-description"
                name="userdescription"
              />
              <input
                value={ imgUrl }
                onChange={ this.handleChange }
                data-testid="edit-input-image"
                name="imgUrl"
              />
              <button
                type="submit"
                onClick={ this.clickFun }
                disabled={ disabled }
                data-testid="edit-button-save"
                name="profile-btn"
              >
                Enviar
              </button>
            </form>
          )}
      </div>
    );
  }
}

export default ProfileEdit;
