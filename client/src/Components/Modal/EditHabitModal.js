import React from 'react';
import './EditHabit.css';
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

class EditHabit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modifyDone: false,
    };
    this.completeEditing = this.completeEditing.bind(this);
    this.showModifyDone = this.showModifyDone.bind(this);
  }
  closeEditing() {
    this.props.editHabit();
  }

  showModifyDone() {
    this.setState({
      modifyDone: !this.state.modifyDone,
    });
  }

  offtwoModals() {
    this.props.editHabit();
    this.showModifyDone.bind(this);
  }

  completeEditing() {
    let result = this.props.editingpost();
    if (result) {
      this.showModifyDone();
    }
  }

  render() {
    const { habitName, unit, goal, frequency } = this.props.editDetail;
    return (
      <div>
        <div className='myModal editModal'>
          <div className='modal_overlay editModal_overlay'>
            <div className='modal_content editModal_content'>
              <div className='check editModal_title'>습관 수정하기</div>
              {this.state.modifyDone ? (
                <ModifyDone
                  state='modifyDone'
                  offtwoModals={this.offtwoModals.bind(this)}
                />
              ) : (
                ''
              )}
              <form
                className='editModalAdding'
                onSubmit={(e) => {
                  e.preventDefault();
                  this.completeEditing();
                }}
              >
                <div className='formbody'>
                  <div className='textbox'>
                    <input
                      className='addText'
                      type='text'
                      placeholder='습관 이름을 수정하세요'
                      value={habitName}
                      onChange={this.props.handleInputValue}
                    ></input>
                    <div className='checkagain hidecheckagain'>
                      습관이 입력되지 않았습니다!
                    </div>
                  </div>

                  <div className='unitSelect'>
                    <label className='unitLabel'>단위를 선택하세요 : </label>
                    <select onChange={this.props.handleUnit} value={unit}>
                      <option value={units.CHECK}>Check</option>
                      <option value={units.COUNT}>Count</option>
                      <option value={units.MINUTE}>Minute</option>
                    </select>

                    {unit !== units.CHECK ? (
                      <div>
                        {unit === units.COUNT ? (
                          <div>
                            <input
                              className='unitText'
                              type='text'
                              placeholder='5'
                              onChange={this.props.handleGoal}
                              value={goal}
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
                              value={goal}
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
                      defaultChecked={frequency[0] === '1' ? true : false}
                      onClick={this.props.changefrequency}
                    />
                    <label htmlFor='mo'> 월 </label>
                    <input
                      type='checkbox'
                      id='tu'
                      value='1'
                      defaultChecked={frequency[1] === '1' ? true : false}
                      onClick={this.props.changefrequency}
                    />
                    <label htmlFor='tu'> 화 </label>
                    <input
                      type='checkbox'
                      id='we'
                      value='2'
                      defaultChecked={frequency[2] === '1' ? true : false}
                      onClick={this.props.changefrequency}
                    />
                    <label htmlFor='we'> 수 </label>
                    <input
                      type='checkbox'
                      id='th'
                      value='3'
                      defaultChecked={frequency[3] === '1' ? true : false}
                      onClick={this.props.changefrequency}
                    />
                    <label htmlFor='th'> 목 </label>
                    <input
                      type='checkbox'
                      id='fr'
                      value='4'
                      defaultChecked={frequency[4] === '1' ? true : false}
                      onClick={this.props.changefrequency}
                    />
                    <label htmlFor='fr'> 금 </label>
                    <input
                      type='checkbox'
                      id='sa'
                      value='5'
                      defaultChecked={frequency[5] === '1' ? true : false}
                      onClick={this.props.changefrequency}
                    />
                    <label htmlFor='sa'> 토 </label>
                    <input
                      type='checkbox'
                      id='su'
                      value='6'
                      defaultChecked={frequency[6] === '1' ? true : false}
                      onClick={this.props.changefrequency}
                    />
                    <label htmlFor='su'> 일 </label>
                  </div>
                </div>
                <input type='submit' className='add' value='수정' />
                <button
                  className='add editcancel'
                  onClick={this.props.editHabit}
                >
                  취소
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditHabit;
