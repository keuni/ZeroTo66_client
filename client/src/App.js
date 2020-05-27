import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import Mypage from './Components/Mypage';
import Signup from './Components/Signup';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogIn: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    let previousState = window.localStorage.getItem('isLogIn');
    let presentState;
    if (previousState === 'false' || !previousState) {
      window.localStorage.setItem('isLogIn', true);
      presentState = true;
    } else {
      window.localStorage.setItem('isLogIn', false);
      presentState = false;
    }
    this.setState({
      isLogIn: presentState,
    });
  }

  componentDidMount() {
    let previousState = window.localStorage.getItem('isLogIn');
    let presentState;
    if (previousState === 'false' || !previousState) {
      presentState = true;
    } else {
      presentState = false;
    }
    this.setState({
      isLogIn: presentState,
    });
  }

  render() {
    let previousState = window.localStorage.getItem('isLogIn');
    return (
      <BrowserRouter>
        <div className='App'>
          <Switch>
            <Route path='/signup' render={() => <Signup />} />
            <Route
              path='/login'
              render={() => <Login handleLogin={this.handleLogin} />}
            />

            <Route
              path='/mypage'
              render={() => {
                if (previousState === 'true') {
                  return <Mypage handleLogin={this.handleLogin} />;
                } else {
                  return <Redirect to='/login' />;
                }
              }}
            />

            <Route
              path='/'
              render={() => {
                if (previousState === 'true') {
                  return <Redirect to='/mypage' />;
                }
                return <Redirect to='/login' />;
              }}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
