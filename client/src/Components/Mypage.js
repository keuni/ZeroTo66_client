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
      total: 0,
      streak: 0,
      longestStreak: 0,
    };
    this.showHabitDetail = this.showHabitDetail.bind(this);
    this.getStreakInfo = this.getStreakInfo.bind(this);
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
    this.getStreakInfo(id);
  }

  getStreakInfo(id) {
    console.log('getstreak', this.state.detailHabitId);
    fetch(url.server + 'record/' + id, {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          total: data.total,
          streak: data.streak,
          longestStreak: data.longestStreak,
        });
      });
  }

  render() {
    const {
      habitDetail,
      detailHabitName,
      detailHabitId,
      total,
      streak,
      longestStreak,
    } = this.state;
    return (
      <div className='Mypage'>
        <MyPageNav onClick={this.logout.bind(this)} />
        <div className='mypagebody'>
          <div className='mypageContent'>
            <HabitList showHabitDetail={this.showHabitDetail} />
            {habitDetail === false ? (
              <Calendar />
            ) : (
              <HabitDetail
                detailHabitName={detailHabitName}
                detailHabitId={detailHabitId}
                total={total}
                streak={streak}
                longestStreak={longestStreak}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Mypage;
