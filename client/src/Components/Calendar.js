import React from 'react';
import './Calendar.css';
import DayPicker from 'react-day-picker';

class Calendar extends React.Component {
  state = {
    modifiers: {
      //birthday => done_all
      birthday: [new Date(2020, 4, 14), new Date(2020, 4, 16)],
      //default
      sunday: { daysOfWeek: [0] },
      foo: new Date(), //today
    },
    done_partially: [new Date(2020, 4, 12), new Date(2020, 4, 20)],
  };
  componentDidMount() {
    //get Records
  }

  render() {
    console.log('foo', this.state.modifiers.foo);
    console.log('month', new Date(2020, 4));
    return (
      <div className='Calendar'>
        <div className='colorinfo'>
          성공률 : <span className='green'> 100% </span> /
          <span className='red'> 1~99% </span> / 0%
        </div>
        <DayPicker
          modifiers={this.state.modifiers}
          initialMonth={new Date(2020, 4)}
          selectedDays={this.state.done_partially}
          //default
          disabledDays={[
            {
              after: new Date(2000, 4, 0),
              before: this.state.modifiers.foo,
            },
          ]}
          todayButton='Go to Today'
          onTodayButtonClick={(day, modifiers) => console.log(day, modifiers)}
        />
      </div>
    );
  }
}

export default Calendar;
