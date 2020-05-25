import React from 'react';
import DayPicker from 'react-day-picker';
import url from './config/config';

class HabitCalendar extends React.Component {
  state = {
    modifiers: {
      //birthday => done_all(성공률 100%, green)
      birthday: [new Date(2020, 4, 14), new Date(2020, 4, 16)],
      //default
      sunday: { daysOfWeek: [0] },
      foo: new Date(), //today
    },
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
        data = [true, false, false, true, true];
        data.forEach((x, index) => {
          if (x === true) {
            done_all.push(new Date(year, month, index + 1));
          }
        });
        this.setState((prevState) => {
          let modifiers = Object.assign({}, prevState.modifiers);
          modifiers.birthday = done_all;
          return { modifiers };
        });
      });
  }

  render() {
    const today = this.state.modifiers.foo;
    return (
      <div className='Calendar'>
        <div className='colorinfo'>
          <span className='green'> 완료 </span> / 미완료
        </div>
        <DayPicker
          modifiers={this.state.modifiers}
          initialMonth={new Date()}
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

export default HabitCalendar;
