import React from 'react';
import './Mypage.css';
import HabitList from './HabitList';
import Calendar from './Calendar';
import url from './config/config';
import MyPageNav from './MyPageNav';

class Mypage extends React.Component {
  logout = () => {
    return fetch(url.server + 'user/signout', {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      this.props.handleLogin();
    });
  };
  render() {
    return (
      <div className='Mypage'>
        <MyPageNav onClick={this.logout.bind(this)} />
        <div className='mypagebody'>
          <div className='mypageContent'>
            <HabitList />
            <Calendar />
          </div>
        </div>
      </div>
    );
  }
}

export default Mypage;
