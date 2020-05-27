import React from 'react';
import './modifyDone.css';

const modifyDone = (props) => {
  return (
    <div className='myModal modifyDone'>
      <div className='modal_overlay modifyDone_overlay'>
        <div className='modal_content modifyDone_content'>
          {props.state === 'addDone' ? (
            <span id='check modifyDone_check'>습관이 추가되었습니다!</span>
          ) : (
            <span id='check modifyDone_check'>수정이 완료되었습니다!</span>
          )}
          <span id='x' onClick={props.offtwoModals}>
            X
          </span>
        </div>
      </div>
    </div>
  );
};

export default modifyDone;
