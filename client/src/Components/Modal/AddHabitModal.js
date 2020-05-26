import React from 'react';
import './Modal.css';

const AddHabitModal = (props) => {
  return (
    <div>
      <div className='showModal'>
        <div className='modal_overlay'>
          <div className='modal_content'>
            <span id='check'>
              <div className='adding'>
                <input
                  className='addText'
                  type='text'
                  placeholder='새로운 습관을 만들어보세요'
                  onChange={props.handleInputValue}
                ></input>
                <button className='add' onClick={props.postHabit}>
                  추가
                </button>
                <button className='add cancel' onClick={props.openAddHabit}>
                  취소
                </button>
              </div>
            </span>
            <span id='x' onClick={props.openAddHabit}>
              X
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHabitModal;
