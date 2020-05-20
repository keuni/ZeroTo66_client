import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import Mypage from './Components/Mypage';
import Signup from './Components/Signup';

class App extends React.Component {
  state = {
    isLogin: false,
  };

  handleLogin() {
    this.setState({
      isLogin: !this.state.isLogin,
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <Switch>
            <Route
              path='/signup'
              render={() => <Signup isLogin={this.state.isLogin} />}
            />
            <Route
              path='/login'
              render={() => <Login handleLogin={this.handleLogin.bind(this)} />}
            />

            <Route
              path='/mypage'
              render={() => (
                <Mypage handleLogin={this.handleLogin.bind(this)} />
              )}
            />

            <Route
              path='/'
              render={() => {
                if (this.state.isLogin) {
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
