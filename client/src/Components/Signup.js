import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Modal from '../SignupModal/Modal';
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
            <h1>ZeroTo66</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log('유저이름: ', this.state.username);
                if (this.state.username === '' || this.state.password === '') {
                  this.handleModal('blank');
                } else {
                  fetch('http://localhost:4000/user/signup', {
                    method: 'POST',
                    body: JSON.stringify({
                      username: this.state.username,
                      password: this.state.password,
                    }),
                    headers: { 'Content-Type': 'application/json' },
                  })
                    .then((res) => {
                      console.log('RES ', res);
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
                Id
                <input
                  style={{
                    width: '400px',
                    height: '30px',
                    margin: '5px',
                    borderRadius: '5px',
                  }}
                  type="text"
                  placeholder="Id를 입력해주세요"
                  onChange={this.handleInputValue('username')}
                ></input>
              </div>
              <div>
                Pw
                <input
                  style={{
                    width: '400px',
                    height: '30px',
                    margin: '5px',
                    borderRadius: '5px',
                  }}
                  onChange={this.handleInputValue('password')}
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                ></input>
              </div>
              <div>
                <Link to="/login">아이디 있으신가요?</Link>
              </div>
              <button
                style={{
                  width: '200px',
                  height: '30px',
                  margin: '5px',
                  borderRadius: '5px',
                  backgroundColor: 'skyblue',
                }}
                type="submit"
              >
                Signup
              </button>
            </form>
          </div>
        </center>
      </div>
    );
  }
}
export default withRouter(Signup);
