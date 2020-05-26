import React from 'react';
import DayPicker from 'react-day-picker';

class HabitCalendar extends React.Component {
  render() {
    const today = this.props.modifiers.foo;
    return (
      <div className='Calendar'>
        <div className='colorinfo'>
          <span className='green'> 완료 </span> / 미완료
        </div>
        <DayPicker
          modifiers={this.props.modifiers}
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
