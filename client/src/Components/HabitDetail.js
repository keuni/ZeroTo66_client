import React from 'react';
import './HabitDetail.css';
import HabitCalendar from './HabitCalendar';

class HabitDetail extends React.Component {
  render() {
    const {
      detailHabitId,
      detailHabitName,
      total,
      streak,
      longestStreak,
    } = this.props;

    return (
      <div className='habitDetail'>
        <div>
          <HabitCalendar detailHabitId={detailHabitId} />
        </div>
        <div className='detailInfo'>
          <div className='OnehabitName'>{detailHabitName}</div>
          {streak > 0 ? (
            <div>오늘까지 연속으로 총 {streak}일 달성하셨어요!</div>
          ) : (
            ''
          )}
          {longestStreak > 0 ? (
            <div>
              지금까지 {detailHabitName}를 가장 오래 유지한 기간은{' '}
              {longestStreak}일입니다.
            </div>
          ) : (
            ''
          )}
          {total > 0 ? <div>오늘까지 총 {total}일 달성하셨습니다.</div> : ''}
        </div>
      </div>
    );
  }
}
export default HabitDetail;
