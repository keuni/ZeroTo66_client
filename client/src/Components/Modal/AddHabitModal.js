import React from 'react';
import ModifyDone from './modifyDone';

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

class AddHabitModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addDone: false,
    };
  }

  showAddDone() {
    this.setState({
      addDone: !this.state.addDone,
    });
  }

  offtwoModals() {
    this.props.openAddHabit();
    this.showAddDone.bind(this);
  }
  completeAdding() {
    let result = this.props.postHabit();
    if (result) {
      this.showAddDone();
    }
  }

  render() {
    return (
      <div>
        <div className='myModal editModal'>
          <div className='modal_overlay editModal_overlay'>
            <div className='modal_content editModal_content'>
              <div className='check editModal_title'>습관 추가하기</div>
              {this.state.addDone ? (
                <ModifyDone
                  state='addDone'
                  offtwoModals={this.offtwoModals.bind(this)}
                />
              ) : (
                ''
              )}
              <form
                className='editModalAdding'
                onSubmit={(e) => {
                  e.preventDefault();
                  this.completeAdding();
                }}
              >
                <div className='formbody'>
                  <div className='textbox'>
                    <input
                      className='addText'
                      type='text'
                      placeholder='새로운 습관을 만들어보세요'
                      onChange={this.props.handleInputValue}
                    ></input>
                    <div className='checkagain hidecheckagain'>
                      습관이 입력되지 않았습니다!
                    </div>
                  </div>

                  <div className='unitSelect'>
                    <label className='unitLabel'>단위를 선택하세요 : </label>
                    <select
                      onChange={this.props.handleUnit}
                      value={this.props.units}
                    >
                      <option value={units.CHECK}>Check</option>
                      <option value={units.COUNT}>Count</option>
                      <option value={units.MINUTE}>Minute</option>
                    </select>

                    {this.props.state.unit !== units.CHECK ? (
                      <div>
                        {this.props.state.unit === units.COUNT ? (
                          <div>
                            <input
                              className='unitText'
                              type='text'
                              placeholder='5'
                              onChange={this.props.handleGoal}
                            ></input>
                            <span> 번</span>
                          </div>
                        ) : (
                          <div>
                            <input
                              className='unitText'
                              type='text'
                              placeholder='30'
                              onChange={this.props.handleGoal}
                            ></input>
                            <span> 분</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>

                  <div> 반복 </div>
                  <div className='Frequency editFrequency'>
                    <input
                      type='checkbox'
                      id='mo'
                      value='0'
                      defaultChecked={
                        this.props.state.frequency[0] === '1' ? true : false
                      }
                      onClick={this.props.changefrequency}
                    />
                    <label htmlFor='mo'> 월 </label>
                    <input
                      type='checkbox'
                      id='tu'
                      value='1'
                      defaultChecked={
                        this.props.state.frequency[1] === '1' ? true : false
                      }
                      onClick={this.props.changefrequency}
                    />
                    <label htmlFor='tu'> 화 </label>
                    <input
                      type='checkbox'
                      id='we'
                      value='2'
                      defaultChecked={
                        this.props.state.frequency[2] === '1' ? true : false
                      }
                      onClick={this.props.changefrequency}
                    />
                    <label htmlFor='we'> 수 </label>
                    <input
                      type='checkbox'
                      id='th'
                      value='3'
                      defaultChecked={
                        this.props.state.frequency[3] === '1' ? true : false
                      }
                      onClick={this.props.changefrequency}
                    />
                    <label htmlFor='th'> 목 </label>
                    <input
                      type='checkbox'
                      id='fr'
                      value='4'
                      defaultChecked={
                        this.props.state.frequency[4] === '1' ? true : false
                      }
                      onClick={this.props.changefrequency}
                    />
                    <label htmlFor='fr'> 금 </label>
                    <input
                      type='checkbox'
                      id='sa'
                      value='5'
                      defaultChecked={
                        this.props.state.frequency[5] === '1' ? true : false
                      }
                      onClick={this.props.changefrequency}
                    />
                    <label htmlFor='sa'> 토 </label>
                    <input
                      type='checkbox'
                      id='su'
                      value='6'
                      defaultChecked={
                        this.props.state.frequency[6] === '1' ? true : false
                      }
                      onClick={this.props.changefrequency}
                    />
                    <label htmlFor='su'> 일 </label>
                  </div>
                  <input type='submit' className='add twobtn' value='추가' />
                  <button
                    className='add twobtn editcancel'
                    onClick={this.props.openAddHabit}
                  >
                    취소
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AddHabitModal;
