/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import HabitInfo from './HabitInfo';
import AddHabit from './AddHabit';
import url from './config/config';
import SuccessModal from './Modal/SuccessModal';
import EditHabit from './Modal/EditHabitModal';

const units = {
  CHECK: 'check',
  COUNT: 'count',
  MINUTE: 'minute',
  prop: {
    1: { value: 'check' },
    2: { value: 'count' },
    3: { value: 'minute' },
  },
};

class HabitList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      habitlist: [],
      completed: 0,
      successModal: 'hide',
      setting: false,
      editing: false,
      editIndex: null,
      editDetail: null,
      index: null,
    };
    this.showSuccessModal = this.showSuccessModal.bind(this);
    this.postEditHabit = this.postEditHabit.bind(this);
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleGoal = this.handleGoal.bind(this);
    this.handleUnit = this.handleUnit.bind(this);
    this.changefrequency = this.changefrequency.bind(this);
    this.getTodayHabit = this.getTodayHabit.bind(this);
    this.changeCompletedAndProgress = this.changeCompletedAndProgress.bind(
      this
    );
    this.recordComplete = this.recordComplete.bind(this);
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
        let today = new Date().getDay() - 1;
        if (data.frequency[today] === '1') {
          let newHabit = {
            habitId: data.id,
            habitName: data.habitName,
            frequency: data.frequency.split(''),
            unit: data.unit.toString(),
            goal: data.goal,
            completed: false,
            progress: 0,
          };
          this.setState({
            habitlist: [...this.state.habitlist, newHabit],
          });
          this.props.getMainCalendarInfo();
        }
      });
  }

  changeCompletedAndProgress(habitListIndex, progress) {
    let newState = JSON.parse(JSON.stringify(this.state.habitlist));
    if (progress) {
      newState[habitListIndex].progress = progress;
    } else {
      if (this.state.habitlist[habitListIndex].completed === false) {
        this.setState({ completed: this.state.completed + 1 });
      }
      newState[habitListIndex].completed = true;
    }
    this.setState({ habitlist: newState });
  }

  postEditHabit(id, habitName, frequency, unit, goal) {
    fetch(url.server + 'habit', {
      method: 'PUT',
      withCredentials: true,
      credentials: 'include',
      body: JSON.stringify({
        habitId: id,
        habitName,
        frequency,
        unit,
        goal,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((result) => {
      if (result.status === 201) {
        let habitlist = JSON.parse(JSON.stringify(this.state.habitlist));
        if (habitName !== [this.state.index].habitName) {
          this.props.ChangecurHabitInfoTimerDetailHabitName(
            undefined,
            undefined,
            undefined,
            undefined,
            habitName
          );
        }
        if (unit !== habitlist[this.state.index].unit) {
          this.props.ChangecurHabitInfoTimerDetailHabitName(unit, goal, 0);
        } else if (goal !== habitlist[this.state.index].goal) {
          this.props.ChangecurHabitInfoTimerDetailHabitName(
            unit,
            goal,
            habitlist[this.state.index].progress
          );
          if (unit === 'minute') {
            let gap = goal - habitlist[this.state.index].goal;
            this.props.ChangecurHabitInfoTimerDetailHabitName(
              undefined,
              undefined,
              undefined,
              gap
            );
          }
        }
        this.getTodayHabit();
      }
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
        this.props.getMainCalendarInfo();
      }
    });
  }

  editHabit(index) {
    if (index >= 0) {
      let editDetail = this.state.habitlist[index];
      this.setState({
        editDetail,
        index,
      });
    }
    this.setState({
      editing: !this.state.editing,
    });
  }

  getTodayHabit() {
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
            frequency: x.habit.frequency.split(''),
            completed: x.completed,
            unit: x.habit.unit,
            goal: x.habit.goal,
            progress: x.progress,
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

  componentDidMount() {
    this.getTodayHabit();
    this.props.handleResult(this.changeCompletedAndProgress);
  }

  recordComplete(index, check) {
    let newState = JSON.parse(JSON.stringify(this.state.habitlist));
    newState[index].completed = check;
    this.setState({ habitlist: newState });
    if (check === true) {
      this.setState({
        completed: this.state.completed + 1,
      });
      this.showSuccessModal();
    } else {
      this.setState({
        completed: this.state.completed - 1,
      });
    }
    this.props.colorTodayComplete(check, this.state.habitlist[index].habitId);
    this.props.postRecord(
      this.state.habitlist[index].habitId,
      check,
      index,
      'check'
    );
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

  offsuccessModal() {
    this.setState({
      successModal: 'hide',
    });
  }
  openSetting() {
    if (this.state.setting === true) {
      this.setState({
        editing: false,
      });
    }
    this.setState({
      setting: !this.state.setting,
    });
  }

  handleInputValue = (e) => {
    let editDetail = Object.assign({}, this.state.editDetail);
    editDetail.habitName = e.target.value;
    this.setState({ editDetail });
    if (e.target.value.length > 0) {
      document.querySelector('.checkagain').classList.add('hidecheckagain');
    }
  };

  handleUnit = (e) => {
    let editDetail = Object.assign({}, this.state.editDetail);
    editDetail.unit = e.target.value;
    this.setState({ editDetail });
  };
  handleGoal = (e) => {
    let editDetail = Object.assign({}, this.state.editDetail);
    editDetail.goal = e.target.value;
    this.setState({ editDetail });
  };
  changefrequency(e) {
    let editDetail = Object.assign({}, this.state.editDetail);
    let frequency = JSON.parse(JSON.stringify(this.state.editDetail.frequency));
    frequency[Number(e.target.value)] =
      frequency[Number(e.target.value)] === '1' ? '0' : '1';
    editDetail.frequency = frequency;
    this.setState({ editDetail });
  }

  editingpost() {
    if (this.state.editDetail.habitName.length > 0) {
      let frequency = this.state.editDetail.frequency.join('');
      let unit = this.state.editDetail.unit;
      let goal =
        this.state.editDetail.unit === units.CHECK
          ? 1
          : this.state.editDetail.goal;
      this.postEditHabit(
        this.state.editDetail.habitId,
        this.state.editDetail.habitName,
        frequency,
        unit,
        goal
      );
      return true;
    } else {
      document.querySelector('.checkagain').classList.toggle('hidecheckagain');
      return false;
    }
  }

  render() {
    const {
      habitlist,
      completed,
      successModal,
      editing,
      editDetail,
    } = this.state;
    const all = habitlist.length;
    return (
      <div className='HabitList'>
        {successModal === true ? (
          <SuccessModal offsuccessModal={this.offsuccessModal.bind(this)} />
        ) : (
          ''
        )}
        {editing ? (
          <EditHabit
            editHabit={this.editHabit.bind(this)}
            editDetail={editDetail}
            postEditHabit={this.postEditHabit}
            handleInputValue={this.handleInputValue}
            handleUnit={this.handleUnit}
            handleGoal={this.handleGoal}
            changefrequency={this.changefrequency}
            editingpost={this.editingpost.bind(this)}
          />
        ) : (
          ''
        )}
        <div className='todayList'>
          <span className='text1'>오늘의 습관 </span>
          <span className='text2'>
            {completed}/{all}
          </span>
          <button className='openSetting' onClick={this.openSetting.bind(this)}>
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
                  unit={data.unit}
                  goal={data.goal}
                  progress={data.progress}
                  recordComplete={this.recordComplete}
                  showHabitDetail={this.props.showHabitDetail}
                  deleteHabit={this.deleteHabit.bind(this)}
                  setting={this.state.setting}
                  getHabitCalendarInfo={this.props.getHabitCalendarInfo}
                  getMainCalendarInfo={this.props.getMainCalendarInfo}
                  detailMonth={this.props.detailMonth}
                  detailyear={this.props.detailyear}
                  editHabit={this.editHabit.bind(this)}
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
