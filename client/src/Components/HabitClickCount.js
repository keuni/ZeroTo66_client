import React from 'react';

class HabitClickCount extends React.Component {
  render() {
    return (
      <div className='ClickCount'>
        <input type='button' id='one' value='1'></input>
        <input type='button' id='five' value='5'></input>
        <input type='button' id='ten' value='10'></input>
        <input type='button' id='twenty' value='20'></input>
      </div>
    );
  }
}
export default HabitClickCount;
