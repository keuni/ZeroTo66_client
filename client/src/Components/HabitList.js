import React from 'react';
import HabitInfo from './HabitInfo';

class HabitList extends React.Component {
  state = {
    habitlist: [
      {
        id: 0,
        habitName: 'test',
      },
    ],
  };
  componentDidMount() {
    fetch(
      'http://localhost:4000/habit',
      // 'http://54.180.103.96:4000/habit',
      {
        method: 'GET',
        withCredentials: true,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        //
      });
  }

  render() {
    const list = this.state.habitlist.map((habit) => {
      return <HabitInfo key={habit.id} info={habit.habitName} />;
    });
    return (
      <div className="HabitList">
        <div>{list}</div>
        <button className="AddHabit"> + </button>
      </div>
    );
  }
}

export default HabitList;
