import React from 'react';
import AddHabitModal from './Modal/AddHabitModal';

class AddHabit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newHabit: '',
      adding: false,
    };
    this.openAddHabit = this.openAddHabit.bind(this);
  }

  handleInputValue = (e) => {
    this.setState({ newHabit: e.target.value });
  };

  openAddHabit() {
    this.setState({
      adding: !this.state.adding,
    });
  }

  postHabit() {
    this.openAddHabit();
    this.props.addHabit(this.state.newHabit);
  }

  render() {
    return (
      <div className='addHabit'>
        {this.state.adding ? (
          <AddHabitModal
            handleInputValue={this.handleInputValue.bind(this)}
            openAddHabit={this.openAddHabit}
            postHabit={this.postHabit.bind(this)}
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
