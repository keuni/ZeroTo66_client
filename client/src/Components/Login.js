import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Modal from './LoginModal/Modal';
import './Login.css';
import url from './config/config';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      showModal: false,
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }
  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  handleModal(status) {
    if (status === 404 || status === 403) {
      this.setState({
        showModal: status,
      });
    } else {
      this.setState({
        showModal: false,
      });
    }
  }

  render() {
    return (
      <div className='Login'>
        <Modal
          showModal={this.state.showModal}
          handleModal={this.handleModal}
        />
        <div className='zeroTo66'>ZeroTo66</div>
        <div
          className={this.state.showModal ? 'Loginbox backLogin' : 'Loginbox'}
        >
          <h1>Login</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              return fetch(url.server + 'user/signin', {
                method: 'POST',
                withCredentials: true,
                credentials: 'include',
                body: JSON.stringify({
                  username: this.state.username,
                  password: this.state.password,
                }),
                headers: {
                  'Content-Type': 'application/json',
                },
              }).then((result) => {
                if (result.status === 200) {
                  this.props.handleLogin();
                  this.props.history.push('/mypage');
                  return true;
                }
                this.handleModal(result.status);
                return false;
              });
            }}
          >
            <div>
              <input
                type='text'
                placeholder='ID를 입력해주세요'
                onChange={this.handleInputValue('username')}
              ></input>
            </div>
            <div>
              <input
                type='password'
                placeholder='password를 입력해주세요'
                onChange={this.handleInputValue('password')}
              ></input>
            </div>
            <div className='goToOtherSide'>
              <Link to='/signup'>회원가입하기</Link>
            </div>
            <button className='login_signup_button' type='submit'>
              로그인
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
