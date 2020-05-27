import React from 'react';
import HabitClickCount from './HabitClickCount';

class HabitInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showCount: false,
    };
    this.showHabitCount = this.showHabitCount.bind(this);
  }
  checkboxClick() {
    this.props.recordComplete(this.props.id);
    this.props.getMainCalendarInfo();
  }

  eachHabitClick() {
    this.props.showHabitDetail(
      this.props.id,
      this.props.habitId,
      this.props.info,
      this.props.check
    );
    this.props.getHabitCalendarInfo(
      this.props.habitId,
      this.props.detailyear,
      this.props.detailMonth
    );
    this.showHabitCount();
  }

  remove() {
    this.props.deleteHabit(this.props.id, this.props.habitId);
  }

  showHabitCount() {
    this.setState({
      showCount: true,
    });
  }

  render() {
    return (
      <div>
        <div className='existingHabit'>
          -{' '}
          <span
            onClick={this.eachHabitClick.bind(this)}
            className={
              this.props.check ? 'eachHabit completedHabit' : 'eachHabit'
            }
          >
            {this.props.info}
          </span>
          {!this.props.deleting ? (
            <input
              type='checkbox'
              className='checkbox'
              onClick={this.checkboxClick.bind(this)}
              defaultChecked={this.props.check}
            ></input>
          ) : (
            ''
          )}
          {this.props.deleting ? (
            <button className='delete' onClick={this.remove.bind(this)}>
              삭제
            </button>
          ) : (
            ''
          )}
        </div>
        {this.state.showCount ? <HabitClickCount /> : ''}
      </div>
    );
  }
}
export default HabitInfo;
