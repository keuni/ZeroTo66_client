import React from 'react';
import './Modal.css';

const Modal = (props) => {
  return (
    <div>
      <div className={props.showModal ? 'showModal' : 'hideModal'}>
        <div className="modal_overlay">
          <div className="modal_content">
            <span id="check">
              {props.showModal === 'blank'
                ? '다시 한 번 확인해주세요'
                : '이미 가입되어 있는 Id입니다'}
            </span>
            <span id="x" onClick={props.handleModal}>
              X
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
