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
      detailyear: new Date().getFullYear(),
      detailMonth: new Date().getMonth() + 1,
      total: 0,
      streak: 0,
      longestStreak: 0,
      Habitmodifiers: {
        birthday: [],
        sunday: { daysOfWeek: [0] },
        foo: new Date(), //today
      },
      mainCalendar: {
        modifiers: {
          birthday: [],
          sunday: { daysOfWeek: [0] },
          foo: new Date(), //today
        },
        done_partially: [],
      },
    };
    this.showHabitDetail = this.showHabitDetail.bind(this);
    this.getStreakInfo = this.getStreakInfo.bind(this);
    this.getHabitCalendarInfo = this.getHabitCalendarInfo.bind(this);
    this.getMainCalendarInfo = this.getMainCalendarInfo.bind(this);
    this.colorTodayComplete = this.colorTodayComplete.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
    this.getdetailMonth = this.getdetailMonth.bind(this);
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

  showHabitDetail(index, id, habitName, check) {
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
    this.colorTodayComplete(check, id);
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

  getHabitCalendarInfo(id, year, mth) {
    let fetchUrl =
      url.server +
      'habit/detail?habitId=' +
      id +
      '&year=' +
      year +
      '&month=' +
      mth;
    let month = mth - 1;
    fetch(fetchUrl, {
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
  getMainCalendarInfo(yr, mth) {
    let fetchUrl;
    let year;
    let month;
    if (yr === undefined) {
      fetchUrl = url.server + 'record/monthly';
      year = new Date().getFullYear();
      month = new Date().getMonth();
    } else {
      fetchUrl = url.server + 'record/monthly?year=' + yr + '&month=' + mth;
      year = yr;
      month = mth - 1;
    }
    fetch(fetchUrl, {
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
        if (data) {
          let done_all = [];
          let done_partially = [];
          data.done_all.forEach((x) => {
            let date = Number(x.slice(8));
            done_all.push(new Date(year, month, date));
          });
          data.done_partially.forEach((x) => {
            let date = Number(x.slice(8));
            done_partially.push(new Date(year, month, date));
          });
          this.setState((prevState) => {
            let mainCalendar = Object.assign({}, prevState.mainCalendar);
            mainCalendar.modifiers.birthday = done_all;
            mainCalendar.done_partially = done_partially;
            return { mainCalendar };
          });
        }
      });
  }

  changeMonth(year, month) {
    this.getMainCalendarInfo(year, month);
  }

  colorTodayComplete(complete, clickedId) {
    if (clickedId === this.state.detailHabitId) {
      if (complete) {
        let Habitmodifiers = Object.assign({}, this.state.Habitmodifiers);
        Habitmodifiers.birthday.push(new Date());
        this.setState({ Habitmodifiers });
      } else {
        let Habitmodifiers = Object.assign({}, this.state.Habitmodifiers);
        Habitmodifiers.birthday.pop();
        this.setState({ Habitmodifiers });
      }
    }
  }

  getdetailMonth(year, month) {
    this.setState({
      detailyear: year,
      detailMonth: month,
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
      mainCalendar,
      detailMonth,
      detailyear,
    } = this.state;
    return (
      <div className='Mypage'>
        <MyPageNav logout={this.logout.bind(this)} />
        <div className='mypagebody'>
          <div className='mypageContent'>
            <HabitList
              showHabitDetail={this.showHabitDetail}
              getHabitCalendarInfo={this.getHabitCalendarInfo}
              getMainCalendarInfo={this.getMainCalendarInfo}
              colorTodayComplete={this.colorTodayComplete}
              detailMonth={detailMonth}
              detailyear={detailyear}
            />
            {habitDetail === false ? (
              <Calendar
                mainCalendar={mainCalendar}
                getMainCalendarInfo={this.getMainCalendarInfo}
                changeMonth={this.changeMonth}
              />
            ) : (
              <HabitDetail
                detailHabitName={detailHabitName}
                detailHabitId={detailHabitId}
                total={total}
                streak={streak}
                longestStreak={longestStreak}
                modifiers={Habitmodifiers}
                getHabitCalendarInfo={this.getHabitCalendarInfo}
                getdetailMonth={this.getdetailMonth}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Mypage;
