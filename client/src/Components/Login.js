import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Modal from './LoginModal/Modal'
import './Login.css'

class Login extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      showModal: false
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }
  handleInputValue = key => e => {
    this.setState({ [key]: e.target.value });
  };

  handleModal() {
    this.setState({
      showModal: !this.state.showModal
    })
  };

  render() {
    return (
      <div className="Login">
        <Modal showModal={this.state.showModal} handleModal={this.handleModal} />
        <div className={this.state.showModal ? "Loginbox backLogin" : "Loginbox"}>
          <h1>Login</h1>
          <form
            onSubmit={e => {
              e.preventDefault();
              console.log(this.props)
              this.props.handleLogin();
              this.props.history.push('/mypage');
              // return fetch('http://localhost:4000/signin', {
              //   method: 'POST',
              //   withCredentials: true,
              //   credentials: 'include',
              //   body: JSON.stringify(this.state),
              //   headers: {
              //     'Content-Type': 'application/json',
              //   },
              // }).then(result => {
              //   if(result.status === 200) {
              //     this.props.handleLogin();
              //     this.props.history.push('/mypage');
              //     return true;
              //   } 
              //   this.handleModal();
              //   return false;
              // })
            }}
          >
            <div>
              <input
                style={{
                  width: '400px',
                  height: '30px',
                  margin: '5px',
                  borderRadius: '5px'
                }}
                type="text"
                placeholder="username"
                onChange={this.handleInputValue('username')}
              ></input>
            </div>
            <div>
              <input
                style={{
                  width: '400px',
                  height: '30px',
                  margin: '5px',
                  borderRadius: '5px'
                }}
                type="password"
                placeholder="password"
                onChange={this.handleInputValue('password')}
              ></input>
            </div>
            <div>
              <Link to="/signup">회원가입하기</Link>
            </div>
            <button
              style={{
                width: '200px',
                height: '30px',
                margin: '5px',
                borderRadius: '5px',
                backgroundColor: '#CBA6C3'
              }}
              type="submit"
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);

 