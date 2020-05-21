import React from 'react';

class HabitList extends React.Component {
  state = {
    newHabit: '',
    addHabit: false,
  };

  handleInputValue = (e) => {
    this.setState({ newHabit: e.target.value });
  };

  addHabit() {
    this.setState({
      addHabit: !this.state.addHabit,
    });
  }

  render() {
    return (
      <div className='HabitList'>
        HabitList
        <div>
          {this.state.addHabit ? (
            <div>
              <input
                type='text'
                placeholder='습관을 추가하세요'
                onChange={this.handleInputValue.bind(this)}
              ></input>
              <button className='btnAdd' onClick={this.addHabit.bind(this)}>
                Add
              </button>
            </div>
          ) : (
            ''
          )}
          <button onClick={this.addHabit.bind(this)}>+</button>
        </div>
      </div>
    );
  }
}

export default HabitList;
