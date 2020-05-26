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
      <div className="addHabit">
        {this.state.adding ? (
          <div className="adding">
            <input
              className="addText"
              type="text"
              placeholder="새로운 습관을 만들어보세요"
              onChange={this.handleInputValue.bind(this)}
            ></input>
            <button className="add" onClick={this.postHabit.bind(this)}>
              추가
            </button>
            <button className="add cancel" onClick={this.openAddHabit}>
              취소
            </button>
          </div>
        ) : (
          <button className="btnAdd" onClick={this.openAddHabit}>
            추가하기
          </button>
        )}
      </div>
    );
  }
}
export default AddHabit;
