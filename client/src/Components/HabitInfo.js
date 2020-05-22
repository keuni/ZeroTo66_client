import React from 'react';

class HabitInfo extends React.Component {
  onToggle = () => {
    this.props.recordComplete(this.props.id);
  };
  render() {
    return (
      <div>
        <div className="existingHabit">
          {this.props.info}
          <input type="checkbox" onClick={this.onToggle.bind(this)}></input>
        </div>
      </div>
    );
  }
}
export default HabitInfo;
