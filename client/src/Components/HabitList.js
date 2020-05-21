import React from 'react';
import url from './config/config';

class HabitList extends React.Component {
  state = {
    habitName: '',
    addHabit: false,
  };

  handleInputValue = (e) => {
    this.setState({ habitName: e.target.value });
  };

  openAddHabit() {
    this.setState({
      addHabit: !this.state.addHabit,
    });
  }

  addHabit() {
    this.openAddHabit();
    fetch(url.server + 'record', {
      method: 'POST',
      body: JSON.stringify({
        habitName: this.state.habitName,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        console.log(35, data);
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
                className='addText'
                type='text'
                placeholder='습관을 추가하세요'
                onChange={this.handleInputValue.bind(this)}
              ></input>
              <button className='add' onClick={this.addHabit.bind(this)}>
                Add
              </button>
            </div>
          ) : (
            ''
          )}
          <button className='btnAdd' onClick={this.openAddHabit.bind(this)}>
            +
          </button>
        </div>
      </div>
    );
  }
}

export default HabitList;
