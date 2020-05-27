import React from 'react';

const units = {
  CHECK: 'check',
  COUNT: 'count',
  MINUTE: 'minute',
  properties: {
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
      adding: false,
      unit: units.CHECK,
    };
    this.openAddHabit = this.openAddHabit.bind(this);
  }

  handleInputValue = (e) => {
    this.setState({ newHabit: e.target.value });
  };

  handleUnit = (e) => {
    console.log('d');
    console.log(e.target.value);
    this.setState({ unit: e.target.value });
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
          <div className='adding'>
            <input
              className='addText'
              type='text'
              placeholder='새로운 습관을 만들어보세요'
              onChange={this.handleInputValue.bind(this)}
            ></input>

            <div className='unitSelect'>
              <label>단위를 선택하세요 : </label>
              <select onChange={this.handleUnit.bind(this)}>
                <option value={units.CHECK}>Check</option>
                <option value={units.COUNT}>Count</option>
                <option value={units.MINUTE}>Minute</option>
              </select>

              {this.state.unit !== units.CHECK ? (
                <div>
                  {this.state.unit === units.COUNT ? (
                    <div>
                      <input
                        className='addText'
                        type='text'
                        placeholder='5'
                      ></input>
                      <span> 번</span>
                    </div>
                  ) : (
                    <div>
                      <input
                        className='addText'
                        type='text'
                        placeholder='30'
                      ></input>
                      <span> 분</span>
                    </div>
                  )}
                </div>
              ) : (
                <div></div>
              )}
            </div>

            <div> Frequency </div>
            <div className='Frequency'>
              <input type='checkbox' id='Monday' value='Monday' checked />
              <label for='Monday'> 월 </label>
              <input type='checkbox' id='Tuesday' vlaue='Tuesday' checked />
              <label for='Tuesday'> 화 </label>
              <input type='checkbox' id='Wednesday' vlaue='Wednesday' checked />
              <label for='Wednesday'> 수 </label>
              <input type='checkbox' id='Thursday' vlaue='Thursday' checked />
              <label for='Thursday'> 목 </label>
              <input type='checkbox' id='Friday' vlaue='Friday' checked />
              <label for='Friday'> 금 </label>
              <input type='checkbox' id='Saturday' vlaue='Saturday' checked />
              <label for='Saturday'> 토 </label>
              <input type='checkbox' id='Sunday' vlaue='Sunday' checked />
              <label for='Sunday'> 일 </label>
            </div>
            <button className='add' onClick={this.postHabit.bind(this)}>
              추가
            </button>
            <button className='add' onClick={this.openAddHabit}>
              취소
            </button>
          </div>
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
