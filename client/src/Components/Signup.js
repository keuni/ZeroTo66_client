import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Modal from './SignupModal/Modal';
import './Signup.css';

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
          <div
            className={
              this.state.showModal ? 'Signupbox backSignup' : 'Signupbox'
            }
          >
            <h1>Signup</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (this.state.username === '' || this.state.password === '') {
                  this.handleModal('blank');
                } else {
                  fetch(
                    // 'http://localhost:4000/user/signup',
                    'http://54.180.103.96:4000/user/signup',
                    {
                      method: 'POST',
                      body: JSON.stringify({
                        username: this.state.username,
                        password: this.state.password,
                      }),
                      headers: { 'Content-Type': 'application/json' },
                    }
                  )
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
                  style={{
                    width: '400px',
                    height: '30px',
                    margin: '8px',
                    borderRadius: '5px',
                  }}
                  type='text'
                  placeholder='ID를 입력해주세요'
                  onChange={this.handleInputValue('username')}
                ></input>
              </div>
              <div>
                <span className='PWtext'>PW</span>
                <input
                  style={{
                    width: '400px',
                    height: '30px',
                    margin: '5px',
                    borderRadius: '5px',
                  }}
                  onChange={this.handleInputValue('password')}
                  type='password'
                  placeholder='password를 입력해주세요'
                ></input>
              </div>
              <div>
                <Link to='/login'>아이디가 있으신가요?</Link>
              </div>
              <button
                style={{
                  width: '200px',
                  height: '30px',
                  margin: '5px',
                  borderRadius: '5px',
                  backgroundColor: '#CBA6C3',
                }}
                type='submit'
              >
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
