import React from 'react';

function AddHabit(props) {
  return (
    <div className='addHabit'>
      {props.adding ? (
        <div className='adding'>
          <input
            className='addText'
            type='text'
            placeholder='습관을 추가하세요'
            onChange={props.handleInputValue}
          ></input>
          <button className='add' onClick={props.addHabit}>
            Add
          </button>
          <button className='add' onClick={props.openAddHabit}>
            cancel
          </button>
        </div>
      ) : (
        <button className='btnAdd' onClick={props.openAddHabit}>
          +
        </button>
      )}
    </div>
  );
}
export default AddHabit;
