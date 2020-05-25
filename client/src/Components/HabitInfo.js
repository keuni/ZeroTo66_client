import React from 'react';

class HabitInfo extends React.Component {
  onToggle() {
    this.props.recordComplete(this.props.id);
  }
  clickHabitDetail() {
    this.props.showHabitDetail(
      this.props.id,
      this.props.habitId,
      this.props.info
    );
  }
  render() {
    return (
      <div>
        <div className='existingHabit'>
          -{' '}
          <span
            onClick={this.clickHabitDetail.bind(this)}
            className={
              this.props.check ? 'eachHabit completedHabit' : 'eachHabit'
            }
          >
            {this.props.info}
          </span>
          <input
            type='checkbox'
            className='checkbox'
            onClick={this.onToggle.bind(this)}
            defaultChecked={this.props.check}
          ></input>
        </div>
      </div>
    );
  }
}
export default HabitInfo;
