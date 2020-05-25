import React from 'react';
import './Modal.css';

const LoginModal = (props) => {
  return (
    <div>
      <div className={props.showModal !== false ? 'showModal' : 'hideModal'}>
        <div className='modal_overlay'>
          <div className='modal_content'>
            <span id='check'>
              {props.showModal === 404 ? 'username을' : '비밀번호를'}{' '}
              확인해주세요
            </span>
            <span id='x' onClick={props.handleModal}>
              X
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
