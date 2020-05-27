import React from 'react';
import './HabitDetail.css';
import HabitCalendar from './HabitCalendar';
import './css-circular-prog-bar.css';
import url from './config/config';

class HabitDetail extends React.Component {
  render() {
    const {
      detailHabitId,
      detailHabitName,
      total,
      streak,
      longestStreak,
      modifiers,
      getHabitCalendarInfo,
      getdetailMonth,
      curHabitInfo,
      curHabitTimer,
      startTimer,
      stopTimer,
      setHabitProgress,
    } = this.props;

    let standard =
      curHabitInfo.unit === 'minute'
        ? curHabitInfo.goal * 60
        : curHabitInfo.goal;
    let percent = Math.floor((curHabitInfo.progress / standard) * 100);

    return (
      <div className='habitDetail'>
        <div>
          <HabitCalendar
            detailHabitId={detailHabitId}
            modifiers={modifiers}
            getHabitCalendarInfo={getHabitCalendarInfo}
            getdetailMonth={getdetailMonth}
          />
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
        <div>
          {curHabitInfo.unit === 'check' ? (
            ''
          ) : curHabitInfo.unit === 'count' ? (
            <div>
              <div
                class={
                  percent > 50
                    ? 'progress-circle over50 p' + percent
                    : 'progress-circle p' + percent
                }
              >
                <span>{percent}%</span>
                <div class='left-half-clipper'>
                  <div class='first50-bar'></div>
                  <div class='value-bar'></div>
                </div>
              </div>
              <button
                onClick={() =>
                  setHabitProgress(detailHabitId, curHabitInfo.progress + 1)
                }
              >
                1
              </button>
              <button
                onClick={() =>
                  setHabitProgress(detailHabitId, curHabitInfo.progress + 3)
                }
              >
                3
              </button>
              <button
                onClick={() =>
                  setHabitProgress(detailHabitId, curHabitInfo.progress + 5)
                }
              >
                5
              </button>
              <button
                onClick={() =>
                  setHabitProgress(detailHabitId, curHabitInfo.progress + 10)
                }
              >
                10
              </button>
            </div>
          ) : (
            <div>
              <div
                class={
                  percent > 50
                    ? 'progress-circle over50 p' + percent
                    : 'progress-circle p' + percent
                }
              >
                <span>
                  {curHabitTimer.minutes}:{curHabitTimer.seconds}
                </span>
                <div class='left-half-clipper'>
                  <div class='first50-bar'></div>
                  <div class='value-bar'></div>
                </div>
              </div>
              {!curHabitTimer.onTimer ? (
                <button onClick={startTimer}>시작</button>
              ) : (
                <button onClick={stopTimer}>그만</button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default HabitDetail;
