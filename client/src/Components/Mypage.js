import React from 'react';
import './Mypage.css';
import HabitList from './HabitList';
import Calendar from './Calendar';
import url from './config/config';
import MyPageNav from './MyPageNav';
import HabitDetail from './HabitDetail';

class Mypage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      habitDetail: false,
      detailHabitName: null,
      detailHabitId: null,
    };
    this.showHabitDetail = this.showHabitDetail.bind(this);
  }
  logout() {
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
  }

  showHabitDetail(index, id, habitName) {
    if (this.state.habitDetail === index) {
      this.setState({
        habitDetail: false,
        detailHabitId: null,
        detailHabitName: null,
      });
    } else {
      this.setState({
        habitDetail: index,
        detailHabitId: id,
        detailHabitName: habitName,
      });
    }
  }

  render() {
    return (
      <div className='Mypage'>
        <MyPageNav onClick={this.logout.bind(this)} />
        <div className='mypagebody'>
          <div className='mypageContent'>
            <HabitList showHabitDetail={this.showHabitDetail} />
            {this.state.habitDetail === false ? (
              <Calendar />
            ) : (
              <HabitDetail
                detailHabitName={this.state.detailHabitName}
                detailHabitId={this.state.detailHabitId}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Mypage;
