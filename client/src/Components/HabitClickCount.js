import React from 'react';

class HabitClickCount extends React.Component {
  render() {
    return (
      <div className='ClickCount'>
        <input type='button' id='one' value='1'></input>
        <label for='one'></label>
        <input type='button' id='five' value='5'></input>
        <label for='five'></label>
        <input type='button' id='ten' value='10'></input>
        <label for='ten'></label>
        <input type='button' id='twenty' value='20'></input>
        <label for='twenty'></label>
      </div>
    );
  }
}
export default HabitClickCount;
