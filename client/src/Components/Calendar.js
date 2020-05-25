import React from 'react';
import './Calendar.css';
import DayPicker from 'react-day-picker';
import url from './config/config';

class Calendar extends React.Component {
  state = {
    modifiers: {
      //birthday => done_all(성공률 100%, green)
      birthday: [new Date(2020, 4, 16)],
      //default
      sunday: { daysOfWeek: [0] },
      foo: new Date(), //today
    },
    //done_partiallyl(성공률 1-99%, red)
    done_partially: [new Date(2020, 4, 12), new Date(2020, 4, 20)],
  };

  componentDidMount() {
    fetch(url.server + 'habit/' + this.props.detailHabitId, {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        let year = new Date().getFullYear();
        let month = new Date().getMonth();
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
          let modifiers = Object.assign({}, prevState.modifiers);
          modifiers.birthday = done_all;
          return { modifiers, done_partially };
        });
      });
  }

  render() {
    const today = this.state.modifiers.foo;
    return (
      <div className='Calendar MainCalendar'>
        <div className='colorinfo'>
          성공률 : <span className='green'> 100% </span> /
          <span className='red'> 1~99% </span> / 0%
        </div>
        <DayPicker
          modifiers={this.state.modifiers}
          initialMonth={new Date()}
          selectedDays={this.state.done_partially}
          disabledDays={[
            {
              after: new Date(2000, 0, 0),
              before: today,
            },
          ]}
          todayButton='Go to Today'
        />
      </div>
    );
  }
}

export default Calendar;
