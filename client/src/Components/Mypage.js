import React from 'react';
import { Link } from 'react-router-dom';
import './Mypage.css'


function Mypage(props) {

  const logout = () => {
    props.handleLogin();
    fetch('http://localhost:4000/signout', {
      method: 'GET',
    }).then(result => {
      console.log('logout',result)
      // eslint-disable-next-line no-useless-concat
      document.cookie = "token" + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    })
  }
  return (
    <div className="Mypage">
        <Link to="/login">
        <button className="Logout" onClick={logout}>LOGOUT</button>
        </Link>
        <div className="HabitList">

        </div>
    </div>
  );
}

export default Mypage;
 