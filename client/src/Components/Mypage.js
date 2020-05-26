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
      Habitmodifiers: {
        //birthday => done_all(성공률 100%, green)
        birthday: [],
        //default
        sunday: { daysOfWeek: [0] },
        foo: new Date(), //today
      },
    };
    this.showHabitDetail = this.showHabitDetail.bind(this);
    this.getStreakInfo = this.getStreakInfo.bind(this);
    this.getPercentage = this.getPercentage.bind(this);
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

  getPercentage(id) {
    fetch(url.server + 'habit/detail?habitId=' + id, {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let year = new Date().getFullYear();
        let month = new Date().getMonth();
        let done_all = [];
        data.forEach((x, index) => {
          if (x === true) {
            done_all.push(new Date(year, month, index + 1));
          }
        });
        this.setState((prevState) => {
          let Habitmodifiers = Object.assign({}, prevState.Habitmodifiers);
          Habitmodifiers.birthday = done_all;
          return { Habitmodifiers };
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
      Habitmodifiers,
    } = this.state;
    return (
      <div className='Mypage'>
        <MyPageNav logout={this.logout.bind(this)} />
        <div className='mypagebody'>
          <div className='mypageContent'>
            <HabitList
              showHabitDetail={this.showHabitDetail}
              getPercentage={this.getPercentage}
            />
            {habitDetail === false ? (
              <Calendar />
            ) : (
              <HabitDetail
                detailHabitName={detailHabitName}
                detailHabitId={detailHabitId}
                total={total}
                streak={streak}
                longestStreak={longestStreak}
                modifiers={Habitmodifiers}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Mypage;
