import React from 'react';
import './HabitDetail.css';
import HabitCalendar from './HabitCalendar';

class HabitDetail extends React.Component {
  render() {
    return (
      <div className='habitDetail'>
        <div>
          <HabitCalendar detailHabitId={this.props.detailHabitId} />
        </div>
        <div className='detailInfo'>
          <div className='OnehabitName'>{this.props.detailHabitName}</div>
          <div>연속 : </div>
          <div>총합 : </div>
        </div>
      </div>
    );
  }
}
export default HabitDetail;
