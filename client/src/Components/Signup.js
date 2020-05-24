import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Modal from './SignupModal/Modal';
import './Signup.css';
import url from './config/config';

class Signup extends React.Component {
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
  handleModal(arg) {
    if (arg === 'blank') {
      this.setState({
        showModal: 'blank',
      });
    } else {
      this.setState({
        showModal: !this.state.showModal,
      });
    }
  }
  render() {
    return (
      <div>
        <center>
          <Modal
            showModal={this.state.showModal}
            handleModal={this.handleModal}
          />
          <div className='zeroTo66'>ZeroTo66</div>
          <div
            className={
              this.state.showModal ? 'Loginbox backSignup' : 'Loginbox'
            }
          >
            <div>Signup</div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (this.state.username === '' || this.state.password === '') {
                  this.handleModal('blank');
                } else {
                  fetch(url.server + 'user/signup', {
                    method: 'POST',
                    body: JSON.stringify({
                      username: this.state.username,
                      password: this.state.password,
                    }),
                    headers: { 'Content-Type': 'application/json' },
                  })
                    .then((res) => {
                      if (res.status === 201) {
                        this.props.history.push('/login');
                        return true;
                      } else {
                        this.handleModal();
                        return false;
                      }
                    })
                    .catch((err) => console.log(err));
                }
              }}
            >
              <div>
                <span className='IDtext'>ID</span>
                <input
                  type='text'
                  placeholder='ID를 입력해주세요'
                  onChange={this.handleInputValue('username')}
                ></input>
              </div>
              <div>
                <span className='PWtext'>PW</span>
                <input
                  onChange={this.handleInputValue('password')}
                  type='password'
                  placeholder='password를 입력해주세요'
                ></input>
              </div>
              <div className='goToOtherSide'>
                <Link to='/login'>아이디가 있으신가요?</Link>
              </div>
              <button className='login_signup_button' type='submit'>
                회원가입
              </button>
            </form>
          </div>
        </center>
      </div>
    );
  }
}
export default withRouter(Signup);
