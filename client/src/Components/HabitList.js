/* eslint-disable jsx-a11y/accessible-emoji */
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
      successModal: 'hide',
      deleting: false,
    };
    this.postRecord = this.postRecord.bind(this);
    this.showSuccessModal = this.showSuccessModal.bind(this);
  }

  addHabit(newHabit, frequency, unit, goal) {
    fetch(url.server + 'habit', {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      body: JSON.stringify({
        habitName: newHabit,
        frequency,
        unit,
        goal,
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
        let newHabit = {
          habitId: data.id,
          habitName: data.habitName,
          completed: false,
        };
        this.setState({
          habitlist: [...this.state.habitlist, newHabit],
        });
      });
  }

  deleteHabit(index, id) {
    fetch(url.server + 'habit', {
      method: 'PATCH',
      withCredentials: true,
      credentials: 'include',
      body: JSON.stringify({
        habitId: id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((result) => {
      if (result.status === 201) {
        let newState = JSON.parse(JSON.stringify(this.state.habitlist));
        if (newState[index].completed) {
          this.setState({ completed: this.state.completed - 1 });
        }
        newState.splice(index, 1);
        this.setState({ habitlist: newState });
      }
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
      .then((rawData) => {
        if (rawData === undefined) {
          return;
        }
        let data = rawData.map((x) => {
          return {
            habitId: x.habitId,
            habitName: x.habit.habitName,
            completed: x.completed,
          };
        });
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
    let newState = JSON.parse(JSON.stringify(this.state.habitlist));
    newState.splice(index, 1, changed);
    this.setState({ habitlist: newState });
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
    this.props.colorTodayComplete(result, this.state.habitlist[index].habitId);
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
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    });
  }

  offsuccessModal() {
    this.setState({
      successModal: 'hide',
    });
  }
  openDelete() {
    this.setState({
      deleting: !this.state.deleting,
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
          <span className='text1'>오늘의 습관 </span>
          <span className='text2'>
            {completed}/{all}
          </span>
          <button className='openDelete' onClick={this.openDelete.bind(this)}>
            ⚙️
          </button>
        </div>

        <div>
          {habitlist.length > 0
            ? habitlist.map((data, index) => (
                <HabitInfo
                  key={data.habitId}
                  id={index}
                  habitId={data.habitId}
                  info={data.habitName}
                  check={data.completed}
                  recordComplete={this.recordComplete.bind(this)}
                  showHabitDetail={this.props.showHabitDetail}
                  deleteHabit={this.deleteHabit.bind(this)}
                  deleting={this.state.deleting}
                  getHabitCalendarInfo={this.props.getHabitCalendarInfo}
                  getMainCalendarInfo={this.props.getMainCalendarInfo}
                  detailMonth={this.props.detailMonth}
                  detailyear={this.props.detailyear}
                />
              ))
            : ''}
        </div>
        <AddHabit addHabit={this.addHabit.bind(this)} />
      </div>
    );
  }
}

export default HabitList;
