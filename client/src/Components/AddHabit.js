import React from 'react';
import './AddHabit.css';

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
      settingDay: {
        mo: true,
        tu: true,
        we: true,
        th: true,
        fr: true,
        sa: true,
        su: true,
      },
      adding: false,
      unit: units.CHECK,
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
    console.log('d');
    console.log(e.target.value);
    this.setState({ unit: e.target.value });
  };

  openAddHabit() {
    this.setState({
      adding: !this.state.adding,
      settingDay: {
        mo: true,
        tu: true,
        we: true,
        th: true,
        fr: true,
        sa: true,
        su: true,
      },
    });
  }

  postHabit() {
    if (this.state.newHabit.length > 0) {
      this.openAddHabit();
      let frequency = '';
      for (let day in this.state.settingDay) {
        if (this.state.settingDay[day]) {
          frequency += '1';
        } else {
          frequency += '0';
        }
      }
      this.props.addHabit(this.state.newHabit, frequency);
    } else {
      document.querySelector('.checkagain').classList.toggle('hidecheckagain');
    }
  }

  changeSettingday(e) {
    let settingDay = Object.assign({}, this.state.settingDay);
    settingDay[e.target.value] = !settingDay[e.target.value];
    this.setState({ settingDay });
  }

  render() {
    return (
      <div className='addHabit'>
        {this.state.adding ? (

          <form
            className='adding'
            onSubmit={(e) => {
              e.preventDefault();
              this.postHabit();
            }}
          >
            <div className='textbox'>
              <input
                className='addText'
                type='text'
                placeholder='새로운 습관을 만들어보세요'
                onChange={this.handleInputValue.bind(this)}
              ></input>
              <div className='checkagain hidecheckagain'>
                습관이 입력되지 않았습니다!
              </div>
            </div>

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
              <input
                type='checkbox'
                id='mo'
                value='mo'
                defaultChecked={this.state.settingDay.mo}
                onClick={this.changeSettingday.bind(this)}
              />
              <label htmlFor='mo'> 월 </label>
              <input
                type='checkbox'
                id='tu'
                value='tu'
                defaultChecked={this.state.settingDay.tu}
                onClick={this.changeSettingday.bind(this)}
              />
              <label htmlFor='tu'> 화 </label>
              <input
                type='checkbox'
                id='we'
                value='we'
                defaultChecked={this.state.settingDay.we}
                onClick={this.changeSettingday.bind(this)}
              />
              <label htmlFor='we'> 수 </label>
              <input
                type='checkbox'
                id='th'
                value='th'
                defaultChecked={this.state.settingDay.th}
                onClick={this.changeSettingday.bind(this)}
              />
              <label htmlFor='th'> 목 </label>
              <input
                type='checkbox'
                id='fr'
                value='fr'
                defaultChecked={this.state.settingDay.fr}
                onClick={this.changeSettingday.bind(this)}
              />
              <label htmlFor='fr'> 금 </label>
              <input
                type='checkbox'
                id='sa'
                value='sa'
                defaultChecked={this.state.settingDay.sa}
                onClick={this.changeSettingday.bind(this)}
              />
              <label htmlFor='sa'> 토 </label>
              <input
                type='checkbox'
                id='su'
                value='su'
                defaultChecked={this.state.settingDay.su}
                onClick={this.changeSettingday.bind(this)}
              />
              <label htmlFor='su'> 일 </label>
            </div>
            <input type='submit' className='add' value='추가' />
            <button className='add' onClick={this.openAddHabit}>
              취소
            </button>
          </form>
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
