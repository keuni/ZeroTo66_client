import React from 'react';
import HabitInfo from './HabitInfo';
import url from './config/config';

class HabitList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      habitlist: [
        {
          id: 0,
          habitName: '',
        },
      ],
      newHabit: '',
      addHabit: false,
      existModal: false,
    };
    this.openAddHabit = this.openAddHabit.bind(this);
    this.existModal = this.existModal.bind(this);
  }

  handleInputValue = (e) => {
    this.setState({ newHabit: e.target.value });
  };

  openAddHabit() {
    this.setState({
      addHabit: !this.state.addHabit,
    });
  }
  existModal() {
    this.setState({
      existModal: !this.state.existModal,
    });
  }
  addHabit() {
    this.openAddHabit();
    fetch(url.server + 'habit', {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      body: JSON.stringify({
        habitName: this.state.newHabit,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((result) => {
        if (result.status === 201) {
          return result.json();
        }
        this.existModal();
      })
      .then((data) => {
        if (data === undefined) {
          return;
        }
        this.setState({
          habitlist: [...this.state.habitlist, data],
        });
      });
  }
  componentDidMount() {
    fetch(url.server + 'habit', {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        if (data === undefined) {
          return;
        }
        this.setState({ habitlist: data });
      });
  }
  recordComplete(index) {
    let changed = this.state.habitlist[index];
    if (changed.hasOwnProperty('completed')) {
      changed['completed'] = !changed['completed'];
    } else {
      changed['completed'] = true;
    }
    let presentHabitList = this.state.habitlist;
    let newHabitList = presentHabitList
      .slice(0, index)
      .concat(changed)
      .concat(presentHabitList.slice(index + 1));

    this.setState({ habitlist: newHabitList });
  }

  render() {
    const { habitlist } = this.state;
    return (
      <div className="HabitList">
        오늘의 습관
        <div>
          {habitlist.map((habit, index) => (
            <HabitInfo
              key={habit.id}
              id={index}
              info={habit.habitName}
              recordComplete={this.recordComplete.bind(this)}
            />
          ))}
        </div>
        <div className="addHabit">
          {this.state.addHabit ? (
            <div>
              <input
                className="addText"
                type="text"
                placeholder="습관을 추가하세요"
                onChange={this.handleInputValue.bind(this)}
              ></input>
              <button className="add" onClick={this.addHabit.bind(this)}>
                Add
              </button>
              <button className="add" onClick={this.openAddHabit.bind(this)}>
                cancel
              </button>
            </div>
          ) : (
            ''
          )}
          <button className="btnAdd" onClick={this.openAddHabit.bind(this)}>
            +
          </button>
        </div>
      </div>
    );
  }
}

export default HabitList;
