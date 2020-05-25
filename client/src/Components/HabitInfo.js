import React from 'react';

class HabitInfo extends React.Component {
  onToggle = () => {
    this.props.recordComplete(this.props.id);
  };

  remove = () => {
    this.props.deleteHabit(this.props.id);
  };

  render() {
    return (
      <div>
        <div
          className={
            this.props.check ? 'existingHabit completedHabit' : 'existingHabit'
          }
        >
          - {this.props.info}
          <input
            type="checkbox"
            className="checkbox"
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
