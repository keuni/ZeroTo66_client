import React from 'react';
import './SuccessModal.css';

const SuccessModal = (props) => {
  return (
    <div>
      <div className='modal_overlay SuccessModal_overlay'>
        <div className='modal_content SuccessModal_content'>
          <span id='check SuccessModal_check'>
            짝짝짝👏🏻 축하드려요!
            <div>오늘의 습관을 모두 달성하셨어요💯</div>
          </span>
          <span id='x' onClick={props.offsuccessModal}>
            X
          </span>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
