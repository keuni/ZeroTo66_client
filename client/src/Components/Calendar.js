import React from 'react';
import './Calendar.css';
import DayPicker from 'react-day-picker';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.onMonthclick = this.onMonthclick.bind(this);
  }
  componentDidMount() {
    this.props.getMainCalendarInfo();
  }
  onMonthclick(date) {
    this.props.changeMonth(date.getFullYear(), date.getMonth() + 1);
  }

  render() {
    const today = this.props.mainCalendar.modifiers.foo;
    return (
      <div className='Calendar MainCalendar'>
        <div className='colorinfo'>
          성공률 : <span className='green'> 100% </span> /
          <span className='red'> 1~99% </span> / 0%
        </div>
        <DayPicker
          modifiers={this.props.mainCalendar.modifiers}
          initialMonth={new Date()}
          selectedDays={this.props.mainCalendar.done_partially}
          disabledDays={[
            {
              after: new Date(2000, 0, 0),
              before: today,
            },
          ]}
          todayButton='Go to Today'
          onMonthChange={(month) => this.onMonthclick(month)}
        />
      </div>
    );
  }
}

export default Calendar;
