import React from 'react';
import { Link } from 'react-router-dom';
import './Mypage.css';
import HabitList from './HabitList';
import Calendar from './Calendar';

function Mypage(props) {
  const logout = () => {
    return fetch(
      // 'http://localhost:4000/user/signout',
      'http://54.180.103.96:4000/user/signout',
      {
        method: 'GET',
        withCredentials: true,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(() => {
      props.handleLogin();
    });
  };
  return (
    <div className='Mypage'>
      <Link to='/login'>
        <button className='Logout' onClick={logout}>
          LOGOUT
        </button>
      </Link>
      <div className='MypagezeroTo66'>ZeroTo66</div>
      <HabitList />
      <Calendar />
    </div>
  );
}

export default Mypage;
