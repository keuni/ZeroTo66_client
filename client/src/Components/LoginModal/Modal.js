import React from 'react';
import './Modal.css'

const Modal = (props) => {
  return (
    <div>
      <div className={ props.showModal ? "showModal" : "hideModal"}>
        <div className="modal_overlay" >
          <div className="modal_content">
            <span id="check">username을 확인해주세요</span>
            <span id="x" onClick={props.handleModal}>X</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal;