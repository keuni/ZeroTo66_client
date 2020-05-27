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
      detailyear: null,
      detailMonth: null,
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
      curHabitInfo: {
        unit: 'check',
        goal: 0,
        progress: 0,
      },
      curHabitTimer: {
        onTimer: false,
        minutes: 0,
        seconds: 0,
      },
    };
    this.showHabitDetail = this.showHabitDetail.bind(this);
    this.getStreakInfo = this.getStreakInfo.bind(this);
    this.getHabitCalendarInfo = this.getHabitCalendarInfo.bind(this);
    this.getMainCalendarInfo = this.getMainCalendarInfo.bind(this);
    this.colorTodayComplete = this.colorTodayComplete.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
    this.getdetailMonth = this.getdetailMonth.bind(this);
    this.handleCurHabitProgress = this.handleCurHabitProgress.bind(this);
    this.postRecord = this.postRecord.bind(this);
    this.setCurHabitTimer = this.setCurHabitTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.setHabitProgress = this.setHabitProgress.bind(this);
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

  showHabitDetail(index, id, habitName, check, unit, goal, progress) {
    if (this.state.habitDetail === index) {
      this.setState({
        habitDetail: false,
        detailHabitId: null,
        detailHabitName: null,
        curHabitInfo: {
          unit: 'check',
          goal: 0,
          progress: 0,
        },
        curHabitTimer: {
          onTimer: false,
          minutes: 0,
          seconds: 0,
        },
      });
    } else {
      this.setState({
        habitDetail: index,
        detailHabitId: id,
        detailHabitName: habitName,
        curHabitInfo: { unit: unit, goal: goal, progress: progress },
        curHabitTimer: {
          onTimer: false,
          minutes:
            unit === 'minute' ? Math.floor((goal * 60 - progress) / 60) : 0,
          seconds: unit === 'minute' ? (goal * 60 - progress) % 60 : 0,
        },
      });
      clearInterval(this.timer);
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
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        if (data) {
          this.setState({
            total: data.total,
            streak: data.streak,
            longestStreak: data.longestStreak,
          });
        }
      });
  }

  getHabitCalendarInfo(id, yr, mth) {
    let fetchUrl, year, month;
    if (yr) {
      fetchUrl =
        url.server +
        'habit/detail?habitId=' +
        id +
        '&year=' +
        yr +
        '&month=' +
        mth;
      year = yr;
      month = mth - 1;
    } else {
      fetchUrl = url.server + 'habit/detail?habitId=' + id;
      year = new Date().getFullYear();
      month = new Date().getMonth();
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

  postRecord(id, result) {
    fetch(url.server + 'record', {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      body: JSON.stringify({
        habitId: id,
        progress: result,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    });
  }

  handleCurHabitProgress(progress) {
    this.setState({
      curHabitInfo: { ...this.state.curHabitInfo, progress: progress },
    });
  }

  setCurHabitTimer() {
    this.timer = setInterval(() => {
      const { curHabitInfo, detailHabitId, curHabitTimer } = this.state;
      const { seconds, minutes } = curHabitTimer;
      if (seconds > 0) {
        this.setState({
          curHabitTimer: {
            ...curHabitTimer,
            minutes: minutes,
            seconds: seconds - 1,
          },
        });
      }
      if (seconds === 0) {
        if (minutes === 0) {
          this.setState({
            curHabitTimer: {
              ...curHabitTimer,
              onTimer: false,
            },
          });
          clearInterval(this.timer);
        } else {
          this.setState({
            curHabitTimer: {
              ...curHabitTimer,
              minutes: minutes - 1,
              seconds: 59,
            },
          });
        }
      }

      let newProgress = curHabitInfo.goal * 60 - (minutes * 60 + seconds);
      this.setHabitProgress(detailHabitId, newProgress);
    }, 1000);
  }

  setHabitProgress(habitId, newProgress) {
    this.postRecord(habitId, newProgress);
    this.handleCurHabitProgress(newProgress);
  }

  startTimer() {
    this.setState({
      curHabitTimer: {
        ...this.state.curHabitTimer,
        onTimer: true,
      },
    });
    this.setCurHabitTimer();
  }

  stopTimer() {
    this.setState({
      curHabitTimer: {
        ...this.state.curHabitTimer,
        onTimer: false,
      },
    });
    clearInterval(this.timer);
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
      curHabitInfo,
      curHabitTimer,
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
              postRecord={this.postRecord}
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
                curHabitInfo={curHabitInfo}
                handleCurHabitProgress={this.handleCurHabitProgress}
                postRecord={this.postRecord}
                setCurHabitTimer={this.setCurHabitTimer}
                curHabitTimer={curHabitTimer}
                startTimer={this.startTimer}
                stopTimer={this.stopTimer}
                setHabitProgress={this.setHabitProgress}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Mypage;
