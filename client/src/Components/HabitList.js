import React from 'react';
import HabitInfo from './HabitInfo';
import AddHabit from './AddHabit';
import url from './config/config';
import SuccessModal from './Modal/SuccessModal';

class HabitList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      habitlist: [],
      completed: 0,
      newHabit: '',
      adding: false,
      successModal: 'hide',
    };
    this.openAddHabit = this.openAddHabit.bind(this);
    this.postRecord = this.postRecord.bind(this);
    this.showSuccessModal = this.showSuccessModal.bind(this);
  }

  handleInputValue = (e) => {
    this.setState({ newHabit: e.target.value });
  };

  openAddHabit() {
    this.setState({
      adding: !this.state.adding,
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
      })
      .then((data) => {
        if (data === undefined) {
          return;
        }
        let obj = { completed: false, habit: data };
        this.setState({
          habitlist: [...this.state.habitlist, obj],
        });
      });
  }

  componentDidMount() {
    fetch(url.server + 'record/today', {
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
        let count = 0;
        data.forEach((x) => {
          if (x.completed === true) {
            count += 1;
          }
        });
        this.setState({
          completed: count,
        });
      });
  }
  recordComplete(index) {
    let changed = this.state.habitlist[index];
    changed['completed'] = !changed['completed'];
    let presentHabitList = this.state.habitlist;
    let newHabitList = presentHabitList
      .slice(0, index)
      .concat(changed)
      .concat(presentHabitList.slice(index + 1));

    this.setState({ habitlist: newHabitList });
    let result = this.state.habitlist[index].completed;
    if (result === true) {
      this.setState({
        completed: this.state.completed + 1,
      });
      this.showSuccessModal();
    } else {
      this.setState({
        completed: this.state.completed - 1,
      });
    }
    this.postRecord(changed.habitId, result);
  }

  showSuccessModal() {
    const { habitlist, completed, successModal } = this.state;
    if (
      successModal === 'hide' &&
      habitlist.length > 0 &&
      habitlist.length === completed + 1
    ) {
      this.setState({
        successModal: true,
      });
    }
  }

  postRecord(id, result) {
    fetch(url.server + 'record', {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      body: JSON.stringify({
        habitId: id,
        completed: result,
      }),
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
        console.log(data);
      });
  }

  offsuccessModal() {
    this.setState({
      successModal: 'hide',
    });
  }

  render() {
    const { habitlist, completed, successModal } = this.state;
    const all = habitlist.length;
    return (
      <div className='HabitList'>
        {successModal === true ? (
          <SuccessModal offsuccessModal={this.offsuccessModal.bind(this)} />
        ) : (
          ''
        )}
        <div className='todayList'>
          오늘의 습관 {completed}/{all}
        </div>
        <div>
          {habitlist.length > 0
            ? habitlist.map((data, index) => (
                <HabitInfo
                  key={data.habit.id}
                  id={index}
                  info={data.habit.habitName}
                  check={data.completed}
                  recordComplete={this.recordComplete.bind(this)}
                />
              ))
            : ''}
        </div>
        <AddHabit
          adding={this.state.adding}
          handleInputValue={this.handleInputValue.bind(this)}
          addHabit={this.addHabit.bind(this)}
          openAddHabit={this.openAddHabit}
        />
      </div>
    );
  }
}

export default HabitList;
