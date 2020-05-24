import React from 'react';

function AddHabit(props) {
  return (
    <div className='addHabit'>
      {props.adding ? (
        <div className='adding'>
          <input
            className='addText'
            type='text'
            placeholder='새로운 습관을 만들어보세요'
            onChange={props.handleInputValue}
          ></input>
          <button className='add' onClick={props.addHabit}>
            추가
          </button>
          <button className='add cancel' onClick={props.openAddHabit}>
            취소
          </button>
        </div>
      ) : (
        <button className='btnAdd' onClick={props.openAddHabit}>
          추가하기
        </button>
      )}
    </div>
  );
}
export default AddHabit;
