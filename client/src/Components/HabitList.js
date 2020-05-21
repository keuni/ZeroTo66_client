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
      .then((res) => {
        console.log('JSON', res);
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        console.log('GET ', data);
        this.setState({ habitlist: data });
      });
  }
  render() {
    const { habitlist } = this.state;
    const list = habitlist.map((habit) => {
      console.log('MPA ', habit);
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
