import React from 'react';
import './AddHabit.css';
import AddHabitModal from './Modal/AddHabitModal';

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

class AddHabit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newHabit: '',
      frequency: ['1', '1', '1', '1', '1', '1', '1'],
      adding: false,
      unit: units.CHECK,
      goal: 1,
    };
    this.openAddHabit = this.openAddHabit.bind(this);
    this.postHabit = this.postHabit.bind(this);
  }

  handleInputValue = (e) => {
    this.setState({ newHabit: e.target.value });
    if (e.target.value.length > 0) {
      document.querySelector('.checkagain').classList.add('hidecheckagain');
    }
  };

  handleUnit = (e) => {
    this.setState({ unit: e.target.value });
  };
  handleGoal = (e) => {
    this.setState({ goal: e.target.value });
  };

  handleGoal = (e) => {
    this.setState({ goal: e.target.value });
  };

  openAddHabit() {
    this.setState({
      adding: !this.state.adding,
      frequency: ['1', '1', '1', '1', '1', '1', '1'],
      newHabit: '',
      unit: units.CHECK,
    });
  }

  postHabit() {
    if (this.state.newHabit.length > 0) {
      let frequency = this.state.frequency.join('');
      let unit = this.state.unit;
      let goal = this.state.unit === units.CHECK ? 1 : this.state.goal;
      this.props.addHabit(this.state.newHabit, frequency, unit, goal);
      return true;
    } else {
      document.querySelector('.checkagain').classList.toggle('hidecheckagain');
      return false;
    }
  }

  changefrequency(e) {
    let frequency = JSON.parse(JSON.stringify(this.state.frequency));
    frequency[Number(e.target.value)] =
      frequency[Number(e.target.value)] === '1' ? '0' : '1';
    this.setState({ frequency });
  }

  render() {
    return (
      <div className='addHabit'>
        {this.state.adding ? (
          <AddHabitModal
            handleInputValue={this.handleInputValue.bind(this)}
            handleUnit={this.handleUnit.bind(this)}
            handleGoal={this.handleGoal.bind(this)}
            openAddHabit={this.openAddHabit}
            postHabit={this.postHabit.bind(this)}
            changefrequency={this.changefrequency.bind(this)}
            state={this.state}
          />
        ) : (
          <button className='btnAdd' onClick={this.openAddHabit}>
            추가하기
          </button>
        )}
      </div>
    );
  }
}
export default AddHabit;
