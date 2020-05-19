import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './Components/Login'
import Mypage from './Components/Mypage'
import Signup from './Components/Signup'

class App extends React.Component { 
  state = {
    isLogin: false  
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/login" render={() => 
              <Login />}
            />  
            <Route path="/signup" render={() => 
              <Signup />}
            /> 
            <Route path="/mypage" render={() => 
              <Mypage />}
            />
            <Route
              path="/"
              render={() => {
                if (this.state.isLogin) {
                  return <Redirect to="/mypage" />;
                } return <Redirect to="/login" />;
              }}
            />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;