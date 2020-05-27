import React from 'react';

class HabitInfo extends React.Component {
  checkboxClick() {
    this.props.recordComplete(this.props.id);
    this.props.getMainCalendarInfo();
  }

  eachHabitClick() {
    this.props.showHabitDetail(
      this.props.id,
      this.props.habitId,
      this.props.info,
      this.props.check,
      this.props.unit,
      this.props.goal,
      this.props.progress
    );
    this.props.getHabitCalendarInfo(
      this.props.habitId,
      this.props.detailyear,
      this.props.detailMonth
    );
  }

  remove() {
    this.props.deleteHabit(this.props.id, this.props.habitId);
  }

  edit() {
    this.props.editHabit(this.props.id);
  }

  showHabitCount() {
    this.setState({
      showCount: !this.state.showCount,
    });
  }

  render() {
    //&& this.props.unit === 'check'
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
          {this.props.setting ? (
            <div className='settingBtn'>
              <button className='delete' onClick={this.remove.bind(this)}>
                삭제
              </button>
              <button className='modify' onClick={this.edit.bind(this)}>
                수정
              </button>
            </div>
          ) : (
            <input
              type='checkbox'
              className='checkbox'
              onClick={this.checkboxClick.bind(this)}
              defaultChecked={this.props.check}
            ></input>
          )}
        </div>
      </div>
    );
  }
}
export default HabitInfo;
