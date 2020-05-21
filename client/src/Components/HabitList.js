import React from 'react';
import HabitInfo from './HabitInfo';
import url from './config/config';

class HabitList extends React.Component {
  state = {
    habitlist: [
      {
        id: 0,
        habitName: 'test',
      },
    ],
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
