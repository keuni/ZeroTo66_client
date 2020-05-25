import React from 'react';

class HabitInfo extends React.Component {
  onToggle() {
    this.props.recordComplete(this.props.id);
  }

  onClick() {
    this.props.getStreakInfo();
    this.props.showHabitDetail(
      this.props.id,
      this.props.habitId,
      this.props.info
    );
  }

  remove = () => {
    this.props.deleteHabit(this.props.id);
  };

  render() {
    return (
      <div>
        <div className='existingHabit'>
          -{' '}
          <span
            onClick={this.onClick.bind(this)}
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
        <button className="delete" onClick={this.remove.bind(this)}>
          삭제
        </button>
      </div>
    );
  }
}
export default HabitInfo;
